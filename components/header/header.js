import { storeConfig } from "../../config/config.js";
import TranslationService from "../../assets/i18n/translationService.js";
import { navigationService } from "../../services/navigation-service.js";

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const appearance = storeConfig.site.header.appearance || "navbar";
    const appearanceFile = appearance.toLowerCase(); // "cover", "navbar", "navbar-logo" etc.
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

    // Traducir su shadowRoot (por si ya está lista la traducción)
    TranslationService.translatePage(this.shadowRoot);

    // Suscribirse a cambios de navegación
    navigationService.onPageChange(() => this.updateButtonVisibility());

    this.updateButtonVisibility();

    window.addEventListener("resize", () => this.updateButtonVisibility());

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

  updateButtonVisibility() {
    const isHome = navigationService.isHome();
    const backButton = this.shadowRoot.querySelector("back-button");
    const homeBtn = this.shadowRoot.getElementById("home-btn");

    // Detectar si estamos en mobile (viewport <= 768px)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Mostrar u ocultar el botón correspondiente
    if (backButton) {
      if (isMobile && !isHome) {
        backButton.classList.remove("hidden");
      } else {
        backButton.classList.add("hidden");
      }
    }

    if (homeBtn) {
      if (!isMobile && !isHome) {
        homeBtn.style.visibility = "visible";
        homeBtn.style.opacity = "1";
        homeBtn.style.pointerEvents = "auto";
      } else {
        homeBtn.style.visibility = "hidden";
        homeBtn.style.opacity = "0";
        homeBtn.style.pointerEvents = "none";
      }
    }
  }
}

customElements.define("app-header", AppHeader);
