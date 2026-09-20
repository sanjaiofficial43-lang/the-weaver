const fs = require('fs');

let buildJs = fs.readFileSync('build.js', 'utf8');

// The original lines might still be there. Let's just do a clean string replacement.
buildJs = buildJs.replace(/let processedHeader = header\.replace\(\/href="([^"]+\\\\.css)"\/g, 'href="\/\\$1"'\);/g, `
    let processedHeader = header.replace(/href="([^"]+\\.css)"/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('/')) return match;
        return 'href="/' + p1 + '"';
    });
`);

buildJs = buildJs.replace(/processedHeader = processedHeader\.replace\(\/src="([^"]+\\\\.js)"\/g, 'src="\/\\$1"'\);/g, `
    processedHeader = processedHeader.replace(/src="([^"]+\\.js)"/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('/')) return match;
        return 'src="/' + p1 + '"';
    });
`);

fs.writeFileSync('build.js', buildJs);
