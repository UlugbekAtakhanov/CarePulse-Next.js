import RegisterForm from "@/components/shared/forms/register-form";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId);
    if (!user) return;

    return (
        <main className="flex h-screen overflow-hidden">
            <section className="h-full overflow-y-auto remove-scrollbar flex-1">
                <div className="container flex flex-col justify-center space-y-12 py-20">
                    <Image width={1000} height={1000} src="/assets/icons/logo-full.svg" alt="img" className="h-10 w-max " />

                    <div>
                        <h1 className="text-3xl font-bold">Welcome 👋</h1>
                        <p className="text-muted-foreground">Let us know more about yourself.</p>
                    </div>

                    <RegisterForm user={user} />

                    <span className="text-14-regular text-muted-foreground">© 2024 CarePulse</span>
                </div>
            </section>

            <Image width={1000} height={1000} src="/assets/images/register-img.png" alt="Logo" className="h-screen w-[390px] 2xl:w-[600px] object-cover" />
        </main>
    );
};

export default Register;
