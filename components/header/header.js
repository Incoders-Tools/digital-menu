import { storeConfig } from "../../config/config.js";
import TranslationService from "../../assets/i18n/translationService.js";

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const appearance = storeConfig.site.header.appearance || "navbar";
    const appearanceFile = appearance.toLowerCase(); // "cover", "navbar", etc.
    const appearanceFolder = appearance.toLowerCase();

    const [html, css] = await Promise.all([
      fetch(
        new URL(`./${appearanceFolder}/${appearanceFile}.html`, import.meta.url)
      ).then((res) => res.text()),
      fetch(
        new URL(`./${appearanceFolder}/${appearanceFile}.css`, import.meta.url)
      ).then((res) => res.text()),
    ]);

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      ${html}
    `;

    this.initContent(appearance);
    this.removeBackButtonIfAtHome();

    // Traducir su shadowRoot (por si ya está lista la traducción)
    TranslationService.translatePage(this.shadowRoot);

    // Informar que ya está listo
    this.dispatchEvent(new CustomEvent("componentReady", { bubbles: true }));
  }

  initContent(appearance) {
    const site = storeConfig.site;

    const homeBtn = this.shadowRoot.getElementById("home-btn");
    if (homeBtn) {
      homeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (typeof window.loadPage === "function") {
          window.loadPage("service-menu");
        } else {
          window.location.href = site.url;
        }
      });
    }

    // Contenido específico de cover
    if (appearance === "cover") {
      this.shadowRoot.getElementById("header-title").textContent =
        site.shortName;
      this.shadowRoot.getElementById("header-subtitle").textContent =
        site.subtitle;
    }
  }

  removeBackButtonIfAtHome() {
    const isAtHome = window.currentPage === "home";
    const backButton = this.shadowRoot.querySelector("back-button");
    if (backButton) {
      backButton.style.display = isAtHome ? "none" : "inline-flex";
    }
  }
}

customElements.define("app-header", AppHeader);
