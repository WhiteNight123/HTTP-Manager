import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/mock": "http://localhost:3000",
      "/wanandroid": {
        target: "https://www.wanandroid.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wanandroid/, ""),
      },
      "/douyin": {
        target: "http://192.168.1.109:8080/douyin",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/douyin/, ""),
      }
    },
    host: "0.0.0.0"
  },
});
