"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { CreateUserSchema } from "@/lib/schemas/user-schema";
import { useRouter } from "next/navigation";
import PendingButton from "../buttons/pending-button";
import CustomField from "./form-fields/CustomField";

export default function PatientForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof CreateUserSchema>>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
        const user = await createUser(values);
        if (user) router.push(`/patients/${user.$id}/register`);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <CustomField control={form.control} name="name" label="Full Name" type="text" placeholder="John Doe" icon="/assets/icons/user.svg" />

                <CustomField
                    control={form.control}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="johndoe@gmail.com"
                    icon="/assets/icons/email.svg"
                />

                <CustomField control={form.control} name="phone" label="Phone Number" type="phone" />

                <PendingButton loading={form.formState.isSubmitting} title="Get Started" className="w-full !mt-10" />
            </form>
        </Form>
    );
}
