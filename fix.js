const fs = require('fs');
let code = fs.readFileSync('build.js', 'utf8');

code = code.replace("let processedHeader = header.replace(/href=\\"([^\\"]+\\\\.css)\\"/g, 'href=\\"/$1\\"');",
    "let processedHeader = header.replace(/href=\\"([^\\"]+\\\\.css)\\"/g, (match, p1) => (p1.startsWith('http') || p1.startsWith('/')) ? match : 'href=\\"/' + p1 + '\\"');");

code = code.replace("processedHeader = processedHeader.replace(/src=\\"([^\\"]+\\\\.js)\\"/g, 'src=\\"/$1\\"');",
    "processedHeader = processedHeader.replace(/src=\\"([^\\"]+\\\\.js)\\"/g, (match, p1) => (p1.startsWith('http') || p1.startsWith('/')) ? match : 'src=\\"/' + p1 + '\\"');");

fs.writeFileSync('build.js', code);
