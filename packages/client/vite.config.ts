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
    __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
    __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
  },
  build: {
    outDir: path.join(__dirname, "dist/client"),
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
  ssr: {
    //@ts-ignore
    format: "cjs",
  },
  plugins: [react(), generateFileListPlugin()],
});
