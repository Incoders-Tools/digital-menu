import { storeConfig } from "../config/config.js";

export class LoaderService {
    
  static initLoader(type = "general") {
    const loaderConfig =
      storeConfig.site.loader[type] || storeConfig.site.loader.general;
    const loaderContainer = document.getElementById("lottie-loader");
    const loaderText = document.querySelector(".loader-text");

    if (!loaderContainer) {
      console.warn("No se encontró el contenedor del loader (#lottie-loader).");
      return;
    }

    // Limpia animaciones anteriores si las hubiera
    loaderContainer.innerHTML = "";

    if (loaderConfig.animationUrl) {
      lottie.loadAnimation({
        container: loaderContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: loaderConfig.animationUrl,
      });
    }

    if (loaderText) {
      loaderText.textContent = loaderConfig.loadingText || "";
    }
  }

  static showLoader(type = "general") {
    this.initLoader(type);
    const loaderOverlay = document.querySelector(".loader-overlay");
    if (loaderOverlay) {
      loaderOverlay.style.display = "flex";
    } else {
      console.warn("No se encontró .loader-overlay en el DOM.");
    }
  }

  static hideLoader() {
    const loaderOverlay = document.querySelector(".loader-overlay");
    if (loaderOverlay) loaderOverlay.style.display = "none";
  }
}
