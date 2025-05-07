import { storeConfig } from "../../config/config.js";

class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
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
  }

  setContent() {
    const root = this.shadowRoot;
    root.getElementById("footer-title").textContent = storeConfig.footer.title;
    root.getElementById("footer-description").textContent =
      storeConfig.footer.description;
    root.getElementById(
      "copyright"
    ).textContent = `© ${storeConfig.site.copyright}`;

    const socialLinksContainer = root.getElementById("social-links-container");
    storeConfig.footer.socialLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      const i = document.createElement("i");
      i.className = `fab fa-${link.platform}`;
      a.appendChild(i);
      socialLinksContainer.appendChild(a);
    });
  }
}

customElements.define("app-footer", AppFooter);
