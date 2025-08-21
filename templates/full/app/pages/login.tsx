import { authClient, useSession } from '@/lib/auth-client';
import { signInSchema } from '@/lib/schemas';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import type { InferInput } from 'valibot';
import { useEffect } from 'react';

type FormValues = InferInput<typeof signInSchema>;

export default function LoginPage() {
    const form = useForm<FormValues>({
        resolver: valibotResolver(signInSchema),
    });
    const { mutate, status } = useMutation({
        mutationFn: onSubmit,
    });
    const { data: session } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) navigate('/dashboard');
    }, [session]);

    async function onSubmit(values: FormValues) {
        const { email, password } = values;

        await authClient.signIn.email({
            email,
            password,
            callbackURL: '/dashboard',
        }, {
            onError: () => {
                form.setError('password', {
                    type: 'manual',
                    message: 'Invalid email or password.',
                });
            },
        });
    }

    return (
        <div className="size-screen flex justify-center items-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((values) => mutate(values))}
                    className="p-6 space-y-6 border border-border border-solid rounded-xl w-md"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your email..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your email address.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Your password..." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Your very secret password.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="secondary"
                        className="w-full"
                        disabled={status === 'pending'}
                    >
                        Login
                    </Button>
                    <p className="text-center text-sm text-slate-5">
                        Don't have an account?{' '}
                        <Link to={{ pathname: '/register' }} className="text-foreground">
                            Register
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    );
}
