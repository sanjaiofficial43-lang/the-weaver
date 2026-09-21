const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

const newCardHtml = `                <!-- Product 13 (New) -->
                <div class="product-card group cursor-pointer relative" onclick="if(event.target.tagName.toLowerCase() !== 'button') window.location.href='/product/plum-teal-checked-handloom-cotton-saree'">
                    <div class="relative overflow-hidden h-[350px] md:h-[450px] mb-4">
                        <span class="absolute top-2 left-2 bg-maroon text-white text-xs font-medium px-2 py-1 z-20">New</span>
                        <img src="saree-plum-teal-1.jpg" alt="Plum & Teal Checked Saree" class="product-img absolute inset-0 w-full h-full object-cover transition duration-700 opacity-100 group-hover:opacity-0 z-10" loading="lazy">
                        <img src="saree-plum-teal-2.jpg" alt="Saree Detail" class="product-img absolute inset-0 w-full h-full object-cover transition duration-700 opacity-0 group-hover:opacity-100" loading="lazy">
                        <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center z-20">
                            <button class="bg-white text-gray-900 w-full py-3 uppercase text-xs font-semibold tracking-widest hover:bg-maroon hover:text-white transition">Add to Cart</button>
                        </div>
                    </div>
                    <div class="text-center">
                        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Saree</p>
                        <h3 class="text-base md:text-lg text-gray-900 mb-2 px-2 leading-snug"><a href="/product/plum-teal-checked-handloom-cotton-saree" class="hover:text-maroon transition">Plum & Teal Handloom Cotton Saree with Peacock Pallu</a></h3>
                        <div class="flex justify-center items-center gap-3">
                            <span class="text-gray-900 font-medium">Rs. 1,600.00</span>
                        </div>
                    </div>
                </div>

`;

const gridStartMarker = '<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">';
const parts = indexHtml.split(gridStartMarker);
if (parts.length > 1) {
    indexHtml = parts[0] + gridStartMarker + '\n' + newCardHtml + parts[1];
    fs.writeFileSync('index.html', indexHtml);
    console.log('Added plum saree to index.html grid!');
} else {
    console.log('Could not find grid start marker.');
}
