import Logo from "@/components/shared/Logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { cn, formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SuccessPage = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || "";
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find((d) => d.name === appointment?.primaryPhysician);

    return (
        <main className="min-h-screen flex justify-center items-center flex-col">
            <div className="flex flex-col justify-center items-center mb-12">
                <Logo />
                <Image width={320} height={240} src="/assets/gifs/success.gif" alt="img" />
                <p className="text-4xl w-3/4 text-center font-semibold text-balance">
                    Your <span className="text-green-600">appointment request</span> has been successfully submitted
                </p>
                <p className="mt-6 text-14-regular text-muted-foreground">We will be in touch shortly to confirm</p>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground border-y border-muted/50 py-4 px-1">
                <p>Requested appointment details: </p>
                <div className="flex gap-2 items-center">
                    <Image width={40} height={40} src={`${doctor?.image}`} alt="img" />
                    <span>{doctor?.name}</span>
                </div>
                <p>{formatDateTime(new Date(appointment?.schedule)).dateTime}</p>
            </div>

            <div className="mt-8">
                <Link href={`/patients/${userId}/new-appointment`} className={cn(buttonVariants({ variant: "success" }))}>
                    New Appointment
                </Link>
                <p className="mt-4 text-center text-muted-foreground text-12-regular"> © 2024 CarePulse</p>
            </div>
        </main>
    );
};

export default SuccessPage;
