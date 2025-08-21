import { auth } from '@/lib/auth';
import { db } from '@/lib/database';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { vValidator } from '@hono/valibot-validator';
import { todoSchema } from '@/lib/schemas';

export const todoRouter = new Hono<{
    Variables: {
        user: typeof auth.$Infer.Session.user | null;
        session: typeof auth.$Infer.Session.session | null;
    };
}>()
    .use('*', async (c, next) => {
        const session = c.get('session');

        if (!session) throw new HTTPException(401, { message: 'Not authorized' });

        return next();
    })
    .get('/', async (c) => {
        const user = c.get('user');

        const todos = await db
            .selectFrom('todo')
            .selectAll()
            .where('userId', '=', user!.id)
            .execute();

        return c.json(todos);
    })
    .post(
        '/',
        vValidator('json', todoSchema),
        async (c) => {
            const { message } = c.req.valid('json');
            const user = c.get('user')!;

            const result = await db
                .insertInto('todo')
                .values({
                    message,
                    userId: user.id,
                })
                .returning('id')
                .executeTakeFirst();

            if (!result) {
                throw new HTTPException(500);
            }

            return c.json({ id: result.id });
        },
    )
    .delete('/:id', async (c) => {
        const { id } = c.req.param();

        await db
            .deleteFrom('todo')
            .where('id', '=', id)
            .executeTakeFirstOrThrow();

        return c.body(null, 200);
    });
