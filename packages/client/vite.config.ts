import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  build: {
    outDir: path.join(__dirname, "dist/client"),
    rollupOptions: {
      input: {
        app: "./index.html",
      },
      // output: {
      //   entryFileNames: assetInfo => {
      //     return assetInfo.name === "service-worker"
      //       ? "[name].js"
      //       : "assets/[name].[hash].js";
      //   },
      // },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: "./",
  plugins: [
    react(),
    // generateFileListPlugin()
  ],
});
