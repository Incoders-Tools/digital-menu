import { storeConfig } from "../../config/config.js";
import { DeviceService } from "../../services/device-service.js";
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

    // Si ya está todo traducido antes de que se conecte el componente
    if (window.translationReady) {
      this._updateSelectedLanguage(this.currentLang);
    }

    // En caso de que se traduzca después de montar
    document.addEventListener("translationsReady", () => {
      this._updateSelectedLanguage(
        localStorage.getItem("selectedLanguage") || storeConfig.default.language
      );
    });
  }

  _getBasePath() {
    return `${storeConfig.site.url}/components/language-selector/`;
  }

  _loadResources() {
    const cssURL = `${this.basePath}language-selector.css`;
    const htmlURL = `${this.basePath}language-selector.html`;

    Promise.all([
      fetch(cssURL).then((res) => {
        if (!res.ok) throw new Error(`Error cargando CSS: ${res.status}`);
        return res.text();
      }),
      fetch(htmlURL).then((res) => {
        if (!res.ok) throw new Error(`Error cargando HTML: ${res.status}`);
        return res.text();
      }),
    ])
      .then(([cssText, html]) => {
        const style = document.createElement("style");
        style.textContent = cssText;
        this.shadowRoot.appendChild(style);

        this.shadowRoot.innerHTML += html;

        this._updateFlagPaths();
        this._setupEventListeners();
        this._updateSelectedLanguage(this.currentLang);
      })
      .catch((error) => {
        console.error("Error cargando recursos:", error);
        this._createBasicStructure(); // fallback si falla
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
    const container = this.shadowRoot.querySelector(".language-selector");
    if (!dropdown || !container) return;

    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      dropdown.classList.add("open");
      if (DeviceService.isMobile()) {
        container.classList.add("mobile-expanded");
      }
    } else {
      dropdown.classList.remove("open");
      container.classList.remove("mobile-expanded");
    }
  }

  _closeDropdown() {
    const dropdown = this.shadowRoot.querySelector(".language-dropdown");
    const container = this.shadowRoot.querySelector(".language-selector");
    if (!dropdown || !container) return;

    dropdown.classList.remove("open");
    container.classList.remove("mobile-expanded");
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

customElements.define("language-selector", LanguageSelector);
