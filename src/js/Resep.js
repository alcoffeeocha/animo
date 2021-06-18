document
  .querySelector("[data-link^=resep]")
  .classList.add("sidebar__link--active");

document.getElementById("header-title").textContent = "Resep";

let currentURL = new URL(document.location || window.location.href);

const linkEls = document.querySelectorAll("[data-sesarch]");
const addRecipeBtn = document.getElementById("add-recipe-btn");
const detailRecipe = document.getElementById("detail-recipe");
const dropdownProduk = document.getElementById("dropdown-produk");
const dropdownKategoriBahan = document.getElementById(
  "dropdown-kategori-bahan"
);
const produkItems = document.querySelectorAll("[data-filter-name=produk] li");
const katBahanItems = document.querySelectorAll(
  "[data-filter-name=kategoriBahan] li"
);
const isProdukExist = produkItems.length > 0;
const isKatBahanExist = katBahanItems.length > 0;
const firstFeedback = document.getElementById("first-feedback");
const feedbackMsg = [];
const tableSubBahan = document.getElementById("table-sub-bahan");
const results = document.getElementById("results");
const addRecipeDialog = document.getElementById("add-recipe");
const addRecipeForm = document.forms["add-recipe"];
const addRecipeFeedback = document.getElementById("add-recipe-feedback");
const tombolNext = document.getElementById("tombol-next");
const tombolPrev = document.getElementById("tombol-prev");
const formPages = document.querySelectorAll("[data-form-page]");
const backToForm = document.querySelector("[data-id=backToForm]");
var PAGE = 1;
const productName = document.getElementById("product-name");
const productSelected = document.getElementById("product-selected");
const productOptions = document.getElementById("product-options");
const productList = document.querySelectorAll(
  "#product-options .dropdown__option"
);

productSelected.onclick = () => {
  productOptions.classList.toggle("active");
};

productList.forEach((o) => {
  o.addEventListener("click", function () {
    productSelected.textContent = this.querySelector("label").textContent;
    productOptions.classList.remove("active");
    this.querySelector("input").checked = true;
  });
});

if (!isProdukExist) {
  feedbackMsg.push(
    "<li>Setidaknya satu produk harus didaftarkan sebelum membuat resep, tambahkan melalui laman produk</li>"
  );
}

if (!isKatBahanExist) {
  feedbackMsg.push(
    "<li>Data bahan diperlukan dalam membuat resep, namun belum ada bahan yang didaftarkan, daftarkan melalui laman bahan</li>"
  );
}

if (feedbackMsg.length > 0) {
  dropdownKategoriBahan.classList.add("d-none");
  dropdownProduk.classList.add("d-none");
  addRecipeBtn.classList.add("d-none");
  detailRecipe.classList.add("d-none");
  firstFeedback.innerHTML = feedbackMsg.join("");
}

if (linkEls.length > 0) {
  linkEls.forEach((el) => {
    el.addEventListener("click", function () {
      let key = this.dataset.search;
      let value = this.dataset.searchValue;
      currentURL.searchParams.set(key, value);
      window.location.href = currentURL;
    });
  });
}

const filterTogglers = document.querySelectorAll(".filter__toggler");
filterTogglers.forEach((toggler) => {
  toggler.addEventListener("click", function () {
    if (!this.classList.contains("filter__toggler--expand")) {
      filterTogglers.forEach((tog) => {
        tog.classList.remove("filter__toggler--expand");
      });
    }
    this.classList.toggle("filter__toggler--expand");
    if (this.classList.contains("filter__toggler--expand")) {
      this.setAttribute("aria-expanded", true);
    } else {
      this.setAttribute("aria-expanded", false);
    }
  });
});

const now = new Date();
const days = new Array(
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu"
);
const monthName = new Array(
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
);
const day = days[now.getDay()];
const date = now.getDate();
const month = monthName[now.getMonth()];
const year = now.getFullYear();
const headerDate = document.querySelector("[data-id=header-date]");
headerDate.querySelector(".header__day").textContent = day + ", ";
headerDate.insertAdjacentText("beforeend", date + " " + month + " " + year);

// INPUT
const inputEls = {
  product: {
    els: addRecipeForm.elements["product"],
    selected: null,
  },
  subs: {
    els: document.querySelectorAll("[data-submaterial-id]"),
    selected: {},
  },
  realSub: {
    el: addRecipeForm.elements["subMaterials"],
  },
  porsi: {
    el: addRecipeForm.elements["porsi"],
  },
};

inputEls.product.els.forEach((el) => {
  if (el.checked) {
    productSelected.textContent = el.nextElementSibling.textContent;
  }
});

// CHECKER
const checkForm1 = () => {
  let value;
  inputEls.product.els.forEach((el) => {
    if (el.checked) {
      value = el.nextElementSibling.textContent;
    }
  });
  if (!value || value === "") {
    showFeedback("Produk wajib dipilih");
    return false;
  }
  inputEls.product.selected = value;
  return true;
};
const checkForm2 = () => {
  Object.keys(inputEls.subs.selected).forEach(function (k) {
    delete inputEls.subs.selected[k];
  });
  let elements = [...inputEls.subs.els];
  if (elements.some((el) => el.checked)) {
    elements
      .filter((el) => el.checked)
      .forEach((checkedEl) => {
        let id = checkedEl.dataset.submaterialId;
        let satuan = checkedEl.dataset.unit;
        let value = checkedEl.value;
        inputEls.subs.selected[id] = {
          satuan,
          value,
        };
      });
    updateSubBahan(inputEls.subs.selected);
    return true;
  }
  showFeedback("Minimal 1 sub bahan harus terpilih");
  return false;
};
const checkForm3 = () => {
  let subid = Object.keys(inputEls.subs.selected);
  let passValidation = true;
  subid.forEach((id) => {
    let values = [];
    document.querySelectorAll(`[data-subid=${id}]`).forEach((el) => {
      if (parseInt(el.value) < 1) {
        values.push(parseInt(el.value));
        return false;
      }
      values.push(el.value);
    });
    if (values.some((val) => val < 1)) {
      passValidation = false;
      return false;
    }
    let inputValues = values.join(";");
    addRecipeForm.elements[id].value = inputValues;
  });
  if (passValidation) {
    return true;
  }
  showFeedback("Semua kolom harus bernilai lebih dari 0");
  return false;
};
const checkForm4 = () => {
  let value = inputEls.porsi.el.value;
  if (!value || value === 0) {
    showFeedback("Jumlah porsi harus lebih dari 0");
    return false;
  }
  return true;
};

