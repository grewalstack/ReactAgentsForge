import {model} from "../llm/gemini.js";
import {PlanSchema} from "../schemas/taskSchemas.js";

const plannerModel = model.withStructuredOutput(PlanSchema);


export async function plannerAgent(state){
    const result = await plannerModel.invoke(`You are a senior software engineer.
        Break this request into implementation tasks for a multi-agent software developer assistant.
        User request:
        ${state.userQuery}
        
        Return:
        - summary
        - tasks with assignedAgent`);
        return {plan: result};
}