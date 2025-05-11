export function initCategorySlider(container, onCategorySelected) {
  const sliderItems = container.querySelectorAll(".slide-item");

  sliderItems.forEach((item) => {
    item.addEventListener("click", () => {
      container.querySelector(".slide-item.active")?.classList.remove("active");
      item.classList.add("active");
      const category = item.dataset.category;
      onCategorySelected(category);
    });
  });

  // Init Tiny Slider (solo en pantallas grandes)
  if (window.innerWidth > 768) {
    const sliderElement = container.querySelector(".my-slider");
    if (!sliderElement) {
      console.warn("No se encontró .my-slider en el contenedor proporcionado");
      return;
    }

    tns({
      container: sliderElement,
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
}