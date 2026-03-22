import { model } from '../llm/gemini.js';

export async function docsAgent(state) {
    const response = await model.invoke(`
        You are senior technical writer.

        Given the Javascript code:
        ${state.code}

        Write clear documentation with:
        - overview
        - purpose
        - installation
        - usage
        - example

        Return markdown.
        `);
        return {docs: response.content};
}