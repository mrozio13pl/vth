import { defineConfig, mergeConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import UnoCSS from 'unocss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint2';
import tsconfigPaths from 'vite-tsconfig-paths';
import devServer from '@hono/vite-dev-server';
import nodeAdapter from '@hono/vite-dev-server/node';
import build from '@hono/vite-build/node';
import dotenv from '@next/env';

// helper for loading and replacing environment variables
// in dev it will try loading e.g. .env.dev file
const isDevelopment = process.env.NODE_ENV === 'development';
const { parsedEnv } = dotenv.loadEnvConfig(process.cwd(), isDevelopment);

const envVars = Object.entries(parsedEnv || {}).reduce((acc, [key, val]) => {
    acc[`process.env.${key}`] = JSON.stringify(val);
    return acc;
}, {} as Record<string, string>);

// config for both server and client
const sharedConfig = defineConfig({
    base: '/',
    define: envVars,
    envPrefix: 'PUBLIC_',
    build: {
        rollupOptions: {
            onwarn(warning, warn) {
                // ignores 'use client'
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                    return;
                }
                warn(warning);
            },
            external: ['better-sqlite3'],
        },
    },
    ssr: {
        external: ['better-sqlite3'],
    },
});

// plugins for server and client
const plugins = [
    UnoCSS(),
    Pages({
        dirs: 'app/pages',
        importMode: 'async',
        resolver: 'react',
    }),
    ViteImageOptimizer(),
    react(),
    tsconfigPaths(),
];

const port = +(process.env.PORT || 3000);

const config = defineConfig({
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '_worker.js',
            },
        },
    },
    plugins: [
        devServer({
            entry: 'server/index.tsx',
            adapter: nodeAdapter,
        }),
        build({
            entry: 'server/index.tsx',
            port,
            minify: true,
        }),
        eslint({
            fix: true,
            include: ['**/*.{js,jsx,ts,tsx}', 'package.json'],
            emitError: false,
            exclude: ['server/index.tsx'],
        }),
        ...plugins,
    ],
    server: { port },
});

const clientConfig = defineConfig({
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
    plugins,
});

export default defineConfig(({ mode }) => {
    if (mode === 'client') {
        return mergeConfig(clientConfig, sharedConfig);
    }

    return mergeConfig(config, sharedConfig);
});
