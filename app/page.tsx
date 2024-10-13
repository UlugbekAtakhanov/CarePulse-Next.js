import UserForm from "@/components/shared/forms/user-form";
import Logo from "@/components/shared/Logo";
import PassKeyModal from "@/components/shared/modals/pass-key-modal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
    const isAdmin = searchParams?.admin === "true";

    return (
        <main className="grid grid-cols-2 min-h-screen">
            {isAdmin && <PassKeyModal />}

            <div className="container flex flex-col justify-center space-y-12">
                <Logo />

                <div>
                    <h1 className="text-3xl font-bold">Hi there 👋</h1>
                    <p className="text-muted-foreground">Schedule your first appointment.</p>
                </div>

                <UserForm />

                <div className="text-14-medium text-dark-600 flex justify-between mt-20">
                    <span>© 2024 CarePulse</span>
                    <Link href="/?admin=true" className="text-green-500 hover:text-green-600">
                        Admin
                    </Link>
                </div>
            </div>

            <Image width={1000} height={1000} src="/assets/images/onboarding-img.png" alt="Logo" className="h-full object-cover" />
        </main>
    );
}
