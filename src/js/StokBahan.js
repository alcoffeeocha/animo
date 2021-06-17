import { formatDate, fullDate } from "./modules/DateFormatter";
// import { picker } from "./modules/DatePicker";

document
  .querySelector("[data-link^=stok_bahan]")
  .classList.add("sidebar__link--active");

document.getElementById("header-title").textContent = "Stok Bahan";

document.querySelectorAll("[data-label=Diperbarui]").forEach((el) => {
  el.textContent = fullDate(el.textContent.trim());
});
// picker.attach({
//   target: "date-choosen",
// });
