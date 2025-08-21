/** @jsxImportSource hono/jsx */

import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';

const app = new Hono();

const api = new Hono()
    .get('/hello', (c) => c.json({ message: 'I love pizza' }));

api.use('*', async (c) => c.notFound());

app.route('/api', api);

if (import.meta.env.PROD) {
    app.get('/*', serveStatic({ root: './dist' }));
}

app.get('/*', (c) => {
    return c.html(
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <title>☄️ vth template</title>

                {import.meta.env.PROD ? (
                    <>
                        <script type="module" src="/static/client.js" />
                        <link
                            rel="stylesheet"
                            href="/static/assets/style.css"
                            precedence="default"
                        />
                    </>
                ) : (
                    <>
                        <script type="module" src="/server/refresh.ts" />
                        <script type="module" src="/app/index.tsx" />
                    </>
                )}
            </head>
            <body>
                <div id="root" />
            </body>
        </html>,
    );
});

export type App = typeof api;

export default app;
