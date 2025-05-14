import { storeConfig } from "../../../config/config.js";
import "../../../components/category-slider/category-slider.js";

class DessertsService extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.products = [];
  }

  async connectedCallback() {
    const [html, css] = await Promise.all([
      fetch(
        import.meta.url.replace("desserts-service.js", "desserts-service.html")
      ).then((res) => res.text()),
      fetch(
        import.meta.url.replace("desserts-service.js", "desserts-service.css")
      ).then((res) => res.text()),
    ]);

    const style = document.createElement("style");
    style.textContent = css;
    this.shadowRoot.innerHTML = html;
    this.shadowRoot.prepend(style);

    // Escuchar evento del slider
    this.shadowRoot
      .querySelector("category-slider")
      ?.addEventListener("categorySelected", (e) => {
        this.renderDesserts(e.detail.category);
      });

    await this.loadProducts();
    this.renderDesserts();
  }

  async loadProducts() {
    const res = await fetch(`${storeConfig.site.url}/data/products.json`);
    const data = await res.json();
    this.products = (data.products || []).filter(
      (p) => p.service === "primary"
    );
  }

  renderDesserts(filteredCategory = "all") {
    const container = this.shadowRoot.querySelector("#desserts-container");
    if (!container) return;

    container.innerHTML = "";

    let filtered = this.products;

    if (filteredCategory !== "all") {
      filtered = filtered.filter((p) => p.category === filteredCategory);
    }

    if (!filtered.length) {
      const message = document.createElement("p");
      message.className = "no-products-message";
      message.textContent = "No hay productos disponibles en esta categoría.";
      container.appendChild(message);
      return;
    }

    const section = document.createElement("section");
    section.innerHTML = `<h2 class="section-title">Postres</h2>`;

    filtered.forEach((p) => {
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
  }
}

customElements.define("desserts-service", DessertsService);
