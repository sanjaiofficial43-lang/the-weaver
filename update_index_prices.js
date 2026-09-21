const fs = require('fs');
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace specific old prices with new prices in index.html
// 1. Maroon & Green Handloom Cotton Saree (Rs. 2,790.00 -> Rs. 2,290.00)
indexHtml = indexHtml.replace(/>Rs\. 2,790\.00</g, '>Rs. 2,290.00<');

// 2. Red & Green Checked Handloom Cotton Saree (Rs. 2,420.00 -> Rs. 1,920.00)
indexHtml = indexHtml.replace(/>Rs\. 2,420\.00</g, '>Rs. 1,920.00<');

// 3. Green Handloom Cotton Saree with Pink Temple Border (Rs. 3,120.00 -> Rs. 2,620.00)
indexHtml = indexHtml.replace(/>Rs\. 3,120\.00</g, '>Rs. 2,620.00<');

// 4. Navy Blue Handloom Cotton Saree with Green Border (Rs. 3,040.00 -> Rs. 2,540.00)
indexHtml = indexHtml.replace(/>Rs\. 3,040\.00</g, '>Rs. 2,540.00<');

// 5. Magenta Handloom Cotton Saree with Peacock Motif (Rs. 3,240.00 -> Rs. 2,740.00)
indexHtml = indexHtml.replace(/>Rs\. 3,240\.00</g, '>Rs. 2,740.00<');

// 6. Lime Green Handloom Cotton Saree with Navy Border (Rs. 2,840.00 -> Rs. 2,340.00)
indexHtml = indexHtml.replace(/>Rs\. 2,840\.00</g, '>Rs. 2,340.00<');

// 7. Deep Maroon Handloom Cotton Saree with Thread Border (Rs. 3,620.00 -> Rs. 3,120.00)
indexHtml = indexHtml.replace(/>Rs\. 3,620\.00</g, '>Rs. 3,120.00<');

// 8. Teal Blue Handloom Cotton Saree with Crimson Border (Rs. 2,950.00 -> Rs. 2,450.00)
indexHtml = indexHtml.replace(/>Rs\. 2,950\.00</g, '>Rs. 2,450.00<');

// 9. Grey Handloom Cotton Saree with Red Elephant Border (Rs. 2,300.00 -> Rs. 1,800.00)
indexHtml = indexHtml.replace(/>Rs\. 2,300\.00</g, '>Rs. 1,800.00<');

fs.writeFileSync('index.html', indexHtml);
