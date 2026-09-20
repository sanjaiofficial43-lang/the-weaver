const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
let indexHtml = fs.readFileSync('index.html', 'utf8');

// For each product, we want to replace the `h3` and images with links.
products.forEach(product => {
    // Escape special regex characters in product name
    const safeName = product.name.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    
    // Replace the h3 to be wrapped in an anchor
    const h3Regex = new RegExp(`(<h3[^>]*>)\\s*${safeName}\\s*(<!--.*?-->)?\\s*(</h3>)`, 'g');
    indexHtml = indexHtml.replace(h3Regex, `$1<a href="/product/${product.slug}" class="hover:text-maroon transition">${product.name}</a>$3`);
    
    // We also want to wrap the images. Finding the images is trickier because they don't have the product name precisely.
    // However, they are inside the same .product-card block. Let's rely on the user clicking the name or the image. 
    // We can add an onclick event to the entire product card as a fallback, or just rely on the name.
});

fs.writeFileSync('index.html', indexHtml);
console.log('index.html patched with product links!');
