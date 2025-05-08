import { ENV } from "./env.js";

let storeConfig, apiConfig;

switch (ENV) {
  case "dev":
    ({ storeConfig, apiConfig } = await import("./config.dev.js"));
    break;
  case "local":
    ({ storeConfig, apiConfig } = await import("./config.local.js"));
    break;
  case "prod":
  default:
    ({ storeConfig, apiConfig } = await import("./config.prod.js"));
    break;
}

export { storeConfig, apiConfig };