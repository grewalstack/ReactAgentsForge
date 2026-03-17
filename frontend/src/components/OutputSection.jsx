export default function OutputSection({ title, content, code = false }) {
    return (
        <article className="card output-card">
            <div className="section-header">
                <h2>{title}</h2>
            </div>

            {code ? (
                <pre className="code-block">
                    <code>{content}</code>
                </pre>
            ) : (
                <div className="plain-text">{content}</div>
            )}

        </article>
    )
}