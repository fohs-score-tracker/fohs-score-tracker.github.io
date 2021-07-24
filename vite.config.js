import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import Vue from "@vitejs/plugin-vue";
import Components from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
    VitePWA({
      mode: "development",
      filename: "service-worker.js",
      manifest: {
        // content of manifest
        mode: "development",
        base: "/",
        icons: [
          {
            src: "/manifest-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/manifest-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
      },
    }),
  ],
});
