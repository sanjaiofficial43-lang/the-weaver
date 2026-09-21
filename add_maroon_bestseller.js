const fs = require('fs');
const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

let found = false;
for (let p of products) {
    if (p.name === 'Deep Maroon Handloom Cotton Saree with Thread Border') {
        if (!p.category.includes('Bestsellers')) {
            p.category.push('Bestsellers');
            console.log(`Added Bestsellers tag to: ${p.name}`);
        } else {
            console.log('Product already has Bestsellers tag.');
        }
        found = true;
        break;
    }
}

if (!found) {
    console.log('Product not found!');
} else {
    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
}
