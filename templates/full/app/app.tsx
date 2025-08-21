import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';
import { useRoutes } from 'react-router';
import routes from '~react-pages';

export function App() {
    return (
        <main id="__vth" className="size-screen">
            <Suspense fallback={<Loader />}>
                {useRoutes(routes)}
            </Suspense>
        </main>
    );
}
