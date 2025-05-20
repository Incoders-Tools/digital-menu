export class CategorySlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.pendingCategories = null; // Para uso si se llama setCategories() temprano
  }

  async connectedCallback() {
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

    // Si ya nos pasaron categorías antes de que cargue todo
    if (this.pendingCategories) {
      this.setCategories(this.pendingCategories);
    } else {
      // Categorías por defecto
      this.setCategories([
        { value: "all", label: "All" },
        { value: "vegan", label: "Vegan" },
        { value: "gluten-free", label: "Gluten Free" },
      ]);
    }
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

  setCategories(categories) {
    if (!this.shadowRoot.querySelector(".my-slider")) {
      // Todavía no está cargado el DOM → guardar para más tarde
      this.pendingCategories = categories;
      return;
    }

    const slider = this.shadowRoot.querySelector(".my-slider");
    slider.innerHTML = ""; // Limpiar

    categories.forEach(({ value, label }, index) => {
      const item = document.createElement("div");
      item.className = "slide-item";
      item.dataset.category = value;
      item.textContent = label;
      if (index === 0) item.classList.add("active");
      slider.appendChild(item);
    });

    this.initSlider();
  }

  initSlider() {
    const container = this.shadowRoot.querySelector(".my-slider");
    if (!container || !window.tns) return;

    // Destruir slider anterior si existe
    if (container.tnsInstance) {
      container.tnsInstance.destroy();
    }

    const sliderInstance = window.tns({
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

    container.tnsInstance = sliderInstance;

    // Reasignar listeners
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