import { defineConfig, mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from '@vitejs/plugin-react';
import rsc from '@vitejs/plugin-rsc';
import rscPages from 'vite-plugin-rsc-pages';
import eslint from 'vite-plugin-eslint2';
import inspect from "vite-plugin-inspect";
import tsconfigPaths from 'vite-tsconfig-paths';
import nodeExternals from 'rollup-plugin-node-externals';
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
        minify: false
    },
    ssr: {
        external: ['better-sqlite3'],
    },
});

const plugins = [
    tailwindcss(),
    ViteImageOptimizer(),
    react(),
    tsconfigPaths(),
    nodeExternals({
        builtins: true,
        deps: false,
    }),
    inspect(),
];

const port = +(process.env.PORT || 3000);

const config = defineConfig(({ command }) => {
    // prevents react from using dev mode in production
    const define = command === 'serve' ? {} : {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
    };

    return {
        build: {
            minify: true
        },
        define,
        plugins: [
            rsc({
                entries: {
                    rsc: 'server/index.tsx',
                }
            }),
            rscPages(),
            eslint({
                fix: true,
                include: ['**/*.{js,jsx,ts,tsx}'],
                emitError: false,
            }),
            ...plugins,
        ],
        server: { port },
    };
});

const serveConfig = defineConfig({
    build: {
        rollupOptions: {
            input: 'server/production.ts',
            output: {
                entryFileNames: 'index.js'
            },
            external: ['../dist/rsc/index.js'],
        },
        emptyOutDir: false,
    },
    plugins,
});

export default defineConfig((env) => {
    if (env.mode === 'serve') {
        return mergeConfig(serveConfig, sharedConfig);
    }

    return mergeConfig(config(env), sharedConfig);
});
