import { projectBuilder } from "@ethang/project-builder/project-builder.js";

await projectBuilder("ethang-profile", "master", {
  isLibrary: false,
  scripts: ["UPDATE", "DEDUPE", "LINT", "BUILD"],
});

