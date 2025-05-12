class ServiceMenu extends HTMLElement {
  constructor() {
    super();
    this.menuExpanded = false;
    this.isMobile = window.matchMedia("(max-width: 600px)").matches;
  }

  connectedCallback() {
    const fullServiceIcon = new URL('./full-service/full-service.png', import.meta.url);
    const drinksIcon = new URL('./drinks-service/drink-service.png', import.meta.url);
    const mainCoursesIcon = 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png';
    const startersIcon = 'https://cdn-icons-png.flaticon.com/512/706/706195.png';
    const dessertsIcon = 'https://cdn-icons-png.flaticon.com/512/3514/3514243.png';
    
    // Crear el shadow DOM
    this.attachShadow({ mode: "open" });

    // Crear y añadir los estilos
    const style = document.createElement("style");
    style.textContent = `
    .all {
      position: relative;
      width: 90vw;
      max-width: 500px;
      height: 90vw;
      max-height: 500px;
      margin: 5vh auto;
      perspective: 1000px;
    }

    .starters, .main-courses, .drinks, .desserts {
      width: 40%;
      height: 25%;
      transform-style: preserve-3d;
      border-radius: 10px;
      border: 1px solid #fff;
      box-shadow: 0 0 20px 5px rgba(100, 100, 255, .3);
      opacity: 0;
      transition: opacity 2s ease-in-out, transform 1.2s ease-in-out;
      pointer-events: none;
      position: absolute;
      background-position: center center;
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #58d;
      background-blend-mode: color-burn;
      cursor: pointer;
    }

    .text {
      transform: translateY(30px);
      opacity: 0;
      transition: all 0.6s ease-in-out;
      bottom: 0;
      left: 5px;
      position: absolute;
      color: #fff;
      text-shadow: 0 0 5px rgba(100, 100, 255, .6);
    }

    .full-service {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
      background-image: url(${fullServiceIcon});
      width: 40%;
      height: 25%;
      border-radius: 10px;
      border: 1px solid #fff;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      background-color: #58d;
      background-blend-mode: color-burn;
      cursor: pointer;
      transition: box-shadow 0.3s ease-in-out;
    }

    .full-service:hover {
      box-shadow: 0 0 30px 10px rgba(100, 100, 255, .6);
    }

    /* Aplicar estas clases solo en desktop */
    @media screen and (min-width: 601px) {
      .full-service:hover ~ .starters,
      .full-service:hover ~ .main-courses,
      .full-service:hover ~ .drinks,
      .full-service:hover ~ .desserts {
        opacity: 1;
        pointer-events: auto;
      }

      .full-service:hover ~ .starters .text,
      .full-service:hover ~ .main-courses .text,
      .full-service:hover ~ .drinks .text,
      .full-service:hover ~ .desserts .text {
        opacity: 1;
        transform: translateY(0px);
      }

      .full-service:hover .explainer {
        opacity: 0;
      }
    }

    /* Clase específica para móvil cuando está expandido */
    .menu-expanded .starters,
    .menu-expanded .main-courses,
    .menu-expanded .drinks,
    .menu-expanded .desserts {
      opacity: 1;
      pointer-events: auto;
    }

    .menu-expanded .starters .text,
    .menu-expanded .main-courses .text,
    .menu-expanded .drinks .text,
    .menu-expanded .desserts .text {
      opacity: 1;
      transform: translateY(0px);
    }

    .menu-expanded .explainer {
      opacity: 0;
    }

    .explainer {
      font-weight: 300;
      font-size: 2rem;
      color: #fff;
      transition: opacity 0.5s ease-in-out;
      width: 100%;
      height: 100%;
      background-color: #303050;
      background-image: radial-gradient(circle at center top, #cce, #33a);
      border-radius: 10px;
      text-shadow: 0 0 10px rgba(255, 255, 255, .8);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .starters {
      bottom: -1%;
      left: 50%;
      transform: translate(-50%, 0) translateZ(-50px) rotateX(10deg);
      background-image: url(${startersIcon});
    }

    .main-courses {
      top: 50%;
      left: -15%;
      transform: translate(0, -50%) translateZ(-25px) rotateY(-5deg);
      background-image: url(${mainCoursesIcon});
    }

    .drinks {
      top: 50%;
      right: -15%;
      transform: translate(0, -50%) translateZ(-25px) rotateY(5deg);
      background-image: url(${drinksIcon});
    }

    .desserts {
      top: -1%;
      left: 50%;
      transform: translate(-50%, 0) translateZ(-50px) rotateX(-10deg);
      background-image: url(${dessertsIcon});
    }

    @media screen and (max-width: 600px) {
      .text {
        font-size: 0.8rem;
      }

      .explainer {
        font-size: 1.2rem;
        padding: 0.5rem;
      }

      .full-service, .starters, .main-courses, .drinks, .desserts {
        width: 40%;
        height: 25%;
        box-shadow: 0 0 10px 3px rgba(100, 100, 255, .2);
      }
    }`;

    // Añadir los estilos al shadow DOM
    this.shadowRoot.appendChild(style);

    // Crear el HTML del componente
    const container = document.createElement('div');
    container.className = 'all';
    container.innerHTML = `
      <div class="full-service">
        <div class="explainer"><span data-i18n="menu.explore_menu">Explore Menu</span></div>
        <div class="text" data-i18n="menu.full_menu">Full Menu</div>
      </div>
      <div class="desserts">
        <div class="text" data-i18n="menu.desserts">Desserts</div>
      </div>
      <div class="drinks">
        <div class="text" data-i18n="menu.drinks">Drinks</div>
      </div>
      <div class="main-courses">
        <div class="text" data-i18n="menu.main_courses">Main Courses</div>
      </div>
      <div class="starters">
        <div class="text" data-i18n="menu.starters">Starters</div>
      </div>
    `;

    // Añadir el contenedor al shadow DOM
    this.shadowRoot.appendChild(container);

    // Configurar escuchadores de eventos
    this.setupEventListeners();

    // Escuchar cambios en el tamaño de la ventana para responder a cambios entre móvil y desktop
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  setupEventListeners() {
    const container = this.shadowRoot.querySelector('.all');
    const fullService = this.shadowRoot.querySelector('.full-service');
    const explainer = this.shadowRoot.querySelector('.explainer');
    
    // Manejar click en el botón principal
    fullService.addEventListener('click', (e) => {
      if (this.isMobile) {
        // En móvil, alternar la expansión del menú
        if (!this.menuExpanded) {
          container.classList.add('menu-expanded');
          this.menuExpanded = true;
          e.preventDefault(); // Prevenir navegación directa en el primer clic
        } else {
          // Si ya está expandido, permitir la navegación al full-service
          container.classList.remove('menu-expanded');
          this.menuExpanded = false;
          this.navigateTo('full-service');
        }
      } else {
        // En desktop, navegar directamente
        this.navigateTo('full-service');
      }
    });

    // Configurar eventos para las opciones de menú
    const menuItems = [
      { selector: '.starters', page: 'starters-service' },
      { selector: '.main-courses', page: 'main-courses-service' },
      { selector: '.drinks', page: 'drinks-service' },
      { selector: '.desserts', page: 'desserts-service' }
    ];

    menuItems.forEach(item => {
      const element = this.shadowRoot.querySelector(item.selector);
      element.addEventListener('click', () => {
        // Solo navegar si el menú está expandido en móvil o si estamos en desktop
        if (!this.isMobile || this.menuExpanded) {
          this.navigateTo(item.page);
        }
      });
    });
  }

  // Manejar los cambios de tamaño de ventana
  handleResize() {
    const wasDesktop = !this.isMobile;
    this.isMobile = window.matchMedia("(max-width: 600px)").matches;
    
    // Si cambiamos de desktop a móvil, necesitamos restablecer el estado
    if (wasDesktop && this.isMobile) {
      const container = this.shadowRoot.querySelector('.all');
      container.classList.remove('menu-expanded');
      this.menuExpanded = false;
    }
  }

  // Función para navegar a diferentes páginas
  navigateTo(page) {
    if (typeof window.loadPage === 'function') {
      window.loadPage(page);
    } else {
      console.log(`Navigation to ${page} requested, but loadPage function is not available`);
    }
  }

  disconnectedCallback() {
    // Limpiar los event listeners cuando el componente se elimina
    window.removeEventListener('resize', this.handleResize);
  }
}

// Definir el componente personalizado
customElements.define("service-menu", ServiceMenu);