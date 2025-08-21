import { useEffect, useState } from 'react';

export function useActiveSection(root: HTMLElement | null, deps: any[] = []) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        if (!root) return;

        const sections = Array.from(root.querySelectorAll('section[id]'));
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Find the section closest to the top
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                root: null,
                rootMargin: '0px 0px -70% 0px', // Trigger when top of section enters upper viewport
                threshold: 0.2,
            },
        );

        sections.forEach((sec) => observer.observe(sec));

        return () => observer.disconnect();
    }, [root, ...deps]);

    return [activeId, setActiveId] as const;
}
