import Link from "next/link";
import MovieGrid from "@/components/MovieGrid";
import { getPopularMovies } from "@/lib/tmdb";

export default async function HomePage() {
  const data = await getPopularMovies();

  return (
     <main className="container">
        <header className="page-header">
          <div className="page-header-title">
            <h1>Movie Explorer</h1>
            <p>Discover popular movies</p>
          </div>

          <Link href="/search" className="search-link">
            Search movies
          </Link>
        </header>

        <MovieGrid movies={data.results} />
      </main>
     );
}
