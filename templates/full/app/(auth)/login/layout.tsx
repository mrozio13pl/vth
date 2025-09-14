'use server';

import { auth } from '@/lib/auth';
import { type LayoutProps, redirect } from '~rsc';

export default async function Layout({ children, headers }: LayoutProps) {
    const session = await auth.api.getSession({
        headers,
    });

    if (session) {
        redirect('/dashboard');
    }

    return children;
}
