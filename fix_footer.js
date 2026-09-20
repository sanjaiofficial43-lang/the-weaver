const fs = require('fs');

let footer = fs.readFileSync('footer_template.html', 'utf8');

footer = footer.replace('href="#all-sarees"', 'href="/collections/handloom-cotton-sarees"');
footer = footer.replace('href="javascript:void(0)" class="hover:text-maroon transition">New Arrivals', 'href="/collections/new-arrivals" class="hover:text-maroon transition">New Arrivals');
footer = footer.replace('href="javascript:void(0)" class="hover:text-maroon transition">Bestsellers', 'href="/collections/bestsellers" class="hover:text-maroon transition">Bestsellers');
footer = footer.replace('href="javascript:void(0)" class="hover:text-maroon transition">Returns & Exchanges', 'href="/returns-and-exchanges" class="hover:text-maroon transition">Returns & Exchanges');

// Hide the ones we don't have pages for yet
footer = footer.replace('<li><a href="javascript:void(0)" class="hover:text-maroon transition">Premium Collection</a></li>', '<!-- <li><a href="javascript:void(0)" class="hover:text-maroon transition">Premium Collection</a></li> -->');
footer = footer.replace('<li><a href="javascript:void(0)" class="hover:text-maroon transition">Track Your Order</a></li>', '<!-- <li><a href="javascript:void(0)" class="hover:text-maroon transition">Track Your Order</a></li> -->');
footer = footer.replace('<li><a href="javascript:void(0)" class="hover:text-maroon transition">Customer Support</a></li>', '<!-- <li><a href="javascript:void(0)" class="hover:text-maroon transition">Customer Support</a></li> -->');
footer = footer.replace('<li><a href="javascript:void(0)" class="hover:text-maroon transition">Shipping Policy</a></li>', '<!-- <li><a href="javascript:void(0)" class="hover:text-maroon transition">Shipping Policy</a></li> -->');
footer = footer.replace('<a href="javascript:void(0)" class="hover:text-gray-600">Privacy Policy</a>', '<!-- <a href="javascript:void(0)" class="hover:text-gray-600">Privacy Policy</a> -->');
footer = footer.replace('<a href="javascript:void(0)" class="hover:text-gray-600">Terms of Service</a>', '<!-- <a href="javascript:void(0)" class="hover:text-gray-600">Terms of Service</a> -->');

fs.writeFileSync('footer_template.html', footer);
console.log('Footer links fixed!');
