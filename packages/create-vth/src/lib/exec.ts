import { resolveCommand } from 'package-manager-detector/commands';
import type { DetectResult } from 'package-manager-detector';

export async function execPmCommand(pm: DetectResult | null, cmd: string) {
    return resolveCommand(pm?.agent || 'npm', 'execute', cmd.split(' '))!;
}
