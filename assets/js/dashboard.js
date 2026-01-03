const orderList = document.getElementById("orderList");
const orders = JSON.parse(localStorage.getItem("orders")) || [];

if (orders.length === 0) {
  orderList.innerHTML =
    `<tr><td colspan="6">Belum ada order</td></tr>`;
}

orders.forEach((o, i) => {
  orderList.innerHTML += `
    <tr>
      <td>${o.date}</td>
      <td>${o.product}</td>
      <td>${o.name}</td>
      <td>${o.address}</td>
      <td>
        <a href="https://wa.me/${o.phone}" target="_blank">
          ${o.phone}
        </a>
      </td>
      <td>
        <button onclick="deleteOrder(${i})">Hapus</button>
      </td>
    </tr>
  `;
});

function deleteOrder(index) {
  if (!confirm("Hapus order ini?")) return;
  orders.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  location.reload();
}
