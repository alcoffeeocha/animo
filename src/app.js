import "./scss/main.scss";
import headerHtml from "./common/header.html";
import sidebarHtml from "./common/sidebar.html";
import htmlHead from "./common/html_head.html";

document.head.insertAdjacentHTML("beforeend", htmlHead);

const header = document.getElementById("header");
const sidebar = document.getElementById("sidebar");

let toggler = null;

if (header) injectHeader();
if (sidebar) injectSidebar();

function injectHeader() {
  header.innerHTML = headerHtml;
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
  const headerDate = document.getElementById("header-date");
  headerDate.querySelector(".header__day").textContent = day + ", ";
  headerDate.insertAdjacentText("beforeend", date + " " + month + " " + year);
  const headerAbbr = document.getElementById("header-abbr");
  const firstTwoWords = document
    .querySelector(".header__name")
    .textContent.split(" ")
    .slice(0, 2);
  let shortName = "";
  firstTwoWords.forEach((name) => {
    shortName += name.substr(0, 1).toUpperCase();
  });

  headerAbbr.textContent = shortName;
}

function injectSidebar() {
  sidebar.innerHTML = sidebarHtml;
  toggler = document.getElementById("sidebar-toggler");
  toggler.addEventListener("click", toggleSidebar);
}

function toggleSidebar() {
  let isExpanded = sidebar.classList.contains("sidebar--expanded");
  if (isExpanded) {
    sidebar.classList.remove("sidebar--expanded");
    toggler.innerHTML = `<path
    fill-rule="evenodd"
    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
  />`;
    return;
  }
  sidebar.classList.add("sidebar--expanded");
  toggler.innerHTML = ` <path
  fill-rule="evenodd"
  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
/>`;
}

const modalOpener = document.querySelectorAll("[data-modal]");

if (modalOpener) {
  modalOpener.forEach((opener) => {
    opener.addEventListener("click", function () {
      document.getElementById(this.dataset.modal).classList.add("appear");
    });
  });
}

document.querySelectorAll(".dialog__backdrop").forEach((backdrop) => {
  backdrop.addEventListener("click", (e) => {
    backdrop.parentElement.classList.remove("appear");
  });
});

document.querySelectorAll(".dialog__box").forEach((box) => {
  box.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
