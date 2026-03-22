import { Annotation, StateGraph, START, END } from "@langchain/langgraph";
import { plannerAgent } from '../agents/plannerAgent.js';
import { coderAgent } from "../agents/coderAgent.js";
import { testAgent } from "../agents/testAgent.js";
import { docsAgent } from "../agents/docsAgent.js";
import { reviewerAgent } from "../agents/reviewerAgent.js";
import { classifierAgent } from "../agents/classifierAgent.js";

// Shared state: each key uses LastValue so node partial updates merge into invoke() output.

const AssistantState = Annotation.Root({
    userQuery: Annotation(),
    classification: Annotation(),
    plan: Annotation(),
    code: Annotation(),
    tests: Annotation(),
    docs: Annotation(),
    review: Annotation(),
    finalMessage: Annotation(),
});

function routeAfterClassification(state) {
    if (state.classification?.isCodingQuestion) return "planner";
    return "nonCoding";
}

function routeAfterReview(state) {
    if (state.review?.approved) return END;

    if (state.review?.nextStep === "coder") return "coder";
    if (state.review?.nextStep === "tester") return "tester";
    if (state.review?.nextStep === "docsNode") return "docsNode";

    return END;
}

async function nonCodingNode() {
    return {
        finalMessage:
            "This assistant is built for coding and software-development questions only. Please feel free to ask any coding related questions.",
    };
}

export function buildSoftwareAssistantGraph() {
    const graph = new StateGraph(AssistantState);

    graph
        .addNode("classifier", classifierAgent)
        .addNode("planner", plannerAgent)
        .addNode("coder", coderAgent)
        .addNode("tester", testAgent)
        .addNode("docsNode", docsAgent)
        .addNode("reviewer", reviewerAgent)
        .addNode("nonCoding", nonCodingNode)
        .addEdge(START, "classifier")
        .addConditionalEdges("classifier", routeAfterClassification, {
            planner: "planner",
            nonCoding: "nonCoding",
        })
        .addEdge("planner", "coder")
        .addEdge("coder", "tester")
        .addEdge("tester", "docsNode")
        .addEdge("docsNode", "reviewer")
        .addEdge("nonCoding", END)
        .addConditionalEdges("reviewer", routeAfterReview, {
            [END]: END,
            coder: "coder",
            tester: "tester",
            docsNode: "docsNode",
        });

    return graph.compile();
}