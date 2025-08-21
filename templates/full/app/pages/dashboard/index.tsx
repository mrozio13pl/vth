import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import { client } from '@/lib/client';
import { todoSchema } from '@/lib/schemas';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PlusCircle, Trash2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Link } from 'react-router';
import type { Todo } from '@/lib/types';
import type { Selectable } from 'kysely';
import type { InferInput } from 'valibot';

function TodoComponent({ todo, onDelete }: { todo: Selectable<Todo>; onDelete: () => void }) {
    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            await client.todo[':id'].$delete({ param: { id: todo.id } });
            onDelete();
        },
    });

    return (
        <div className={clsx('bg-secondary p-4 rounded-xl flex items-center justify-between gap-x-2', isPending && 'op-50')}>
            <p>{todo.message}</p>
            <Button size="icon" variant="destructive" onClick={() => mutate()} disabled={isPending}>
                <Trash2 />
            </Button>
        </div>
    );
}

function TodoForm({ onAdd }: { onAdd: () => void }) {
    const form = useForm({
        resolver: valibotResolver(todoSchema),
    });

    async function onSubmit(values: InferInput<typeof todoSchema>) {
        await client.todo.$post({ json: { message: values.message } });
        onAdd();
    }

    return (
        <Form {...form}>
            <form className="flex items-center gap-2 mb-8" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Todo</FormLabel>
                            <FormControl>
                                <Input placeholder="Your todo..." {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                                Your todo you will definitely do.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button type="submit" size="icon" className="-mt-1" disabled={form.formState.isSubmitting}>
                    <PlusCircle />
                </Button>
            </form>
        </Form>
    );
}

export default function Dashboard() {
    const { data: session, isPending } = useSession();
    const { data: todos, isLoading, refetch } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            const res = await client.todo.$get();
            return res.json();
        },
    });

    if (isPending || !session) {
        return <Loader />;
    }

    return (
        <>
            <div className="fixed top-0 w-full mt-8 flex justify-center">
                <ThemeToggle />
            </div>
            <div className="flex flex-col justify-center items-center size-full space-y-8 rounded-xl border border-solid border-border">
                <h1 className="text-5xl font-semibold">
                    Welcome, {session.user.name}!
                </h1>

                <Link to={{ pathname: '/logout' }}>
                    <Button variant="link">Logout</Button>
                </Link>

                {isLoading ? <Loader /> : (
                    <div className="space-y-2">
                        <TodoForm onAdd={refetch} />

                        {!todos?.length ? <p>No todos.</p> : (
                            todos.map((todo) => <TodoComponent key={todo.id} todo={todo} onDelete={refetch} />)
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
