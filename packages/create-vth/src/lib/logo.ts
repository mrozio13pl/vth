import ansis from 'ansis';
import { intro } from '@clack/prompts';
import { unicodeFallback } from '@/lib/unicode';

export function generateLogo() {
    const vite = ansis.hex('#646CFF');
    const ts = ansis.hex('#3178C6');
    const hono = ansis.hex('#E36002');

    console.log(`
          ${ts`__`}   ${hono`__`}  
  ${vite`_   __`} ${ts`/ /_`} ${hono`/ /_`} 
 ${vite`| | / /`}${ts`/ __/`}${hono`/ __ \\`}
 ${vite`| |/ /`}${ts`/ /_`} ${hono`/ / / /`}
 ${vite`|___/`} ${ts`\\__/`}${hono`/_/ /_/`} 
    `);

    const comet = unicodeFallback('☄️ ');

    intro(ansis.gray`${comet}https://github.com/mrozio13pl/vth ${comet}`);
}
