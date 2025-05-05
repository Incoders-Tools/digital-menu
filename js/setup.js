import { storeConfig } from "../config/config.js";
import { loadLanguage } from "../js/lang.js";

// setup.js - Script to apply configuration to HTML
document.addEventListener("DOMContentLoaded", function () {
  // Set the page title
  document.getElementById(
    "site-title"
  ).textContent = `${storeConfig.site.name} - ${storeConfig.site.description}`;

  // Set the header
  document.getElementById("header-title").textContent =
    storeConfig.site.shortName;
  document.getElementById("header-subtitle").textContent =
    storeConfig.site.subtitle;

  // Set Multilanguage
  const lang = localStorage.getItem("selectedLang") || "es";
    loadLanguage(lang);

    const langBtn = document.getElementById("language-button");
    const dropdown = document.querySelector(".language-selector");

    langBtn.addEventListener("click", () => {
        dropdown.classList.toggle("open");
    });

    document.getElementById("language-options").addEventListener("click", (e) => {
        const lang = e.target.closest("li")?.dataset?.lang;
        if (lang) {
            loadLanguage(lang);
            dropdown.classList.remove("open");
        }
    });

  // Set the footer
  document.getElementById("footer-title").textContent =
    storeConfig.footer.title;
  document.getElementById("footer-description").textContent =
    storeConfig.footer.description;

  // Set social media links
  const socialLinksContainer = document.getElementById(
    "social-links-container"
  );
  socialLinksContainer.innerHTML = "";
  storeConfig.footer.socialLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    const i = document.createElement("i");
    i.className = `fab fa-${link.platform}`;
    a.appendChild(i);
    socialLinksContainer.appendChild(a);
  });

  // Set the copyright
  document.getElementById(
    "copyright"
  ).textContent = `© ${storeConfig.site.copyright}`;

  // Open Graph and Twitter meta tags
  const metaTags = document.querySelector("head");
  const ogTitle = document.createElement("meta");
  ogTitle.setAttribute("property", "og:title");
  ogTitle.setAttribute("content", storeConfig.site.title);
  metaTags.appendChild(ogTitle);

  const ogDescription = document.createElement("meta");
  ogDescription.setAttribute("property", "og:description");
  ogDescription.setAttribute("content", storeConfig.site.description);
  metaTags.appendChild(ogDescription);

  const ogImage = document.createElement("meta");
  ogImage.setAttribute("property", "og:image");
  ogImage.setAttribute("content", storeConfig.site.previewImage);
  metaTags.appendChild(ogImage);

  const ogUrl = document.createElement("meta");
  ogUrl.setAttribute("property", "og:url");
  ogUrl.setAttribute("content", storeConfig.site.url);
  metaTags.appendChild(ogUrl);

  const twitterTitle = document.createElement("meta");
  twitterTitle.setAttribute("name", "twitter:title");
  twitterTitle.setAttribute("content", storeConfig.site.title);
  metaTags.appendChild(twitterTitle);

  const twitterDescription = document.createElement("meta");
  twitterDescription.setAttribute("name", "twitter:description");
  twitterDescription.setAttribute("content", storeConfig.site.description);
  metaTags.appendChild(twitterDescription);

  const twitterImage = document.createElement("meta");
  twitterImage.setAttribute("name", "twitter:image");
  twitterImage.setAttribute("content", storeConfig.site.previewImage);
  metaTags.appendChild(twitterImage);
});
