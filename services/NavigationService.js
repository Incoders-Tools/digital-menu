export class NavigationService {
    constructor() {
        this.currentPage = "home";
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
        this.listeners.forEach(callback => callback(this.currentPage));
    }
}

// Exportamos una única instancia
export const navigationService = new NavigationService();