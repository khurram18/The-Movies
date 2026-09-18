import Link from "next/link";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "/placeholder-movie.png";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <Link
      href={`/movies/${movie.id}`}
      className="movie-card"
    >
      <div className="movie-poster-container">
        <img
          src={posterUrl}
          alt={movie.title}
          className="movie-poster"
        />
      </div>

      <div className="movie-card-content">
        <h2>{movie.title}</h2>

        <div className="movie-meta">
          <span>{releaseYear}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}