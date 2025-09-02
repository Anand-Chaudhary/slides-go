import * as pptService from '../services/ppt.service'
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
      slug: result?.title.split(' ').join('-'),
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

export const generateCompletePPT = async (req: Request, res: Response) => {
  try {
    const prompt = req.query.prompt;
    const loggedinUser = req.user?.email;

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

    // Generate the PPT content structure
    const pptContent = await ai.generateContent(prompt);

    // Generate images for each page
    const pagesWithImages = await Promise.all(
      pptContent.pages.map(async (page: any) => {
        try {
          const imageUrls = await ai.generateImages(page.prompt);
          return {
            ...page,
            imageUrl: imageUrls && imageUrls.length > 0 ? imageUrls[0] : null,
            prompt: undefined, // drop prompt after generating image
          };
        } catch (imageError) {
          console.error(
            `Error generating image for page ${page.pageNo}:`,
            imageError
          );
          return {
            ...page,
            imageUrl: null,
            prompt: undefined,
          };
        }
      })
    );

    const slug = pptContent.title.split(" ").join("-");

    const completePPT = {
      ...pptContent,
      pages: pagesWithImages,
      slug: slug // Add slug to the PPT object
    };

    if (loggedinUser) {
      try {
        const savedUser = await pptService.savePPTToUser(loggedinUser, completePPT, slug);
      } catch (err) {
        console.error('Error saving PPT to user:', err);
      }
    } else {
      console.warn('No logged in user, PPT not saved.');
    }

    return res.json({
      success: true,
      message: "Complete PPT generated successfully",
      result: completePPT,
      slug,
      createdBy: req.user?.username,
      createdAt: Date.now(),
    });
  } catch (err) {
    console.log("Error in generateCompletePPT:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};