class BackButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    Promise.all([
      fetch(new URL(`./back-button.css`, import.meta.url)).then((res) =>
        res.text()
      ),
    ]).then(([css]) => {
      this.shadowRoot.innerHTML = `
        <style>${css}</style>
        <button class="back-btn" title="Back">
          <svg viewBox="0 0 24 24" class="icon">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `;

      const btn = this.shadowRoot.querySelector(".back-btn");

      btn.addEventListener("click", () => {
        // 🎯 Vibración si el dispositivo lo soporta
        if (navigator.vibrate) {
          navigator.vibrate(20); // vibración corta
        }

        // Navegación
        if (typeof window.loadPage === "function") {
          window.loadPage("service-menu");
        } else {
          window.location.href = "/";
        }
      });
    });
  }
}

customElements.define("back-button", BackButton);
