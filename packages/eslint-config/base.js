import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import globals from "globals"

/**
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      }
    }
  },
  stylistic.configs.recommended,
  {
    ignores: ["dist/**", ".next/**", "node_modules/**"],
  },
];
