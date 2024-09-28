import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("ethang-profile", "master", {
  isLibrary: false,
  scripts: ["bun x taze latest -I", "bun run prismaGenerate", "bun lint", "bun run build"],
});

