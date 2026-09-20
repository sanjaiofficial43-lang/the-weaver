const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
let indexHtml = fs.readFileSync('index.html', 'utf8');

// The goal is to make the image block clickable, and the title clickable.
// We can wrap the image tags in an <a> tag pointing to the product page.
// Or simply, we can use JS to attach click listeners dynamically on the client!
// Since it's a static site, inline onclick is easiest.

products.forEach(product => {
    const safeName = product.name.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    
    // We already linked the H3:
    // <h3 class="text-base md:text-lg text-gray-900 mb-2 px-2 leading-snug"><a href="/product/maroon-green-handloom-cotton-saree" ...>Maroon & Green Handloom Cotton Saree</a></h3>
    
    // Now we need to find the specific product card for this product, and add an onclick to the image container.
    // We can use a regex that captures the <div class="relative overflow-hidden..."> up to the H3.
    // This is complex with regex. Let's instead inject a client-side script that does this perfectly!

});

// A better way: inject a tiny client-side script that finds the link in the h3 and makes the whole image container clickable.
const scriptToInject = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => {
                const link = card.querySelector('h3 a');
                if (link) {
                    const url = link.getAttribute('href');
                    const imgContainer = card.querySelector('.relative.overflow-hidden');
                    if (imgContainer) {
                        imgContainer.style.cursor = 'pointer';
                        imgContainer.addEventListener('click', (e) => {
                            // Don't navigate if they clicked the Add to Cart button
                            if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) {
                                return;
                            }
                            window.location.href = url;
                        });
                    }
                }
            });
        });
    </script>
</body>
`;

indexHtml = indexHtml.replace('</body>', scriptToInject);
fs.writeFileSync('index.html', indexHtml);
console.log('Fixed card clicks!');
