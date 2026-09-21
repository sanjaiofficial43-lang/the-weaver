const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));

const newId = (products.length + 1).toString();

const newProduct = {
  id: newId,
  slug: "purple-teal-checked-handloom-cotton-saree",
  name: "Purple & Teal Checked Handloom Cotton Saree",
  category: ["Handloom Sarees", "Cotton Sarees", "New Arrivals"],
  fabric: "Cotton",
  weavingType: "Handloom",
  colour: "Purple & Teal",
  price: 2300,
  salePrice: null,
  stockStatus: "In Stock",
  sku: "WVR-COT-011",
  description: "A stunning purple and teal checked handloom cotton saree featuring elegant silver floral motifs and a rich gold zari border. Handwoven with care in Madurai.",
  sareeLength: "6.75 metres",
  blouseIncluded: true,
  borderDetails: "Zari Border",
  images: [
    "saree-purple-teal-1.jpg",
    "saree-purple-teal-2.jpg",
    "saree-purple-teal-3.jpg"
  ],
  altText: [
    "Purple and teal checked handloom cotton saree folded",
    "Teal pallu with silver floral motifs",
    "Purple body with silver checks and motifs"
  ]
};

products.push(newProduct);
fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Added product to JSON');
