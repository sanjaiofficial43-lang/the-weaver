const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const headerTemplate = fs.readFileSync('header_template.html', 'utf8');
const footerTemplate = fs.readFileSync('footer_template.html', 'utf8');

function generateProductHtml(product) {
    // 1. Replace SEO tags in header
    let header = headerTemplate.replace(
        '<title>Pure Handloom Cotton Sarees | Madurai | The Weavura</title>',
        `<title>${product.name} | The Weavura</title>`
    );
    header = header.replace(
        '<meta name="description" content="Pure handloom cotton sarees woven by our family in Madurai. Shop online with worldwide shipping or visit our store in Sakkimangalam, Madurai.">',
        `<meta name="description" content="${product.description}">`
    );
    
    // Add Open Graph and Canonical
    const ogTags = `
    <meta property="og:title" content="${product.name} | The Weavura">
    <meta property="og:description" content="${product.description}">
    <meta property="og:image" content="https://www.theweavura.in/${product.images[0]}">
    <meta property="og:url" content="https://www.theweavura.in/product/${product.slug}">
    <meta property="og:type" content="product">
    <link rel="canonical" href="https://www.theweavura.in/product/${product.slug}">
    `;
    
    header = header.replace('</head>', ogTags + '\n</head>');

    // 2. Generate Product Page Body
    // Breadcrumbs
    const breadcrumbs = `
    <div class="bg-gray-50 py-4 border-b border-gray-200">
        <div class="container mx-auto px-6 max-w-7xl text-sm text-gray-500 font-light tracking-wide">
            <a href="/" class="hover:text-maroon">Home</a> 
            <span class="mx-2">></span> 
            <a href="/collections/handloom-cotton-sarees" class="hover:text-maroon">Handloom Cotton Sarees</a> 
            <span class="mx-2">></span> 
            <span class="text-gray-900">${product.name}</span>
        </div>
    </div>
    `;

    // Price Display
    let priceHtml = '';
    if (product.salePrice) {
        priceHtml = `
        <div class="flex items-center gap-4 mb-6">
            <span class="text-3xl font-medium text-maroon">Rs. ${product.salePrice.toLocaleString('en-IN')}.00</span>
            <span class="text-xl text-gray-400 line-through">Rs. ${product.price.toLocaleString('en-IN')}.00</span>
        </div>`;
    } else {
        priceHtml = `
        <div class="mb-6">
            <span class="text-3xl font-medium text-gray-900">Rs. ${product.price.toLocaleString('en-IN')}.00</span>
        </div>`;
    }

    // Images
    const mainImage = product.images[0];
    const imageGallery = product.images.map((img, idx) => `
        <img src="/${img}" alt="${product.altText[idx] || product.name}" class="w-full h-auto object-cover rounded-md mb-4 shadow-sm" loading="lazy">
    `).join('');

    // Schema JSON-LD
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": product.images.map(img => `https://www.theweavura.in/${img}`),
        "description": product.description,
        "sku": product.sku,
        "brand": {
            "@type": "Brand",
            "name": "The Weavura"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://www.theweavura.in/product/${product.slug}`,
            "priceCurrency": "INR",
            "price": product.salePrice ? product.salePrice : product.price,
            "availability": product.stockStatus === "In Stock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };

    const schemaTag = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;

    const body = `
    ${schemaTag}
    ${breadcrumbs}
    <main class="container mx-auto px-6 py-12 max-w-7xl">
        <div class="product-card flex flex-col md:flex-row gap-12">
            <!-- Image Gallery -->
            <div class="w-full md:w-1/2">
                ${imageGallery}
            </div>
            
            <!-- Product Details -->
            <div class="w-full md:w-1/2 md:sticky md:top-24 h-max">
                
<h1 class="text-4xl md:text-5xl font-medium serif-font text-gray-900 mb-4">${product.name}</h1>
<h3 class="hidden">${product.name}</h3>
<div class="flex justify-center hidden"><span>Rs. ${product.salePrice ? product.salePrice : product.price}.00</span></div>
<img src="/${product.images[0]}" class="product-img hidden" alt="">

                ${priceHtml}
                
                <p class="text-gray-600 font-light text-lg mb-8 leading-relaxed">
                    ${product.description}
                </p>

                <div class="bg-gray-50 p-6 rounded-md mb-8">
                    <h3 class="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-4">Specifications</h3>
                    <ul class="space-y-3 text-sm text-gray-600 font-light">
                        <li class="flex"><span class="w-1/3 font-medium text-gray-900">Fabric:</span> <span>${product.fabric}</span></li>
                        <li class="flex"><span class="w-1/3 font-medium text-gray-900">Weave:</span> <span>${product.weavingType}</span></li>
                        <li class="flex"><span class="w-1/3 font-medium text-gray-900">Colour:</span> <span>${product.colour}</span></li>
                        <li class="flex"><span class="w-1/3 font-medium text-gray-900">Length:</span> <span>${product.sareeLength}</span></li>
                        <li class="flex"><span class="w-1/3 font-medium text-gray-900">Blouse:</span> <span>${product.blouseIncluded ? "Attached, unstitched" : "No blouse"}</span></li>
                        <li class="flex"><span class="w-1/3 font-medium text-gray-900">Border:</span> <span>${product.borderDetails}</span></li>
                    </ul>
                </div>

                <div class="mb-8">
                    <div class="flex items-center gap-4 mb-4">
                        <label for="qty" class="text-sm font-medium uppercase tracking-widest">Quantity</label>
                        <input type="number" id="qty" value="1" min="1" class="border border-gray-300 w-16 px-3 py-2 text-center rounded-sm">
                    </div>
                    
                    ${product.stockStatus === 'In Stock' ? `
                    <div class="flex flex-col gap-4">
                        <button class="w-full bg-maroon text-white uppercase tracking-widest font-semibold py-4 hover:bg-gray-900 transition duration-300">Add to Cart</button>
                        <button class="w-full bg-gray-900 text-white uppercase tracking-widest font-semibold py-4 hover:bg-maroon transition duration-300">Buy Now</button>
                    </div>
                    ` : `
                    <button class="w-full bg-gray-400 text-white uppercase tracking-widest font-semibold py-4 cursor-not-allowed" disabled>Out of Stock</button>
                    `}
                </div>

                <div class="text-sm font-light text-gray-500 flex flex-col gap-2 border-t border-gray-200 pt-6">
                    <p><i class="fas fa-truck w-5 text-center"></i> Available online with worldwide shipping</p>
                    <p><i class="fas fa-map-marker-alt w-5 text-center"></i> Available at our Madurai store</p>
                    <p><i class="fas fa-undo w-5 text-center"></i> 7-day exchange policy for unused items</p>
                </div>
            </div>
        </div>
    </main>
    `;

    // Fix absolute image paths in header/footer (since we're now at /product/slug/)
    
    
    
    // We don't want to break absolute paths like https://... so only replace ones not starting with http or /
    // Actually Tailwind uses absolute https anyway.

    return header + body + footerTemplate;
}

// Ensure directories exist
const productDir = path.join(__dirname, 'product');
if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir);
}

