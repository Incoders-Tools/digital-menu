import "./components/header/header.js";
import "./components/footer/footer.js";
import "./components/mobile-navbar/mobile-navbar.js";
import "./components/service-menu/service-menu.js";
import "./components/language-selector/language-selector.js";
import "./components/service-menu/full-service/full-service.js";
import "./components/service-menu/starters-service/starters-service.js";
import "./components/service-menu/main-service/main-service.js";
import "./components/service-menu/drinks-service/drinks-service.js";
import "./components/service-menu/desserts-service/desserts-service.js";

import TranslationService from "./assets/i18n/translationService.js";
import { navigationService } from './services/navigation-service.js';

// Cargar idioma y traducir la página
await TranslationService.loadTranslations();
TranslationService.translatePage();

document.addEventListener("translationsReady", () => {
  TranslationService.translatePage();
});

// SPA loader
window.loadPage = function (componentName) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  const comp = document.createElement(componentName);
  mainContent.appendChild(comp);

  // Actualizar estado de navegación
  const isHome = componentName === "service-menu";
  navigationService.setCurrentPage(isHome ? "home" : componentName);
};
