const fs = require('fs');

let buildJs = fs.readFileSync('build.js', 'utf8');

// Fix the regex replacement for css and js links
buildJs = buildJs.replace(
    "/href=\\\"([^\\\"]+\\\\.css)\\\"/g, 'href=\\\"/$1\\\"'",
    "/href=\\\"([^\\\"h]+\\\\.css)\\\"/g, 'href=\\\"/$1\\\"'"
);
// Actually, let's just use a better regex or rewrite that part of build.js completely.
