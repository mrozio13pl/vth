import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import devServer from '@hono/vite-dev-server';
import adapter from '@hono/vite-dev-server/node';
import build from '@hono/vite-build/node';

export default defineConfig(({ mode }) => {
    if (mode === 'client') {
        return {
            build: {
                rollupOptions: {
                    input: ['./app/index.tsx'],
                    output: {
                        entryFileNames: 'static/client.js',
                        chunkFileNames: 'static/assets/[name]-[hash].js',
                        assetFileNames: 'static/assets/[name].[ext]',
                    },
                },
                copyPublicDir: false,
                cssCodeSplit: false,
            },
            plugins: [react()],
        };
    }

    return {
        base: '/',
        plugins: [
            devServer({
                entry: 'server/index.tsx',
                adapter,
            }),
            build({
                entry: 'server/index.tsx',
            }),
            react(),
        ],
    };
});
