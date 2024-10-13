import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
    const st =
        status === "scheduled" ? "bg-green-600/20 text-green-500" : status === "pending" ? "bg-blue-600/20 text-blue-500" : "bg-red-600/20 text-red-500";
    const img = status === "scheduled" ? "/assets/icons/check.svg" : status === "pending" ? "/assets/icons/pending.svg" : "/assets/icons/cancelled.svg";
    return (
        <div className={cn("flex gap-2 text-14-regular w-max px-2 py-0.5 rounded-full", st)}>
            <Image src={img} alt="img" width={15} height={15} />
            <span>{status}</span>
        </div>
    );
};

export default StatusBadge;
