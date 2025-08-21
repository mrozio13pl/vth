import { Loader } from '@/components/ui/loader';
import { authClient } from '@/lib/auth-client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function LogoutPage() {
    const navigation = useNavigate();

    async function logout() {
        await authClient.signOut({}, {
            onSuccess: () => {
                navigation('/');
            },
        });
    }

    useEffect(() => {
        logout();
    }, []);

    return <Loader />;
}
