import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { GITHUB } from '@/lib/constants';

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: <h1 className="font-bold text-xl select-none">☄️ vth</h1>,
            transparentMode: 'top',
        },
        githubUrl: GITHUB,
    };
}
