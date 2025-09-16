import fs from 'fs-extra';
import path from 'node:path';

const src = path.resolve('build/client/vth');
const dest = path.resolve('build/client');

await fs.copy(src, dest, { overwrite: true });

await fs.remove(src);
