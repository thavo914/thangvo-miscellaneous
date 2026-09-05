import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Path to vocabulary review app
const vocabAppPath = path.join(__dirname, 'english', 'vocabulary', 'review-app');
const runningPath = path.join(__dirname, 'running');
const distPath = path.join(__dirname, 'dist');

// If dist exists and contains index.html, prefer serving from dist
const staticRoot = fs.existsSync(path.join(distPath, 'index.html')) ? distPath : vocabAppPath;

app.use(express.static(staticRoot));
app.use('/english/vocabulary/review-app', express.static(vocabAppPath));
app.use('/running', express.static(runningPath, { index: 'README.html' }));
app.use('/english', express.static(path.join(__dirname, 'english')));

// SPA / fallback route
app.get('*', (req, res) => {
  const indexPath = path.join(staticRoot, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.sendFile(path.join(vocabAppPath, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Vocabulary Review App server running at http://0.0.0.0:${PORT}`);
});
