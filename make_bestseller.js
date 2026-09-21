const fs = require('fs');
const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Assuming the user meant the last added product
const lastProduct = products[products.length - 1];
if (!lastProduct.category.includes('Bestsellers')) {
    lastProduct.category.push('Bestsellers');
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    console.log(`Added Bestsellers tag to: ${lastProduct.name}`);
} else {
    console.log('Product already has Bestsellers tag.');
}
