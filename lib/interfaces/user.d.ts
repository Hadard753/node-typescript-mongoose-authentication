export interface User {
    email: string;
    password: string;
    tokens: {
        access: string;
        token: string;
    }[];
}
