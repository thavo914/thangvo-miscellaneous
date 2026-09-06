import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Marked } from 'marked';
import hljs from 'highlight.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

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

// Helper to determine metadata and sort priority from path
function analyzeDoc(relPath, fullPath) {
  const content = fs.readFileSync(fullPath, 'utf-8');
  const lines = content.split('\n');
  let title = '';
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').replace(/[*_`]/g, '').trim();
      break;
    }
  }

  const baseName = path.basename(relPath, '.md');
  if (!title) {
    title = baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  let category = 'General Guides';
  let subcategory = 'Miscellaneous';
  let sortOrder = 999;
  let badge = '';

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
    const docMeta = analyzeDoc(cleanPath, fullPath);
    const headings = extractHeadings(rawMarkdown);
    const processedMarkdown = transformCallouts(rawMarkdown);
    const html = await marked.parse(processedMarkdown);

    res.json({
      success: true,
      ...docMeta,
      headings,
      html,
      rawMarkdown
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

    const docMeta = analyzeDoc(cleanPath, fullPath);
    const headings = extractHeadings(content);
    const processedMarkdown = transformCallouts(content);
    const html = await marked.parse(processedMarkdown);

    res.json({
      success: true,
      message: 'File saved successfully',
      ...docMeta,
      headings,
      html,
      rawMarkdown: content
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

    const docMeta = analyzeDoc(cleanPath, fullPath);
    const headings = extractHeadings(initialContent);
    const processedMarkdown = transformCallouts(initialContent);
    const html = await marked.parse(processedMarkdown);

    res.json({
      success: true,
      message: 'File created successfully',
      ...docMeta,
      headings,
      html,
      rawMarkdown: initialContent
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
    const headings = extractHeadings(raw);
    const processed = transformCallouts(raw);
    const html = await marked.parse(processed);
    res.json({ success: true, html, headings });
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Study & Training Hub server running at http://0.0.0.0:${PORT}`);
});
