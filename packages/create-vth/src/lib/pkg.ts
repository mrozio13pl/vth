import packageNameRegex from 'package-name-regex';

export function toValidPackageName(projectName: string) {
    return projectName
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/^[._]/, '')
        .replace(/[^a-z\d\-~]+/g, '-');
}

export function isValidPackageName(packageName: string) {
    return packageNameRegex.test(packageName);
}
