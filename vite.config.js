import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Components from "vite-plugin-components";
import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      customComponentResolvers: ViteIconsResolver(),
    }),
    ViteIcons(),
    VitePWA({
      includeAssets: ["/favicon.svg", "/assets/*"],
      manifest: {
        background_color: "#A80C04",
        display: "standalone",
        name: "FOHS ScoreTracker",
        short_name: "ScoreTracker",
        icons: [
          {
            src: "/pwaicon.png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
});
