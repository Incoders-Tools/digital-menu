const template = document.createElement('template');

Promise.all([
  fetch(new URL('./service-menu.html', import.meta.url)).then(r => r.text()),
  fetch(new URL('./service-menu.css', import.meta.url)).then(r => r.text()),
  new URL('./full-service/full-service.png', import.meta.url),
  new URL('./drinks-service/drink-service.png', import.meta.url)
]).then(([html, css, fullServiceIcon, drinksIcon]) => {
  const startersIcon = 'https://cdn-icons-png.flaticon.com/512/706/706195.png';
  const dessertsIcon = 'https://cdn-icons-png.flaticon.com/512/3514/3514243.png';
  const mainCoursesIcon = 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png';

  template.innerHTML = `
    <style>${css}</style>
    ${html
      .replace('__FULL_SERVICE__', fullServiceIcon)
      .replace('__DRINKS__', drinksIcon)
      .replace('__STARTERS__', startersIcon)
      .replace('__DESSERTS__', dessertsIcon)
      .replace('__MAIN_COURSES__', mainCoursesIcon)
    }
  `;
});

class ServiceMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.menuExpanded = false;
    this.isMobile = window.matchMedia("(max-width: 600px)").matches;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  connectedCallback() {
    if (!template.innerHTML) {
      setTimeout(() => this.connectedCallback(), 50);
      return;
    }

    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.setupEventListeners();
    window.addEventListener('resize', this.handleResize.bind(this));
    document.addEventListener('click', this.handleDocumentClick);
  }

  setupEventListeners() {
    const container = this.shadowRoot.querySelector('.all');
    const fullService = this.shadowRoot.querySelector('.full-service');
    const explainer = fullService.querySelector('.explainer');
    const fullServiceText = fullService.querySelector('.text');

    fullService.addEventListener('mouseenter', () => {
      if (!this.isMobile) {
        fullServiceText.textContent = this.getTranslation('menu.full_menu');
      }
    });

    fullService.addEventListener('mouseleave', () => {
      if (!this.isMobile) {
        fullServiceText.textContent = this.getTranslation('menu.explore_menu');
      }
    });

    fullService.addEventListener('click', (e) => {
      if (this.isMobile) {
        if (!this.menuExpanded) {
          container.classList.add('menu-expanded');
          this.menuExpanded = true;
          e.preventDefault();
          fullServiceText.textContent = this.getTranslation('menu.full_menu');
        } else {
          container.classList.remove('menu-expanded');
          this.menuExpanded = false;
          this.navigateTo('full-service');
        }
      } else {
        this.navigateTo('full-service');
      }
    });

    const menuItems = [
      { selector: '.starters', page: 'starters-service' },
      { selector: '.main-courses', page: 'main-courses-service' },
      { selector: '.drinks', page: 'drinks-service' },
      { selector: '.desserts', page: 'desserts-service' },
    ];

    menuItems.forEach(item => {
      const element = this.shadowRoot.querySelector(item.selector);
      element.addEventListener('click', () => {
        if (!this.isMobile || this.menuExpanded) {
          this.navigateTo(item.page);
        }
      });
    });
  }

  handleDocumentClick(e) {
    if (!this.isMobile || !this.menuExpanded) return;

    const isClickInside = this.contains(e.target) || this.shadowRoot.contains(e.target);
    if (!isClickInside) {
      const container = this.shadowRoot.querySelector('.all');
      container.classList.remove('menu-expanded');
      this.menuExpanded = false;

      const fullServiceText = this.shadowRoot.querySelector('.full-service .text');
      fullServiceText.textContent = this.getTranslation('menu.explore_menu');
    }
  }

  handleResize() {
    const wasDesktop = !this.isMobile;
    this.isMobile = window.matchMedia("(max-width: 600px)").matches;

    if (wasDesktop && this.isMobile) {
      const container = this.shadowRoot.querySelector('.all');
      container.classList.remove('menu-expanded');
      this.menuExpanded = false;
    }
  }

  getTranslation(key) {
    const el = this.shadowRoot.querySelector(`[data-i18n="${key}"]`);
    return el?.textContent || '';
  }

  navigateTo(page) {
    if (typeof window.loadPage === 'function') {
      window.loadPage(page);
    } else {
      console.warn(`Navigation to ${page} requested, but loadPage function is not available`);
    }
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleDocumentClick);
  }
}

customElements.define('service-menu', ServiceMenu);