import { User } from "../models/user.model";
interface CreateUser {
    username: string;
    email: string;
    password: string;
}
export declare const createUser: ({ username, email, password }: CreateUser) => Promise<User>;
export {};
//# sourceMappingURL=user.service.d.ts.map