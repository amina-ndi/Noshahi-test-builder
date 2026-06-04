const fs = require('fs');

// Check index.html for navbar pattern
const indexC = fs.readFileSync('e:/Frontend Developers/noshahi-test-bilder/index.html', 'utf8');
console.log('=== INDEX.HTML ===');
console.log('site-header:', indexC.indexOf('site-header'));
console.log('ntb-shared.css:', indexC.indexOf('ntb-shared.css'));
console.log('ntb-shared.js:', indexC.indexOf('ntb-shared.js'));
console.log('site-logo:', indexC.indexOf('site-logo'));

const logoIdx = indexC.indexOf('site-logo');
if (logoIdx > -1) {
  console.log('\n--- Navbar HTML (2000 chars from site-logo):');
  console.log(indexC.substring(Math.max(0, logoIdx - 200), logoIdx + 2000));
}

// Check lancer.html end of file
const lancerC = fs.readFileSync('e:/Frontend Developers/noshahi-test-bilder/lancer.html', 'utf8');
console.log('\n=== LANCER.HTML END (last 500 chars) ===');
console.log(lancerC.substring(lancerC.length - 500));