changePage(PAGE);

const tableData = {};

tombolNext.addEventListener("click", function () {
  if (PAGE !== 4) {
    if (!formChecker(PAGE)) {
      return;
    }
  }
  switch (PAGE) {
    case 1:
      PAGE++;
      tombolPrev.textContent = "Kembali";
      changePage(PAGE);
      productName.textContent = inputEls.product.selected;
      break;
    case 2:
      PAGE++;
      changePage(PAGE);
      break;
    case 3:
      PAGE++;
      this.textContent = "Selesai";
      changePage(PAGE);
      break;
    case 4:
      this.type = "submit";
      break;
  }
});

tombolPrev.addEventListener("click", function () {
  switch (PAGE) {
    case 4:
      PAGE--;
      tombolNext.textContent = "Lanjut";
      tombolNext.type = "button";
      changePage(PAGE);
      break;
    case 3:
      Swal.fire({
        title: "Yakin ingin kembali?",
        text: "Angka yang telah dimasukan akan diset kosong semua",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#802302",
        cancelButtonColor: "#6e7d88",
        confirmButtonText: "Ya, kembali",
        cancelButtonText: "Ga jadi deh",
      }).then((result) => {
        if (result.isConfirmed) {
          PAGE--;
          changePage(PAGE);
        }
      });
      break;
    case 2:
      PAGE--;
      this.textContent = "Batal";
      changePage(PAGE);
      break;
    case 1:
      closeDialog();
      break;
  }
});

addRecipeForm.onsubmit = function (e) {
  if (!checkForm4()) {
    e.preventDefault();
    return;
  }
  this.submit();
};

backToForm.addEventListener("click", function () {
  this.parentElement.classList.remove("dialog__feedback--appear");
});

function closeDialog() {
  addRecipeDialog.classList.remove("appear");
}

function changePage(current) {
  formPages.forEach((el) => {
    let page = parseInt(el.dataset.formPage);
    if (page === current) {
      el.style.display = "flex";
      return;
    }
    el.style.display = "none";
  });
}

function formChecker(page) {
  switch (page) {
    case 1:
      return checkForm1();
    case 2:
      return checkForm2();
    case 3:
      return checkForm3();
  }
}

function showFeedback(msg) {
  addRecipeFeedback.classList.add("dialog__feedback--appear");
  addRecipeFeedback.querySelector("ul").innerHTML = msg;
}

function updateSubBahan(obj) {
  inputEls.realSub.el.value = Object.keys(obj).join(";");
  rerenderTable();
}

function rerenderTable() {
  let thead = tableSubBahan.querySelector("thead");
  let tbody = tableSubBahan.querySelector("tbody");
  let rowQuantity = tbody.querySelector("tr[data-row='quantity']");
  let rowPrice = tbody.querySelector("tr[data-row='price']");
  let rowRecipe = tbody.querySelector("tr[data-row='recipe']");
  let subs = inputEls.subs.selected;

  // clean table
  thead.innerHTML = "";
  rowQuantity.innerHTML = "";
  rowPrice.innerHTML = "";
  rowRecipe.innerHTML = "";
  results.innerHTML = "";

  let thHTML = `<th></th>`;
  let rqHTML = `<td><h4 class="fo-semi fo-14">Jumlah Beli</h4><p class="fo-light fo-10">Kuantitas bahan yang dibeli</p></td>`;
  let rpHTML = `<td><h4 class="fo-semi fo-14">Biaya yang dikeluarkan</h4><p class="fo-light fo-10">Total uang yang dikeluarkan untuk membeli sejumlah kuantitas di atas</p></td>`;
  let rrHTML = `<td><h4 class="fo-semi fo-14">Ukuran Resep</h4><p class="fo-light fo-10">Kuantitas bahan yang digunakan dalam 1 buah resep</p></td>`;
  let inputHTML = ``;

  for (let id in subs) {
    thHTML += `<th data-label="${subs[id].value}">
      <h5 class="fo-semi fo-12">${subs[id].value}</h5>
    </th>`;
    rqHTML += `<td><input class="fo-semi fo-14" type="number" data-subid="${id}" min="0" placeholder="${subs[id].satuan}"/></td>`;
    rpHTML += `<td><input type="number" class="fo-semi fo-14" data-subid="${id}" min="0" placeholder="Rp"/></td>`;
    rrHTML += `<td><input type="number" class="fo-semi fo-14" data-subid="${id}" min="0" placeholder="${subs[id].satuan}"/></td>`;
    inputHTML += `<input type="hidden" name="${id}"/>`;
  }

  thead.innerHTML = thHTML;
  rowQuantity.innerHTML = rqHTML;
  rowPrice.innerHTML = rpHTML;
  rowRecipe.innerHTML = rrHTML;
  results.innerHTML = inputHTML;
}
