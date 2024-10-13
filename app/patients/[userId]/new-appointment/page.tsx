import AppointmentForm from "@/components/shared/forms/appointment-form";
import Logo from "@/components/shared/Logo";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
    const patient = await getPatient(userId);
    if (!patient) return;

    return (
        <main className="flex h-screen overflow-hidden">
            <section className="h-full overflow-y-auto remove-scrollbar flex-1">
                <div className="container flex flex-col justify-center space-y-12 py-20">
                    <Logo />

                    <div>
                        <h1 className="text-3xl font-bold">Hey there 👋</h1>
                        <p className="text-muted-foreground">Request a new appointment in 10 seconds.</p>
                    </div>

                    <AppointmentForm type="create" patient={patient} userId={userId} />

                    <span className="text-14-regular text-muted-foreground">© 2024 CarePulse</span>
                </div>
            </section>

            <Image
                width={1000}
                height={1000}
                src="/assets/images/appointment-img.png"
                alt="Logo"
                className="h-screen w-[390px] 2xl:w-[600px] object-cover"
            />
        </main>
    );
};

export default NewAppointment;
