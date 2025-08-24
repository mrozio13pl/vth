import { RootProvider } from 'fumadocs-ui/provider/base';
import { Search } from '@/components/search';
import type { ReactNode } from 'react';

export function Provider({ children }: { children: ReactNode }) {
    return (
        <RootProvider
            search={{
                SearchDialog: Search,
            }}
            theme={{
                defaultTheme: 'dark',
            }}
        >
            {children}
        </RootProvider>
    );
}
