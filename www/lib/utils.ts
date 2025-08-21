import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { unoMerge } from 'unocss-merge';

export function cn(...inputs: ClassValue[]) {
    return unoMerge(clsx(inputs));
}

export function isPathEqual(a: string, b: string) {
    function format(str: string) {
        if (str.startsWith('/')) return format(str.slice(1));
        if (str.endsWith('/')) return format(str.slice(0, -1));
        return str;
    }

    return format(a) === format(b);
}

export function isRelativeUrl(url: string) {
    return !/^[a-zA-Z]/.test(url);
}
