/// <reference types="mongoose" />
import { Document, Model } from "mongoose";
export interface User extends Document {
    username: string;
    email: string;
    password: string;
}
export declare const UserModel: Model<User>;
