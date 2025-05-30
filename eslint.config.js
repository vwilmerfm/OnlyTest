import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node  // Añadir soporte para Node.js
      }
    }
  },
  pluginJs.configs.recommended
];
