export class FullService extends HTMLElement {
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
    this.shadowRoot.prepend(style); // Inyecta estilos primero

    await this.loadProducts();
    this.renderFullMenu("all");
    const { initCategorySlider } = await import(
      "../../category-slider/category-slider.js"
    );
    initCategorySlider(
      this.shadowRoot.querySelector("#category-slider-container"),
      this.renderFullMenu.bind(this)
    );
  }

  async loadProducts() {
    const res = await fetch("../../../data/products.json");
    const jsonData = await res.json();
    this.products = jsonData.products;
  }

  renderFullMenu(filteredCategory) {
    const container = this.shadowRoot.querySelector("#full-menu-container");
    container.innerHTML = "";

    const toShow =
      filteredCategory === "all"
        ? this.products
        : this.products.filter((p) => p.category === filteredCategory);

    const servicesOrder = ["primary", "drink", "principal", "dessert"];
    const servicesMap = {
      primary: "Entradas",
      drink: "Bebidas",
      principal: "Platos Principales",
      dessert: "Postres",
    };

    servicesOrder.forEach((service) => {
      const serviceProducts = toShow.filter((p) => p.service === service);
      if (serviceProducts.length === 0) return;

      const section = document.createElement("section");
      section.innerHTML = `<h2 class="section-title">${servicesMap[service]}</h2>`;

      const categories = [...new Set(serviceProducts.map((p) => p.category))];
      categories.forEach((category) => {
        const catTitle = document.createElement("h3");
        catTitle.className = "subsection-title";
        catTitle.textContent = this.getCategoryName(category);
        section.appendChild(catTitle);

        const categoryProducts = serviceProducts.filter(
          (p) => p.category === category
        );
        const sections = [...new Set(categoryProducts.map((p) => p.section))];

        sections.forEach((sec) => {
          const secTitle = document.createElement("h4");
          secTitle.className = "subsection-title";
          secTitle.textContent = sec;
          section.appendChild(secTitle);

          const sectionProducts = categoryProducts.filter(
            (p) => p.section === sec
          );
          const subSectionsOne = [
            ...new Set(sectionProducts.map((p) => p.subSectionOne)),
          ];

          subSectionsOne.forEach((sub1) => {
            const sub1Title = document.createElement("h5");
            sub1Title.className = "subsection-title";
            sub1Title.textContent = sub1;
            section.appendChild(sub1Title);

            sectionProducts
              .filter((p) => p.subSectionOne === sub1)
              .forEach((p) => {
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
          });
        });
      });

      container.appendChild(section);
    });
  }

  getCategoryName(category) {
    const categoryNames = {
      vegan: "Vegano",
      general: "General",
      WithAlcohol: "Con Alcohol",
      WithoutAlcohol: "Sin Alcohol",
    };
    return categoryNames[category] || category;
  }
}

customElements.define("full-service", FullService);
