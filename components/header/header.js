import { storeConfig } from "../../config/config.js";

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const appearance = storeConfig.site.header.appearance || "Cover";
    const appearanceFile = appearance.toLowerCase(); // "cover", "navbar", etc.

    const [html, css] = await Promise.all([
      fetch(new URL(`./${appearanceFile}.html`, import.meta.url)).then((res) =>
        res.text()
      ),
      fetch(new URL(`./${appearanceFile}.css`, import.meta.url)).then((res) =>
        res.text()
      ),
    ]);

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      ${html}
    `;

    this.initContent(appearance);
  }

  initContent(appearance) {
    const site = storeConfig.site;

    if (appearance === "Navbar") {
      const homeBtn = this.shadowRoot.getElementById("home-btn");
      if (homeBtn) {
        homeBtn.addEventListener("click", () => {
          window.location.href = site.url;
        });
      }

      const langSelect = this.shadowRoot.getElementById("lang-select");
      if (langSelect) {
        langSelect.addEventListener("change", (e) => {
          const selectedLang = e.target.value;
          console.log("Idioma seleccionado:", selectedLang);
          // Aquí podrías emitir un evento o usar i18n para cambiar idioma
        });
      }
    } else {
      // Comportamiento normal (cover, empty, etc.)
      this.shadowRoot.getElementById("header-title").textContent =
        site.shortName;
      this.shadowRoot.getElementById("header-subtitle").textContent =
        site.subtitle;
    }
  }
}

customElements.define("app-header", AppHeader);
