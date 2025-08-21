import { createHighlighterCore, createOnigurumaEngine } from 'shiki';
import { transformerStyleToClass } from '@shikijs/transformers';
import dark from 'shiki/themes/nord.mjs';
import light from 'shiki/themes/min-light.mjs';
import bash from 'shiki/langs/bash.mjs';
import markdown from 'shiki/langs/markdown.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import { clsx } from 'clsx';
import { useTheme } from 'next-themes';

const highlighter = await createHighlighterCore({
    themes: [dark, light],
    langs: [bash, typescript, markdown],
    engine: createOnigurumaEngine(import('shiki/wasm')),
});

export function Code({ children, className, ...props }: React.ComponentProps<'code'>) {
    const { theme } = useTheme();

    const toClass = transformerStyleToClass({
        classPrefix: className?.includes('language-')
            ? clsx('border border-solid border-border size-full my-1 px-4 py-2 rounded-lg overflow-hidden [&_code_span:first-child]:mt-1 [&_code_span:not(:last-child)]:(pb-4px inline-block)', theme === 'dark' && 'bg-slate-7/50 ')
            : 'inline-flex bg-secondary border border-solid border-foreground/20 rounded-sm mx-1px px-1 py-0.5 tracking-tight text-sm [&_*]:!text-primary ',
    });
    const lang = (() => {
        if (className?.includes('sh')) return 'sh';
        if (className?.includes('md')) return 'md';
        return 'typescript';
    })();

    return (
        <code
            dangerouslySetInnerHTML={
                {
                    __html: highlighter.codeToHtml(
                        children?.toString() || '',
                        {
                            lang,
                            theme: theme === 'dark' ? dark : light,
                            transformers: [toClass],
                        },
                    ),
                }
            }
            className={clsx(className?.includes('language-') && 'p-0.5 text-sm', className)}
            {...props}
        />
    );
}
