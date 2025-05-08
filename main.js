import { storeConfig } from './config/config.js';
import './components/header/header.js';
import './components/language-selector/language-selector.js';

console.log('Entorno activo:', storeConfig.site.url);