class NavigationService {
  constructor() {
    this.currentPage = "home"; // por defecto al inicio
    this.listeners = new Set();
  }

  setCurrentPage(page) {
    this.currentPage = page;
    this.notify();
  }

  isHome() {
    return this.currentPage === "home";
  }

  onPageChange(callback) {
    this.listeners.add(callback);
  }

  notify() {
    this.listeners.forEach((callback) => callback(this.currentPage));
  }
}

const navigationService = new NavigationService();
export default navigationService;
