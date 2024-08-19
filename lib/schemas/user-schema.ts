import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(2, {
        message: "Full name must be at least 2 characters.",
    }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z
        .string()
        .min(1, { message: "Write your phone number." })
        .refine((val) => isValidPhoneNumber(val), { message: "Invalid phone number" }),
});

export type CreateUserProps = z.infer<typeof CreateUserSchema>;

export const UserSchema = z.intersection(CreateUserSchema, z.object({ $id: z.string() }));
export type UserProps = z.infer<typeof UserSchema>;
