import * as ai from '../services/ai.service'
import { Request, Response } from 'express'

export const getResult = async (req: Request, res: Response) => {
  try {
    const prompt = req.query.prompt;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (typeof prompt !== "string") {
      return res.status(400).json({ message: "Prompt must be a string" });
    }

    const result = await ai.generateContent(prompt);
    return res.json({ 
      success: true,
      message: "PPT Fetched Successfully",
      result,
      createdBy: req.user?.username,
      createdAt: Date.now()
    });
  } catch (err) {
    console.log("Error in getResult:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const generateImageController = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.query;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Prompt is required",
      });
    }

    if (typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        error: "Prompt must be a string",
      });
    }

    const images = await ai.generateImages(prompt);

    return res.status(200).json({
      success: true,
      message: "Images generated successfully",
      data: images,
    });
  } catch (error: any) {
    console.error("Error generating image:", error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Internal server error",
    });
  }
};