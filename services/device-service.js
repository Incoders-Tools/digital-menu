export class DeviceService {

    static isMobile() {
        return window.innerWidth <= 768;
    }

    static isTablet() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    }

    static isDesktop() {
        return window.innerWidth > 1024;
    }

    static getDeviceType() {
        if (this.isMobile()) return "mobile";
        if (this.isTablet()) return "tablet";
        return "desktop";
    }
}