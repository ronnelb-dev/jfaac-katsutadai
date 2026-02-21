
    export { default } from "../../../build/server/server.js";

    export const config = {
      name: "React Router server handler",
      generator: "@netlify/vite-plugin-react-router@2.1.3",
      cache: "manual",
      path: "/*",
      excludedPath: ["/.netlify/*","/favicon.ico","/jfaac-logo.png","/.vite/manifest.json","/assets/chunk-EPOLDU6W-BE_pzx_j.js","/assets/entry.client-C1BAS7CP.js","/assets/home-Df-0nEj8.js","/assets/manifest-d0817d57.js","/assets/root-C9nDtA4S.css","/assets/root-ieyPC8ZT.js","/assets/SundayServiceSection-BoIbvvR_.js"],
    };
    