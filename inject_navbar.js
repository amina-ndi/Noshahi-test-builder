const fs = require('fs');

// === Fix lancer.html ===
let lancer = fs.readFileSync('e:/Frontend Developers/noshahi-test-bilder/lancer.html', 'utf8');

// 1. Inject ntb-shared CSS + JS in <head> before </head>
const headInject = `
  <link rel="stylesheet" href="assets/ntb-shared.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <script src="assets/ntb-shared.js" defer></script>
</head>`;

lancer = lancer.replace('</head>', headInject);

// 2. Inject navbar after <body ...>
const bodyTagEnd = lancer.indexOf('>',  lancer.indexOf('<body'));
const navbarHtml = `

<header class="site-header">
  <div class="site-nav">
    <a class="site-logo" href="index.html#home">
      <img src="img/NTB_logo.png" alt="Noshahi Test Builder Logo" class="site-logo-img">
      <span>Noshahi Test Builder</span>
    </a>

    <nav class="site-links" data-ntb-nav-menu>
      <a href="index.html">Home</a>
      <a href="index.html#features">Features</a>
      <a href="index.html#highlights">Highlights</a>
      <a href="insights.html">Insights</a>
      <a href="book-demo.html">Book Demo</a>
      <a href="contact-us.html">Contact Us</a>
      <a href="login.html" class="nav-login-cta">Login</a>
      <a href="register.html" class="nav-cta">Get Started</a>
    </nav>

    <button class="site-menu-toggle" type="button" aria-label="Toggle Menu" aria-expanded="false" data-ntb-menu-toggle>
      <i class="fa-solid fa-bars"></i>
    </button>
  </div>
</header>`;

lancer = lancer.substring(0, bodyTagEnd + 1) + navbarHtml + lancer.substring(bodyTagEnd + 1);

fs.writeFileSync('e:/Frontend Developers/noshahi-test-bilder/lancer.html', lancer, 'utf8');
console.log('lancer.html updated successfully');
console.log('New length:', lancer.length);

// Verify
const check = lancer.indexOf('site-header');
console.log('site-header found at:', check);
const checkCss = lancer.indexOf('ntb-shared.css');
console.log('ntb-shared.css found at:', checkCss);
