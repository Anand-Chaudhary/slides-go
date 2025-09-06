import UserModel from "../models/user.model";
import { PPT, SavedPPTData } from "../types/ppt.type";
import { Request, Response } from 'express';

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

export const getPPT = async (req: Request, res: Response) => {
    try {
        const slug = req.query.slug;
        const userEmail = req.user?.email;
        if (!userEmail) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        const user = await UserModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log("Searching for: ", slug);
        
        const ppt = user.ppts.find((ppt: any) => ppt.slug === slug);
        console.log('Available slugs:', user.ppts.map((ppt: any) => ppt.slug));

        if (!ppt) {
            return res.status(404).json({ success: false, message: 'PPT not found' });
        }

        return res.json({ success: true, ppt });
    } catch (err) {
        console.error('Error in getPPT:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getAllPPT = async (req: Request, res: Response) => {
    try {
        const userEmail = req.user?.email;
        if (!userEmail) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const user = await UserModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const slugs = user.ppts.map((ppt: any) => ppt.slug).filter(Boolean);
        return res.json({ success: true, slugs });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: "Failed to fetch PPTs"
        });
    }
}