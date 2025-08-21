// eslint-disable-next-line react-refresh/only-export-components
export function formatSection(id?: string | null) {
    return id?.toLowerCase().replaceAll(' ', '-').replace(/[()]/g, '');
}

export function Section({ id, ...props }: React.ComponentProps<'section'>) {
    return <section id={formatSection(id)} {...props} />;
}
