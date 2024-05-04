//wrapper around index.js to use ES6 modules
import cjsModule from './index.cjs';

export const create_pdf = cjsModule.create_pdf;
export const configure_module = cjsModule.configure_module;

export default cjsModule