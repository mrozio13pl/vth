import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

// static export: pre-render JSON at build time
const { staticGET: loader } = createFromSource(source);

export { loader };
