"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import MovieGrid from "@/components/MovieGrid";
import { Movie } from "@/types/movie";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const runSearch = useCallback(async (searchQuery: string) => {
    const trimmed = searchQuery.trim();

    if (trimmed === "") {
      setHasSearched(false);
      setResults([]);
      setError(null);
      setLoading(false);
      return;
     }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(
           `/api/search?q=${encodeURIComponent(trimmed)}`,
           { signal: controller.signal }
        );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search request failed.");
       }

      setResults(data.results ?? []);
      } catch (searchError) {
      if (
        searchError instanceof DOMException &&
         searchError.name === "AbortError"
       ) {
        return;
       }

      setError(
         searchError instanceof Error
          ? searchError.message
          : "Search request failed."
        );
      setResults([]);
      } finally {
      clearTimeout(timer);
      setLoading(false);
      }
     },
     []
   );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void runSearch(query);
   };

  return (
         <main className="search-page container">
            <Link href="/" className="back-link">
            ← Back to movies
            </Link>

            <header className="page-header">
              <h1>Search Movies</h1>
            </header>

            <form className="search-form" onSubmit={handleSubmit}>
              <input
               className="search-input"
               type="search"
               placeholder="Search for a movie..."
               value={query}
               onChange={(event) => setQuery(event.target.value)}
               disabled={loading}
               />

              <button
               className="search-button"
               type="submit"
               disabled={loading}
              >
              Search
              </button>
            </form>

            {error && <p className="search-error">{error}</p>}

            {!hasSearched && !error && (
              <p className="search-prompt">Search for a movie to get started.</p>
            )}

            {loading && <p className="search-status">Searching…</p>}

            {!loading && hasSearched && !error && results.length === 0 && (
              <p className="search-empty">
               No movies found for “{query.trim()}”.
              </p>
            )}

            {!loading && !error && results.length > 0 && (
              <MovieGrid movies={results} />
            )}
          </main>
        );
}
