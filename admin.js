let data = [];

function addProduct() {
  data.push({
    id: Date.now(),
    name: name.value,
    price: Number(price.value),
    description: desc.value,
    images: images.value.split(","),
    items: items.value.split("\n"),
    recommendations: recom.value.split("\n")
  });
  preview.textContent = JSON.stringify(data, null, 2);
}

function exportData() {
  const file = "const PRODUCTS = " + JSON.stringify(data, null, 2);
  const blob = new Blob([file], {type:'text/javascript'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "products.js";
  a.click();
}
