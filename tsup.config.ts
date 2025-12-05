import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  format: ["esm"],
  dts: true,     // gerar .d.ts
  sourcemap: true,
  clean: true,
  target: "es2022",
  outDir: "dist",
  minify: false,
  splitting: false,
  shims: false
});
