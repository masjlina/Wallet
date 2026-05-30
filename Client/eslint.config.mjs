// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import {defineConfig} from "eslint/config";
import * as tsEslint from "typescript-eslint";

export default defineConfig([{
    ignores: [
        "dist",
        "node_modules",
        "build"
    ]
},
    js.configs.recommended,
    react.configs.flat.recommended,
    ...tsEslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],

        languageOptions: {
            globals: globals.browser,
            parser: tsEslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            }
        },

        settings: {
            react: {
                version: "detect"
            }
        },

        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off"
        }
    },
    {
        files: ["vite.config.js"],
        languageOptions: {
            globals: globals.node
        }
    },
    ...storybook.configs["flat/recommended"]
]);