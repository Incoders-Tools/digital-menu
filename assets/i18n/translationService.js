const TranslationService = (() => {
  let currentLang = localStorage.getItem("selectedLanguage") || "en";
  let translations = {};

  const loadTranslations = async (lang = currentLang) => {
    try {
      const res = await fetch(`/assets/i18n/${lang}.json`);
      translations = await res.json();
      currentLang = lang;
      localStorage.setItem("selectedLanguage", lang);
      document.dispatchEvent(
        new CustomEvent("translationsReady", {
          detail: { lang, translations },
        })
      );
    } catch (err) {
      console.error("Error cargando traducciones:", err);
    }
  };

  const t = (key) => translations[key] || key;

  const translatePage = () => {
    translateElementTree(document);
  };

  const translateElementTree = (root) => {
    if (!root) return;
    root.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Repetir para los shadow roots de los custom elements
    root.querySelectorAll("*").forEach((el) => {
      if (el.shadowRoot) {
        translateElementTree(el.shadowRoot);
      }
    });
  };

  const changeLanguage = async (lang) => {
    if (lang !== currentLang) {
      await loadTranslations(lang);
      translatePage();
    }
  };

  return {
    loadTranslations,
    translatePage,
    t,
    changeLanguage,
    getCurrentLang: () => currentLang,
  };
})();

export default TranslationService;
