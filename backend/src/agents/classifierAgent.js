import {model} from '../llm/gemini.js';
import { CodingIntentSchema } from '../schemas/taskSchemas.js';

const classifierModel = model.withStructuredOutput(CodingIntentSchema);

export async function classifierAgent(state){
    const result = await classifierModel.invoke(`
        You are strict classifier.


        Determine whether this user request is mainly about software development, coding, debugging, architecture,
        APIs, frontend, backend, databases, DevOps, testing, documentation, or programming

        User Request:
        ${state.userQuery}

        Return:
        - isCodingQuestion
        - reason
        `);

        return{
            classification: result,
        };
}