"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../../badges/status-badge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentTableActions from "./appointment-table-actions";

export const columns: ColumnDef<AppointmentProps>[] = [
    {
        id: "id",
        header: "ID",
        cell: ({ row }) => {
            return <p>{row.index + 1}</p>;
        },
    },
    {
        id: "patient",
        header: "Patient",
        accessorFn: (row) => row.patient.name,
        cell: ({ row }) => {
            return <p>{row.original.patient.name}</p>;
        },
    },
    {
        id: "status",
        header: "Status",
        accessorFn: (row) => row.status,
        cell: ({ row }) => {
            return <StatusBadge status={row.original.status} />;
        },
    },
    {
        id: "schedule",
        header: "Appointment Date",
        accessorFn: (row) => row.schedule,
        cell: ({ row }) => {
            return <p>{formatDateTime(row.original.schedule).dateTime}</p>;
        },
    },
    {
        id: "primaryPhysician",
        header: "Doctor",
        accessorFn: (row) => row.primaryPhysician,
        cell: ({ row }) => {
            const doctor = Doctors.find((d) => d.name === row.original.primaryPhysician);
            return (
                <div className="flex items-center">
                    <Image src={doctor?.image!} width={32} height={32} alt="img" className="mr-2 border rounded-full border-dark-600" />
                    <p>Dr. {doctor?.name}</p>
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return <AppointmentTableActions data={row.original} />;
        },
    },
];
