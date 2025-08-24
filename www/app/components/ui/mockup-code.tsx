import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';
import copy from 'copy-text-to-clipboard';
import { Button } from './button';

interface MockupCodeProps extends React.HTMLAttributes<HTMLDivElement> {}

const MockupCode = ({ className, children, ...props }: MockupCodeProps) => {
    const codeRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (codeRef.current) {
            const codeLines = Array.from(codeRef.current.querySelectorAll('pre'));
            const codeToCopy = codeLines.map((line) => line.textContent || '').join('\n');
            copy(codeToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div
            className={cn(
                'relative w-full overflow-hidden overflow-x-auto rounded-xl bg-white/5 py-5 text-left text-sm text-foreground backdrop-blur-xl',
                className,
            )}
            style={{ direction: 'ltr' }}
            {...props}
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 h-8 w-8 text-gray-400 hover:bg-white/10 hover:text-gray-200"
                onClick={handleCopy}
                aria-label={copied ? 'Copied' : 'Copy code'}
            >
                {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            </Button>

            <div
                className="mb-4 ml-2 block h-3 w-3 rounded-full opacity-30"
                style={{
                    boxShadow: '1.4em 0, 2.8em 0, 4.2em 0',
                }}
            />
            <div ref={codeRef} className="px-1">{children}</div>
        </div>
    );
};

interface MockupCodeLineProps extends React.HTMLAttributes<HTMLDivElement> {
    prefix?: string;
}

const MockupCodeLine = ({ className, children, prefix, ...props }: MockupCodeLineProps) => {
    return (
        <div className={cn('flex items-center', className)} {...props}>
            <span
                className={cn(
                    'inline-block mr-[1ch]',
                    prefix ? 'w-8 text-right opacity-50 select-none' : 'w-0',
                )}
            >
                {prefix || ''}
            </span>
            <pre className="flex-1 m-0 p-0 overflow-visible whitespace-pre-wrap">{children}</pre>
        </div>
    );
};

export { MockupCode, MockupCodeLine };
