"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

type PendingButtonProps = {
    title: string;
    loading: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | null | undefined;
    className?: string;
};

export default function PendingButton({ title, loading, variant = "default", size, className }: PendingButtonProps) {
    return (
        <Button className={cn("flex gap-2 items-center", className)} disabled={loading} variant={variant} size={size}>
            {loading && <LoaderIcon className="w-4 animate-spin" />} {title}
        </Button>
    );
}
