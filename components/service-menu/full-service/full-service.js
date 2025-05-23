import { storeConfig } from "../../../config/config.js";

class FullService extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.products = [];
  }

  async connectedCallback() {
    const [html, css] = await Promise.all([
      fetch(
        import.meta.url.replace("full-service.js", "full-service.html")
      ).then((res) => res.text()),
      fetch(
        import.meta.url.replace("full-service.js", "full-service.css")
      ).then((res) => res.text()),
    ]);

    const style = document.createElement("style");
    style.textContent = css;
    this.shadowRoot.innerHTML = html;
    this.shadowRoot.prepend(style);

    await this.loadProducts();
    this.renderFullMenu("all");
  }

  async loadProducts() {
    const res = await fetch(`${storeConfig.site.url}/data/products.json`);
    const data = await res.json();
    this.products = data.products || [];
  }

  renderFullMenu(filteredCategory) {
    const container = this.shadowRoot.querySelector("#full-menu-container");
    if (!container) return;

    container.innerHTML = "";

    const filtered =
      filteredCategory === "all"
        ? this.products
        : this.products.filter((p) => p.category === filteredCategory);

    const servicesOrder = ["starter", "main", "drink", "dessert"];
    const servicesMap = {
      starter: "Entradas",
      drink: "Bebidas",
      main: "Platos Principales",
      dessert: "Postres",
    };

    servicesOrder.forEach((service) => {
      const serviceProducts = filtered.filter((p) => p.service === service);
      if (!serviceProducts.length) return;

      const section = document.createElement("section");
      section.innerHTML = `<h2 class="section-title">${servicesMap[service]}</h2>`;

      serviceProducts.forEach((p) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <div class="product-name">${p.name}</div>
          ${
            p.description
              ? `<div class="product-description">${p.description}</div>`
              : ""
          }
          ${
            p.ingredients
              ? `<div class="product-ingredients">Ingredientes: ${p.ingredients}</div>`
              : ""
          }
          <div class="product-price-size">${p.price}${
          p.size ? " - " + p.size : ""
        }</div>
        `;
        section.appendChild(card);
      });

      container.appendChild(section);
    });
  }
}

customElements.define("full-service", FullService);
