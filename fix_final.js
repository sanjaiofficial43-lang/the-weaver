const fs = require('fs');

let buildJs = fs.readFileSync('build.js', 'utf8');

// Just remove these lines
buildJs = buildJs.replace(/let processedHeader = header\.replace\(\/href="\(\[\^"\]\+\\\.css\)"\/g, 'href="\/\\$1"'\);/, '');
buildJs = buildJs.replace(/processedHeader = processedHeader\.replace\(\/src="\(\[\^"\]\+\\\.js\)"\/g, 'src="\/\\$1"'\);/, '');

// Actually let's just do a string replace of the exact lines using a very simple regex
buildJs = buildJs.replace(/let processedHeader = [^\n]+;/g, '');
buildJs = buildJs.replace(/processedHeader = [^\n]+;/g, '');
buildJs = buildJs.replace(/processedHeader/g, 'header');

fs.writeFileSync('build.js', buildJs);
