const fs = require('fs');

let buildJs = fs.readFileSync('build.js', 'utf8');

// The original lines:
// let processedHeader = header.replace(/href="([^"]+\.css)"/g, 'href="/$1"');
// processedHeader = processedHeader.replace(/src="([^"]+\.js)"/g, 'src="/$1"');

// Replace them with a function that checks for http
buildJs = buildJs.replace(/let processedHeader = header\.replace\(\/href="\(\[\^"\]\+\\\\.css\)"\/g, 'href="\/\\$1"'\);/, `
    let processedHeader = header.replace(/href="([^"]+\\.css)"/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('/')) return match;
        return 'href="/' + p1 + '"';
    });
`);

buildJs = buildJs.replace(/processedHeader = processedHeader\.replace\(\/src="\(\[\^"\]\+\\\\.js\)"\/g, 'src="\/\\$1"'\);/, `
    processedHeader = processedHeader.replace(/src="([^"]+\\.js)"/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('/')) return match;
        return 'src="/' + p1 + '"';
    });
`);

fs.writeFileSync('build.js', buildJs);
