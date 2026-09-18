import Link from "next/link";
import {
  getMovieDetails,
  getMovieVideos,
} from "@/lib/tmdb";

interface MovieDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w780";

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id } = await params;

  const movieId = Number(id);

  if (Number.isNaN(movieId)) {
    throw new Error("Invalid movie ID");
  }

  const [movie, videos] = await Promise.all([
    getMovieDetails(movieId),
    getMovieVideos(movieId),
  ]);

  const trailer = videos.results.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  ) ??
    videos.results.find(
      (video) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    );

  const backdropUrl = movie.backdrop_path
    ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
    : null;

  return (
    <main className="details-page">
      <div className="container">
        <Link href="/" className="back-link">
          ← Back to movies
        </Link>

        <div className="movie-details">
          <div className="details-poster">
            {movie.poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className="no-poster">
                No poster available
              </div>
            )}
          </div>

          <div className="details-content">
            <h1>{movie.title}</h1>

            {movie.tagline && (
              <p className="tagline">
                {movie.tagline}
              </p>
            )}

            <div className="details-meta">
              <span>
                ⭐ {movie.vote_average.toFixed(1)}
              </span>

              <span>
                {movie.release_date || "Unknown release date"}
              </span>

              {movie.runtime && (
                <span>{movie.runtime} min</span>
              )}
            </div>

            <div className="genres">
              {movie.genres.map((genre) => (
                <span key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>

            <h2>Overview</h2>

            <p className="overview">
              {movie.overview ||
                "No overview available."}
            </p>
          </div>
        </div>

        {trailer && (
          <section className="trailer-section">
            <h2>Official Trailer</h2>

            <div className="trailer">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {!trailer && (
          <section className="trailer-section">
            <h2>Trailer</h2>
            <p>No trailer available.</p>
          </section>
        )}

        {backdropUrl && (
          <div className="backdrop">
            <img
              src={backdropUrl}
              alt=""
            />
          </div>
        )}
      </div>
    </main>
  );
}