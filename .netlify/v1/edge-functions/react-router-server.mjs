
    export { default } from "../../../build/server/server.js";

    export const config = {
      name: "React Router server handler",
      generator: "@netlify/vite-plugin-react-router@2.1.3",
      cache: "manual",
      path: "/*",
      excludedPath: ["/.netlify/*","/favicon.ico","/jfaac-logo.png","/.vite/manifest.json","/assets/chunk-EPOLDU6W-BE_pzx_j.js","/assets/entry.client-C1BAS7CP.js","/assets/home-Df-0nEj8.js","/assets/manifest-9c5d2c34.js","/assets/root-BLXU2-87.css","/assets/root-isWWm2zK.js","/assets/SundayServiceSection-BoIbvvR_.js"],
    };
    