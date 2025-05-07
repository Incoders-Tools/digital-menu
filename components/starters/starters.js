import { initCategorySlider } from "../category-slider/category-slider.js";

const products = [
  { name: "Bruschetta", category: "vegan" },
  { name: "Garlic Bread", category: "vegan" },
  { name: "Chicken Wings", category: "all" },
  { name: "Cheese Sticks", category: "gluten-free" },
];

function renderProducts(filteredCategory) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  const toShow = filteredCategory === "all"
    ? products
    : products.filter(p => p.category === filteredCategory);

  toShow.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.textContent = p.name;
    container.appendChild(card);
  });
}


document.addEventListener("DOMContentLoaded", () => {

  // Init category slider
  fetch("../category-slider/category-slider.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("category-slider-container").innerHTML = html;
      initCategorySlider(renderProducts);
      renderProducts("all");
    });
});