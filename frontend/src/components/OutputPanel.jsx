import OutputSection from "./OutputSection";

export default function OutputPanel({response}) {
    if(!response.isCodingQuestion) {
        return (
            <div className="card non-coding-card">
                <h2>Not a coding question</h2>
                <p>{response.message}</p>
            </div>
        );
    }

    const {plan, code, tests, documentation, review} = response.data;
    return (
        <section className="output-grid">
            <OutputSection
                title="Plan"
                content={JSON.stringify(plan, null, 2)}
                code
            />
            <OutputSection title="Code" content={code} code/>
            <OutputSection title="Unit Tests" content={tests} code/>
            <OutputSection title="Documentation" content={documentation} code/>
            <OutputSection
                title="Review"
                content={JSON.stringify(review, null, 2)}
                code
            />
        </section>
    );
}