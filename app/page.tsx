import PatientForm from "@/components/shared/forms/patient-form";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="grid grid-cols-2 min-h-screen">
            <div className="container flex flex-col justify-center space-y-12">
                <Image width={1000} height={1000} src="/assets/icons/logo-full.svg" alt="Logo" className="h-10 w-max " />

                <div>
                    <h1 className="text-3xl font-bold">Hi there 👋</h1>
                    <p className="text-muted-foreground">Schedule your first appointment.</p>
                </div>

                <PatientForm />

                <div className="text-14-regular text-dark-600 flex justify-between mt-20">
                    <span>© 2024 CarePulse</span>
                    <Link href="/admin" className="text-green-500 hover:text-green-600">
                        Admin
                    </Link>
                </div>
            </div>

            <Image width={1000} height={1000} src="/assets/images/onboarding-img.png" alt="Logo" className="h-full object-cover" />
        </main>
    );
}
