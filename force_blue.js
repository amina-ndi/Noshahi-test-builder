const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'contact-us.html',
  'login.html',
  'register.html',
  'book-demo.html',
  'insights.html',
  'assets/ntb-shared.css'
];

const workDir = 'e:\\Frontend Developers\\noshahi-test-bilder';

files.forEach(file => {
  const filePath = path.join(workDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace all old blue colors with #262161
    content = content.replace(/#020d27ff/gi, '#262161');
    content = content.replace(/#020D27/gi, '#262161');
    content = content.replace(/#000511/gi, '#262161');
    content = content.replace(/#01081A/gi, '#262161');
    content = content.replace(/#0a67bf/gi, '#262161');
    content = content.replace(/#051a44/gi, '#262161');
    content = content.replace(/#061b44/gi, '#262161');
    content = content.replace(/#0a3161/gi, '#262161');
    content = content.replace(/#041d4d/gi, '#262161');
    content = content.replace(/#00091D/gi, '#262161');

    // Replace rgb/rgba variants
    content = content.replace(/rgba\(\s*2\s*,\s*13\s*,\s*39\s*,/gi, 'rgba(38, 33, 97,');
    content = content.replace(/rgb\(\s*2\s*,\s*13\s*,\s*39\s*\)/gi, 'rgb(38, 33, 97)');
    content = content.replace(/rgba\(\s*0\s*,\s*47\s*,\s*109\s*,/gi, 'rgba(38, 33, 97,'); // mapped to logo blue RGB

    // Text colors
    content = content.replace(/#0F172A/gi, '#262161');
    content = content.replace(/#1e293b/gi, '#262161');
    content = content.replace(/#334155/gi, '#262161');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated ' + file);
    }
  }
});
console.log('Done.');
