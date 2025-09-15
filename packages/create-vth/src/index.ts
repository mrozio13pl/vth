import { cli } from 'cleye';
import * as prompts from '@clack/prompts';
import isValidFilename from 'valid-filename';
import packageNameRegex from 'package-name-regex';
import path from 'node:path';
import fs from 'node:fs';
import { generateLogo } from '@/lib/logo';
import { checkUpdates } from '@/lib/updater';
import { scaffold } from '@/lib/scaffold';
import { name, description, version } from '@/package.json' assert { type: 'json' };
import type { ProjectOptions } from '@/types';
import { isValidPackageName, toValidPackageName } from './lib/pkg';

const argv = cli({
    name,
    version,
    help: { description },
    parameters: [
        '[project name]',
    ],
    flags: {
        yes: {
            type: Boolean,
            description: 'skip prompts',
            alias: 'y',
            default: false,
        },
        packageName: {
            type: String,
        },
        lite: {
            type: Boolean,
            description: 'use lite template',
        },
        nolyfill: {
            type: Boolean,
            description: 'remove old polyfills',
        },
        rolldown: {
            type: Boolean,
            description: 'use rolldown-vite',
            alias: 'r',
        },
        override: {
            type: Boolean,
            description: 'override existing files',
        },
    },
});

const cancel = () => prompts.cancel('Cancelled...');

process.on('unhandledRejection', console.error);

export default async function init() {
    const defaults: ProjectOptions = {
        name: argv._.projectName || '',
        packageName: argv.flags.packageName || argv._.projectName || '',
        lite: argv.flags.lite,
        nolyfill: argv.flags.nolyfill,
        rolldown: argv.flags.rolldown,
        override: argv.flags.override,
        skipPrompts: argv.flags.yes,
    };

    if (defaults.skipPrompts) {
        if (!defaults.name) throw new Error('give the project a name');

        if (fs.existsSync(defaults.name) && fs.readdirSync(defaults.name).length && !defaults.override) {
            throw new Error(`${defaults.name} is not empty, use --override to override`);
        }

        if (!isValidPackageName(defaults.packageName)) {
            throw new Error(`${defaults.name} is not a valid package name`);
        }

        scaffold(defaults);

        return;
    }

    generateLogo();

    await checkUpdates();

    defaults.name = defaults.name || await prompts.text({
        message: 'What is the name of your project?',
        placeholder: 'my-app',
        validate(value) {
            if (!isValidFilename(value)) {
                return `${value} is not a valid filename`;
            }

            if (fs.existsSync(value) && fs.readdirSync(value).length && !defaults.override) {
                return `${value} is not empty, use --override to override`;
            }
        },
    }) as string;

    if (prompts.isCancel(defaults.name)) return cancel();

    let packageName = argv.flags.packageName || path.basename(path.resolve(defaults.name));
    if (!isValidPackageName(packageName)) {
        const packageNameResult = await prompts.text({
            message: 'Package name:',
            defaultValue: toValidPackageName(packageName),
            placeholder: toValidPackageName(packageName),
            validate(dir) {
                if (!isValidPackageName(dir)) {
                    return 'Invalid package.json name';
                }
            },
        });
        if (prompts.isCancel(packageNameResult)) return cancel();
        packageName = packageNameResult;
    }

    defaults.packageName = packageName;

    if (prompts.isCancel(defaults.name)) return cancel();

    // for skipped prompt
    if (fs.existsSync(defaults.name) && fs.readdirSync(defaults.name).length && !defaults.override) {
        prompts.log.error(`${defaults.name} is not empty, use --override to override`);
        return cancel();
    }

    defaults.rolldown = defaults.rolldown ?? await prompts.confirm({
        message: 'Use Rolldown?',
        initialValue: true,
    }) as boolean;

    if (prompts.isCancel(defaults.rolldown)) return cancel();

    defaults.nolyfill = defaults.nolyfill ?? await prompts.confirm({
        message: 'Remove old polyfills with nolyfill?',
        initialValue: false,
    }) as boolean;

    if (prompts.isCancel(defaults.nolyfill)) return cancel();

    try {
        scaffold(defaults);
    } catch (error) {
        console.log(error as Error);
    }
}
