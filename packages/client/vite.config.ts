import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import generateFileListPlugin from "./vite-plugin-generate-file-list";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT || 3001,
  },
  build: {
    rollupOptions: {
      input: {
        app: "./index.html",
      },
      output: {
        entryFileNames: assetInfo => {
          return assetInfo.name === "service-worker"
            ? "[name].js"
            : "assets/[name].[hash].js";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  base: "./",
  plugins: [react(), generateFileListPlugin()],
});
