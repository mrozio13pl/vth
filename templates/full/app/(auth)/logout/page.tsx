'use client';

import { Loader } from '@/components/ui/loader';
import { authClient } from '@/lib/auth-client';
import { useEffect } from 'react';

export default function LogoutPage() {
    async function logout() {
        await authClient.signOut({}, {
            onSuccess: () => {
                window.location.href = '/';
            },
        });
    }

    useEffect(() => {
        logout();
    }, []);

    return <Loader />;
}
