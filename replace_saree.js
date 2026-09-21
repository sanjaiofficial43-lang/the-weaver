const fs = require('fs');

let products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

// Find and remove the old Plum & Teal saree
const oldIndex = products.findIndex(p => p.slug === 'plum-teal-checked-handloom-cotton-saree');
if (oldIndex > -1) {
    products.splice(oldIndex, 1);
    console.log('Removed old Plum & Teal saree.');
}

// Add the new one
const newId = (products.length + 2).toString(); // ensure unique ID
const newProduct = {
  id: newId,
  slug: "mauve-plum-checked-handloom-cotton-saree",
  name: "Mauve & Plum Handloom Cotton Saree",
  category: ["Handloom Sarees", "Cotton Sarees", "New Arrivals"],
  fabric: "Cotton",
  weavingType: "Handloom",
  colour: "Mauve",
  price: 1600,
  salePrice: null,
  stockStatus: "In Stock",
  sku: "WVR-COT-014",
  description: "A beautiful handloom cotton saree featuring mauve and plum tones, elegant checks, and a contrasting border.",
  sareeLength: "6.75 metres",
  blouseIncluded: true,
  borderDetails: "Contrast Border",
  images: [
    "saree-new-mix-1.jpg",
    "saree-new-mix-2.jpg",
    "saree-new-mix-3.jpg"
  ],
  altText: [
    "Saree folded view",
    "Saree pallu detail",
    "Saree body checks"
  ]
};

products.push(newProduct);
fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Added new saree to JSON');
