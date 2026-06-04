const fs = require('fs');
const c = fs.readFileSync('e:/Frontend Developers/noshahi-test-bilder/index.html', 'utf8');

// Find carousel-indicators active style
const idx = c.indexOf('carousel-indicators li.active');
if (idx > -1) {
  console.log('active style at:', idx);
  console.log(c.substring(Math.max(0,idx-50), idx+200));
} else {
  console.log('No .carousel-indicators li.active style found');
  // Try to find the block around carousel-indicators
  const idx2 = c.indexOf('carousel-indi');
  console.log('carousel-indi at:', idx2);
  console.log(c.substring(idx2, idx2+800));
}

// Find carousel JS
const jsIdx = c.indexOf('carousel-fade');
if (jsIdx > -1) {
  console.log('\ncarousel-fade at:', jsIdx);
  // show JS handling
  const scriptIdx = c.lastIndexOf('<script', jsIdx);
  if (scriptIdx > -1) {
    console.log(c.substring(scriptIdx, scriptIdx+3000));
  }
}
