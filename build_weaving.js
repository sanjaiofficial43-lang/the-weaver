const fs = require('fs');
const path = require('path');

const header = fs.readFileSync('header_template.html', 'utf8');
const footer = fs.readFileSync('footer_template.html', 'utf8');
const weavingContent = fs.readFileSync('weaving.html', 'utf8');

const title = 'The Art of Weaving | The Weavura';
let processedHeader = header.replace(/<title>.*<\/title>/, `<title>${title}</title>`);

// Fix relative paths for a sub-directory
processedHeader = processedHeader.replace(/href="([^"]+\\.css)"/g, (match, p1) => {
    if (p1.startsWith('http') || p1.startsWith('/')) return match;
    return 'href="/' + p1 + '"';
});

// Since the header template might have relative image links, let's make sure it handles them. (We have absolute / style links everywhere anyway)

const html = processedHeader + weavingContent + footer;

// Make directory
const dir = path.join(__dirname, 'weaving');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('Generated /weaving/index.html');
