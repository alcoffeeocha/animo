import "./scss/main.scss";
import headerHtml from "./common/header.html";
import sidebarHtml from "./common/sidebar.html";

const header = document.getElementById("header");
const sidebar = document.getElementById("sidebar");

if (header) injectHeader();
if (sidebar) injectSidebar();

function injectHeader() {
  header.innerHTML = headerHtml;
}

function injectSidebar() {
  sidebar.innerHTML = sidebarHtml;
}
