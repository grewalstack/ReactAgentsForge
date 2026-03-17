export default function PromptForm({ query, setQuery, onSubmit, loading }) {
    return (
        <form className="card form-card" onSubmit={onSubmit}>
            <label className="label" htmlFor="query">
                Describe your coding task
            </label>

            <textarea
                id="query"
                className="textarea"
                rows="7"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="E.g. Write a JavaScript function to reverse a string."
            />

            <div className="form-footer">
                <p className="helper-text">
                    Non-coding questions are handled gracefully.
                </p>
                <button className="submit-btn" type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Solution'}
                </button>
            </div>
        </form>
    )
}