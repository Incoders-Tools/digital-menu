class LanguageSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const [html, css] = await Promise.all([
      fetch(new URL("./language-selector.html", import.meta.url)).then((res) =>
        res.text()
      ),
      fetch(new URL("./language-selector.css", import.meta.url)).then((res) =>
        res.text()
      ),
    ]);

    const template = document.createElement("template");
    template.innerHTML = `
        <style>${css}</style>
        ${html}
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.setupEvents();
    const savedLang = localStorage.getItem("selectedLang") || "es";
    await this.setLanguage(savedLang);
  }

  setupEvents() {
    const langButton = this.shadowRoot.querySelector("#language-button");
    const overlay = this.shadowRoot.querySelector("#language-overlay");

    langButton.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
      }
    });

    const options = this.shadowRoot.querySelectorAll("[data-lang]");
    options.forEach((option) => {
      option.addEventListener("click", async () => {
        const lang = option.dataset.lang;
        await this.setLanguage(lang);
        overlay.style.display = "none";
      });
    });
  }

  async setLanguage(lang) {
    const flag = this.shadowRoot.querySelector("#current-flag");
    flag.src = `./flags/${lang}.svg`;
    localStorage.setItem("selectedLang", lang);

    const res = await fetch(`../../assets/i18n/${lang}.json`);
    const translations = await res.json();

    // Actualiza textos en el DOM global (fuera del shadow root)
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });
  }
}

customElements.define("language-selector", LanguageSelector);