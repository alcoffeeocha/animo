import { formatDate, fullDate } from "./modules/DateFormatter";

document
  .querySelector("[data-link^=pesanan]")
  .classList.add("sidebar__link--active");

document.getElementById("header-title").textContent = "Pesanan";
const pesananAllItems = document.getElementById("pesanan-all-items");
const pesananAddItem = document.getElementById("pesanan-add-item");
const addOrderCta = document.getElementById("add-order");
const formAddOrder = document.forms["form-add-order"];
const dateText = document.querySelectorAll("[data-label=Tanggal]");
if (dateText.length > 0) {
  dateText.forEach((el) => {
    el.textContent = fullDate(el.textContent.trim());
  });
}

addOrderCta.addEventListener("click", () => {
  let products = document.querySelectorAll("[name=product]");

  if (products.length > 0) {
    products[0].checked = true;
    document.getElementById("product-selected").textContent =
      products[0].nextElementSibling.textContent;
  } else {
    Swal.fire({
      title: "Tidak ada produk",
      icon: "warning",
      text: "Harap menambahkan produk sebelum pesanan, lakukan melalui laman produk",
    });
    return;
  }
  pesananAllItems.classList.add("d-none");
  pesananAddItem.classList.add("d-block");
  formAddOrder.forEach((el) => {
    if (el.type === "text") {
      el.value = "";
      return;
    }
    if (el.type === "number") {
      el.value = 0;
      return;
    }
    if (el.type === "date") {
      el.value = formatDate(false);
    }
    if (el.name === "paymentStatus" && el.value === "Belum Lunas") {
      el.checked = true;
      return;
    }
    if (el.name === "orderStatus" && el.value === "Sedang Diproses") {
      el.checked = true;
    }
  });
  document.getElementById("header-title").textContent = "Tambah Pesanan";
});

formAddOrder.addEventListener("submit", (e) => {
  let msg = [];
  let buyer = document.getElementById("buyer").value.trim();
  let qty = parseInt(document.getElementById("qty").value);
  let date = document.getElementById("date").value;
  if (!buyer || buyer === "") msg.push("Nama Pemesan");
  if (!qty || qty === 0) msg.push("Jumlah");
  if (!date || date === "") msg.push("Tanggal");

  if (msg.length > 0) {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Data di bawah harus diisi",
      text: msg.join(", "),
    });
  } else {
    formAddOrder.submit();
  }
});
