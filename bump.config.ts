import { defineConfig } from 'bumpp';

export default defineConfig({
    files: ['package.json', 'packages/create-vth/package.json'],
    commit: 'v%s',
    recursive: true,
    execute: 'pnpm changelog',
});
