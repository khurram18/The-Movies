import { Movie } from "@/types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  );
}