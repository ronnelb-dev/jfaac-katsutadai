import { reactRouter } from "@react-router/dev/vite";
import { vercelPreset } from "@vercel/react-router/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [
    tailwindcss(),
    reactRouter({ presets: [vercelPreset()] }),
  ],
});