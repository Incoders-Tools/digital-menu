import { initCategorySlider } from "../category-slider/category-slider.js";

let products = [];

document.addEventListener("DOMContentLoaded", async () => {
  const res = await fetch("../../data/products.json");
  
  const jsonData = await res.json();
  products = jsonData.products;

  const html = await fetch("../category-slider/category-slider.html").then(res => res.text());
  document.getElementById("category-slider-container").innerHTML = html;
  initCategorySlider(renderFullMenu);
  renderFullMenu("all");
});


function renderFullMenu(filteredCategory) {
  const container = document.getElementById("full-menu-container");
  container.innerHTML = "";

  const toShow =
    filteredCategory === "all"
      ? products
      : products.filter((p) => p.category === filteredCategory);

  // Agrupar productos por servicio
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
    const title = document.createElement("h2");
    title.className = "section-title";
    title.textContent = servicesMap[service];
    section.appendChild(title);

    // Agrupar por categoría
    const categories = [...new Set(serviceProducts.map((p) => p.category))];
    categories.forEach((category) => {
      const categoryProducts = serviceProducts.filter(
        (p) => p.category === category
      );
      if (categoryProducts.length === 0) return;

      const categoryTitle = document.createElement("h3");
      categoryTitle.className = "subsection-title";
      categoryTitle.textContent = getCategoryName(category);
      section.appendChild(categoryTitle);

      // Agrupar por sección
      const sections = [...new Set(categoryProducts.map((p) => p.section))];
      sections.forEach((sec) => {
        const sectionProducts = categoryProducts.filter(
          (p) => p.section === sec
        );
        if (sectionProducts.length === 0) return;

        const secTitle = document.createElement("h4");
        secTitle.className = "subsection-title";
        secTitle.textContent = sec;
        section.appendChild(secTitle);

        // Agrupar por subSección Uno
        const subSectionsOne = [
          ...new Set(sectionProducts.map((p) => p.subSectionOne)),
        ];
        subSectionsOne.forEach((sub1) => {
          const sub1Products = sectionProducts.filter(
            (p) => p.subSectionOne === sub1
          );
          if (sub1Products.length === 0) return;

          const sub1Title = document.createElement("h5");
          sub1Title.className = "subsection-title";
          sub1Title.textContent = sub1;
          section.appendChild(sub1Title);

          sub1Products.forEach((p) => {
            const card = document.createElement("div");
            card.className = "product-card";

            const name = document.createElement("div");
            name.className = "product-name";
            name.textContent = p.name;
            card.appendChild(name);

            if (p.description) {
              const desc = document.createElement("div");
              desc.className = "product-description";
              desc.textContent = p.description;
              card.appendChild(desc);
            }

            if (p.ingredients) {
              const ingredients = document.createElement("div");
              ingredients.className = "product-ingredients";
              ingredients.textContent = `Ingredientes: ${p.ingredients}`;
              card.appendChild(ingredients);
            }

            const priceSize = document.createElement("div");
            priceSize.className = "product-price-size";
            priceSize.textContent = `${p.price}${p.size ? " - " + p.size : ""}`;
            card.appendChild(priceSize);

            section.appendChild(card);
          });
        });
      });
    });

    container.appendChild(section);
  });
}

function getCategoryName(category) {
  const categoryNames = {
    vegan: "Vegano",
    general: "General",
    WithAlcohol: "Con Alcohol",
    WithoutAlcohol: "Sin Alcohol",
    // Agrega más categorías según sea necesario
  };
  return categoryNames[category] || category;
}
