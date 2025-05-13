import { storeConfig } from "../../config/config.js";

function ensureFontAwesomeLoaded() {
  const existing = document.querySelector('link[href*="font-awesome"]');
  if (!existing) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(link);
  }
}

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    ensureFontAwesomeLoaded();

    const [html, css] = await Promise.all([
      fetch(new URL("./footer.html", import.meta.url)).then((res) =>
        res.text()
      ),
      fetch(new URL("./footer.css", import.meta.url)).then((res) => res.text()),
    ]);

    const template = document.createElement("template");
    template.innerHTML = `
      <style>${css}</style>
      ${html}
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.setContent();

    document.addEventListener("translationsReady", this.setContentBound = this.setContent.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener("translationsReady", this.setContentBound);
  }

  setContent() {
    const root = this.shadowRoot;
    const lang = document.documentElement.lang || "es";

    root.getElementById("footer-title").textContent =
      storeConfig.footer.title[lang];
    root.getElementById("footer-description").textContent =
      storeConfig.footer.description[lang];
    
    const socialLinksContainer = root.getElementById("social-links-container");
    storeConfig.footer.socialLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      const i = document.createElement("i");
      i.className = `fab fa-${link.platform}`;
      a.appendChild(i);
      socialLinksContainer.appendChild(a);
    });

    root.getElementById("copyright").textContent =
      storeConfig.footer.copyright[lang];
  }
}

customElements.define("app-footer", AppFooter);
