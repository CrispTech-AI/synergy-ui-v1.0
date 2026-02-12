// vite.config.ts
import { sveltekit } from "file:///home/crisptech/projects/synergy-ui-v1.0/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import { defineConfig } from "file:///home/crisptech/projects/synergy-ui-v1.0/node_modules/vite/dist/node/index.js";
import { viteStaticCopy } from "file:///home/crisptech/projects/synergy-ui-v1.0/node_modules/vite-plugin-static-copy/dist/index.js";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    sveltekit(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/onnxruntime-web/dist/*.jsep.*",
          dest: "wasm"
        }
      ]
    })
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    APP_BUILD_HASH: JSON.stringify(process.env.APP_BUILD_HASH || "dev-build")
  },
  build: {
    sourcemap: true
  },
  worker: {
    format: "es"
  },
  resolve: {
    alias: {
      $app: path.resolve("./src/app"),
      $lib: path.resolve("./src/lib"),
      $routes: path.resolve("./src/routes"),
      $components: path.resolve("./src/lib/components"),
      $utils: path.resolve("./src/lib/utils"),
      $stores: path.resolve("./src/lib/stores")
    }
  },
  server: {
    host: true,
    port: 5173,
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    exclude: ["svelte-confetti"]
  },
  esbuild: {
    pure: process.env.ENV === "dev" ? [] : ["console.log", "console.debug", "console.error"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9jcmlzcHRlY2gvcHJvamVjdHMvc3luZXJneS11aS12MS4wXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9jcmlzcHRlY2gvcHJvamVjdHMvc3luZXJneS11aS12MS4wL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2NyaXNwdGVjaC9wcm9qZWN0cy9zeW5lcmd5LXVpLXYxLjAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgc3ZlbHRla2l0KCksXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgdGFyZ2V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiAnbm9kZV9tb2R1bGVzL29ubnhydW50aW1lLXdlYi9kaXN0LyouanNlcC4qJyxcbiAgICAgICAgICBkZXN0OiAnd2FzbSdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pXG4gIF0sXG4gIGRlZmluZToge1xuICAgIEFQUF9WRVJTSU9OOiBKU09OLnN0cmluZ2lmeShwcm9jZXNzLmVudi5ucG1fcGFja2FnZV92ZXJzaW9uKSxcbiAgICBBUFBfQlVJTERfSEFTSDogSlNPTi5zdHJpbmdpZnkocHJvY2Vzcy5lbnYuQVBQX0JVSUxEX0hBU0ggfHwgJ2Rldi1idWlsZCcpXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiB0cnVlXG4gIH0sXG4gIHdvcmtlcjoge1xuICAgIGZvcm1hdDogJ2VzJ1xuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICRhcHA6IHBhdGgucmVzb2x2ZSgnLi9zcmMvYXBwJyksXG4gICAgICAkbGliOiBwYXRoLnJlc29sdmUoJy4vc3JjL2xpYicpLFxuICAgICAgJHJvdXRlczogcGF0aC5yZXNvbHZlKCcuL3NyYy9yb3V0ZXMnKSxcbiAgICAgICRjb21wb25lbnRzOiBwYXRoLnJlc29sdmUoJy4vc3JjL2xpYi9jb21wb25lbnRzJyksXG4gICAgICAkdXRpbHM6IHBhdGgucmVzb2x2ZSgnLi9zcmMvbGliL3V0aWxzJyksXG4gICAgICAkc3RvcmVzOiBwYXRoLnJlc29sdmUoJy4vc3JjL2xpYi9zdG9yZXMnKVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgaG9zdDogdHJ1ZSxcbiAgICBwb3J0OiA1MTczLFxuICAgIGZzOiB7XG4gICAgICBzdHJpY3Q6IGZhbHNlXG4gICAgfVxuICB9LFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ3N2ZWx0ZS1jb25mZXR0aSddXG4gIH0sXG4gIGVzYnVpbGQ6IHtcbiAgICBwdXJlOiBwcm9jZXNzLmVudi5FTlYgPT09ICdkZXYnID8gW10gOiBbJ2NvbnNvbGUubG9nJywgJ2NvbnNvbGUuZGVidWcnLCAnY29uc29sZS5lcnJvciddXG4gIH1cbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUyxTQUFTLGlCQUFpQjtBQUNwVSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLHNCQUFzQjtBQUMvQixPQUFPLFVBQVU7QUFFakIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1A7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGFBQWEsS0FBSyxVQUFVLFFBQVEsSUFBSSxtQkFBbUI7QUFBQSxJQUMzRCxnQkFBZ0IsS0FBSyxVQUFVLFFBQVEsSUFBSSxrQkFBa0IsV0FBVztBQUFBLEVBQzFFO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sS0FBSyxRQUFRLFdBQVc7QUFBQSxNQUM5QixNQUFNLEtBQUssUUFBUSxXQUFXO0FBQUEsTUFDOUIsU0FBUyxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ3BDLGFBQWEsS0FBSyxRQUFRLHNCQUFzQjtBQUFBLE1BQ2hELFFBQVEsS0FBSyxRQUFRLGlCQUFpQjtBQUFBLE1BQ3RDLFNBQVMsS0FBSyxRQUFRLGtCQUFrQjtBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sSUFBSTtBQUFBLE1BQ0YsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsaUJBQWlCO0FBQUEsRUFDN0I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU0sUUFBUSxJQUFJLFFBQVEsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLGlCQUFpQixlQUFlO0FBQUEsRUFDekY7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
