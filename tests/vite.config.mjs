import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export default defineConfig({
  configFile: false,
  resolve: {
    alias: {
      "@interfaces": path.join(root, "src/interfaces"),
    },
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.join(root, "src/services/supabase/service.ts"),
      formats: ["es"],
      fileName: () => "comment-service.mjs",
    },
    outDir: path.join(root, "tests/.cache"),
    rollupOptions: {
      external: ["@supabase/supabase-js"],
    },
  },
});
