import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.join(__dirname, "src/components"),
      "@hooks": path.join(__dirname, "src/hooks"),
      "@interfaces": path.join(__dirname, "src/interfaces"),
      "@UI": path.join(__dirname, "src/UI"),
      "@services": path.join(__dirname, "src/services"),
      "@utils": path.join(__dirname, "src/utils"),
      "@transformers": path.join(__dirname, "src/transformers"),
      "@": path.join(__dirname, "src"),
    },
  }
});
