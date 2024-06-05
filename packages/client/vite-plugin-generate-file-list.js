// vite-plugin-generate-file-list.js

import fs from "fs";
import path from "path";

function generateFileListPlugin() {
  return {
    name: "generate-file-list",
    generateBundle(options, bundle) {
      const assetFiles = [];
      for (const fileName in bundle) {
        if (fileName.startsWith("assets/")) {
          assetFiles.push(`/${fileName}`);
        }
      }

      const outputPath = path.resolve(options.dir, "assets-list.json");
      const fileListContent = { assets: assetFiles };
      fs.writeFileSync(outputPath, JSON.stringify(fileListContent, null, 2));
      console.log(
        "Generated assets-list.json with file paths:",
        fileListContent,
      );
    },
  };
}

export default generateFileListPlugin;
