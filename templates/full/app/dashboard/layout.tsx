'use server';

import { auth } from '@/lib/auth';
import { LayoutProps, redirect } from '~rsc';

export default async function Layout({ children, headers }: LayoutProps) {
    const session = await auth.api.getSession({
        headers,
    });

    if (!session) {
        redirect('/login');
    }

    return children;
}
