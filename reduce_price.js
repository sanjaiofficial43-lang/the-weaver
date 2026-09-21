const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

products.forEach(p => {
    // Exclude the pink colour saree
    if (p.slug === 'pink-handloom-cotton-saree-chariot-border' || p.colour === 'Pink') {
        console.log(`Skipping: ${p.name}`);
        return;
    }
    
    // Reduce 500
    if (p.salePrice !== null) {
        console.log(`Reducing ${p.name} salePrice from ${p.salePrice} to ${p.salePrice - 500}`);
        p.salePrice -= 500;
    } else {
        console.log(`Reducing ${p.name} price from ${p.price} to ${p.price - 500}`);
        p.price -= 500;
    }
});

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
