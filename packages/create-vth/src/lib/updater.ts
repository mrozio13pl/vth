import * as prompts from '@clack/prompts';
import ansis from 'ansis';
import updateNotifier from 'tiny-update-notifier';
import { name, version } from '@/package.json';
import { unicodeFallback } from './unicode';

export async function checkUpdates() {
    try {
        const update = await updateNotifier({ pkg: { name, version }, timeout: 10_000 });

        if (update) {
            prompts.log.warn(
                `${ansis.bold`NEW ${update.type.toUpperCase()} UPDATE!`} v${update.current} ${unicodeFallback('→', '->')} v${update.latest}`,
            );
        }
    } catch {
        /* empty */
    }
}
