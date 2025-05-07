let cssLoaded = false;

export async function initLanguageSelector(containerId = 'language-selector') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Cargar CSS solo una vez
    if (!cssLoaded) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = './components/language-selector/language-selector.css';
        document.head.appendChild(link);
        cssLoaded = true;
    }

    // Cargar HTML
    const html = await fetch('./components/language-selector/language-selector.html')
        .then(res => res.text());

    container.innerHTML = html;

    // Inicializar lógica
    setupEvents(container);
    const savedLang = localStorage.getItem('selectedLang') || 'es';
    await setLanguage(container, savedLang);
}

function setupEvents(container) {
    const langButton = container.querySelector('#language-button');
    const overlay = container.querySelector('#language-overlay');

    langButton.addEventListener('click', () => {
        overlay.style.display = 'flex';
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    const options = container.querySelectorAll('[data-lang]');
    options.forEach(option => {
        option.addEventListener('click', async () => {
            const lang = option.dataset.lang;
            await setLanguage(container, lang);
            overlay.style.display = 'none';
        });
    });
}

async function setLanguage(container, lang) {
    const flag = container.querySelector('#current-flag');
    flag.src = `./components/language-selector/flags/${lang}.svg`;
    localStorage.setItem('selectedLang', lang);

    const res = await fetch(`assets/i18n/${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
}