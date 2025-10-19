import { cpSync, readdirSync, statSync, mkdirSync } from "fs";
import { join } from "path";

function copyNonTsFiles(srcDir, destDir) {
    readdirSync(srcDir).forEach(file => {
        const srcPath = join(srcDir, file);
        const destPath = join(destDir, file);

        if (statSync(srcPath).isDirectory()) {

            mkdirSync(destPath, { recursive: true });
            copyNonTsFiles(srcPath, destPath);

        } else {

            if (!srcPath.endsWith(".ts")) {

                cpSync(srcPath, destPath);
                
            }
        }
    });
}

copyNonTsFiles("src", "dist/src");
console.log("✅ Project successfully built");