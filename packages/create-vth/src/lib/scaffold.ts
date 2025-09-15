import * as prompts from '@clack/prompts';
import ansis from 'ansis';
import spawn from 'nano-spawn';
import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fdir } from 'fdir';
import { detect } from 'package-manager-detector/detect';
import { COMMANDS, constructCommand } from 'package-manager-detector/commands';
import { LOCKS } from 'package-manager-detector/constants';
import { execPmCommand } from '@/lib/exec';
import { templatePath } from '@/lib/constants';
import { unicodeFallback } from '@/lib/unicode';
import { toValidPackageName } from '@/lib/pkg'; ;
import type { ProjectOptions } from '@/types';
import type { PackageJSON } from '@npm/types';

export async function scaffold(options: ProjectOptions) {
    const spinner = !options.skipPrompts ? prompts.spinner() : {} as Partial<ReturnType<typeof prompts.spinner>>;
    spinner.start?.(`Cloning to ${options.name}...`);

    const dir = options.lite
        ? path.join(import.meta.dirname, '..', templatePath, 'lite')
        : path.join(import.meta.dirname, '..', templatePath, 'full');
    const dist = options.name;
    const joindist = path.join.bind(void 0, dist);
    const paths = await new fdir()
        .withRelativePaths()
        .crawl(dir)
        .withPromise();

    await Promise.all(
        paths.map(async (file) => {
            const srcFile = path.join(dir, file);
            const distFile = joindist(file);
            const dirs = path.dirname(distFile);

            if (!existsSync(dirs)) await fs.mkdir(dirs, { recursive: true });

            await fs.copyFile(srcFile, distFile);
        }),
    );

    const pkg: PackageJSON = JSON.parse(
        await fs.readFile(joindist('package.json'), 'utf8'),
    );

    pkg.name = toValidPackageName(options.name);

    if (options.rolldown === false) {
        pkg.devDependencies!.vite = '^7';
    }

    await fs.writeFile(joindist('package.json'), JSON.stringify(pkg, null, 2) + '\n', 'utf8');

    spinner.message?.('Detecting package manager...');

    const pm = await detect();
    const pmName = pm?.name || 'npm';

    spinner.message?.(`Installing dependencies with ${pmName}...`);

    const installCmd = constructCommand(COMMANDS[pmName].install, [])!;
    await spawn(installCmd.command, installCmd.args, { cwd: dist });

    if (options.nolyfill) {
        spinner.message?.('Removing polyfills...');

        if (!Object.keys(LOCKS).some((lock) => existsSync(joindist(lock)))) {
            prompts.log.warn('No lockfile found, skipping polyfill removal');
        } else {
            const cmd = await execPmCommand(pm, 'nolyfill install');
            await spawn(cmd.command, cmd.args, { cwd: dist });

            if (pmName === 'npm') {
                await spawn('npm', ['update'], { cwd: dist });
            }
        }
    }

    await fs.rename(
        joindist('_gitignore'),
        joindist('.gitignore'),
    );

    if (!options.skipPrompts) {
        spinner.stop?.('Done!');

        prompts.log.message(`Next steps:

${ansis.dim.yellow(`cd ${options.name}
${pmName} install
${pmName} run dev`)}`);

        prompts.outro('Happy hacking!');
    } else {
        console.log(`
    Next steps:

    ${ansis.dim.yellow(`cd ${options.name}
    ${pmName} install
    ${pmName} run dev`)}
    
    Happy hacking! ${unicodeFallback('🚀')}
    `);
    }
}
