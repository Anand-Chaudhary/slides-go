import { GoogleGenAI, Type } from "@google/genai";
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