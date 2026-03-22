import { model } from '../llm/gemini.js';
import { ReviewerSchema } from '../schemas/taskSchemas.js';

const reviewerModel = model.withStructuredOutput(ReviewerSchema);

export async function reviewerAgent(state) {
    const result = await reviewerModel.invoke(`
        You are a strict senior code reviewer.

        Review this output:
        
        PLAN:
        ${JSON.stringify(state.plan, null, 2)}

        CODE:
        ${JSON.stringify(state.code || "")}

        TESTS:
        ${JSON.stringify(state.tests || "")}

        DOCS:
        ${JSON.stringify(state.docs || "")}

        Approve only if:
        - code is coherent
        - tests are relevant and covering all the scenarios
        - docs are usable

        Return:
        - approved
        - feedback
        - nextstep
        `);
        return{review: result};
}