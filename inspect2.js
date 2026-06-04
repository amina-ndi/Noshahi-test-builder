const fs = require('fs');
const c = fs.readFileSync('e:/Frontend Developers/noshahi-test-bilder/lancer.html', 'utf8');

// Find site-header
const headerIdx = c.indexOf('site-header');
if (headerIdx > -1) {
  console.log('--- site-header found at:', headerIdx);
  console.log(c.substring(Math.max(0, headerIdx - 50), headerIdx + 2000));
} else {
  console.log('No site-header found');
}

// Find site-logo
const logoIdx = c.indexOf('site-logo');
if (logoIdx > -1) {
  console.log('\n--- site-logo found at:', logoIdx);
  console.log(c.substring(Math.max(0, logoIdx - 50), logoIdx + 500));
}

// Check for ntb-shared links
const sharedCss = c.indexOf('ntb-shared.css');
const sharedJs = c.indexOf('ntb-shared.js');
console.log('\nntb-shared.css:', sharedCss);
console.log('ntb-shared.js:', sharedJs);

// Find last </style> or </head>
const headEnd = c.indexOf('</head>');
console.log('\n</head> at:', headEnd);
if (headEnd > -1) {
  // Show last 500 chars of head
  console.log('\n--- Last 500 chars of <head>:');
  console.log(c.substring(Math.max(0, headEnd - 500), headEnd + 10));
}

// Check for existing custom navbar injection
const bodyOpen = c.indexOf('<body');
if (bodyOpen > -1) {
  console.log('\n--- First 800 chars after <body>:');
  console.log(c.substring(bodyOpen, bodyOpen + 800));
}
