import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Marked } from 'marked';
import hljs from 'highlight.js';
import { load as yamlLoad } from 'js-yaml';
import { WebSocketServer } from 'ws';
import { GoogleGenAI, Modality } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Lazy initialization of Gemini client to prevent startup failure if key is pending
let aiClient = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set. Please select or add an API key in the Settings > Secrets panel.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Setup Marked with custom renderers for heading anchors and syntax-highlighted code blocks
const marked = new Marked({
  gfm: true,
  breaks: false
});

marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const plainText = text.replace(/<[^>]*>/g, '').trim();
      const id = plainText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return `<h${depth} id="${id}">${text} <a class="header-anchor" href="#${id}" title="Link to this section">#</a></h${depth}>`;
    },
    code({ text, lang }) {
      const validLang = (lang && hljs.getLanguage(lang)) ? lang : 'plaintext';
      let highlighted = text;
      try {
        highlighted = hljs.highlight(text, { language: validLang }).value;
      } catch (e) {
        highlighted = text;
      }
      return `<div class="code-block-wrapper"><div class="code-header"><span class="code-lang">${validLang}</span><button type="button" class="copy-code-btn" onclick="copySnippet(this)">Copy</button></div><pre><code class="hljs language-${validLang}">${highlighted}</code></pre></div>`;
    },
    table(token) {
      let headerCells = '';
      const headers = token.header || [];
      for (let r = 0; r < headers.length; r++) {
        headerCells += this.tablecell(headers[r]);
      }
      const headerRow = headerCells ? this.tablerow({ text: headerCells }) : '';

      let bodyRows = '';
      const rows = token.rows || [];
      for (let r = 0; r < rows.length; r++) {
        const row = rows[r];
        let cellContent = '';
        for (let o = 0; o < row.length; o++) {
          cellContent += this.tablecell(row[o]);
        }
        bodyRows += this.tablerow({ text: cellContent });
      }
      if (bodyRows) {
        bodyRows = `<tbody>${bodyRows}</tbody>`;
      }
      const thead = headerRow ? `<thead>${headerRow}</thead>` : '';
      return `<div class="table-container"><table>${thead}${bodyRows}</table></div>`;
    }
  }
});

// Convert GitHub style callouts (> [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT], > [!CAUTION])
function transformCallouts(markdown) {
  const alertRegex = /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>.*(?:\n|$))*)/gim;
  return markdown.replace(alertRegex, (match, type, body) => {
    const cleanBody = body.replace(/^>\s?/gm, '');
    const upperType = type.toUpperCase();
    const icon = upperType === 'WARNING' ? '⚠️' :
                 upperType === 'TIP' ? '💡' :
                 upperType === 'IMPORTANT' ? '⭐' :
                 upperType === 'CAUTION' ? '🛑' : 'ℹ️';
    return `<div class="callout callout-${type.toLowerCase()}"><div class="callout-header"><span class="callout-icon">${icon}</span> <span class="callout-title">${upperType}</span></div><div class="callout-body">\n\n${cleanBody}\n</div></div>\n\n`;
  });
}

