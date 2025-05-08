class CategoryCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const [html, css] = await Promise.all([
      fetch(new URL("./category-carousel.html", import.meta.url)).then((r) => r.text()),
      fetch(new URL("./category-carousel.css", import.meta.url)).then((r) => r.text()),
    ]);
  
    const template = document.createElement("template");
    template.innerHTML = `<style>${css}</style>${html}`;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  
    this.categories = [
      { id: "carnes-rojas", name: "Carnes Rojas", img: "imgs/categories/carnes-rojas.jpg" },
      { id: "carnes-blancas", name: "Carnes Blancas", img: null },
      { id: "pastas", name: "Pastas", img: "imgs/categories/pastas.jpg" },
      { id: "ensaladas", name: "Ensaladas", img: null },
      { id: "sandwiches", name: "Sandwiches", img: "imgs/categories/sandwiches.jpg" },
      { id: "pizzas", name: "Pizzas", img: "imgs/categories/pizzas.jpg" },
      { id: "empanadas", name: "Empanadas", img: null },
    ];
  
    this.isMobile = window.innerWidth < 768;
    this.renderItems();
    this.setupScrollEvents();
  }  

  renderItems() {
    const container = this.shadowRoot.querySelector("#carousel-items");
    container.innerHTML = "";
  
    this.categories.forEach((cat, index) => {
      const item = document.createElement("div");
      item.classList.add(this.isMobile ? "tab-item" : "carousel-item");
      item.dataset.target = cat.id;
  
      if (!this.isMobile) {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-wrapper");
  
        if (cat.img) {
          const img = document.createElement("img");
          img.src = cat.img;
          img.alt = cat.name;
          img.onerror = () => {
            img.style.display = "none";
            fallback.style.display = "flex";
          };
          imageWrapper.appendChild(img);
        }
  
        const fallback = document.createElement("div");
        fallback.className = "fallback-avatar";
        fallback.textContent = this.getInitials(cat.name);
        if (cat.img) fallback.style.display = "none";
        imageWrapper.appendChild(fallback);
        item.appendChild(imageWrapper);
      }
  
      const label = document.createElement("span");
      label.className = "category-name";
      label.textContent = cat.name;
      item.appendChild(label);
  
      item.addEventListener("click", () => {
        document.getElementById(cat.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        this.markActive(index);
      });
  
      container.appendChild(item);
    });
  
    this.markActive(0);
  }  

  markActive(index) {
    const items = this.shadowRoot.querySelectorAll(".carousel-item");
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  getInitials(name) {
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  }

  setupScrollEvents() {
    // futuro: detectar la sección visible y marcar activa
  }
}

customElements.define("category-carousel", CategoryCarousel);