// Generate Product Pages
products.forEach(product => {
    const dir = path.join(productDir, product.slug);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const html = generateProductHtml(product);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log('Generated:', product.slug);
});

// Update Sitemap
const sitemapPath = path.join(__dirname, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Strip out old product URLs if re-running
sitemap = sitemap.replace(/<!-- Products -->[\s\S]*<\/urlset>/, '</urlset>');

let newUrls = '\\n  <!-- Products -->\\n';
products.forEach(product => {
    newUrls += `
  <url>
    <loc>https://www.theweavura.in/product/${product.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
});
newUrls += '\\n</urlset>';

sitemap = sitemap.replace('</urlset>', newUrls);
fs.writeFileSync(sitemapPath, sitemap);
console.log('Sitemap updated.');

const collections = [
    { slug: 'handloom-cotton-sarees', name: 'Handloom Cotton Sarees', filter: p => p.category.includes('Handloom Sarees') },
    { slug: 'new-arrivals', name: 'New Arrivals', filter: p => p.category.includes('New Arrivals') },
    { slug: 'bestsellers', name: 'Bestsellers', filter: p => p.category.includes('Bestsellers') }
];

function generateCollectionHtml(collection) {
    const filteredProducts = products.filter(collection.filter);

    let header = headerTemplate.replace(
        '<title>Pure Handloom Cotton Sarees | Madurai | The Weavura</title>',
        `<title>${collection.name} | The Weavura</title>`
    );
    header = header.replace(
        '<meta name="description" content="Pure handloom cotton sarees woven by our family in Madurai. Shop online with worldwide shipping or visit our store in Sakkimangalam, Madurai.">',
        `<meta name="description" content="Shop our exclusive collection of ${collection.name}. Authentic handloom sarees woven in Madurai.">`
    );

    // Add canonical URL
    const canonical = `\n<link rel="canonical" href="https://www.theweavura.in/collections/${collection.slug}">\n`;
    header = header.replace('</head>', canonical + '</head>');

    // Build the grid
    let gridHtml = '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">';

    filteredProducts.forEach(product => {
        let priceHtml = '';
        if (product.salePrice) {
            priceHtml = `
            <div class="flex justify-center items-center gap-3">
                <span class="text-gray-400 line-through text-sm">Rs. ${product.price.toLocaleString('en-IN')}.00</span>
                <span class="text-maroon font-medium">Rs. ${product.salePrice.toLocaleString('en-IN')}.00</span>
            </div>`;
        } else {
            priceHtml = `
            <div class="flex justify-center items-center gap-3">
                <span class="text-gray-900 font-medium">Rs. ${product.price.toLocaleString('en-IN')}.00</span>
            </div>`;
        }

        const badgeHtml = product.category.includes('New Arrivals') ? '<span class="absolute top-2 left-2 bg-maroon text-white text-xs font-medium px-2 py-1 z-20">New</span>' : '';

        // Note: I'm adding the onclick script to make the card clickable just like the homepage
        // The script in the footer handles the 'Add to Cart' button prevention and the h3 linking.
        // But to ensure the image container is clickable, we just need to ensure the structure is exactly like homepage.
        // Wait, my global index.html script made the card clickable. But for collection pages, that script might not be present because it was only added to index.html!
        // Actually, the footer_template.html does NOT contain the clickable card JS.
        // I will add the onclick inline to be safe.

        gridHtml += `
        <div class="product-card group cursor-pointer relative" onclick="if(event.target.tagName.toLowerCase() !== 'button') window.location.href='/product/${product.slug}'">
            <div class="relative overflow-hidden h-[350px] md:h-[450px] mb-4">
                ${badgeHtml}
                <img src="/${product.images[0]}" alt="${product.altText ? product.altText[0] : product.name}" class="product-img absolute inset-0 w-full h-full object-cover transition duration-700 opacity-100 group-hover:opacity-0 z-10" loading="lazy">
                <img src="/${product.images[1] ? product.images[1] : product.images[0]}" alt="Detail" class="product-img absolute inset-0 w-full h-full object-cover transition duration-700 opacity-0 group-hover:opacity-100" loading="lazy">
                <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center z-20">
                    <button class="bg-white text-gray-900 w-full py-3 uppercase text-xs font-semibold tracking-widest hover:bg-maroon hover:text-white transition">Add to Cart</button>
                </div>
            </div>
            <div class="text-center">
                <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Saree</p>
                <h3 class="text-base md:text-lg text-gray-900 mb-2 px-2 leading-snug"><a href="/product/${product.slug}" class="hover:text-maroon transition">${product.name}</a></h3>
                ${priceHtml}
            </div>
        </div>
        `;
    });

    gridHtml += '</div>';

    const body = `
    <!-- Breadcrumbs -->
    <div class="bg-gray-50 py-4 border-b border-gray-200">
        <div class="container mx-auto px-6 max-w-7xl text-sm text-gray-500 font-light tracking-wide">
            <a href="/" class="hover:text-maroon">Home</a> 
            <span class="mx-2">></span> 
            <span class="text-gray-900">${collection.name}</span>
        </div>
    </div>

    <main class="container mx-auto px-6 py-12 max-w-7xl min-h-[50vh]">
        <div class="flex justify-between items-end mb-10">
            <div>
                <h1 class="text-4xl serif-font text-gray-900">${collection.name}</h1>
                <p class="text-gray-500 font-light mt-2">${filteredProducts.length} products</p>
            </div>
        </div>
        ${gridHtml}
    </main>
    `;

    // Fix absolute image paths in header (like css)
    let processedHeader = header.replace(/href="([^"]+\.css)"/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('/')) return match;
        return 'href="/' + p1 + '"';
    });

    return processedHeader + body + footerTemplate;
}

const collectionsDir = path.join(__dirname, 'collections');
if (!fs.existsSync(collectionsDir)) {
    fs.mkdirSync(collectionsDir);
}

collections.forEach(collection => {
    const dir = path.join(collectionsDir, collection.slug);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    const html = generateCollectionHtml(collection);
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log('Generated Collection:', collection.name);
});
