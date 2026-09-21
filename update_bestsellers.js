const fs = require('fs');
const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

for (let p of products) {
    if (p.name === 'Plum & Teal Handloom Cotton Saree with Peacock Pallu') {
        const index = p.category.indexOf('Bestsellers');
        if (index > -1) {
            p.category.splice(index, 1);
            console.log(`Removed Bestsellers tag from: ${p.name}`);
        }
    }
    
    if (p.name === 'Magenta Handloom Cotton Saree with Peacock Motif') {
        if (!p.category.includes('Bestsellers')) {
            p.category.push('Bestsellers');
            console.log(`Added Bestsellers tag to: ${p.name}`);
        }
    }
}

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
