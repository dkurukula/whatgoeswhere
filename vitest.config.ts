import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ["node_modules"],
    setupFiles: "./test/utils/setup.ts",
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
