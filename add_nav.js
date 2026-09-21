const fs = require('fs');

function addNav(file) {
    let html = fs.readFileSync(file, 'utf8');
    
    // Desktop nav
    html = html.replace(
        '<li><a href="/collections/bestsellers" class="hover:text-maroon transition">Bestsellers</a></li>',
        '<li><a href="/collections/bestsellers" class="hover:text-maroon transition">Bestsellers</a></li>\n                <li><a href="/weaving" class="hover:text-maroon transition">Weaving</a></li>'
    );
    
    // Mobile nav
    html = html.replace(
        '<li><a href="/collections/bestsellers" class="mobile-link block hover:text-maroon transition">Bestsellers</a></li>',
        '<li><a href="/collections/bestsellers" class="mobile-link block hover:text-maroon transition">Bestsellers</a></li>\n                <li><a href="/weaving" class="mobile-link block hover:text-maroon transition">Weaving</a></li>'
    );
    
    fs.writeFileSync(file, html);
    console.log(`Updated nav in ${file}`);
}

addNav('header_template.html');
addNav('index.html');
