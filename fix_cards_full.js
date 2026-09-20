const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the old script I injected
html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {\s*const cards = document\.querySelectorAll\('\.product-card'\);[\s\S]*?<\/script>/, '');

const scriptToInject = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.product-card');
            cards.forEach(card => {
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    // Find the link inside this card
                    const link = card.querySelector('h3 a');
                    if (!link) return;
                    
                    // Don't navigate if they clicked the Add to Cart button
                    if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) {
                        return;
                    }
                    
                    // Don't double navigate if they clicked the link itself
                    if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) {
                        return;
                    }
                    
                    window.location.href = link.getAttribute('href');
                });
            });
        });
    </script>
`;

html = html.replace('</body>', scriptToInject + '\n</body>');
fs.writeFileSync('index.html', html);
console.log('Fixed cards completely.');
