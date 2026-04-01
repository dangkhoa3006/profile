import { createRequire } from "node:module";
import { copyFileSync, existsSync, symlinkSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const requireProject = createRequire(join(root, "package.json"));

function platformTriple() {
  const parts = [process.platform, process.arch];
  if (process.platform === "linux") {
    const { MUSL, familySync } = requireProject("detect-libc");
    const family = familySync();
    if (family === MUSL) parts.push("musl");
    else if (process.arch === "arm") parts.push("gnueabihf");
    else parts.push("gnu");
  } else if (process.platform === "win32") {
    parts.push("msvc");
  }
  return parts.join("-");
}

function main() {
  const triple = platformTriple();
  const pkgName = `lightningcss-${triple}`;
  const fileName = `lightningcss.${triple}.node`;

  const lightningRoot = join(root, "node_modules", "lightningcss");
  const dest = join(lightningRoot, fileName);

  if (existsSync(dest)) return;

  let platformRoot;
  try {
    platformRoot = dirname(requireProject.resolve(`${pkgName}/package.json`));
  } catch {
    console.warn(
      `[postinstall] Optional package "${pkgName}" is missing (run npm install). Skipping lightningcss binding link.`,
    );
    return;
  }

  const src = join(platformRoot, fileName);
  if (!existsSync(src)) {
    console.warn(`[postinstall] Expected native binary missing: ${src}`);
    return;
  }

  try {
    const rel = relative(lightningRoot, src);
    symlinkSync(rel, dest);
  } catch {
    copyFileSync(src, dest);
  }
}

main();
