/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female";
declare type Status = "pending" | "scheduled" | "cancelled";

declare type CreateUserProps = {
    name: string;
    email: string;
    phone: string;
};

declare interface UserProps extends CreateUserProps {
    $id: string;
}

declare interface RegisterPatientProps extends CreateUserProps {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    occupation: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies?: string | undefined;
    currentMedication?: string | undefined;
    familyMedicalHistory?: string | undefined;
    pastMedicalHistory?: string | undefined;
    identificationType?: string | undefined;
    identificationNumber?: string | undefined;
    identificationDocumentId?: FormData | undefined;
    privacyConsent?: boolean;
    treatmentConsent?: boolean;
    disclosureConsent?: boolean;
}

declare interface PatientProps extends RegisterPatientProps {
    $id: string;
    identificationDocumentUrl?: string | undefined;
}

declare type CreateAppointmentProps = {
    userId: string;
    patient: string;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
};

declare type UpdateAppointmentProps = {
    appointmentId: string;
    userId: string;
    appointment: Appointment;
    status: Status;
    cancellationReason?: string | null;
};

declare type AppointmentProps = {
    $id: string;
    userId: string;
    patient: PatientProps;
    primaryPhysician: string;
    reason: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
    cancellationReason: string | null;
};
