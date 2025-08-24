import {
    isRouteErrorResponse,
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'react-router';
import { ReactRouterProvider } from 'fumadocs-core/framework/react-router';
import { Provider } from '@/components/provider';
import { Button } from '@/components/ui/button';
import type { Route } from './+types/root';
import './global.css';
import '@fontsource-variable/outfit';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    rel="icon"
                    href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>☄️</text></svg>"
                />
                <Meta />
                <Links />
            </head>
            <body className="antialiased overflow-x-hidden flex flex-col min-h-screen">
                <ReactRouterProvider>
                    <Provider>
                        {children}
                    </Provider>
                </ReactRouterProvider>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details
      = error.status === 404
                ? 'The requested page could not be found.'
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto flex flex-col items-center gap-y-2">
            <h1 className="md:text-[200px] text-8xl font-bold">{message}</h1>
            <p className="text-fd-muted-foreground text-lg">{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
            <Link to="docs">
                <Button className="mt-4" variant="link">Docs</Button>
            </Link>
        </main>
    );
}
