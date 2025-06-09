import TranslationService from "../../assets/i18n/translationService.js";

export class BaseComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Sobrescribe este método en subclases.
   * Aquí debes cargar HTML/CSS y demás lógica de tu componente.
   */
  async onConnected() {}

  /**
   * Se ejecuta automáticamente cuando el componente se conecta.
   */
  async connectedCallback() {
    await this.onConnected();

    // Traduce el contenido del shadowRoot al idioma actual
    TranslationService.translatePage(this.shadowRoot);

    // También escucha cambios de idioma en caliente
    document.addEventListener("translationsReady", () => {
      TranslationService.translatePage(this.shadowRoot);
    });
  }

  async loadTemplate(scriptUrl) {
    const basePath = scriptUrl.replace(/\.js$/, "");
    const [html, css] = await Promise.all([
      fetch(`${basePath}.html`).then((res) => res.text()),
      fetch(`${basePath}.css`).then((res) => res.text()),
    ]);

    const style = document.createElement("style");
    style.textContent = css;

    this.shadowRoot.innerHTML = html;
    this.shadowRoot.prepend(style);
  }

  /**
   * Carga HTML y CSS desde strings (útil si los importás como texto).
   */
  loadTemplateFromText(html, css) {
    const style = document.createElement("style");
    style.textContent = css;

    this.shadowRoot.innerHTML = html;
    this.shadowRoot.prepend(style);
  }
}
