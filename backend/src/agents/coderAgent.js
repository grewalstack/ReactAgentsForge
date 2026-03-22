import {model} from "../llm/gemini.js";

export async function coderAgent(state) {
    const response = await model.invoke(`
        You are a senior JavaScript engineer.
        
        User Request:
        ${state.userQuery}

        Implement the following task:
        ${JSON.stringify(state.plan, null, 2)}
        
        Write production-style Javascript code for the requested feature.
        Return only code with short inline comments where needed.
        `);
        return {code: response.content};
}