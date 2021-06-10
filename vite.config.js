import { defineConfig } from "vite";
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
  ],
});
