import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("ethang-profile", "master", {
  isLibrary: false,
  scripts: ["pnpm up -i --latest", "pnpm prismaGenerate", "pnpm lint", "pnpm build"],
});

