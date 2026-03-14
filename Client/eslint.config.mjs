import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import {defineConfig} from "eslint/config";

export default defineConfig([

    {
        ignores: [
            "dist",
            "node_modules",
            "build"
        ]
    },
    js.configs.recommended,

    react.configs.flat.recommended,

    {
        files: ["**/*.{js,jsx}"],

        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {jsx: true}
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
    }

]);