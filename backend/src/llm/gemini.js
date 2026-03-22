import "dotenv/config";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";

//defining llm model
export const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    temperature: 0.2,
    maxRetries: 2,
});