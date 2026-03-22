import { model } from '../llm/gemini.js';

export async function testAgent(state) {
    const response = await model.invoke(`
        You are a senior QA automation engineer.

        Given this JavaScript code:
        ${state.code}

        write unit test using Jest.
        Return only the test code.
        `);
        return {tests: response.content};
}