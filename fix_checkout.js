const fs = require('fs');

function fixCheckout(file) {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Replace the old checkoutBtn logic
    const oldLogic = `            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', () => {
                    alert('Proceeding to checkout...');
                    window.location.href = 'checkout.html';
                });
            }`;

    const newLogic = `            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    if (checkoutBtn.disabled) return;
                    
                    // Prevent multiple clicks
                    checkoutBtn.disabled = true;
                    const originalText = checkoutBtn.innerText;
                    checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
                    checkoutBtn.classList.add('opacity-75', 'cursor-not-allowed');

                    try {
                        // Pass cart data correctly
                        localStorage.setItem('weavura_cart', JSON.stringify(cartItems));
                        
                        // Simulate API request timeout
                        await new Promise((resolve) => setTimeout(resolve, 1500));
                        
                        // Redirect to intended checkout page
                        window.location.href = '/checkout';
                    } catch (error) {
                        console.error('Checkout error:', error);
                        alert('An error occurred during checkout. Please try again.');
                        checkoutBtn.disabled = false;
                        checkoutBtn.innerText = originalText;
                        checkoutBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                    }
                });
            }`;

    html = html.replace(oldLogic, newLogic);
    
    // Some files might have slight indentation differences, let's use a regex fallback just in case
    const regexOldLogic = /if\s*\(checkoutBtn\)\s*{\s*checkoutBtn\.addEventListener\('click',\s*\(\)\s*=>\s*{\s*alert\('Proceeding to checkout\.\.\.'\);\s*window\.location\.href\s*=\s*'checkout\.html';\s*}\);\s*}/g;
    html = html.replace(regexOldLogic, newLogic);
    
    fs.writeFileSync(file, html);
}

fixCheckout('footer_template.html');
fixCheckout('index.html');

console.log('Fixed checkout button logic!');
