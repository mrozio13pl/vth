import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('docs/*', 'docs/page.tsx'),
    route('api/search', './api/search.ts'),
] satisfies RouteConfig;
