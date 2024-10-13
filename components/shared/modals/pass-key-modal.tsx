"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PassKeyModal = () => {
    const router = useRouter();
    const path = usePathname();

    const [open, setOpen] = useState(false);
    const [passKey, setPassKey] = useState("");
    const [error, setError] = useState("");

    //* Good Practice! - This useEffect checks if the user has passkey stored in local storage. If not modal will open. Here no need to open modal onClicking Admin link/button which is in parent component.
    const encryptedKey = typeof window !== "undefined" ? localStorage.getItem("passkey") : null;
    useEffect(() => {
        const decryptedKey = encryptedKey ? decryptKey(encryptedKey) : null;
        if (path) {
            if (decryptedKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setOpen(false);
                router.push("/admin");
            } else {
                setOpen(true);
            }
        }
    }, [encryptedKey]);

    const closeModalHandler = () => {
        setOpen(false);
        router.push("/");
    };

    const validatePasskeyHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passKey);
            localStorage.setItem("passkey", encryptedKey);
            setOpen(false);
        } else {
            setError("Invalid passkey. Please try again.");
        }
    };

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="w-max">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex justify-between items-center">
                            Admin Access Verification
                            <Image
                                src="/assets/icons/close.svg"
                                width={15}
                                height={15}
                                alt="icon"
                                className="cursor-pointer hover:opacity-50"
                                onClick={closeModalHandler}
                            />
                        </AlertDialogTitle>

                        <AlertDialogDescription>To access the admin page, please enter the pass key.</AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex flex-col my-4">
                        <InputOTP maxLength={6} value={passKey} onChange={setPassKey}>
                            <InputOTPGroup className="space-x-2">
                                <InputOTPSlot className="otp_slot" index={0} />
                                <InputOTPSlot className="otp_slot" index={1} />
                                <InputOTPSlot className="otp_slot" index={2} />
                                <InputOTPSlot className="otp_slot" index={3} />
                                <InputOTPSlot className="otp_slot" index={4} />
                                <InputOTPSlot className="otp_slot" index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {error && <p className="text-14-semibold text-destructive text-center mt-2">{error}</p>}
                    </div>

                    <AlertDialogFooter>
                        <Button variant={"success"} className="w-full" onClick={validatePasskeyHandler}>
                            Enter Admin Passkey
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default PassKeyModal;
