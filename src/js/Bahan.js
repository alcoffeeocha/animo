document
  .querySelector("[data-link^=bahan]")
  .classList.add("sidebar__link--active");

document.getElementById("header-title").textContent = "Bahan";

const bahanAllItems = document.getElementById("bahan-all-items");
const bahanAddItem = document.getElementById("bahan-add-item");
const addMaterialCta = document.getElementById("add-material");
const formAddMaterial = document.forms["form-add-material"];

addMaterialCta.addEventListener("click", () => {
  bahanAllItems.classList.add("d-none");
  formAddMaterial.forEach((el) => {
    if (el.name === "category" || el.name === "unit") {
      el[0].selected = true;
      return;
    }
    el.value = null;
  });
  bahanAddItem.classList.add("d-block");
  document.getElementById("header-title").textContent = "Tambah Bahan";
});

const formAddMaterialCategory = document.getElementById(
  "form-add-material-cat"
);
const materialCat = document.getElementById("material-cat");
const prodCatSave = document.getElementById("material-cat-save");

let maySaveCat = false;

materialCat.addEventListener("keyup", function () {
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
    if (maySaveCat) formAddMaterialCategory.submit();
  }
});

formAddMaterial.addEventListener("submit", (e) => {
  let msg = [];
  let material = document.getElementById("material").value.trim();
  let subMaterial = document.getElementById("sub-material").value.trim();
  let brand = document.getElementById("brand").value.trim();
  let supplier = document.getElementById("supplier").value.trim();
  let contact = document.getElementById("contact").value.trim();
  if (!material || material === "") msg.push("Nama Bahan");
  if (!subMaterial || subMaterial === "") msg.push("Sub Bahan");
  if (!brand || brand === "") msg.push("Merk sub bahan");
  if (!supplier || supplier === "") msg.push("Nama supplier");
  if (!contact || contact === "") msg.push("Kontak Supplier");

  if (msg.length > 0) {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Data di bawah harus diisi",
      text: msg.join(", "),
    });
  } else {
    formAddMaterial.submit();
  }
});
