# ☄️ vth

__Vite + TypeScript + Hono__

This is a [VTH](https://mrozio13pl.github.io/vth) template bootstrapped with [`npm create vth`](https://npm.im/create-vth/).

## Getting started

Install dependencies and run the development server:

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Start editing the page by modifying `app/page.tsx`. Save the file to see your app update automatically.

For handling server logic, see `server/index.tsx` file. If you want to extend API create a new file in `routes` directory:

```ts
// server/routes/example.ts
import { Hono } from 'hono';

export const exampleRouter = new Hono()
    .get('/', (c) => c.text('Hello World!'));
```

Now import it in `server/index.tsx` and give it a base path:

```diff
+ import { exampleRouter } from './routes/example';

// ...

const api = new Hono()
+   .route('/example', exampleRouter)
    .route('/todo', todoRouter);
```

You can add UI components directly to your project using Shadcn CLI.

## Learn More

Check out the [documentation](https://mrozio13pl.github.io/vth) for more.