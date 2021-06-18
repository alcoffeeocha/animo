document
  .querySelector("[data-link^=produk]")
  .classList.add("sidebar__link--active");

document.getElementById("header-title").textContent = "Produk";

const formAddProduct = document.getElementById("form-add-product");
const formEditProduct = document.getElementById("form-edit-product");

const prodImg = document.getElementById("prod-image");
const prodName = document.getElementById("prod-name");
const prodSize = document.getElementById("prod-size");
const prodUnit = document.getElementById("prod-unit");
const prodPrice = document.getElementById("prod-price");
const cancelBtns = document.querySelectorAll(".cancel-form");
const addProductFeedback = document.getElementById("add-product-feedback");
const editProductFeedback = document.getElementById("edit-product-feedback");
const uploadArea = document.getElementById("upload-area");
const formAddProductCategory = document.getElementById("form-add-prod-cat");
const prodCat = document.getElementById("prod-cat");
const prodCatSave = document.getElementById("prod-cat-save");

const productId = document.getElementById("prod-id");
const prodImageEdit = document.getElementById("prod-image-edit");
const prodNameEdit = document.getElementById("prod-name-edit");
const prodSizeEdit = document.getElementById("prod-size-edit");
const prodUnitEdit = document.getElementById("prod-unit-edit");
const prodPriceEdit = document.getElementById("prod-price-edit");
const uploadAreaEdit = document.getElementById("upload-area-edit");

cancelBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("add-product").classList.remove("appear");
    document.getElementById("edit-product").classList.remove("appear");
  });
});

prodImg.addEventListener("change", function (e) {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      uploadArea.style.backgroundImage = `url(${this.result})`;
      uploadArea.style.backgroundPosition = "center";
      uploadArea.style.backgroundSize = "cover";
      uploadArea.textContent = "";
      uploadArea.nextElementSibling.textContent = file.name;
    });
    reader.readAsDataURL(file);
  } else {
    uploadArea.removeAttribute("style");
  }
});

formAddProduct.addEventListener("submit", (e) => {
  let msg = [];
  let img = prodImg.files;
  let name = prodName.value.trim();
  let size = prodSize.value;
  let unit = prodUnit.value.trim();
  let price = prodPrice.value;

  if (img.length < 1) msg.push("Gambar produk diperlukan");
  if (!name) msg.push("Nama produk diperlukan");
  if (!size || size === 0) msg.push("Ukuran produk diperlukan");
  if (!unit) msg.push("Satuan produk diperlukan");
  if (!price || price === 0) msg.push("Harga produk diperlukan");

  if (msg.length > 0) {
    e.preventDefault();
    addProductFeedback.classList.add("dialog__feedback--appear");
    let html = ``;
    msg.forEach((m) => {
      html += `<li>${m}</li>`;
    });
    addProductFeedback.querySelector("ul").innerHTML = html;
  }
});

let maySaveCat = false;

prodCat.addEventListener("keyup", function () {
  if (this.value.trim()) {
    prodCatSave.removeAttribute("disabled");
    maySaveCat = true;
  } else {
    prodCatSave.setAttribute("disabled", "disabled");
    maySaveCat = false;
  }
});

prodCatSave.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    if (maySaveCat) formAddProductCategory.submit();
  }
});

formEditProduct.addEventListener("submit", (e) => {
  let msg = [];
  let name = prodNameEdit.value.trim();
  let size = prodSizeEdit.value;
  let unit = prodUnitEdit.value.trim();
  let price = prodPriceEdit.value;

  if (!name) msg.push("Nama produk diperlukan");
  if (!size || size === 0) msg.push("Ukuran produk diperlukan");
  if (!unit) msg.push("Satuan produk diperlukan");
  if (!price || price === 0) msg.push("Harga produk diperlukan");
  console.log(msg);

  if (msg.length > 0) {
    e.preventDefault();
    editProductFeedback.classList.add("dialog__feedback--appear");
    let html = ``;
    msg.forEach((m) => {
      html += `<li>${m}</li>`;
    });
    editProductFeedback.querySelector("ul").innerHTML = html;
  }
});

prodImageEdit.addEventListener("change", function (e) {
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      uploadAreaEdit.style.backgroundImage = `url(${this.result})`;
      uploadAreaEdit.style.backgroundPosition = "center";
      uploadAreaEdit.style.backgroundSize = "cover";
      uploadAreaEdit.nextElementSibling.textContent = file.name;
    });
    reader.readAsDataURL(file);
  } else {
    uploadAreaEdit.removeAttribute("style");
  }
});

document.querySelectorAll("[data-id='backToForm']").forEach((back) => {
  back.addEventListener("click", function () {
    this.parentElement.classList.remove("dialog__feedback--appear");
  });
});
