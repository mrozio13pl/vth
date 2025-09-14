import handler from '../dist/rsc/index.js';
import { serve } from '@hono/node-server';

const port = Number(process.env.PORT || 3000);

serve({
    fetch: handler,
    port,
}, (info) => {
    console.log(`Running on ${info.address}:${info.port}`);
});
