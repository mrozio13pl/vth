import SQlite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import type { Database } from '@/lib/types';

const dialect = new SqliteDialect({
    database: new SQlite('storage.db'),
});

export const db = new Kysely<Database>({
    dialect,
});

await db.schema
    .createTable('todo')
    .ifNotExists()
    .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
    .addColumn('message', 'text')
    .addColumn('userId', 'integer')
    .execute();
