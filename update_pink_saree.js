const fs = require('fs');

let products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

for (let p of products) {
    if (p.name.includes('Pink Handloom Cotton Saree with Chariot Border')) {
        // Change categories
        p.category = p.category.filter(c => c !== 'Cotton Sarees');
        if (!p.category.includes('Silk Sarees')) {
            p.category.push('Silk Sarees');
        }
        
        // Update fabric
        p.fabric = 'Silk';
        
        // Update name (and optionally description)
        p.name = p.name.replace('Cotton', 'Silk');
        p.description = p.description.replace(/cotton/gi, 'silk');
        
        // We will keep the original slug to prevent breaking external links, or we could change it.
        // Let's change the slug and we'll clean up the old directory.
        const oldSlug = p.slug;
        p.slug = p.slug.replace('cotton', 'silk');
        
        console.log(`Updated to: ${p.name}`);
        console.log(`Old slug: ${oldSlug}, New slug: ${p.slug}`);
        
        // Let's write the old slug out to a temp file so we can delete its folder
        fs.writeFileSync('old_slug.txt', oldSlug);
    }
}

fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
