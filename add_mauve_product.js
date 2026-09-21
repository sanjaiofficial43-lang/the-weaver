const fs = require('fs');

const products = JSON.parse(fs.readFileSync('products.json', 'utf8'));
const newId = (products.length + 1).toString();

const newProduct = {
  id: newId,
  slug: "mauve-orange-checked-handloom-cotton-saree",
  name: "Mauve & Orange Checked Handloom Cotton Saree",
  category: ["Handloom Sarees", "Cotton Sarees", "New Arrivals"],
  fabric: "Cotton",
  weavingType: "Handloom",
  colour: "Mauve & Orange",
  price: 2000,
  salePrice: null,
  stockStatus: "In Stock",
  sku: "WVR-COT-012",
  description: "A beautiful mauve handloom cotton saree adorned with delicate orange checks and small floral motifs. Complemented by a rich maroon border with zari detailing.",
  sareeLength: "6.75 metres",
  blouseIncluded: true,
  borderDetails: "Maroon Zari Border",
  images: [
    "saree-mauve-orange-1.jpg",
    "saree-mauve-orange-2.jpg"
  ],
  altText: [
    "Mauve and orange checked handloom cotton saree with maroon border",
    "Mauve and orange checked body detail"
  ]
};

products.push(newProduct);
fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
console.log('Added mauve product to JSON');
