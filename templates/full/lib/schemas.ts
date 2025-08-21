import * as v from 'valibot';

const emailSchema = v.pipe(
    v.string(),
    v.nonEmpty('Please enter your email.'),
    v.email('The email is badly formatted.'),
    v.maxLength(30, 'Your email is too long.'),
);

const passwordSchema = v.pipe(
    v.string('Please enter your password.'),
    v.minLength(6, 'Password must be at least 6 letters long.'),
    v.maxLength(50, 'Password is too long.'),
    v.regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
    v.regex(/[a-z]/, 'Password must contain at least one lowercase letter'),
    v.regex(/\d/, 'Password must contain at least one number'),
    v.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
);

export const signInSchema = v.object({
    email: emailSchema,
    password: passwordSchema,
});

export const signUpSchema = v.object({
    name: v.string('Invalid username.'),
    ...signInSchema.entries,
});

export const todoSchema = v.object({
    message: v.pipe(v.string('Invalid todo.'), v.minLength(1, 'Enter a todo.')),
});
