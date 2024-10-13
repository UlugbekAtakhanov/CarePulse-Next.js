"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions";
import { AppointmentFormSchema } from "@/lib/schemas/appointment-form-schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PendingButton from "../buttons/pending-button";
import CustomField from "./form-fields/custom-field";

export default function AppointmentForm({
    type,
    patient,
    userId,
    appointment,
    setIsOpen,
}: {
    type: "create" | "schedule" | "cancel";
    patient: PatientProps;
    appointment?: AppointmentProps;
    userId: string;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const router = useRouter();
    const schema = AppointmentFormSchema(type);

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            primaryPhysician: appointment?.primaryPhysician ? appointment.primaryPhysician : patient.primaryPhysician ? patient.primaryPhysician : "",
            reason: appointment?.reason ? appointment.reason : "",
            note: appointment?.note ? appointment.note : "",
            schedule: appointment?.schedule ? new Date(appointment.schedule) : new Date(),
            cancellationReason: appointment?.cancellationReason ? appointment.cancellationReason : "",
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        const status = type === "schedule" ? "scheduled" : type === "cancel" ? "cancelled" : "pending";

        if (type === "create" && patient.$id) {
            const data = {
                userId,
                patient: patient.$id,
                primaryPhysician: values.primaryPhysician,
                reason: values.reason!,
                schedule: new Date(values.schedule),
                status: status as Status,
                note: values.note,
            };
            const appointment = await createAppointment(data);
            if (appointment) {
                form.reset();
                router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
            }
        } else {
            const data = {
                userId,
                appointment,
                appointmentId: appointment?.$id!,
                status: status as Status,
                cancellationReason: values.cancellationReason,
            };
            const updatedAppointment = await updateAppointment(data);
            if (updatedAppointment) setIsOpen && setIsOpen(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* primary physician */}
                <CustomField control={form.control} name="primaryPhysician" label="Doctor" type="select" placeholder="Select a doctor">
                    {Doctors?.map((doctor, i) => (
                        <SelectItem key={doctor?.name + i} value={doctor?.name} disabled={type === "cancel" || type === "schedule"}>
                            <div className="flex items-center">
                                <Image src={doctor?.image} width={32} height={32} alt="img" className="mr-2 border rounded-full border-dark-600" />
                                <p>Dr. {doctor?.name}</p>
                            </div>
                        </SelectItem>
                    ))}
                </CustomField>

                {/* reason and note */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <CustomField
                        control={form.control}
                        name="reason"
                        label="Reason for appointment"
                        type="textarea"
                        placeholder="ex: Annual monthly check-up"
                        disabled={type === "cancel" || type === "schedule"}
                    />
                    <CustomField
                        control={form.control}
                        name="note"
                        label="Additional comments/notes"
                        type="textarea"
                        placeholder="ex: Prefer afternoon appointment, if possible"
                        disabled={type === "cancel" || type === "schedule"}
                    />
                </div>

                <CustomField
                    control={form.control}
                    name="schedule"
                    label="Expected appointment date"
                    type="datepicker"
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    icon="/assets/icons/calendar.svg"
                    placeholder="Select your appointment date"
                    disabled={type === "cancel" || type === "schedule"}
                />

                {type === "cancel" && (
                    <CustomField
                        control={form.control}
                        name="cancellationReason"
                        label="Cancellation reason"
                        type="textarea"
                        placeholder="ex: I am unable to make an appointment"
                    />
                )}

                <PendingButton loading={form.formState.isSubmitting} title="Submit and continue" className="w-full !mt-10" />
            </form>
        </Form>
    );
}
