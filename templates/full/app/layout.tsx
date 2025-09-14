'use client';

import type { LayoutProps } from '~rsc';
import { ReactScan } from '@/components/react-scan';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import '@fontsource-variable/inter';
import './global.css';

const queryClient = new QueryClient();

export default function Root({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <title>vth stack</title>
                {import.meta.env.DEV && <ReactScan />}
            </head>
            <body className="antialiased h-screen">
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider attribute="class">
                        {children}
                    </ThemeProvider>
                </QueryClientProvider>
            </body>
        </html>
    );
}
