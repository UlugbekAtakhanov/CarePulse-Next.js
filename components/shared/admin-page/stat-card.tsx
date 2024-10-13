import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const StatCard = ({ count = 0, label, icon, type }: { count: number; label: string; icon: string; type: "scheduled" | "pending" | "cancelled" }) => {
    return (
        <div
            className={cn("stat_card", {
                "bg-appointments": type === "scheduled",
                "bg-pending": type === "pending",
                "bg-cancelled": type === "cancelled",
            })}
        >
            <div className="flex gap-2 items-center">
                <Image src={icon} width={32} height={32} alt="icon" />
                <h2 className="text-32-bold">{count}</h2>
            </div>

            <p className="text-muted-foreground mt-2">{label}</p>
        </div>
    );
};

export default StatCard;
