import { copyFileSync, existsSync, unlinkSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type MaybeArray<T> = T | T[];

const links: Array<{ source: string; target: MaybeArray<string> }> = [
  {
    source: resolve(__dirname, '../examples/with-antd6/src/App.tsx'),
    target: [
      resolve(__dirname, '../examples/with-antd4/src/App.tsx'),
      resolve(__dirname, '../examples/with-antd5/src/App.tsx'),
    ],
  },
];

async function main() {
  console.log('Copying files...');
  for (const { source, target } of links) {
    const targets = Array.isArray(target) ? target : [target];
    for (const targetPath of targets) {
      if (existsSync(targetPath)) {
        unlinkSync(targetPath);
      }

      copyFileSync(source, targetPath);
      console.log(`Copied: ${source} -> ${targetPath}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
