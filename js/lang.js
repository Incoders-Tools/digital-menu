export async function loadLanguage(lang) {
    const res = await fetch(`assets/i18n/${lang}.json`);
    const translations = await res.json();
    applyTranslations(translations);
    localStorage.setItem("selectedLang", lang);
    document.getElementById("current-flag").src = `flags/${lang}.svg`;
}

function applyTranslations(translations) {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}