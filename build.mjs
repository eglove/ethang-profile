import { projectBuilder } from "@ethang/project-builder/project-builder.js";
import { execSync } from "node:child_process";

await projectBuilder("ethang-profile", "master", {
  isLibrary: false,
  postInstall() {
    // eslint-disable-next-line sonar/no-os-command-from-path
    execSync("pnpm prismaGenerate");
  },
  scripts: ["UPDATE", "DEDUPE", "LINT", "BUILD"],
});

