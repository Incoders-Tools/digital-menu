import { storeConfig } from "../../config/config.js";

export function initFooter() {
  const footerContainer = document.getElementById("footer-container");

  if (!footerContainer) {
    console.warn("No se encontró #footer-container en el DOM.");
    return;
  }

  footerContainer.innerHTML = `
    <footer>
      <h3 id="footer-title"></h3>
      <p id="footer-description"></p>
      <div id="social-links-container" class="social-links"></div>
      <p id="copyright"></p>
    </footer>
  `;

  // Set texts and social links
  document.getElementById("footer-title").textContent = storeConfig.footer.title;
  document.getElementById("footer-description").textContent = storeConfig.footer.description;
  document.getElementById("copyright").textContent = `© ${storeConfig.site.copyright}`;

  const socialLinksContainer = document.getElementById("social-links-container");
  storeConfig.footer.socialLinks.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    const i = document.createElement("i");
    i.className = `fab fa-${link.platform}`;
    a.appendChild(i);
    socialLinksContainer.appendChild(a);
  });
}