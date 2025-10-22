
import { GoogleGenAI } from "@google/genai";

export const generateWallpapers = async (prompt: string, aspectRatio: string): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 4,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("No images were generated.");
    }
    
    return response.generatedImages.map(img => {
      if (!img.image.imageBytes) {
        throw new Error("Generated image data is missing.");
      }
      return img.image.imageBytes;
    });

  } catch (error) {
    console.error("Error generating images:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate images: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};
