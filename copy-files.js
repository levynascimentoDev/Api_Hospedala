import { cpSync, readdirSync, statSync, mkdirSync } from "fs";
import { join } from "path";

function copyNonTsFiles(srcDir, destDir) {
  const entries = readdirSync(srcDir);

  for (const entry of entries) {
    const srcPath = join(srcDir, entry);
    const destPath = join(destDir, entry);
    const stats = statSync(srcPath);

    if (stats.isDirectory()) {
      mkdirSync(destPath, { recursive: true });
      copyNonTsFiles(srcPath, destPath);
    } else {
      if (!srcPath.endsWith(".ts")) {
        cpSync(srcPath, destPath);
      }
    }
  }
}

copyNonTsFiles("src", "dist/src");
console.log("✅ Project successfully built");
