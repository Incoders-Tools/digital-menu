import { initCategorySlider } from "../category-slider/category-slider.js";

const products = [
  {
    name: "Bruschetta",
    description: "Brusquetas de jamon y queso con relleno de pistallos salteados al ajillo cocinados al vapor en reduccion de vino blanco",
    service: "primary",
    category: "vegan",
    subcategory: "",
    section: "Calientes",
    subSectionOne: "",
    subSectionTwo: "",
    sectionObservations: "",
    price: "15 USD",
    size: "",
    ingredients: "harina de mandioca, azucar, jamon y queso, ajo y aceite de oliva",
  },
  {
    name: "Tortilla",
    description: "Tortilla de cebolla caramelizada con miel",
    service: "primary",
    category: "general",
    subcategory: "",
    section: "Frios",
    subSectionOne: "",
    subSectionTwo: "",
    sectionObservations: "",
    price: "15 USD",
    size: "",
    ingredients: "Cebolla, huevo, aceite de girasol, miel",
  },
  {
    name: "Bife de chorizo",
    description: "Bife de chorizo a la parrilla cocinado al quebracho colorado",
    service: "principal",
    category: "general",
    subcategory: "",
    section: "Carnes",
    subSectionOne: "Vaca",
    subSectionTwo: "Pollo",
    sectionObservations: "Todos los platos salen con papas fritas o ensalada",
    price: "20 USD",
    size: "",
    ingredients: "Carne, aceite de oliva, chimichurri",
  },
  {
    name: "Ruttini Reserva",
    description: "Vino Mendocino cosecha nocturna",
    service: "drink",
    category: "WithAlcohol",
    subcategory: "",
    section: "Wines",
    subSectionOne: "Tinto",
    subSectionTwo: "",
    sectionObservations: "Descorche 18 USD",
    price: "15 USD",
    size: "",
    ingredients: "uva uva, uva y roble, y ciruela y ciruela, y pera nocturna",
  },
  {
    name: "Coca-Cola",
    description: "",
    service: "drink",
    category: "WithoutAlcohol",
    subcategory: "",
    section: "",
    subSectionOne: "",
    subSectionTwo: "",
    sectionObservations: "",
    price: "15 USD",
    size: "",
    ingredients: "",
  },
  {
    name: "Cerveza Patagonica",
    description: "Exquisita cerveza elaborada en Bariloche",
    service: "drink",
    category: "WithAlcohol",
    subcategory: "",
    section: "Cervezas",
    subSectionOne: "Artesanales",
    subSectionTwo: "Industriales",
    sectionObservations: "",
    price: "15 USD",
    size: "",
    ingredients: "lupulo lupulo y maltaaaaa",
  },
  {
    name: "Pizza de Anana",
    description: "Anana caramelizada con miel",
    service: "principal",
    category: "general",
    subcategory: "",
    section: "Carnes",
    subSectionOne: "Vaca",
    subSectionTwo: "Pollo",
    sectionObservations: "Todos los platos salen con papas fritas o ensalada",
    price: "20 USD",
    size: "Big",
    ingredients: "Harina 000, Agua, Anana, Oregano, Aceite de Oliva, Miel",
  },
  {
    name: "BQ Burger",
    description: "Hamburguesa de cerdo a la bbq",
    service: "principal",
    category: "general",
    subcategory: "",
    section: "Burgers",
    subSectionOne: "Vaca",
    subSectionTwo: "Pollo",
    sectionObservations: "Todas las hamburguesas salen con frita",
    price: "28 USD",
    size: "Double",
    ingredients: "500g de carne picada",
  },
];

function renderProducts(filteredCategory) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  const toShow =
    filteredCategory === "all"
      ? products
      : products.filter((p) => p.category === filteredCategory);

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
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("category-slider-container").innerHTML = html;
      initCategorySlider(renderProducts);
      renderProducts("all");
    });
});
