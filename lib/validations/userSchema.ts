import z from "zod";

export const UsernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must be no more then 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must be not contain special character");

export const SignUpSchema = z.object({
  username: UsernameValidation,
  email: z.string().email({
    message: "email is required",
  }),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string().min(5, "password must be atleast 5 characters long"),
});

export type TSignUpSchema = z.infer<typeof SignUpSchema>;

export const signInSchema = z.object({
  identifier: z.string(),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

export const updateSchema = z.object({
  username: UsernameValidation,
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export type TUpdateSchema = z.infer<typeof updateSchema>;
