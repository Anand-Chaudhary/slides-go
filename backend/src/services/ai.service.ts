import { GoogleGenAI, Type, Modality } from "@google/genai";
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const genAI = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!
});

export async function generateContent(prompt: string) {
    const result = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [{
            role: "user",
            parts: [{ text: prompt }]
        }],
        config: {
            responseMimeType: "application/json",
            temperature: 0.4,
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    _id: { type: Type.STRING, description: "Randomly generated unique ID" },
                    title: { type: Type.STRING, description: "Title of the presentation" },
                    pages: {
                        type: Type.ARRAY,
                        description: "Array of pages for the presentation",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                pageNo: { type: Type.INTEGER, description: "Page number" },
                                title: { type: Type.STRING, description: "Title of the page" },
                                description: { type: Type.STRING, description: "2-3 line description of the page" },
                                points: {
                                    type: Type.ARRAY,
                                    description: "3-4 Key points for the page",
                                    items: { type: Type.STRING }
                                },
                                prompt: { type: Type.STRING, description: "Prompt for generating image for this page" }
                            },
                            required: ["pageNo", "title", "description", "points", "prompt"]

                        }
                    },
                    createdBy: { type: Type.STRING, description: "Logged-in user" },
                    createdAt: { type: Type.STRING, description: "Timestamp when the PPT is created" }
                },
                required: ["_id", "title", "pages", "createdBy", "createdAt"]
            }
        },
    });
    const response = result.text as string;
    const parsedResponse = JSON.parse(response);
    return parsedResponse
}

export async function generateImages(prompt: string): Promise<string[]> {
  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  if (!response?.candidates?.[0]?.content?.parts) {
    throw new Error("No images were generated");
  }

  const savedPaths: string[] = [];
  let idx = 1;

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData?.data) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");

      const folder = "uploads";
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
      }

      const filePath = `${folder}/gemini-image-${idx}.png`;
      fs.writeFileSync(filePath, buffer);
      savedPaths.push(filePath);
      idx++;
    }
  }

  if (savedPaths.length === 0) {
    throw new Error("Model returned no image data");
  }

  return savedPaths;
}