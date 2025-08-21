import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { unoMerge } from 'unocss-merge';

export function cn(...inputs: ClassValue[]) {
    return unoMerge(clsx(inputs));
}
