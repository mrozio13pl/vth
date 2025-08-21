import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { App } from './app';
import '@fontsource-variable/outfit';
import '@unocss/reset/eric-meyer.css';
import 'uno.css';
import './global.css';

const queryClient = new QueryClient();

const app = createRoot(document.querySelector('#root')!);

app.render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="dark">
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
);
