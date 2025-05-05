import { storeConfig } from "../config/config.js";
import { initLanguageSelector } from "../components/language-selector/language-selector.js";

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
  document.getElementById("footer-title").textContent =
    storeConfig.footer.title;
  document.getElementById("footer-description").textContent =
    storeConfig.footer.description;

  // Set social links
  const socialLinksContainer = document.getElementById("social-links-container");
  socialLinksContainer.innerHTML = "";
  storeConfig.footer.socialLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    const i = document.createElement("i");
    i.className = `fab fa-${link.platform}`;
    a.appendChild(i);
    socialLinksContainer.appendChild(a);
  });

  // Set copyright
  document.getElementById("copyright").textContent =
    `© ${storeConfig.site.copyright}`;
});