import PptxGenJS from "pptxgenjs";
import UserModel from "../models/user.model";
import { PPT, SavedPPTData } from "../types/ppt.type";
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import supabase from "./supabase.service";

dotenv.config()

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

export const convertPPT = async (req: Request, res: Response) => {
  try {
    const { title, pages }: PPT = req.body;

    const pptx = new PptxGenJS();

    // Cover slide
    const cover = pptx.addSlide();
    cover.addText(title, { x: 1, y: 1, fontSize: 32, bold: true });

    // Content slides
    pages.forEach((page) => {
      const slide = pptx.addSlide();
      slide.addText(page.title, {
        x: 0.5,
        y: 0.5,
        w: 9,
        fontSize: 28,
        bold: true,
      });

      let currentY = 1.5;

      if (page.description) {
        slide.addText(page.description, {
          x: 0.7,
          y: currentY,
          w: 8,
          fontSize: 18,
        });
        currentY += 2;
      }

      if (page.points?.length) {
        slide.addText(page.points.map((p) => `• ${p}`).join("\n"), {
          x: 0.5,
          y: currentY,
          w: 7,
          fontSize: 16,
        });
        currentY += page.points.length * 0.4;
      }

      if (page.imageUrl) {
        slide.addImage({
          path: page.imageUrl,
          x: 7,
          y: 2,
          w: 2.5,
          h: 2.5,
        });
      }
    });

    // Generate PPTX buffer
    const buffer = await pptx.write({ outputType: "nodebuffer" });

    // Unique file name
    const fileName = `${title.split(' ').join('-')}-${Date.now()}.pptx`;

    // Upload to Supabase private bucket
    const { error: uploadError } = await supabase.storage
      .from("PPT-Bucket")
      .upload(fileName, buffer, {
        contentType:
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Create signed URL (expires in ~1 year)
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from("PPT-Bucket")
        .createSignedUrl(fileName, 31536000); // 1 year in seconds

    if (signedUrlError) throw signedUrlError;

    return res.json({
      success: true,
      message: "PPT uploaded successfully",
      url: signedUrlData.signedUrl,
    });
  } catch (error) {
    console.error("Error generating/uploading PPT:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to generate/upload PPT" });
  }
};