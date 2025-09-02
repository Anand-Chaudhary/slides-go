import UserModel from "../models/user.model";
import { PPT, SavedPPTData } from "../types/ppt.type";

export const savePPTToUser = async (email: string, ppt: PPT, slug: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        console.error('User not found for email:', email);
        throw new Error('User not found');
    }
    
    const pptData: SavedPPTData = {
        ppt: ppt,
        slug: slug
    };
    
    user.ppts.push(ppt);
    await user.save();
    return user;
};