"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { CreateUserSchema, UserProps } from "@/lib/schemas/user-schema";
import { useRouter } from "next/navigation";
import PendingButton from "../buttons/pending-button";
import CustomField from "./form-fields/CustomField";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";

export default function RegisterForm({ user }: { user: UserProps }) {
    const router = useRouter();

    const form = useForm<z.infer<typeof CreateUserSchema>>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: user,
    });

    const onSubmit = async (values: z.infer<typeof CreateUserSchema>) => {
        const user = await createUser(values);
        if (user) router.push(`/patients/${user.$id}/register`);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <h2 className="text-xl font-semibold">Personal Information</h2>

                {/* full name  */}
                <CustomField control={form.control} name="name" type="text" label="Full Name" placeholder="John Doe" icon="/assets/icons/user.svg" />

                {/* email and phone */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CustomField
                        control={form.control}
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="johndoe@gmail.com"
                        icon="/assets/icons/email.svg"
                    />
                    <CustomField control={form.control} name="phone" label="Phone Number" type="phone" />
                </div>

                {/* date of birth and Gender */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CustomField
                        control={form.control}
                        name="birthDate"
                        label="Date of Birth"
                        type="datepicker"
                        icon="/assets/icons/calendar.svg"
                        placeholder="Select Your Birthdate"
                    />
                    <CustomField control={form.control} name="gender" label="Gender" type="radio" options={GenderOptions} />
                </div>

                {/* address and occupation */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CustomField control={form.control} name="address" label="Address" type="text" placeholder="14th Street, New York" />
                    <CustomField control={form.control} name="occupation" label="Occupation" type="text" placeholder="Software Engineer" />
                </div>

                {/* emergency contact information */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CustomField
                        control={form.control}
                        name="emergencyContactName"
                        label="Emergency Contact Name"
                        type="text"
                        placeholder="Guardian's Name"
                    />
                    <CustomField control={form.control} name="emergencyContactNumber" label="Emergency Contact Number" type="phone" />
                </div>

                {/* Medical Information */}
                <h2 className="text-xl font-semibold pt-6">Medical Information</h2>

                {/* primary physician */}
                <CustomField control={form.control} name="primaryPhysician" label="Primary Physician" type="select" placeholder="Select a physician">
                    {Doctors?.map((doctor, i) => (
                        <SelectItem key={doctor?.name + i} value={doctor?.name}>
                            <div className="flex items-center">
                                <Image src={doctor?.image} width={32} height={32} alt="img" className="mr-2 border rounded-full border-dark-600" />
                                <p>{doctor?.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomField>

                {/* Insurance Information */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CustomField
                        control={form.control}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        type="text"
                        placeholder="Blue Cross Blue Shield"
                    />
                    <CustomField
                        control={form.control}
                        name="insurancePolicyNumber"
                        label="Insurance Policy Number"
                        type="text"
                        placeholder="AB123456789"
                    />
                </div>

                {/* allergies and medications  */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CustomField
                        control={form.control}
                        name="allergies"
                        label="Allergies (if any)"
                        type="textarea"
                        placeholder="Peanuts, Penicillin, Polens"
                    />
                    <CustomField
                        control={form.control}
                        name="currentMedication"
                        label="Current Medication (if any)"
                        type="textarea"
                        placeholder="Ibuprofen 200mg, Paracetamol 500mg"
                    />
                </div>

                {/* family medical history */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CustomField
                        control={form.control}
                        name="familyMedicalHistory"
                        label="Family Medical History"
                        type="textarea"
                        placeholder="Mother had brain cancer, Father had heart disease"
                    />
                    <CustomField
                        control={form.control}
                        name="pastMedicalHistory"
                        label="Past Medical History"
                        type="textarea"
                        placeholder="Appendectomy, Tonsillectomy"
                    />
                </div>

                {/* identification and verification */}
                <h2 className="text-xl font-semibold pt-6">Identification and Verification</h2>

                {/* identification information */}
                <CustomField control={form.control} name="identificationType" label="Identification Type" type="select" placeholder="ex: Driver's License">
                    {IdentificationTypes?.map((type, i) => (
                        <SelectItem key={type + i} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </CustomField>
                <CustomField control={form.control} name="identificationNumber" label="Identification Number" type="text" placeholder="ex: 123456789" />
                <CustomField control={form.control} name="identificationDocument" label="Scanned Copy of Identification Document" type="upload" />

                {/* consent and privacy */}
                <h2 className="text-xl font-semibold pt-6">Consent and Privacy</h2>

                {/* consent checkboxes */}
                <CustomField control={form.control} name="treatmentConsent" label="I consent to treatment" type="checkbox" />
                <CustomField control={form.control} name="disclosureConsent" label="I consent to disclosure of information" type="checkbox" />
                <CustomField control={form.control} name="privacyConsent" label="I consent to privacy policy" type="checkbox" />

                <PendingButton loading={form.formState.isSubmitting} title="Get Started" className="w-full !mt-10" />
            </form>
        </Form>
    );
}
