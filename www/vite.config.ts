import { defineConfig } from 'vite';
import UnoCSS from 'unocss/vite';
import Pages from 'vite-plugin-pages';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import reactScan from '@react-scan/vite-plugin-react-scan';
import html from 'vite-plugin-simple-html';
import eslint from 'vite-plugin-eslint2';
import mdx from '@mdx-js/rollup';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    base: '/vth/',
    plugins: [
        UnoCSS(),
        Pages({
            dirs: [
                {
                    dir: 'app/pages',
                    baseRoute: '/vth',
                },
            ],
            importMode: 'async',
            resolver: 'react',
        }),
        ViteImageOptimizer(),
        react(),
        reactScan(),
        { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
        eslint({
            fix: true,
            include: ['**/*.{js,jsx,ts,tsx,mdx,md}', 'package.json'],
            emitError: false,
        }),
        html({
            minify: true,
        }),
        tsconfigPaths(),
    ],
});
