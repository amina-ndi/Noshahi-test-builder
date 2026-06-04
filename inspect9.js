const fs = require('fs');
const c = fs.readFileSync('e:/Frontend Developers/noshahi-test-bilder/index.html', 'utf8');

// Show lines around startAutoPlay
let pos = 0;
while (true) {
  const idx = c.indexOf('startAutoPlay', pos);
  if (idx === -1) break;
  console.log('startAutoPlay at', idx + ':');
  console.log(c.substring(Math.max(0,idx-50), idx+120));
  console.log('---');
  pos = idx + 1;
}

// Check if startAutoPlay() is called (not just defined)
const callMatch = c.match(/startAutoPlay\(\)/g);
console.log('\nstartAutoPlay() calls found:', callMatch ? callMatch.length : 0);

// Check carousel-indicators count vs carousel items count
const dotsCount = (c.match(/data-slide-to/g) || []).length;
const itemsCount = (c.match(/class="item/g) || []).length;
console.log('\nDots:', dotsCount, 'Items:', itemsCount);
