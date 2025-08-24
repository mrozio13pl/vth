import { useEffect, useMemo, useState } from 'react';
import { Cloud, type ICloud, renderSimpleIcon, fetchSimpleIcons } from 'react-icon-cloud';

const icons = [
    'typescript',
    'javascript',
    'normalizedotcss',
    'vite',
    'hono',
    'sqlite',
    'unocss',
    'shadcnui',
    'react',
    'nodedotjs',
    'radixui',
    'lucide',
    'reactrouter',
    'reactquery',
    'sharp',
    'eslint',
    'betterauth',
];

const cloudProps: Omit<ICloud, 'children'> = {
    containerProps: {
        style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            paddingTop: 40,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: 'pointer',
        tooltip: 'native',
        initial: [0.1, -0.1],
        clickToFront: 1000,
        tooltipDelay: 0,
        outlineColour: '#0000',
        maxSpeed: 0.04,
        minSpeed: 0.02,
        dragControl: false,
    },
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export function IconCloud() {
    const [data, setData] = useState<IconData | null>(null);

    useEffect(() => {
        fetchSimpleIcons({ slugs: icons }).then(setData);
    }, []);

    const renderedIcons = useMemo(() => {
        if (!data) return null;

        return Object.values(data.simpleIcons).map((icon) =>
            renderSimpleIcon({
                icon,
                size: 42,
                aProps: {
                    href: undefined,
                    target: undefined,
                    rel: undefined,
                    onClick: (e: any) => e.preventDefault(),
                },
            }),
        );
    }, [data]);

    return (
        <Cloud {...cloudProps}>
            <>
                {renderedIcons}
            </>
        </Cloud>
    );
}
