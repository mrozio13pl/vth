import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './app';
import '@fontsource-variable/inter';
import '@unocss/reset/eric-meyer.css';
import 'uno.css';
import './global.css';

const queryClient = new QueryClient();

const app = createRoot(document.querySelector('#root')!);

app.render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
);
