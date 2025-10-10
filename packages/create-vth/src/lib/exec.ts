import { resolveCommand } from 'package-manager-detector/commands';
import type { Agent } from 'package-manager-detector';

export async function execPmCommand(pm: Agent | null, cmd: string) {
    return resolveCommand(pm || 'npm', 'execute', cmd.split(' '))!;
}
