import { loader } from 'fumadocs-core/source';
import { create, docs } from '../../source.generated';
import * as icons from 'lucide-static';

export const source = loader({
    source: await create.sourceAsync(docs.doc, docs.meta),
    baseUrl: '/docs',
    icon(icon) {
        if (icon && icon in icons) return <span dangerouslySetInnerHTML={{ __html: icons[icon as keyof typeof icons] }} />;
    },
});
