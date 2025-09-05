import { GoogleGenAI, Type, Modality } from "@google/genai";
import dotenv from 'dotenv'
import supabase from "./supabase.service";
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
            description: "Array of pages for the presentation in order: Introduction → Table of Contents → Main Content → Thank You",
            items: {
              type: Type.OBJECT,
              properties: {
                pageNo: { type: Type.INTEGER, description: "Page number (starts from 1 and increases sequentially)" },
                title: { type: Type.STRING, description: "Title of the page" },
                description: { type: Type.STRING, description: "2-3 line description of the page" },
                points: {
                  type: Type.ARRAY,
                  description: "5-7 Key points for the page (optional for Introduction, Table of Contents, and Thank You)",
                  items: { type: Type.STRING }
                },
                prompt: { type: Type.STRING, description: "Prompt for generating image for this page" }
              },
              required: ["pageNo", "title", "description", "points", "prompt"]
            },
            minItems: 4
          },
        },
        required: ["_id", "title", "pages"],
        additionalProperties: false
      }
    },
  });
  const response = result.text as string;
  const parsedResponse = JSON.parse(response);
  return parsedResponse
}

export async function generateImages(prompt: string): Promise<string[] | undefined> {
  const response = await genAI.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  const parts = response?.candidates?.[0]?.content?.parts;
  if (!parts) {
    throw new Error("No images were generated");
  }

  const imageUrls: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part?.inlineData?.data && part.inlineData?.mimeType?.startsWith("image/")) {
      // Convert base64 to Buffer
      const buffer = Buffer.from(part.inlineData.data, "base64");

      // Unique file name
      const filename = `ai-images/${Date.now()}.png`;

      // Upload to Supabase private bucket
      const { error: uploadError } = await supabase.storage
        .from("Image-bucket") // 👈 your bucket name
        .upload(filename, buffer, {
          contentType: part.inlineData.mimeType,
        });

      if (uploadError) {
        console.error("Upload failed:", uploadError.message);
        return;
      }

      // Create signed URL valid for 10 years (315,360,000 seconds)
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from("Image-bucket")
        .createSignedUrl(filename, 315360000);

      if (signedUrlError) {
        console.error("Signed URL error:", signedUrlError.message);
        return;
      }

      imageUrls.push(signedUrlData.signedUrl);
    }
  }

  return imageUrls;
}