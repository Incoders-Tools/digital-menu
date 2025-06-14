import { storeConfig } from "../config/config.js";

export class FeatureService {
  static showProductCarouselFor(componentName) {
    const key = componentName.charAt(0).toLowerCase() + componentName.slice(1); // e.g., "DessertsService" -> "dessertsService"
    const isVisible =
      storeConfig?.features?.productCarousel?.visibility?.[key] === true;

    if (!isVisible) {
      console.warn(`❌ Carrusel desactivado para: ${componentName}`);
    } else {
      console.log(`✅ Carrusel activado para: ${componentName}`);
    }

    return isVisible;
  }

  static setCarouselProducts(componentInstance, products = []) {
    const componentName = componentInstance.constructor.name;

    if (!this.showProductCarouselFor(componentName)) return;

    const carousel =
      componentInstance.shadowRoot.querySelector("product-carousel");

    if (carousel) {
      const featured = products.slice(0, 5); // lógica común
      carousel.setProducts(featured);
    }
  }
}
