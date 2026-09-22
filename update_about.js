const fs = require('fs');

let fileContent = fs.readFileSync('fix_static_pages.js', 'utf8');

const oldAbout = /\/\/ 1\. About[\s\S]*?\/\/\ 2\. Returns/;

const newAbout = `// 1. About
wrapPage('about.html', 'About Us | The Weavura', \`
    <div class="text-center mb-12">
        <h3 class="text-sm uppercase tracking-widest text-maroon mb-2 font-medium">The Weavura</h3>
        <h1 class="text-4xl md:text-5xl font-medium serif-font text-gray-900 mb-6 border-b pb-6 inline-block border-gray-200">Our Story</h1>
    </div>

    <div class="prose max-w-none font-light leading-relaxed text-gray-600 space-y-12">
        
        <!-- Introduction -->
        <section class="text-center max-w-3xl mx-auto">
            <p class="text-lg md:text-xl text-gray-800 italic serif-font">"Weaving the threads of tradition directly from our family looms in Madurai to your wardrobe."</p>
        </section>

        <!-- Madurai Connection & Origin -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
                <h2 class="text-2xl font-medium serif-font text-gray-900 mb-4">Our Roots in Madurai</h2>
                <p class="mb-4">The Weavura is deeply rooted in the historic city of Madurai, Tamil Nadu — a region renowned for its vibrant culture, majestic temples, and centuries-old handloom weaving traditions.</p>
                <p>Born out of a desire to preserve our family's heritage, our business bridges the gap between the traditional weaver and the modern saree connoisseur. By operating directly from our looms in Sakkimangalam, Madurai, we ensure there are absolutely no middlemen.</p>
            </div>
            <div>
                <img src="/saree-craft.jpg" alt="Madurai Weaving Heritage" class="w-full h-auto object-cover rounded-sm shadow-sm" loading="lazy">
            </div>
        </section>

        <!-- What We Sell & The Craft -->
        <section class="bg-gray-50 p-8 md:p-10 rounded-sm border border-gray-100">
            <h2 class="text-2xl font-medium serif-font text-gray-900 mb-4 text-center">100% Pure Handloom Sarees</h2>
            <p class="text-center mb-8 max-w-2xl mx-auto">We specialize in authentic handwoven sarees. Every piece in our collection is crafted with immense patience, requiring thousands of precise hand movements on traditional wooden looms.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 text-center">
                <div class="bg-white p-6 shadow-sm border border-gray-100">
                    <h3 class="text-xl serif-font text-maroon mb-2">Pure Cotton Sarees</h3>
                    <p class="text-sm mb-4">Breathable, comfortable, and perfect for everyday elegance. Our cotton sarees feature classic checks, temple borders, and traditional motifs.</p>
                    <a href="/collections/handloom-cotton-sarees" class="text-xs uppercase tracking-widest text-maroon hover:underline font-medium border-b border-maroon pb-1">Shop Cotton</a>
                </div>
                <div class="bg-white p-6 shadow-sm border border-gray-100">
                    <h3 class="text-xl serif-font text-maroon mb-2">Silk Sarees</h3>
                    <p class="text-sm mb-4">Luxurious and radiant. Handwoven with the finest silk threads, featuring rich zari work for your most special occasions.</p>
                    <a href="/collections/silk-sarees" class="text-xs uppercase tracking-widest text-maroon hover:underline font-medium border-b border-maroon pb-1">Shop Silk</a>
                </div>
            </div>
        </section>

        <!-- Weaver Story -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div class="order-2 md:order-1">
                <img src="/promise-loom.jpg" alt="Traditional Handloom" class="w-full h-[300px] object-cover rounded-sm shadow-sm" loading="lazy">
            </div>
            <div class="order-1 md:order-2">
                <h2 class="text-2xl font-medium serif-font text-gray-900 mb-4">The Hands Behind the Craft</h2>
                <p class="mb-4">Our weavers are the heart and soul of The Weavura. Passed down through generations, their craft is a labor of love.</p>
                <p class="mb-6">From spinning the yarn to weaving intricate peacock and chariot borders, they imbue every six yards with stories of our heritage. We guarantee fair compensation and ethical working conditions for our family of artisans.</p>
                <a href="/weaving" class="inline-block border border-gray-900 text-gray-900 px-6 py-3 uppercase text-xs tracking-widest hover:bg-gray-900 hover:text-white transition">Watch Our Process</a>
            </div>
        </section>

        <!-- Contact & Business Info -->
        <section class="border-t border-gray-200 pt-10 mt-12 text-center">
            <h2 class="text-2xl font-medium serif-font text-gray-900 mb-6">Visit Us</h2>
            <div class="flex flex-col md:flex-row justify-center gap-10 text-sm">
                <div>
                    <i class="fas fa-map-marker-alt text-maroon text-xl mb-3 block"></i>
                    <p class="font-medium text-gray-900">The Weavura Store</p>
                    <p>1/211, Meenakshi Nagar 2nd Colony<br>Karseri Road, Sakkimangalam<br>Madurai, Tamil Nadu 625201</p>
                    <a href="/store" class="text-maroon hover:underline mt-2 inline-block">View Store Details</a>
                </div>
                <div>
                    <i class="fas fa-envelope text-maroon text-xl mb-3 block"></i>
                    <p class="font-medium text-gray-900">Contact</p>
                    <p>WhatsApp / Call: <br>+91 99400 59009</p>
                    <p>Email: <br>weavura@gmail.com</p>
                </div>
            </div>
        </section>

    </div>
\`);

// 2. Returns`;

fileContent = fileContent.replace(oldAbout, newAbout);

fs.writeFileSync('fix_static_pages.js', fileContent);
console.log('About page script updated!');
