import * as ai from '../services/ai.service'
import { Request, Response } from 'express'

export const getResult = async (req: Request, res: Response) => {
  try {
    const prompt = req.query.prompt;

    if (typeof prompt !== "string") {
      return res.status(400).json({ message: "Prompt must be a string" });
    }

    const result = await ai.generateContent(prompt);
    return res.json({ result });
  } catch (err) {
    console.log("Error in getResult:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
