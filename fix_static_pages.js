const fs = require('fs');

const header = fs.readFileSync('header_template.html', 'utf8');
const footer = fs.readFileSync('footer_template.html', 'utf8');

function wrapPage(filename, title, content) {
    let processedHeader = header.replace(/<title>.*<\/title>/, `<title>${title}</title>`);
    
    // Quick fix for css paths
    processedHeader = processedHeader.replace(/href="([^"]+\\.css)"/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('/')) return match;
        return 'href="/' + p1 + '"';
    });

    const body = `
    <div class="bg-gray-50 py-12 min-h-screen">
        <div class="container mx-auto px-6 max-w-4xl bg-white p-8 md:p-12 shadow-sm rounded-sm">
            ${content}
        </div>
    </div>
    `;

    fs.writeFileSync(filename, processedHeader + body + footer);
}

// 1. About
wrapPage('about.html', 'About Us | The Weavura', `
    <h1 class="text-4xl md:text-5xl font-medium serif-font text-gray-900 mb-8 border-b pb-6">Our Story</h1>
    <p class="mb-6 font-light leading-relaxed text-gray-600">The Weavura is a family handloom business based in Madurai, Tamil Nadu. Our pure handloom cotton sarees come straight from our weavers' looms, with no middlemen.</p>
    <p class="mb-6 font-light leading-relaxed text-gray-600">Our promise is pure craft, authentic weaves, and absolute transparency in every thread we sell.</p>
`);

// 2. Returns
wrapPage('returns-and-exchanges.html', 'Returns & Exchanges | The Weavura', `
    <h1 class="text-4xl md:text-5xl font-medium serif-font text-gray-900 mb-8 border-b pb-6">Returns & Exchanges</h1>
    <p class="mb-6 font-light leading-relaxed text-gray-600">Every Weavura saree is handwoven on our family's loom in Madurai, and we want you to love yours.</p>
    <h3 class="text-xl font-medium mb-3">Exchanges:</h3>
    <p class="mb-6 font-light leading-relaxed text-gray-600">You can request an exchange within 7 days of delivery, or within 7 days of purchase if you bought in our store. The saree must be unused and unwashed, with its tags intact. We don't offer refunds.</p>
    <h3 class="text-xl font-medium mb-3">In-store exchanges:</h3>
    <p class="mb-6 font-light leading-relaxed text-gray-600">You can exchange at our Madurai store during opening hours (Monday–Saturday, 10am–6pm). Please bring your bill or order number.</p>
    <h3 class="text-xl font-medium mb-3">Damaged or wrong item:</h3>
    <p class="mb-6 font-light leading-relaxed text-gray-600">Please record an unboxing video when you open your parcel. If your saree arrives damaged or isn't what you ordered, send the video to us on WhatsApp (+91 99400 59009) or at weavura@gmail.com within 48 hours of delivery. We'll replace it at no cost.</p>
`);

// 3. Store
wrapPage('store.html', 'Visit Our Store | The Weavura', `
    <h1 class="text-4xl md:text-5xl font-medium serif-font text-gray-900 mb-8 border-b pb-6">Visit Our Store in Madurai</h1>
    <div class="flex flex-col gap-6">
        <p class="font-light leading-relaxed text-gray-600">Experience the texture and beauty of pure handloom cotton sarees in person at our Madurai store.</p>
        <div class="bg-gray-50 p-6 rounded">
            <h3 class="text-lg font-medium mb-4"><i class="fas fa-map-marker-alt text-maroon mr-2"></i> Location</h3>
            <p class="font-light text-gray-700">1/211, Meenakshi Nagar 2nd Colony<br>Karseri Road, Sakkimangalam<br>Madurai, Tamil Nadu 625201, India</p>
        </div>
        <div class="bg-gray-50 p-6 rounded">
            <h3 class="text-lg font-medium mb-4"><i class="far fa-clock text-maroon mr-2"></i> Hours</h3>
            <p class="font-light text-gray-700">Monday–Saturday: 10:00am–6:00pm IST<br>Sunday: Closed</p>
        </div>
        <div class="bg-gray-50 p-6 rounded">
            <h3 class="text-lg font-medium mb-4"><i class="fas fa-phone-alt text-maroon mr-2"></i> Contact</h3>
            <p class="font-light text-gray-700">WhatsApp / Phone: +91 99400 59009</p>
        </div>
    </div>
`);

// 4. 404
wrapPage('404.html', 'Page Not Found | The Weavura', `
    <div class="text-center py-10">
        <h1 class="text-4xl md:text-5xl font-medium serif-font text-maroon mb-6">404 NOT FOUND</h1>
        <p class="mb-10 font-light leading-relaxed text-gray-600 text-lg">This page doesn't exist. It may have been moved, removed, or never existed.</p>
        <div class="flex justify-center gap-6">
            <a href="/" class="bg-maroon text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-gray-900 transition">Go to Home</a>
        </div>
    </div>
`);

console.log("Static pages generated!");
