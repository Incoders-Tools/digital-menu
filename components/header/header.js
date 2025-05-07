import { storeConfig } from "../../config/config.js";

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const [html, css] = await Promise.all([
      fetch(new URL("./header.html", import.meta.url)).then((res) =>
        res.text()
      ),
      fetch(new URL("./header.css", import.meta.url)).then((res) => res.text()),
    ]);

    this.shadowRoot.innerHTML = `
      <style>${css}</style>
      ${html}
    `;

    this.shadowRoot.getElementById("header-title").textContent =
      storeConfig.site.shortName;
    this.shadowRoot.getElementById("header-subtitle").textContent =
      storeConfig.site.subtitle;
  }
}

customElements.define("app-header", AppHeader);
