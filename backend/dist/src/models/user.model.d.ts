import { Document, Model } from 'mongoose';
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    ppts: string[];
    generateAuthToken(): Promise<string>;
    comparePassword(password: string): Promise<boolean>;
}
export interface UserModelInterface extends Model<User> {
    hashPassword(password: string): Promise<string>;
}
declare const UserModel: UserModelInterface;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map