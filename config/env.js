// config/env.js

const hostname = window.location.hostname;
const pathname = window.location.pathname;

let ENV = "prod";

if (hostname === "127.0.0.1" || hostname === "localhost") {
  ENV = "local";
} else if (hostname.includes("dev.") || pathname.includes("/dev/")) {
  ENV = "dev";
}

export { ENV };
