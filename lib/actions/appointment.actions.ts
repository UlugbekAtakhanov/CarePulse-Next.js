"use server";

import { ID, Query } from "node-appwrite";
import { APPOINTMENT_COLLECTION_ID, database, DATABASE_ID } from "../appwrite/appwrite.config";
import { parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

export const createAppointment = async (data: CreateAppointmentProps) => {
    try {
        const appointment = await database.createDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, ID.unique(), data);
        revalidatePath("/admin");
        return parseStringify(appointment);
    } catch (error: any) {
        console.log(error);
    }
};

export const getAppointment = async (appointmentId: string) => {
    try {
        const appointment = await database.getDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, appointmentId);
        return parseStringify(appointment);
    } catch (error) {
        console.log(error);
    }
};

export const getAppointmentsList = async () => {
    try {
        const appointments = await database.listDocuments(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, [Query.orderDesc("$createdAt")]);
        const initialCounts = {
            scheduledCount: 0,
            cancelledCount: 0,
            pendingCount: 0,
        };

        const counts = appointments.documents.reduce((acc, appointment) => {
            if (appointment.status === "scheduled") {
                acc.scheduledCount += 1;
            } else if (appointment.status === "pending") {
                acc.pendingCount += 1;
            } else if (appointment.status === "cancelled") {
                acc.cancelledCount += 1;
            }
            return acc;
        }, initialCounts);

        const data = { ...appointments, ...counts };
        return parseStringify(data);
    } catch (error) {
        console.log(error);
    }
};

export const updateAppointment = async (data: UpdateAppointmentProps) => {
    try {
        const appointment = await database.updateDocument(DATABASE_ID!, APPOINTMENT_COLLECTION_ID!, data.appointmentId, {
            status: data.status,
            cancellationReason: data.cancellationReason,
        });
        revalidatePath("/admin");
        return parseStringify(appointment);
    } catch (error) {
        console.log(error);
    }
};
