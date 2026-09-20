const fs = require('fs');
let index = fs.readFileSync('index.html', 'utf8');

index = index.replace(/href="collections\.html"/g, 'href="/collections/handloom-cotton-sarees"');
index = index.replace(/href="about\.html"/g, 'href="/about"');

// Fix footer in index.html too so it matches footer_template
index = index.replace('href="#all-sarees"', 'href="/collections/handloom-cotton-sarees"');
index = index.replace('href="javascript:void(0)" class="hover:text-maroon transition">New Arrivals', 'href="/collections/new-arrivals" class="hover:text-maroon transition">New Arrivals');
index = index.replace('href="javascript:void(0)" class="hover:text-maroon transition">Bestsellers', 'href="/collections/bestsellers" class="hover:text-maroon transition">Bestsellers');
index = index.replace('href="javascript:void(0)" class="hover:text-maroon transition">Returns & Exchanges', 'href="/returns-and-exchanges" class="hover:text-maroon transition">Returns & Exchanges');
index = index.replace('<li><a href="javascript:void(0)" class="hover:text-maroon transition">Premium Collection</a></li>', '<!-- <li><a href="javascript:void(0)" class="hover:text-maroon transition">Premium Collection</a></li> -->');
index = index.replace('<li><a href="javascript:void(0)" class="hover:text-maroon transition">Track Your Order</a></li>', '<!-- <li><a href="javascript:void(0)" class="hover:text-maroon transition">Track Your Order</a></li> -->');
index = index.replace('<li><a href="javascript:void(0)" class="hover:text-maroon transition">Customer Support</a></li>', '<!-- <li><a href="javascript:void(0)" class="hover:text-maroon transition">Customer Support</a></li> -->');
index = index.replace('<li><a href="javascript:void(0)" class="hover:text-maroon transition">Shipping Policy</a></li>', '<!-- <li><a href="javascript:void(0)" class="hover:text-maroon transition">Shipping Policy</a></li> -->');
index = index.replace('<a href="javascript:void(0)" class="hover:text-gray-600">Privacy Policy</a>', '<!-- <a href="javascript:void(0)" class="hover:text-gray-600">Privacy Policy</a> -->');
index = index.replace('<a href="javascript:void(0)" class="hover:text-gray-600">Terms of Service</a>', '<!-- <a href="javascript:void(0)" class="hover:text-gray-600">Terms of Service</a> -->');

fs.writeFileSync('index.html', index);
console.log('Index links fixed!');
