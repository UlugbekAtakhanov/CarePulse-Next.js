"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex gap-2 w-full items-center cursor-pointer">
            <LogOutIcon className="w-4" /> Log out
        </button>
    );
}
