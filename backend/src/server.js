import "dotenv/config";
import express from "express";
import cors from "cors";
import { buildSoftwareAssistantGraph } from "./graph/softwareAssistantGraph.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

const assistantGraph = buildSoftwareAssistantGraph();

app.get("/api/health", (_req, res) => {
    res.json({
        success: true,
        message: "Backend is running!"
    });
})

app.post("/api/assistant", async (req, res) => {
    try{
        const {query} = req.body;

        if(!query || !query.trim()){
            return res.status(400).json({
                success: false,
                error: "Query is required"
            });
        }

        const result = await assistantGraph.invoke({
            userQuery: query.trim(),
        });

        if(result.finalMessage){
            return res.json({
                success: true,
                isCodingQuestion: false,
                message: result.finalMessage,
            })
        }

        return res.json({
            success: true,
            isCodingQuestion: true,
            data:{
                plan: result.plan,
                code: result.code,
                tests: result.tests,
                docs: result.docs,
                review: result.review,
            }
        })

    }catch(error){
        console.error("Assistant error:", error);
        return res.status(500).json({
            success: false,
            error: "Something went wrong while generating the response."
        })

    }
});

app.listen(port, ()=>{
    console.log(`Backend running at https://localhost:${port}`);
})