import { storeConfig } from "../../config/config.js";
import { DeviceService } from "../../services/deviceService.js";

class MobileNavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this._handleVisibility();
    window.addEventListener("resize", this._handleVisibility.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._handleVisibility.bind(this));
  }

  _handleVisibility() {
    if (DeviceService.isMobile()) {
      this.style.display = "block";
      if (!this.shadowRoot.innerHTML) {
        this._loadResources();
      }
    } else {
      this.style.display = "none";
    }
  }

  _loadResources() {
    const basePath = this._getBasePath();

    // Cargar CSS
    fetch(`${basePath}mobile-navbar.css`)
      .then((res) => res.text())
      .then((css) => {
        const style = document.createElement("style");
        style.textContent = css;
        this.shadowRoot.appendChild(style);
      });

    // Cargar HTML
    fetch(`${basePath}mobile-navbar.html`)
      .then((res) => res.text())
      .then((html) => {
        this.shadowRoot.innerHTML += html;
        this._setupEvents();
      });
  }

  _getBasePath() {
    return `${storeConfig.site.url}/components/mobile-navbar/`;
  }

  _setupEvents() {
    const shadow = this.shadowRoot;

    shadow.getElementById("nav-home")?.addEventListener("click", () => {
      window.location.href = storeConfig.site.url;
    });

    shadow.getElementById("nav-back")?.addEventListener("click", () => {
      history.back();
    });

    shadow.getElementById("nav-next")?.addEventListener("click", () => {
      history.forward();
    });
  }
}

customElements.define("mobile-navbar", MobileNavBar);
