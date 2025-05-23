import { storeConfig } from "../../config/config.js";
import TranslationService from "../../assets/i18n/translationService.js";

class LanguageSelector extends HTMLElement {
  constructor() {
    super();

    // Definición de idiomas disponibles (si se necesitan más, agregar aquí)
    this.languages = {
      en: "English",
      es: "Español",
      pt: "Portugues",
    };

    // Obtener la ruta base para los recursos
    this.basePath = this._getBasePath();

    // Crear shadow DOM
    this.attachShadow({ mode: "open" });

    // Estado inicial
    this.isOpen = false;
  }

  connectedCallback() {
    // Cargar el template HTML y el CSS
    this._loadResources();

    // Establecer idioma actual (desde localStorage o por defecto)
    this.currentLang =
      localStorage.getItem("selectedLanguage") || storeConfig.default.language;

    // Configurar los event listeners después de que el contenido se haya cargado
    setTimeout(() => {
      this._setupEventListeners();
      this._updateSelectedLanguage(this.currentLang);
    }, 0);
  }

  _getBasePath() {
    return `${storeConfig.site.url}/components/language-selector/`;
  }

  _loadResources() {
    // Obtener rutas
    const cssURL = `${this.basePath}language-selector.css`;
    const htmlURL = `${this.basePath}language-selector.html`;

    // Cargar el CSS con fetch y colocarlo como <style>
    fetch(cssURL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error cargando CSS: ${res.status}`);
        return res.text();
      })
      .then((cssText) => {
        const style = document.createElement("style");
        style.textContent = cssText;
        this.shadowRoot.appendChild(style);
      })
      .catch((err) => {
        console.error(err);
      });

    // Cargar el HTML
    fetch(htmlURL)
      .then((res) => {
        if (!res.ok) throw new Error(`Error cargando HTML: ${res.status}`);
        return res.text();
      })
      .then((html) => {
        this.shadowRoot.innerHTML += html;

        // Actualizar rutas de imágenes de banderas
        this._updateFlagPaths();

        // Configurar listeners e idioma
        this._setupEventListeners();
        this._updateSelectedLanguage(this.currentLang);
      })
      .catch((error) => {
        console.error("Error cargando el template HTML:", error);
        this._createBasicStructure(); // fallback si falla el HTML
      });
  }

  _createBasicStructure() {
    // Estructura básica del componente como fallback
    const container = document.createElement("div");
    container.className = "language-selector";

    const selectedLang = document.createElement("div");
    selectedLang.className = "selected-language";

    const selectedImg = document.createElement("img");
    selectedImg.id = "selected-lang-flag";
    selectedImg.src = `${this.basePath}flags/${this.currentLang || "en"}.svg`;
    selectedImg.alt = this.languages[this.currentLang] || "English";

    const selectedText = document.createElement("span");
    selectedText.id = "selected-lang-text";
    selectedText.textContent = this.languages[this.currentLang] || "English";

    selectedLang.appendChild(selectedImg);
    selectedLang.appendChild(selectedText);

    const dropdown = document.createElement("div");
    dropdown.className = "language-dropdown";

    const langList = document.createElement("ul");

    // Crear elementos para cada idioma
    Object.entries(this.languages).forEach(([lang, name]) => {
      const li = document.createElement("li");
      li.dataset.lang = lang;
      li.addEventListener("click", () => this._selectLanguage(lang));

      const img = document.createElement("img");
      img.src = `${this.basePath}flags/${lang}.svg`;
      img.alt = name;

      const span = document.createElement("span");
      span.textContent = name;

      li.appendChild(img);
      li.appendChild(span);
      langList.appendChild(li);
    });

    dropdown.appendChild(langList);
    container.appendChild(selectedLang);
    container.appendChild(dropdown);

    this.shadowRoot.appendChild(container);
    this._setupEventListeners();
  }

  _updateFlagPaths() {
    // Actualizar las rutas de las imágenes de banderas en el HTML cargado
    const flagImages = this.shadowRoot.querySelectorAll(
      ".language-dropdown li[data-lang] img"
    );
    flagImages.forEach((img) => {
      const lang = img.parentElement.getAttribute("data-lang");
      img.src = `${this.basePath}flags/${lang}.svg`;
    });
  }

  _setupEventListeners() {
    // Configurar evento de clic para abrir/cerrar el dropdown
    const selectedLang = this.shadowRoot.querySelector(".selected-language");
    if (selectedLang) {
      selectedLang.addEventListener("click", () => this._toggleDropdown());
    }

    // Cerrar dropdown cuando se hace clic fuera
    document.addEventListener("click", (e) => {
      if (!this.contains(e.target) && this.isOpen) {
        this._closeDropdown();
      }
    });

    // Configurar eventos para los elementos de idioma
    const langItems = this.shadowRoot.querySelectorAll(
      ".language-dropdown li[data-lang]"
    );
    langItems.forEach((item) => {
      item.addEventListener("click", () => {
        const lang = item.dataset.lang;
        this._selectLanguage(lang);
      });
    });
  }

  _toggleDropdown() {
    const dropdown = this.shadowRoot.querySelector(".language-dropdown");
    if (!dropdown) return;

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      dropdown.classList.add("open");
    } else {
      dropdown.classList.remove("open");
    }
  }

  _closeDropdown() {
    const dropdown = this.shadowRoot.querySelector(".language-dropdown");
    if (!dropdown) return;

    dropdown.classList.remove("open");
    this.isOpen = false;
  }

  _selectLanguage(lang) {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      localStorage.setItem("selectedLanguage", lang);
      this._updateSelectedLanguage(lang);

      TranslationService.loadTranslations(lang);
    }

    this._closeDropdown();
  }

  _updateSelectedLanguage(lang) {
    const selectedImg = this.shadowRoot.querySelector("#selected-lang-flag");
    const selectedText = this.shadowRoot.querySelector("#selected-lang-text");

    if (!selectedImg || !selectedText) return;

    // Buscar el nombre del idioma en los elementos existentes o en la definición de idiomas
    const langName = this.languages[lang] || lang;

    selectedImg.src = `${this.basePath}flags/${lang}.svg`;
    selectedImg.alt = langName;
    selectedText.textContent = langName;
  }
}

// Registrar el componente
customElements.define("language-selector", LanguageSelector);
