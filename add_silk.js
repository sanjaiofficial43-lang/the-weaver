const fs = require('fs');

// 1. Update build.js
let buildJs = fs.readFileSync('build.js', 'utf8');
if (!buildJs.includes("{ slug: 'silk-sarees'")) {
    buildJs = buildJs.replace(
        "    { slug: 'bestsellers', name: 'Bestsellers', filter: p => p.category.includes('Bestsellers') }",
        "    { slug: 'bestsellers', name: 'Bestsellers', filter: p => p.category.includes('Bestsellers') },\n    { slug: 'silk-sarees', name: 'Silk Sarees', filter: p => p.category.includes('Silk Sarees') }"
    );
    fs.writeFileSync('build.js', buildJs);
    console.log('Added Silk Sarees to build.js');
}

// 2. Update navigation in header_template.html
let headerHtml = fs.readFileSync('header_template.html', 'utf8');
if (!headerHtml.includes('/collections/silk-sarees')) {
    // Desktop
    headerHtml = headerHtml.replace(
        '<li><a href="/weaving" class="hover:text-maroon transition">Weaving</a></li>',
        '<li><a href="/weaving" class="hover:text-maroon transition">Weaving</a></li>\n                <li><a href="/collections/silk-sarees" class="hover:text-maroon transition">Silk Sarees</a></li>'
    );
    // Mobile
    headerHtml = headerHtml.replace(
        '<li><a href="/weaving" class="mobile-link block hover:text-maroon transition">Weaving</a></li>',
        '<li><a href="/weaving" class="mobile-link block hover:text-maroon transition">Weaving</a></li>\n                <li><a href="/collections/silk-sarees" class="mobile-link block hover:text-maroon transition">Silk Sarees</a></li>'
    );
    fs.writeFileSync('header_template.html', headerHtml);
    console.log('Added Silk Sarees to header_template.html');
}

// 3. Update navigation in index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
if (!indexHtml.includes('/collections/silk-sarees')) {
    // Desktop
    indexHtml = indexHtml.replace(
        '<li><a href="/weaving" class="hover:text-maroon transition">Weaving</a></li>',
        '<li><a href="/weaving" class="hover:text-maroon transition">Weaving</a></li>\n                <li><a href="/collections/silk-sarees" class="hover:text-maroon transition">Silk Sarees</a></li>'
    );
    // Mobile
    indexHtml = indexHtml.replace(
        '<li><a href="/weaving" class="mobile-link block hover:text-maroon transition">Weaving</a></li>',
        '<li><a href="/weaving" class="mobile-link block hover:text-maroon transition">Weaving</a></li>\n                <li><a href="/collections/silk-sarees" class="mobile-link block hover:text-maroon transition">Silk Sarees</a></li>'
    );
    fs.writeFileSync('index.html', indexHtml);
    console.log('Added Silk Sarees to index.html');
}
