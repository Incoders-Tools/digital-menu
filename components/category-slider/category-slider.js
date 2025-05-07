export function initCategorySlider(onCategorySelected) {
    const sliderItems = document.querySelectorAll(".slide-item");
  
    sliderItems.forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelector(".slide-item.active")
          ?.classList.remove("active");
        item.classList.add("active");
        const category = item.dataset.category;
        onCategorySelected(category);
      });
    });
  
    // Init Tiny Slider (solo en pantallas grandes)
    if (window.innerWidth > 768) {
      tns({
        container: ".my-slider",
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
  