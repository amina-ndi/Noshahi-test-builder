const fs = require('fs');
const path = require('path');

const files = ['index.html', 'login.html', 'register.html', 'book-demo.html', 'insights.html'];

const replacements = [
    // HTML tag
    { from: /<html lang="en" class="dark">/g, to: '<html lang="en" class="light">' },
    
    // CSS Base
    { from: /background-color: #0A0A0A;/g, to: 'background-color: #F8FAFC;' },
    { from: /color: #ffffff;/g, to: 'color: #0F172A;' },
    { from: /color: white;/g, to: 'color: #0F172A;' },
    
    // CSS Header & Nav
    { from: /background: rgba\(10, 10, 10, 0\.8\);/g, to: 'background: rgba(255, 255, 255, 0.8);' },
    { from: /border-bottom: 1px solid rgba\(255, 255, 255, 0\.1\);/g, to: 'border-bottom: 1px solid rgba(15, 23, 42, 0.1);' },
    { from: /\.logo {\s*display: flex;\s*align-items: center;\s*gap: 12px;\s*text-decoration: none;\s*font-weight: 800;\s*font-size: 20px;\s*color: #ffffff;\s*}/g, to: '.logo { display: flex; align-items: center; gap: 12px; text-decoration: none; font-weight: 800; font-size: 20px; color: #0F172A; }' },
    { from: /color: rgba\(255, 255, 255, 0\.7\)/g, to: 'color: rgba(15, 23, 42, 0.7)' },
    { from: /color: white;\s*background: rgba\(255, 255, 255, 0\.05\);/g, to: 'color: #0F172A;\n            background: rgba(15, 23, 42, 0.05);' },

    // Dropdown
    { from: /background: rgba\(20, 20, 20, 0\.95\);/g, to: 'background: rgba(255, 255, 255, 0.95);' },
    { from: /border: 1px solid rgba\(255, 255, 255, 0\.08\);/g, to: 'border: 1px solid rgba(15, 23, 42, 0.1);' },
    
    // Pre-footer
    { from: /border-top: 1px solid rgba\(255, 255, 255, 0\.05\);/g, to: 'border-top: 1px solid rgba(15, 23, 42, 0.05);' },
    
    // Footer
    { from: /footer {\s*padding: 80px 0 40px;\s*background: #0A0A0A;/g, to: 'footer {\n            padding: 80px 0 40px;\n            background: #FFFFFF;' },
    { from: /border-top: 1px solid rgba\(255, 255, 255, 0\.08\);/g, to: 'border-top: 1px solid rgba(15, 23, 42, 0.08);' },
    { from: /\.footer-brand \.footer-logo {\s*font-size: 24px;\s*font-weight: 800;\s*color: white;/g, to: '.footer-brand .footer-logo {\n            font-size: 24px;\n            font-weight: 800;\n            color: #0F172A;' },
    { from: /color: rgba\(255, 255, 255, 0\.5\);/g, to: 'color: rgba(15, 23, 42, 0.6);' },
    { from: /\.footer-links h4 {\s*color: white;/g, to: '.footer-links h4 {\n            color: #0F172A;' },
    { from: /color: rgba\(255, 255, 255, 0\.6\);/g, to: 'color: rgba(15, 23, 42, 0.6);' },
    { from: /background: rgba\(255, 255, 255, 0\.03\);/g, to: 'background: rgba(15, 23, 42, 0.03);' },
    { from: /color: rgba\(255, 255, 255, 0\.4\);/g, to: 'color: rgba(15, 23, 42, 0.5);' },

    // Stars & Cursor (specifics from index.html)
    { from: /background: #0A0A0A;\s*}\s*\.moving-star {/g, to: 'background: #F8FAFC;\n        }\n        \n        .moving-star {' },
    { from: /background-color: #ffffff;\s*border-radius: 50%;\s*animation: moveStar linear infinite;\s*box-shadow: 0 0 10px rgba\(255, 255, 255, 0\.8\);/g, to: 'background-color: #0F172A;\n            border-radius: 50%;\n            animation: moveStar linear infinite;\n            box-shadow: 0 0 10px rgba(15, 23, 42, 0.2);' },
    
    // Tailwind specific colors
    { from: /text-white/g, to: 'text-slate-900' },
    { from: /text-white\/100/g, to: 'text-slate-900' },
    { from: /text-white\/90/g, to: 'text-slate-800' },
    { from: /text-white\/80/g, to: 'text-slate-700' },
    { from: /text-white\/70/g, to: 'text-slate-600' },
    { from: /text-white\/60/g, to: 'text-slate-500' },
    { from: /text-white\/50/g, to: 'text-slate-400' },
    { from: /border-white\/10/g, to: 'border-slate-200' },
    { from: /border-white\/20/g, to: 'border-slate-300' },
    { from: /border-white\/30/g, to: 'border-slate-300' },
    { from: /border-white\/5/g, to: 'border-slate-100' },
    { from: /bg-white\/5/g, to: 'bg-white/80 shadow-md' },
    { from: /bg-white\/10/g, to: 'bg-slate-100' },
    { from: /bg-black\/40/g, to: 'bg-white shadow-xl' },
    { from: /bg-\[#0A0A0A\]/g, to: 'bg-slate-50' },
    { from: /bg-black/g, to: 'bg-white' },

    // Restore text-white on specific red elements that were replaced by the broad sweep above
    // Since we changed text-white to text-slate-900, we must fix standard buttons
    { from: /text-slate-900([^>]*bg-\[#D94C58\])/g, to: 'text-white$1' },
    { from: /(bg-\[#D94C58\][^>]*)text-slate-900/g, to: '$1text-white' },
    { from: /text-slate-900([^>]*from-green-700)/g, to: 'text-white$1' },
    { from: /(from-green-700[^>]*)text-slate-900/g, to: '$1text-white' },
    
    // Fix Hero Text
    { from: /text-slate-900/g, to: 'text-slate-900' } // Placeholder for custom fix
];

files.forEach(file => {
    let content = fs.readFileSync(path.join('e:/Frontend Developers/noshahi-test-bilder', file), 'utf8');
    
    replacements.forEach(rep => {
        content = content.replace(rep.from, rep.to);
    });

    // Special fix for buttons with text-white that got clobbered:
    // Any btn-3d should have color: white
    content = content.replace(/\.btn-3d {\s*.*?\s*color: #0F172A;/g, function(match){
        return match.replace('color: #0F172A', 'color: #fff');
    });

    // Fix hero text section if any white text was lost
    content = content.replace(/bg-\[radial-gradient\(125%_125%_at_50%_100%,transparent_0%,#0A0A0A_75%\)\]/g, 'bg-[radial-gradient(125%_125%_at_50%_100%,transparent_0%,#F8FAFC_75%)]');
    
    content = content.replace(/background-color: rgb\(10, 10, 10\);/g, 'background-color: transparent;');
    
    // Also change dark gradients to light
    content = content.replace(/from-\[#0A0A0A\]/g, 'from-slate-50');
    content = content.replace(/to-\[#0A0A0A\]/g, 'to-slate-100');
    content = content.replace(/rgba\(10, 10, 10, 0\.9\)/g, 'rgba(248, 250, 252, 0.9)');
    
    fs.writeFileSync(path.join('e:/Frontend Developers/noshahi-test-bilder', file), content, 'utf8');
    console.log('Processed', file);
});
