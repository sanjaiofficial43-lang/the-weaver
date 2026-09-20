const fs = require('fs');

let html = fs.readFileSync('checkout.html', 'utf8');

const oldLogic = `        placeOrderBtn.addEventListener('click', () => {
            const paymentMethod = document.querySelector('input[name="payment"]:checked').id;
            let msg = '🎉 Order placed successfully!';
            
            if (paymentMethod === 'pay-cod') {
                msg += '\\n\\nYou selected Cash on Delivery. Please have the cash ready when your package arrives.';
            } else if (paymentMethod === 'pay-upi') {
                msg += '\\n\\nPlease check your UPI app to complete the transaction.';
            }
            
            alert(msg + '\\n\\nThank you for shopping with The Weavura.');
            window.location.href = '/';
        });`;

const newLogic = `        placeOrderBtn.addEventListener('click', async () => {
            if (placeOrderBtn.disabled) return;
            
            const paymentMethod = document.querySelector('input[name="payment"]:checked').id;
            
            // Prevent multiple clicks & show loading state
            placeOrderBtn.disabled = true;
            const originalText = placeOrderBtn.innerText;
            placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing Payment...';
            placeOrderBtn.classList.add('opacity-75', 'cursor-not-allowed');
            
            try {
                // Simulate backend API payment processing
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                let msg = 'Order placed successfully!';
                if (paymentMethod === 'pay-cod') {
                    msg += ' You selected Cash on Delivery.';
                } else if (paymentMethod === 'pay-upi') {
                    msg += ' UPI transaction initiated.';
                }
                
                // Clear cart
                localStorage.removeItem('weavura_cart');
                
                // Redirect on success without blocking alert
                window.location.href = '/?order=success';
            } catch (error) {
                console.error('Payment failed:', error);
                placeOrderBtn.innerHTML = 'Payment Failed - Try Again';
                placeOrderBtn.disabled = false;
                placeOrderBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            }
        });`;

html = html.replace(oldLogic, newLogic);
fs.writeFileSync('checkout.html', html);
console.log('Fixed checkout.html place order button!');
