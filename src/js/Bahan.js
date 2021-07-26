document
  .querySelector("[data-link^=bahan]")
  .classList.add("sidebar__link--active");

document.getElementById("header-title").textContent = "Bahan";

const bahanAllItems = document.getElementById("bahan-all-items");
const bahanAddItem = document.getElementById("bahan-add-item");
const addMaterialCta = document.getElementById("add-material");
const formAddMaterial = document.forms["form-add-material"];

let cats = formAddMaterial.elements["category"].querySelectorAll("option");
if (cats.length < 1) {
  addMaterialCta.innerHTML = "<h4>Tambahkan kategori bahan</h4>";
  addMaterialCta.style.pointerEvents = "none";
}

addMaterialCta.addEventListener("click", () => {
  if (cats.length < 1) {
    Swal.fire({
      icon: "warning",
      title: "Mohon tambahkan kategori bahan terlebih dahulu",
    });
    return;
  }
  formAddMaterial.forEach((el) => {
    if (el.type === "text") {
      el.value = "";
    }
  });
  bahanAllItems.classList.add("d-none");
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

//Batalkan Edit Bahan
const cancelBtns = document.querySelectorAll(".cancel-form");
cancelBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("edit-bahan").classList.remove("appear");
  });
});

const editCatOptions = document.querySelector(
  "[data-down-edit='category-options']"
);
const editCatSelected = document.querySelector(
  "[data-down-edit='category-selected']"
);
const editCatProdList = document.querySelectorAll(
  "[data-down-edit='category-options'] .dropdown__option"
);

// Handle Edit Bahan Kategori 
let editCatBahans = editCatOptions.querySelectorAll("input");
if (editCatBahans.length > 0) {
  editCatBahans.forEach((el) => {
    if (el.checked) {
      editCatSelected.textContent = el.nextElementSibling.textContent;
      return;
    }
  });
  if (![...editCatBahans].some((el) => el.checked)) {
    editCatBahans[0].checked;
    editCatSelected.textContent =
      editCatBahans[0].nextElementSibling.textContent;
  }
  editCatSelected.onclick = () => {
    editCatOptions.classList.toggle("active");
  };
  editCatProdList.forEach((o) => {
    o.onclick = function () {
      editCatSelected.textContent = this.querySelector("label").textContent;
      editCatOptions.classList.remove("active");
      this.querySelector("input").checked = true;
    };
  });
}

// Handle DROPDOWN Edit Bahan Kategori 
const text1 = document.getElementById("baku-123");
const edit = document.querySelectorAll(".tombol-edit");
const save = document.querySelectorAll(".tombol-save");

const text2 = document.getElementById("pendukung-123");
const edit2 = document.querySelectorAll(".tombol-edit2");
const save2 = document.querySelectorAll(".tombol-save2");

edit.forEach((ed)=>{
  ed.addEventListener("click", function(){
  text1.contentEditable = true;
  text1.style.textAlign = "center";
  text1.style.outline = "none"
  text1.style.borderBottom = "1px solid black"
  text1.style.backgroundColor = "none";
  this.style.display = "none";
  this.nextElementSibling.style.display = "inline-block";
  })
});

save.forEach((sa)=>{
  sa.style.display = "none";
  sa.addEventListener("click",function(){
  text1.contentEditable = false;
  text1.style.textAlign = "left";
  text1.style.borderBottom = "none"
  text1.style.backgroundColor = "none";
  this.style.display = "none";
  this.previousElementSibling.style.display = "inline-block";
  })
});

edit2.forEach((ed)=>{
  ed.addEventListener("click", function(){
  text2.contentEditable = true;
  text2.style.textAlign = "center";
  text2.style.outline = "none"
  text2.style.borderBottom = "1px solid black"
  text2.style.backgroundColor = "none";
  this.style.display = "none";
  this.nextElementSibling.style.display = "inline-block";
  })
});

save2.forEach((sa)=>{
  sa.style.display = "none";
  sa.addEventListener("click",function(){
  text2.contentEditable = false;
  text2.style.textAlign = "left";
  text2.style.borderBottom = "none"
  text2.style.backgroundColor = "none";
  this.style.display = "none";
  this.previousElementSibling.style.display = "inline-block";
  })
}); 

