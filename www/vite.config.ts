import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import eslint from 'vite-plugin-eslint2';
import tsconfigPaths from 'vite-tsconfig-paths';
import mdx from 'fumadocs-mdx/vite';
import * as MdxConfig from './source.config';

export default defineConfig({
    base: '/vth/',
    plugins: [
        mdx(MdxConfig),
        tailwindcss(),
        ViteImageOptimizer(),
        reactRouter(),
        eslint({
            fix: true,
            include: ['**/*.{js,jsx,ts,tsx,mdx,md}', 'package.json'],
            emitError: false,
        }),
        tsconfigPaths(),
    ],
});
