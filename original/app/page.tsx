import MovieGrid from "@/components/MovieGrid";
import { getPopularMovies } from "@/lib/tmdb";

export default async function HomePage() {
  const data = await getPopularMovies();

  return (
    <main className="container">
      <header className="page-header">
        <h1>Movie Explorer</h1>
        <p>Discover popular movies</p>
      </header>

      <MovieGrid movies={data.results} />
    </main>
  );
}