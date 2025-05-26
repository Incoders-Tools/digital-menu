const DeviceService = {
  isMobile() {
    return window.innerWidth <= 768;
  },
  isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  },
  isDesktop() {
    return window.innerWidth > 1024;
  },
  getDeviceType() {
    if (this.isMobile()) return "mobile";
    if (this.isTablet()) return "tablet";
    return "desktop";
  },
};

export default DeviceService;
