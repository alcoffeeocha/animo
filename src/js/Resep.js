document
  .querySelector("[data-link^=resep]")
  .classList.add("sidebar__link--active");

document.getElementById("header-title").textContent = "Resep";

let currentURL = new URL(document.location || window.location.href);

const linkEls = document.querySelectorAll("[data-search]");
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
