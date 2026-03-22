//it's shared memory object so agents can pass work to each other
import * as z from "zod";

export const CodingIntentSchema = z.object({
    isCodingQuestion: z.boolean(),
    reason: z.string(),
})

export const PlanSchema = z.object({
    summary: z.string(),
    tasks: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            assignedAgent: z.enum(["coder", "tester", "docsNode", "reviewer"]),
        })
    )
})

export const ReviewerSchema = z.object({
    approved: z.boolean(),
    feedback: z.string(),
    nextStep: z.enum(["coder", "tester", "docsNode", "done"]),
})