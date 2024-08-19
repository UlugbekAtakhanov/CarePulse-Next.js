"use server";

import { ID, Query } from "node-appwrite";
import { users } from "../appwrite/appwrite.config";
import { CreateUserProps } from "../schemas/user-schema";

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
