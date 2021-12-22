import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'

import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Components({
      resolvers: IconsResolver(),
    }),
    Icons(),
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
