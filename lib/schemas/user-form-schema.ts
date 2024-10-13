import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

export const UserFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().refine((val) => isValidPhoneNumber(val), { message: "Invalid phone number" }),
});
