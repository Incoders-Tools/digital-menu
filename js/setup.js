import { storeConfig } from "../config/config.js";

document.addEventListener("DOMContentLoaded", async function () {
  // Set page title
  document.getElementById("site-title").textContent =
    `${storeConfig.site.name} - ${storeConfig.site.description}`;

  // Set header
  document.getElementById("header-title").textContent =
    storeConfig.site.shortName;
  document.getElementById("header-subtitle").textContent =
    storeConfig.site.subtitle;
});