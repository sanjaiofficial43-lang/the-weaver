const fs = require('fs');

let buildJs = fs.readFileSync('build.js', 'utf8');

// The original line:
// <h1 class="text-4xl md:text-5xl font-medium serif-font text-gray-900 mb-4">${product.name}</h1>
// Let's add the hidden elements immediately after the h1.

buildJs = buildJs.replace('<h1 class="text-4xl md:text-5xl font-medium serif-font text-gray-900 mb-4">${product.name}</h1>', `
<h1 class="text-4xl md:text-5xl font-medium serif-font text-gray-900 mb-4">\${product.name}</h1>
<h3 class="hidden">\${product.name}</h3>
<div class="flex justify-center hidden"><span>Rs. \${product.salePrice ? product.salePrice : product.price}.00</span></div>
<img src="/\${product.images[0]}" class="product-img hidden" alt="">
`);

fs.writeFileSync('build.js', buildJs);
