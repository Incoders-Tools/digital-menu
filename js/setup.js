import { storeConfig } from "../config/config.js";

document.addEventListener("DOMContentLoaded", async function () {
  // Set page title
  document.getElementById("site-title").textContent =
    `${storeConfig.site.name} - ${storeConfig.site.description}`;
});