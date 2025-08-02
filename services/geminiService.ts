
import { GoogleGenAI, Type } from "@google/genai";
import type { WorkflowStep } from '../types';
import { WorkflowIcon } from '../types';

// This function is designed to run in a secure server-side environment
// or a context where the API key is securely managed.
const getApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable not set.");
    throw new Error("API key is missing. Please configure the API_KEY environment variable.");
  }
  return apiKey;
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

const workflowSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: "A short, action-oriented title for the workflow step.",
        },
        description: {
          type: Type.STRING,
          description: "A one-sentence explanation of what happens in this step.",
        },
        icon: {
          type: Type.STRING,
          enum: Object.values(WorkflowIcon),
          description: "A keyword representing the type of action.",
        },
      },
      required: ["title", "description", "icon"],
    },
};


export const generateAutomationWorkflow = async (taskDescription: string): Promise<WorkflowStep[]> => {
  if (!taskDescription) {
    throw new Error("Task description cannot be empty.");
  }

  const prompt = `You are an expert AI automation consultant. A user wants to automate a business task.
  The task is: "${taskDescription}".
  
  Generate a 4-6 step high-level workflow to automate this task. Be creative and practical.
  Focus on common business automation patterns involving data, APIs, and decisions.
  Respond with a JSON object that strictly follows the provided schema.`;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: workflowSchema,
            temperature: 0.7,
        }
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);
    
    if (!Array.isArray(parsedResponse)) {
      throw new Error("API did not return a valid array for the workflow.");
    }

    return parsedResponse as WorkflowStep[];
  } catch (error) {
    console.error("Error generating workflow with Gemini API:", error);
    // Provide a more user-friendly error message
    throw new Error("Failed to generate the automation workflow. The AI model may be busy, or there was a network issue. Please try again.");
  }
};
