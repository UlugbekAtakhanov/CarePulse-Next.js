import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import AppointmentForm from "../forms/appointment-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AppointmentModal = ({ type, userId, appointment }: { type: "schedule" | "cancel"; userId: string; appointment: AppointmentProps }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger
                    disabled={(appointment.status === "scheduled" && type !== "cancel") || (appointment.status === "cancelled" && type !== "schedule")}
                    asChild
                >
                    <Button
                        variant={"ghost"}
                        className={cn("capitalize p-1", {
                            "text-green-500 hover:text-green-600 cursor-pointer": type === "schedule",
                            "hover:opacity-50 cursor-pointer": type === "cancel",
                        })}
                        disabled={(appointment.status === "scheduled" && type !== "cancel") || (appointment.status === "cancelled" && type !== "schedule")}
                    >
                        {type}
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
                        <DialogDescription>
                            {type === "schedule"
                                ? "Please check the appointment details, and submit it!"
                                : "Are you sure you want to cancel this appointment? Then fill in the cancellation reason and submit it!"}
                        </DialogDescription>
                    </DialogHeader>
                    <AppointmentForm type={type} userId={userId} patient={appointment.patient} appointment={appointment} setIsOpen={setIsOpen} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AppointmentModal;