// Extract headings for Table of Contents
function extractHeadings(markdown) {
  const headings = [];
  const lines = markdown.split('\n');
  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const depth = match[1].length;
      const rawText = match[2].trim();
      const plainText = rawText.replace(/[*_`[\]]/g, '').trim();
      const id = plainText.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push({ depth, text: plainText, id });
    }
  }
  return headings;
}

// HTML escaping helper
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Extract YAML front-matter from raw markdown
function extractFrontMatter(rawContent) {
  if (!rawContent || typeof rawContent !== 'string') {
    return { frontMatter: null, frontMatterRaw: '', body: rawContent || '' };
  }

  // Strip leading UTF-8 BOM if present
  const cleanContent = rawContent.replace(/^\uFEFF/, '');

  // Match YAML front-matter between opening and closing delimiters (--- or ...)
  const match = cleanContent.match(/^(?:[ \t]*\r?\n)*---[ \t]*\r?\n([\s\S]*?)\r?\n(?:---|\.\.\.)[ \t]*(?:\r?\n|$)/);
  if (!match) {
    return { frontMatter: null, frontMatterRaw: '', body: cleanContent };
  }

  const frontMatterRaw = match[1];
  const body = cleanContent.slice(match[0].length);
  let frontMatter = null;

  try {
    const parsed = yamlLoad(frontMatterRaw);
    if (parsed && typeof parsed === 'object') {
      frontMatter = parsed;
    }
  } catch (err) {
    console.warn('YAML front-matter parse warning:', err.message);
  }

  return { frontMatter, frontMatterRaw, body };
}

// Format YAML value for table cell display
function formatFrontMatterValue(val, depth = 0) {
  if (val === null || val === undefined) {
    return '<span class="fm-null">null</span>';
  }

  if (typeof val === 'boolean') {
    return `<span class="fm-badge fm-bool ${val ? 'fm-bool-true' : 'fm-bool-false'}">${val ? '✓ true' : '✗ false'}</span>`;
  }

  if (typeof val === 'number') {
    return `<span class="fm-badge fm-number">${val}</span>`;
  }

  if (val instanceof Date) {
    return `<span class="fm-badge fm-date">📅 ${val.toISOString().slice(0, 10)}</span>`;
  }

  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      return `<a href="${encodeURI(trimmed)}" target="_blank" rel="noopener noreferrer" class="fm-link">${escapeHtml(trimmed)} ↗</a>`;
    }
    if (/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(trimmed)) {
      return `<span class="fm-badge fm-date">📅 ${escapeHtml(trimmed.slice(0, 10))}</span>`;
    }
    if (val.includes('\n')) {
      return `<pre class="fm-multiline">${escapeHtml(val)}</pre>`;
    }
    return `<span class="fm-text">${escapeHtml(val)}</span>`;
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return '<span class="fm-empty">[]</span>';
    const allPrimitives = val.every(v => typeof v !== 'object' || v === null);
    if (allPrimitives) {
      return `<div class="fm-tags">${val.map(item => `<span class="fm-tag">${escapeHtml(String(item))}</span>`).join('')}</div>`;
    }
    return `<ul class="fm-list">${val.map(item => `<li>${formatFrontMatterValue(item, depth + 1)}</li>`).join('')}</ul>`;
  }

  if (typeof val === 'object') {
    const keys = Object.keys(val);
    if (keys.length === 0) return '<span class="fm-empty">{}</span>';
    let subRows = '';
    for (const k of keys) {
      subRows += `<tr><td class="fm-sub-key">${escapeHtml(k)}</td><td class="fm-sub-val">${formatFrontMatterValue(val[k], depth + 1)}</td></tr>`;
    }
    return `<table class="fm-subtable"><tbody>${subRows}</tbody></table>`;
  }

  return escapeHtml(String(val));
}

// Render extracted YAML front-matter as a structured key-value table
function renderFrontMatterTable(frontMatter, frontMatterRaw = '') {
  if (!frontMatter || typeof frontMatter !== 'object') return '';
  const entries = Object.entries(frontMatter);
  if (entries.length === 0) return '';

  const encodedRaw = Buffer.from(frontMatterRaw || '').toString('base64');
  let rowsHtml = '';
  for (const [key, val] of entries) {
    rowsHtml += `
      <tr>
        <td class="fm-key">
          <code>${escapeHtml(key)}</code>
        </td>
        <td class="fm-val">
          ${formatFrontMatterValue(val)}
        </td>
      </tr>
    `;
  }

  return `
    <div class="doc-frontmatter-panel" id="doc-frontmatter-panel">
      <div class="doc-frontmatter-header">
        <div class="doc-frontmatter-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <span class="fm-title-text">Document Metadata</span>
          <span class="fm-count-badge">${entries.length} ${entries.length === 1 ? 'property' : 'properties'}</span>
        </div>
        <div class="doc-frontmatter-actions">
          <button type="button" class="fm-action-btn copy-fm-btn" data-yaml-base64="${encodedRaw}" onclick="copyFrontMatterYaml(this)" title="Copy YAML front-matter to clipboard">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
            <span>Copy YAML</span>
          </button>
          <button type="button" class="fm-action-btn toggle-fm-btn" onclick="toggleFrontMatterTable(this)" title="Collapse or expand metadata table">
            <svg class="fm-toggle-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <span class="fm-toggle-text">Collapse</span>
          </button>
        </div>
      </div>
      <div class="doc-frontmatter-body" id="doc-frontmatter-body">
        <div class="table-container doc-frontmatter-table-wrapper">
          <table class="doc-frontmatter-table">
            <thead>
              <tr>
                <th class="fm-th-key">Key</th>
                <th class="fm-th-val">Value</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// Helper to determine metadata and sort priority from path
function analyzeDoc(relPath, fullPath) {
  const content = fs.readFileSync(fullPath, 'utf-8');
  const { frontMatter, body } = extractFrontMatter(content);

  const lines = body.split('\n');
  let title = '';

  // Check if title is defined in front-matter
  if (frontMatter && typeof frontMatter.title === 'string' && frontMatter.title.trim()) {
    title = frontMatter.title.trim();
  }

  if (!title) {
    for (const line of lines) {
      if (line.startsWith('# ')) {
        title = line.replace(/^#\s+/, '').replace(/[*_`]/g, '').trim();
        break;
      }
    }
  }

  const baseName = path.basename(relPath, '.md');
  if (!title) {
    title = baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  const words = body.trim() ? body.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  let category = 'General Guides';
  let subcategory = 'Miscellaneous';
  let sortOrder = 999;
  let badge = '';

  // Use category or badge from frontMatter if provided
  if (frontMatter && typeof frontMatter.category === 'string' && frontMatter.category.trim()) {
    category = frontMatter.category.trim();
  }
  if (frontMatter && typeof frontMatter.badge === 'string' && frontMatter.badge.trim()) {
    badge = frontMatter.badge.trim();
  }

  if (relPath.startsWith('english/week-')) {
    category = 'Weekly Curriculum';
    const weekMatch = relPath.match(/week-(\d+)/);
    const weekNum = weekMatch ? parseInt(weekMatch[1], 10) : 0;
    subcategory = `Week ${weekNum}`;
    
    // Day extraction
    if (baseName.includes('day1')) {
      badge = 'Day 1';
      sortOrder = weekNum * 100 + 1;
    } else if (baseName.includes('day2')) {
      badge = 'Day 2';
      sortOrder = weekNum * 100 + 2;
    } else if (baseName.includes('day3')) {
      badge = 'Day 3';
      sortOrder = weekNum * 100 + 3;
    } else if (baseName.includes('day4')) {
      badge = 'Day 4';
      sortOrder = weekNum * 100 + 4;
    } else if (baseName.includes('day5')) {
      badge = 'Day 5';
      sortOrder = weekNum * 100 + 5;
    } else if (baseName.includes('day6')) {
      badge = 'Day 6';
      sortOrder = weekNum * 100 + 6;
    } else if (baseName.includes('lesson-overview')) {
      badge = 'Overview';
      sortOrder = weekNum * 100 + 0;
    } else if (baseName.includes('skimming-transcripts')) {
      badge = 'Transcripts';
      sortOrder = weekNum * 100 + 7;
    } else if (baseName.includes('checklist')) {
      badge = 'Checklist';
      sortOrder = weekNum * 100 + 8;
    } else {
      badge = 'Guide';
      sortOrder = weekNum * 100 + 9;
    }
  } else if (relPath.startsWith('english/youtube-lessons')) {
    category = 'YouTube Lessons';
    subcategory = 'Video Study';
    const lessonMatch = baseName.match(/^(\d+)\.(\d+)/);
    if (lessonMatch) {
      const major = parseInt(lessonMatch[1], 10);
      const minor = parseInt(lessonMatch[2], 10);
      sortOrder = 2000 + major * 100 + minor;
      badge = `Lesson ${major}.${minor}`;
    } else {
      sortOrder = 2500;
      badge = 'Video';
    }
  } else if (relPath.startsWith('english/')) {
    category = 'Practices & Techniques';
    subcategory = relPath.includes('/docs/') ? 'Methodology' : 'Daily Routines';
    sortOrder = 3000;
    badge = 'Technique';
  } else if (relPath.startsWith('running/')) {
    category = 'Running & MAF Training';
    if (relPath.includes('maf-plan')) {
      subcategory = 'MAF Plan';
      sortOrder = 4100;
      badge = 'MAF';
    } else if (relPath.includes('nutrition')) {
      subcategory = 'Nutrition & Health';
      sortOrder = 4200;
      badge = 'Nutrition';
    } else if (relPath.includes('strength') || relPath.includes('workout') || relPath.includes('mobility')) {
      subcategory = 'Workouts & Strength';
      sortOrder = 4300;
      badge = 'Strength';
    } else {
      subcategory = 'Overview';
      sortOrder = 4000;
      badge = 'Guide';
    }
  }

  return {
    path: relPath,
    title,
    category,
    subcategory,
    badge,
    sortOrder,
    wordCount: words,
    readingTime,
    fileName: baseName
  };
}

// Function to scan directory recursively for markdown files
function scanMarkdownFiles(dir, baseDir = '') {
  let list = [];
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      list = list.concat(scanMarkdownFiles(full, rel));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      list.push(analyzeDoc(rel, full));
    }
  }
  return list;
}

// Get all documents cached or loaded on demand
function getAllDocuments() {
  const english = scanMarkdownFiles(path.join(__dirname, 'english'), 'english');
  const running = scanMarkdownFiles(path.join(__dirname, 'running'), 'running');
  const all = [...english, ...running];
  all.sort((a, b) => a.sortOrder - b.sortOrder || a.title.localeCompare(b.title));
  return all;
}

// API Routes
app.get('/api/documents', (req, res) => {
  try {
    const docs = getAllDocuments();
    res.json({ success: true, count: docs.length, documents: docs });
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/document', async (req, res) => {
  try {
    const targetPath = req.query.path;
    if (!targetPath || typeof targetPath !== 'string') {
      return res.status(400).json({ success: false, error: 'Query parameter "path" is required' });
    }

    // Path traversal defense
    const cleanPath = path.normalize(targetPath).replace(/^(\.\.[\/\\])+/, '');
    if (!cleanPath.startsWith('english/') && !cleanPath.startsWith('running/')) {
      return res.status(403).json({ success: false, error: 'Access denied to paths outside english/ or running/' });
    }
    if (!cleanPath.endsWith('.md')) {
      return res.status(400).json({ success: false, error: 'Only Markdown (.md) files can be viewed' });
    }

    const fullPath = path.join(__dirname, cleanPath);
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }

    const rawMarkdown = fs.readFileSync(fullPath, 'utf-8');
    const { frontMatter, frontMatterRaw, body } = extractFrontMatter(rawMarkdown);
    const docMeta = analyzeDoc(cleanPath, fullPath);
    const headings = extractHeadings(body);
    const processedMarkdown = transformCallouts(body);
    const html = await marked.parse(processedMarkdown);
    const frontMatterHtml = renderFrontMatterTable(frontMatter, frontMatterRaw);

    res.json({
      success: true,
      ...docMeta,
      headings,
      html,
      rawMarkdown,
      frontMatter,
      frontMatterRaw,
      frontMatterHtml
    });
  } catch (err) {
    console.error('Error rendering document:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Save modified document content
app.post('/api/document/save', async (req, res) => {
  try {
    const { path: targetPath, content } = req.body;
    if (!targetPath || typeof targetPath !== 'string') {
      return res.status(400).json({ success: false, error: 'Path is required' });
    }
    if (typeof content !== 'string') {
      return res.status(400).json({ success: false, error: 'Content must be a string' });
    }

    const cleanPath = path.normalize(targetPath).replace(/^(\.\.[\/\\])+/, '');
    if (!cleanPath.startsWith('english/') && !cleanPath.startsWith('running/')) {
      return res.status(403).json({ success: false, error: 'Access denied to paths outside english/ or running/' });
    }
    if (!cleanPath.endsWith('.md')) {
      return res.status(400).json({ success: false, error: 'Only Markdown (.md) files can be edited' });
    }

    const fullPath = path.join(__dirname, cleanPath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf-8');

    const { frontMatter, frontMatterRaw, body } = extractFrontMatter(content);
    const docMeta = analyzeDoc(cleanPath, fullPath);
    const headings = extractHeadings(body);
    const processedMarkdown = transformCallouts(body);
    const html = await marked.parse(processedMarkdown);
    const frontMatterHtml = renderFrontMatterTable(frontMatter, frontMatterRaw);

    res.json({
      success: true,
      message: 'File saved successfully',
      ...docMeta,
      headings,
      html,
      rawMarkdown: content,
      frontMatter,
      frontMatterRaw,
      frontMatterHtml
    });
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create new document
app.post('/api/document/create', async (req, res) => {
  try {
    const { path: targetPath, content } = req.body;
    if (!targetPath || typeof targetPath !== 'string') {
      return res.status(400).json({ success: false, error: 'Target path is required' });
    }

    let cleanPath = path.normalize(targetPath).replace(/^(\.\.[\/\\])+/, '');
    if (!cleanPath.endsWith('.md')) {
      cleanPath += '.md';
    }
    if (!cleanPath.startsWith('english/') && !cleanPath.startsWith('running/')) {
      return res.status(403).json({ success: false, error: 'Access denied: files must reside within english/ or running/' });
    }

    const fullPath = path.join(__dirname, cleanPath);
    if (fs.existsSync(fullPath)) {
      return res.status(409).json({ success: false, error: 'A file with this name already exists' });
    }

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    const docTitle = path.basename(cleanPath, '.md').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const initialContent = typeof content === 'string' && content.trim() ? content : `# ${docTitle}\n\nWrite your content here...\n`;
    fs.writeFileSync(fullPath, initialContent, 'utf-8');

    const { frontMatter, frontMatterRaw, body } = extractFrontMatter(initialContent);
    const docMeta = analyzeDoc(cleanPath, fullPath);
    const headings = extractHeadings(body);
    const processedMarkdown = transformCallouts(body);
    const html = await marked.parse(processedMarkdown);
    const frontMatterHtml = renderFrontMatterTable(frontMatter, frontMatterRaw);

    res.json({
      success: true,
      message: 'File created successfully',
      ...docMeta,
      headings,
      html,
      rawMarkdown: initialContent,
      frontMatter,
      frontMatterRaw,
      frontMatterHtml
    });
  } catch (err) {
    console.error('Error creating document:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Real-time markdown preview rendering
app.post('/api/document/preview', async (req, res) => {
  try {
    const { markdown } = req.body;
    const raw = typeof markdown === 'string' ? markdown : '';
    const { frontMatter, frontMatterRaw, body } = extractFrontMatter(raw);
    const headings = extractHeadings(body);
    const processed = transformCallouts(body);
    let html = await marked.parse(processed);
    const frontMatterHtml = renderFrontMatterTable(frontMatter, frontMatterRaw);
    if (frontMatterHtml) {
      html = frontMatterHtml + html;
    }
    res.json({
      success: true,
      html,
      headings,
      frontMatter,
      frontMatterRaw,
      frontMatterHtml
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const docs = getAllDocuments();
    const categories = {};
    docs.forEach(d => {
      categories[d.category] = (categories[d.category] || 0) + 1;
    });
    res.json({
      success: true,
      totalDocuments: docs.length,
      categories,
      hasQuartoReport: fs.existsSync(path.join(__dirname, 'running', 'README.html'))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Gemini Status API
app.get('/api/gemini/status', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
  res.json({
    success: true,
    available: hasKey,
    defaultModel: 'gemini-3.8-flash',
    liveModel: 'gemini-3.8-live',
    supportedModels: [
      { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash (Recommended)', role: 'General Tasks & Fast Evaluation' },
      { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', role: 'General Conversational & Review' },
      { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite', role: 'Fast Feedback & Short Answers' },
      { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro Preview', role: 'Complex Analysis & Deep Reasoning' }
    ]
  });
});

// Gemini Multi-Turn Chat (Standard)
app.post('/api/chat', async (req, res) => {
  try {
    const ai = getAI();
    const { messages = [], model = 'gemini-3.8-flash', systemInstruction } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, error: 'Messages array is required.' });
    }

    const contents = messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || '' }]
    }));

    const config = {};
    if (systemInstruction && typeof systemInstruction === 'string' && systemInstruction.trim()) {
      config.systemInstruction = systemInstruction.trim();
    }

    const response = await ai.models.generateContent({
      model: model || 'gemini-3.8-flash',
      contents,
      config,
    });

    res.json({
      success: true,
      text: response.text || '',
      model: model || 'gemini-3.8-flash'
    });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Gemini Multi-Turn Chat (Streaming via SSE)
app.post('/api/chat/stream', async (req, res) => {
  try {
    const ai = getAI();
    const { messages = [], model = 'gemini-3.8-flash', systemInstruction } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, error: 'Messages array is required.' });
    }

    const contents = messages.map(m => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || '' }]
    }));

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const config = {};
    if (systemInstruction && typeof systemInstruction === 'string' && systemInstruction.trim()) {
      config.systemInstruction = systemInstruction.trim();
    }

    const responseStream = await ai.models.generateContentStream({
      model: model || 'gemini-3.8-flash',
      contents,
      config,
    });

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error('Chat stream error:', err);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.write(`data: ${JSON.stringify({ error: err.message, done: true })}\n\n`);
      res.end();
    }
  }
});

// Paths to static assets
const vocabAppPath = path.join(__dirname, 'english', 'vocabulary', 'review-app');
const runningPath = path.join(__dirname, 'running');
const distPath = path.join(__dirname, 'dist');

// If dist exists, serve from dist first
app.use(express.static(distPath));
app.use(express.static(vocabAppPath));
app.use('/english/vocabulary/review-app', express.static(vocabAppPath));
app.use('/running', express.static(runningPath, { index: 'README.html' }));
app.use('/english', express.static(path.join(__dirname, 'english')));

// Fallback to index.html
app.get('*', (req, res) => {
  const distIndex = path.join(distPath, 'index.html');
  if (fs.existsSync(distIndex)) {
    res.sendFile(distIndex);
  } else {
    res.sendFile(path.join(vocabAppPath, 'index.html'));
  }
});

// Create HTTP server & WebSocket server for Live API
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (request, socket, head) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    if (url.pathname === '/live' || url.pathname === '/api/live') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    } else {
      socket.destroy();
    }
  } catch (e) {
    socket.destroy();
  }
});

wss.on('connection', async (clientWs, request) => {
  let session = null;
  let isClosed = false;

  try {
    const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
    const voice = url.searchParams.get('voice') || 'Zephyr';
    const instructionParam = url.searchParams.get('instruction');

    const defaultInstruction = 
      "You are an articulate, encouraging English communication coach and performance review partner for Data Engineers. " +
      "You help users practice IELTS speaking criteria, mock performance reviews, and salary negotiation arguments. " +
      "Keep your spoken answers natural, engaging, clear, and concise (1 to 3 sentences per conversational turn) to ensure dynamic, real-time back-and-forth dialogue.";

    const systemInstruction = instructionParam || defaultInstruction;

    const ai = getAI();
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice }
          }
        },
        systemInstruction,
        outputAudioTranscription: {},
        inputAudioTranscription: {},
      },
      callbacks: {
        onmessage: (message) => {
          if (isClosed || clientWs.readyState !== clientWs.OPEN) return;

          // Model audio chunk (24kHz PCM)
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ type: 'audio', audio }));
          }

          // Output Audio Transcription (text spoken by model)
          const outText = message.serverContent?.outputAudioTranscription?.text;
          if (outText) {
            clientWs.send(JSON.stringify({ type: 'outputTranscription', text: outText }));
          }

          // Input Audio Transcription (text spoken by user)
          const inText = message.serverContent?.inputAudioTranscription?.text;
          if (inText) {
            clientWs.send(JSON.stringify({ type: 'inputTranscription', text: inText }));
          }

          // User interrupted the model
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: 'interrupted' }));
          }

          // Model turn completed
          if (message.serverContent?.turnComplete) {
            clientWs.send(JSON.stringify({ type: 'turnComplete' }));
          }
        },
        onerror: (err) => {
          console.error('Live API session error:', err);
          if (clientWs.readyState === clientWs.OPEN) {
            clientWs.send(JSON.stringify({ type: 'error', error: err?.message || String(err) }));
          }
        },
        onclose: () => {
          if (clientWs.readyState === clientWs.OPEN) {
            clientWs.send(JSON.stringify({ type: 'closed' }));
          }
        }
      }
    });

    if (clientWs.readyState === clientWs.OPEN) {
      clientWs.send(JSON.stringify({ type: 'ready', model: 'gemini-3.8-live', voice }));
    }

    clientWs.on('message', async (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        if (msg.type === 'audio' && msg.audio && session) {
          session.sendRealtimeInput({
            audio: { data: msg.audio, mimeType: 'audio/pcm;rate=16000' }
          });
        } else if (msg.type === 'text' && msg.text && session) {
          session.sendRealtimeInput({
            text: msg.text
          });
        }
      } catch (err) {
        console.error('Error handling client message:', err);
      }
    });

    clientWs.on('close', () => {
      isClosed = true;
      if (session) {
        try { session.close(); } catch (e) {}
      }
    });

    clientWs.on('error', (err) => {
      console.error('Client WebSocket connection error:', err);
      isClosed = true;
      if (session) {
        try { session.close(); } catch (e) {}
      }
    });

  } catch (err) {
    console.error('Failed to establish Live API session:', err);
    if (clientWs.readyState === clientWs.OPEN) {
      clientWs.send(JSON.stringify({ type: 'error', error: err.message }));
      clientWs.close();
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Study & Training Hub server running at http://0.0.0.0:${PORT}`);
});
