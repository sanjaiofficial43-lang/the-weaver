const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
let indexHtml = fs.readFileSync('index.html', 'utf8');

function generateCard(p, badge = null) {
    const saleBadge = p.salePrice ? `<span class="absolute top-2 left-2 bg-maroon text-white text-xs font-medium px-2 py-1 z-20">Sale</span>` : '';
    const customBadge = badge ? `<span class="absolute top-2 left-2 bg-maroon text-white text-xs font-medium px-2 py-1 z-20">${badge}</span>` : saleBadge;
    
    const priceHtml = p.salePrice 
        ? `<span class="text-gray-400 line-through text-sm">Rs. ${p.price.toLocaleString('en-IN')}.00</span>
                            <span class="text-maroon font-medium">Rs. ${p.salePrice.toLocaleString('en-IN')}.00</span>`
        : `<span class="text-gray-900 font-medium">Rs. ${p.price.toLocaleString('en-IN')}.00</span>`;
        
    return `                <div class="product-card group cursor-pointer relative" onclick="if(event.target.tagName.toLowerCase() !== 'button') window.location.href='/product/${p.slug}'">
                    <div class="relative overflow-hidden h-[350px] md:h-[450px] mb-4">
                        ${customBadge}
                        <img src="${p.images[0]}" alt="${p.name}" class="product-img absolute inset-0 w-full h-full object-cover transition duration-700 opacity-100 group-hover:opacity-0 z-10" loading="lazy">
                        ${p.images[1] ? `<img src="${p.images[1]}" alt="Detail" class="product-img absolute inset-0 w-full h-full object-cover transition duration-700 opacity-0 group-hover:opacity-100" loading="lazy">` : ''}
                        <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center z-20">
                            <button class="bg-white text-gray-900 w-full py-3 uppercase text-xs font-semibold tracking-widest hover:bg-maroon hover:text-white transition">Add to Cart</button>
                        </div>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Saree</p>
                        <h3 class="text-base md:text-lg text-gray-900 mb-2 px-2 leading-snug"><a href="/product/${p.slug}" class="hover:text-maroon transition">${p.name}</a></h3>
                        <div class="flex justify-center items-center gap-3">
                            ${priceHtml}
                        </div>
                    </div>
                </div>`;
}

// 1. Populate New Arrivals (limit to 4)
const newArrivals = products.filter(p => p.category.includes('New Arrivals')).slice(-4).reverse();
const newArrivalsGridHtml = `<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">\n` + newArrivals.map(p => generateCard(p, 'New')).join('\n') + `\n            </div>`;

// 2. Populate Bestsellers
const bestsellers = products.filter(p => p.category.includes('Bestsellers'));
const bestsellersGridHtml = `<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">\n` + bestsellers.map(p => generateCard(p)).join('\n') + `\n            </div>`;

// Replace New Arrivals Grid
const newArrivalsRegex = /(<h2 class="text-4xl md:text-5xl font-medium serif-font mb-4 text-gray-900">New This Week<\/h2>[\s\S]*?<p class="text-gray-600 tracking-wide">Freshly off the loom — a curated edit of our newest handwoven sarees\.<\/p>\s*<\/div>\s*)<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">[\s\S]*?(<\/div>\s*<div class="mt-12 text-center">)/m;

indexHtml = indexHtml.replace(newArrivalsRegex, `$1${newArrivalsGridHtml}\n            $2`);

// Replace Customer Favourites Grid
const favouritesRegex = /(<h2 class="text-4xl md:text-5xl font-medium serif-font mb-4 text-gray-900">Customer Favourites<\/h2>[\s\S]*?<p class="text-gray-600 tracking-wide">The sarees our customers keep coming back for\.<\/p>\s*<\/div>\s*)<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/m;

indexHtml = indexHtml.replace(favouritesRegex, `$1${bestsellersGridHtml}\n            $2`);

fs.writeFileSync('index.html', indexHtml);
console.log('Done!');
