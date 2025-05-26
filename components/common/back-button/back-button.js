class BackButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const css = await fetch(new URL(`./back-button.css`, import.meta.url)).then(
      (res) => res.text()
    );

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
      if (navigator.vibrate) navigator.vibrate(20);
      if (typeof window.loadPage === "function") {
        window.loadPage("service-menu");
      } else {
        window.location.href = "/";
      }
    });

    // Por defecto ocultar
    this.setVisible(false);
  }

  // 👇 Método público para controlar visibilidad
  setVisible(visible) {
    const btn = this.shadowRoot.querySelector(".back-btn");
    if (btn) {
      if (visible) {
        btn.classList.add("visible");
      } else {
        btn.classList.remove("visible");
      }
    }
  }
}

customElements.define("back-button", BackButton);
