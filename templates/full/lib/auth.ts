import { betterAuth } from 'better-auth';
import { db } from '@/lib/database';

export const auth = betterAuth({
    database: { db },
    emailAndPassword: {
        enabled: true,
    },
});
