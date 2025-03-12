import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import CleanPlugin from "vite-plugin-clean";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), CleanPlugin()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  esbuild: {
    loader: "tsx",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/variables.scss";`,
      },
    },
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
    target: "esnext",
  },
});
