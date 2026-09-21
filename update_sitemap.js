const fs = require('fs');

let sitemap = fs.readFileSync('sitemap.xml', 'utf8');

if (!sitemap.includes('https://www.theweavura.in/weaving')) {
    sitemap = sitemap.replace(
        '<url>\n    <loc>https://www.theweavura.in/about</loc>',
        '<url>\n    <loc>https://www.theweavura.in/weaving</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n  <url>\n    <loc>https://www.theweavura.in/about</loc>'
    );
    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('Added /weaving to sitemap');
} else {
    console.log('Already in sitemap');
}
