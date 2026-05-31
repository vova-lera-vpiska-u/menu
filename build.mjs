// Vercel Build Output API generator.
// Bundles the TypeScript Express app into a single serverless function so the
// `.ts` import specifiers are resolved at build time (Vercel's per-file
// transpile would otherwise fail to resolve them at runtime).
import { build } from "esbuild";
import { mkdirSync, writeFileSync } from "node:fs";

const fnDir = ".vercel/output/functions/index.func";
mkdirSync(fnDir, { recursive: true });

await build({
  entryPoints: ["api/index.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node20",
  outfile: `${fnDir}/index.cjs`,
});

// Function config: use Vercel's Node launcher. The bundle's default export is
// the Express app, which the launcher invokes as the request handler.
writeFileSync(
  `${fnDir}/.vc-config.json`,
  JSON.stringify(
    {
      runtime: "nodejs20.x",
      handler: "index.cjs",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
    },
    null,
    2
  )
);

// Top-level routing config: send every path to the single function.
writeFileSync(
  ".vercel/output/config.json",
  JSON.stringify({ version: 3, routes: [{ src: "/(.*)", dest: "/index" }] }, null, 2)
);

console.log("Build Output API artifacts written to .vercel/output");
