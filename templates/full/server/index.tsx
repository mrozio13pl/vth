/** @jsxImportSource hono/jsx */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from '@hono/node-server/serve-static';
import { rsc } from '~rsc';
import { auth } from '@/lib/auth';
import { todoRouter } from './routes/todo';

const app = new Hono<{
    Variables: {
        user: typeof auth.$Infer.Session.user | null;
        session: typeof auth.$Infer.Session.session | null;
    };
}>();

app.use('*', async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
        c.set('user', null);
        c.set('session', null);
        return next();
    }

    c.set('user', session.user);
    c.set('session', session.session);
    return next();
});

app.use(
    '/api/auth/*',
    cors({
        origin: process.env.BETTER_AUTH_URL,
        allowHeaders: ['Content-Type', 'Authorization'],
        allowMethods: ['POST', 'GET', 'OPTIONS'],
        exposeHeaders: ['Content-Length'],
        maxAge: 600,
        credentials: true,
    }),
);

app.on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw));

// serving client
if (import.meta.env.PROD) {
    app.get('/*', serveStatic({ root: './dist/client' }));
}

// add more routers below
const api = new Hono()
    .route('/todo', todoRouter);

// handle not found routes for api
api.use('*', async (c) => c.notFound());

app.route('/api', api);

// serving client
app.get('/*', (c) => {
    return rsc(c.req.raw);
});

export type App = typeof api;

export default app.fetch;
