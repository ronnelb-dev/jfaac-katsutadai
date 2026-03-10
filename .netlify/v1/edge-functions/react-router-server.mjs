
    export { default } from "../../../build/server/nodejs_eyJydW50aW1lIjoibm9kZWpzIn0/server.js";

    export const config = {
      name: "React Router server handler",
      generator: "@netlify/vite-plugin-react-router@2.1.3",
      cache: "manual",
      path: "/*",
      excludedPath: ["/.netlify/*"],
    };
    