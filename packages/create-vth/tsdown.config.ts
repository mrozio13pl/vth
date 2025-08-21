import { defineConfig, globalLogger as logger } from 'tsdown';
import { fdir } from 'fdir';
import { existsSync } from 'node:fs';
import ansis from 'ansis';
import ignore from 'ignore';
import path from 'node:path';
import fs from 'node:fs/promises';
import { templatePath } from './src/lib/constants.ts';

const dist = templatePath;
const src = '../../templates';

if (existsSync(dist)) {
    await fs.rm(dist, { recursive: true });
}
await fs.mkdir(dist);

const children = await fs.readdir(src, { withFileTypes: true });

for (const child of children) {
    if (!child.isDirectory()) continue;

    const childSrc = path.join(src, child.name);
    const childDist = path.join(dist, child.name);
    await fs.mkdir(childDist, { recursive: true });

    let ig = ignore();

    const gitignorePath = path.join(childSrc, '_gitignore');
    if (existsSync(gitignorePath)) {
        const content = await fs.readFile(gitignorePath, 'utf8');
        ig = ig.add(content.split(/\r?\n/).map((line) => line.split('#')[0].trim()).filter(Boolean));
    }

    const files = await new fdir()
        .withRelativePaths()
        .crawl(childSrc)
        .withPromise();

    const filtered = ig.filter(files);

    await Promise.all(filtered.map(async (file) => {
        const srcFile = path.join(childSrc, file);
        const destFile = path.join(childDist, file);
        const dir = path.dirname(destFile);
        if (!existsSync(dir)) await fs.mkdir(dir, { recursive: true });
        await fs.copyFile(srcFile, destFile);
    }));

    logger.info(`Copied ${ansis.bold(child.name)} template.`);
}

export default defineConfig({
    entry: 'src/index.ts',
    outDir: 'dist',
    format: 'esm',
    removeNodeProtocol: true,
    minify: process.env.NODE_ENV !== 'development',
});
