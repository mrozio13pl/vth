import type { Session, User } from 'better-auth/types';
import type { Generated } from 'kysely';

export interface Todo {
    id: Generated<string>;
    message: string;
    userId: string;
}

export interface Database {
    user: User;
    session: Session;
    todo: Todo;
}
