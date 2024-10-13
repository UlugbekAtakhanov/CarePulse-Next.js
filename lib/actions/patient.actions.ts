"use server";

import { ID, Query } from "node-appwrite";
import { BUCKET_ID, database, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite/appwrite.config";
import { InputFile } from "node-appwrite/file";
import { parseStringify } from "../utils";

// user
export const createUser = async (user: CreateUserProps) => {
    try {
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
        return newUser;
    } catch (error: any) {
        if (error && error?.code === 409) {
            const existingUser = await users.list([Query.equal("email", [user.email])]);
            return existingUser?.users[0];
        } else {
            console.log(error);
        }
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return user;
    } catch (error) {
        console.log(error);
    }
};

// patient
export const registerPatient = async ({ identificationDocument, ...patient }: RegisterPatientProps) => {
    try {
        // * identification document should be uploaded first, after that a patient can be created
        let file;
        if (identificationDocument) {
            const inputFile = InputFile.fromBuffer(identificationDocument?.get("blobFile") as Blob, identificationDocument?.get("fileName") as string);
            file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }

        const newPatient = await database.createDocument(DATABASE_ID!, PATIENT_COLLECTION_ID!, ID.unique(), {
            identificationDocumentId: file?.$id,
            identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
            ...patient,
        });

        return parseStringify(newPatient);
    } catch (error: any) {
        console.log(error);
    }
};

export const getPatient = async (userId: string) => {
    try {
        const patient = await database.getDocument(DATABASE_ID!, PATIENT_COLLECTION_ID!, userId);
        return parseStringify(patient);

        // const patients = await database.listDocuments(DATABASE_ID!, PATIENT_COLLECTION_ID!, [Query.equal("userId", [userId])]); // it filters by userId
        // return  parseStringify(patients.documents[0]);
    } catch (error) {
        console.log(error);
    }
};
