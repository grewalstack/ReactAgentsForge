import { useState } from "react";
import Header from "./components/Header.jsx";
import PromptForm from "./components/PromptForm";
import OutputPanel from "./components/OutputPanel";
import EmptyState from "./components/EmptyState";

const API_URL = "http://localhost:8080/api/assistant";

export default function App() {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [response, setResponse] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!query.trim()) return;

        setLoading(true);
        setError("")
        setResponse(null);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({query})
            });

            const data = await res.json();
            if(!res.ok || !data.ok) {
                throw new Error(data.error || "Request failed");
            }

            setResponse(data);
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="app-shell">
            <main className="container">
                <Header/>
                <PromptForm
                    query={query}
                    setQuery={setQuery}
                    onSubmit={handleSubmit}
                    loading={loading}
                />
                {error ? (
                    <div className="card error-card">{error}</div>
                ): response ? (
                    <OutputPanel response={response}/>
                ) : (
                    <EmptyState/>
                )}
            </main>
        </div>
    )

}