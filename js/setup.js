import { storeConfig } from "../config/config.js";
import { initLanguageSelector } from "../components/language-selector/language-selector.js";
import { initFooter } from "../components/footer/footer.js";

document.addEventListener("DOMContentLoaded", async function () {
  // Set page title
  document.getElementById("site-title").textContent =
    `${storeConfig.site.name} - ${storeConfig.site.description}`;

  // Set header
  document.getElementById("header-title").textContent =
    storeConfig.site.shortName;
  document.getElementById("header-subtitle").textContent =
    storeConfig.site.subtitle;

  // Init language selector (todo incluido: HTML, eventos, idioma actual)
  await initLanguageSelector();

  // Set footer
  initFooter();

  // Set copyright
  document.getElementById("copyright").textContent =
    `© ${storeConfig.site.copyright}`;
});