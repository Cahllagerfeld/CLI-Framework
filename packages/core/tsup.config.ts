import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	splitting: true,
	minify: true,
	bundle: true,
	dts: true,
	clean: true
});
