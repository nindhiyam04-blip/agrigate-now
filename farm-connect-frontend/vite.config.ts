// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import type { Plugin, PluginOption, UserConfig } from "vite";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

function isVitePlugin(value: PluginOption): value is Plugin {
  return (
    value != null &&
    typeof value !== "boolean" &&
    !Array.isArray(value) &&
    typeof value === "object" &&
    "name" in value
  );
}

function disableTanstackDevtoolsSourceInjection() {
  return {
    name: "disable-tanstack-devtools-source-injection",
    config(config: UserConfig) {
      return {
        plugins: Array.isArray(config.plugins)
          ? config.plugins.filter(
              (plugin): plugin is Plugin => isVitePlugin(plugin) && plugin.name !== "@tanstack/devtools:inject-source",
            )
          : config.plugins,
      };
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [disableTanstackDevtoolsSourceInjection()],
  },
});
