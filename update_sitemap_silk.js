const fs = require('fs');

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

if (!sitemap.includes('https://www.theweavura.in/collections/silk-sarees')) {
    sitemap = sitemap.replace(
        '<url>\n    <loc>https://www.theweavura.in/weaving</loc>',
        '<url>\n    <loc>https://www.theweavura.in/collections/silk-sarees</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n  <url>\n    <loc>https://www.theweavura.in/weaving</loc>'
    );
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('Added /collections/silk-sarees to sitemap');
} else {
    console.log('Already in sitemap');
}
