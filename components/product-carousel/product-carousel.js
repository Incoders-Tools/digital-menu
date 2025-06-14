import { BaseComponent } from "../base/base-component.js";

class ProductCarousel extends BaseComponent {
  constructor() {
    super();
    this.products = [];
  }

  async onConnected() {
    await this.loadTemplate(import.meta.url);
  }

  setProducts(products) {
    this.products = products;
    this.renderCarousel();
  }

  renderCarousel() {
    const container = this.shadowRoot.querySelector(".carousel-inner");
    if (!container || !this.products.length) return;

    container.innerHTML = "";

    this.products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "carousel-card";

      card.innerHTML = `
        <img class="product-image" src="${
          product.image || "/assets/img/placeholder-dessert.jpg"
        }" alt="${product.name}" />
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          ${
            product.description
              ? `<div class="product-description">${product.description}</div>`
              : ""
          }
          ${
            product.ingredients
              ? `<div class="product-ingredients">Ingredientes: ${product.ingredients}</div>`
              : ""
          }
          <div class="product-price-size">${product.price}${
        product.size ? " - " + product.size : ""
      }</div>
        </div>
      `;

      container.appendChild(card);
    });
  }
}

customElements.define("product-carousel", ProductCarousel);
