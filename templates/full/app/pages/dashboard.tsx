import { Loader } from '@/components/ui/loader';
import { useSession } from '@/lib/auth-client';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

export default function DashboardLayout() {
    const { data: session, isPending } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isPending && !session) navigate('/', { replace: true });
    }, [session, isPending]);

    if (isPending) return <Loader />;

    if (!session) return <Loader />;

    return <Outlet />;
}
