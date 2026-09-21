const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const newId = (products.length + 1).toString();

const newProduct = {
  id: newId,
  slug: "plum-teal-checked-handloom-cotton-saree",
  name: "Plum & Teal Handloom Cotton Saree with Peacock Pallu",
  category: ["Handloom Sarees", "Cotton Sarees", "New Arrivals"],
  fabric: "Cotton",
  weavingType: "Handloom",
  colour: "Plum & Teal",
  price: 1600,
  salePrice: null,
  stockStatus: "In Stock",
  sku: "WVR-COT-013",
  description: "An exquisite plum handloom cotton saree featuring elegant gold checks and motifs on the body, beautifully contrasted by a vibrant teal pallu with intricate golden peacock designs. Comes with a pure zari border.",
  sareeLength: "6.75 metres",
  blouseIncluded: true,
  borderDetails: "Gold Zari Border",
  images: [
    "saree-plum-teal-1.jpg",
    "saree-plum-teal-2.jpg",
    "saree-plum-teal-3.jpg"
  ],
  altText: [
    "Plum checked handloom cotton saree folded",
    "Teal pallu with golden peacock motifs",
    "Plum body with gold checks and motifs"
  ]
};

products.push(newProduct);
fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Added plum product to JSON');
