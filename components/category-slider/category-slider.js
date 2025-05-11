export class CategorySlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    // Cargar HTML y CSS
    const [html, css] = await Promise.all([
      fetch(
        import.meta.url.replace("category-slider.js", "category-slider.html")
      ).then((r) => r.text()),
      fetch(
        import.meta.url.replace("category-slider.js", "category-slider.css")
      ).then((r) => r.text()),
    ]);

    const style = document.createElement("style");
    style.textContent = css;
    
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(wrapper);    

    await this.loadTinySlider();
    this.initSlider();
  }

  async loadTinySlider() {
    if (!window.tns) {
      await import(
        "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/min/tiny-slider.js"
      );
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.4/tiny-slider.css";
    this.shadowRoot.appendChild(link);
  }

  initSlider() {
    const container = this.shadowRoot.querySelector(".my-slider");
    if (!container) return;

    if (window.innerWidth > 768 && window.tns) {
      window.tns({
        container,
        items: 3,
        slideBy: "page",
        autoplay: false,
        nav: false,
        controls: false,
        responsive: {
          640: { items: 4 },
          900: { items: 5 },
        },
      });
    }

    // Event delegation para seleccionar categoría
    const items = this.shadowRoot.querySelectorAll(".slide-item");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        this.shadowRoot
          .querySelector(".slide-item.active")
          ?.classList.remove("active");
        item.classList.add("active");
        const category = item.dataset.category;
        this.dispatchEvent(
          new CustomEvent("categorySelected", {
            detail: { category },
            bubbles: true,
            composed: true,
          })
        );
      });
    });
  }
}

customElements.define("category-slider", CategorySlider);
