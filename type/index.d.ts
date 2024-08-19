/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Male" | "Female";
declare type Status = "pending" | "scheduled" | "cancelled";

// declare type CreateUserProps = {
//     name: string;
//     email: string;
//     phone: string;
// };

// declare interface User extends CreateUserProps {
//     $id: string;
// }

declare interface RegisterUserProps extends CreateUserProps {
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
    allergies: string | undefined;
    currentMedication: string | undefined;
    familyMedicalHistory: string | undefined;
    pastMedicalHistory: string | undefined;
    identificationType: string | undefined;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
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
    type: string;
};
