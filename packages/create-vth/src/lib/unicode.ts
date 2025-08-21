import isUnicodeSupported from 'is-unicode-supported';

export function unicodeFallback(unicode: string, fallback = '') {
    return isUnicodeSupported() ? unicode : fallback;
}
