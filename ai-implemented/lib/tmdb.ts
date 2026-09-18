import {
  MovieDetails,
  MovieResponse,
  MovieVideosResponse,
} from "@/types/movie";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getToken(): string {
  const token = process.env.TMDB_API_TOKEN;

  if (!token) {
    throw new Error(
      "TMDB_API_TOKEN is missing. Add it to your .env.local file."
    );
  }

  return token;
}

async function tmdbFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${TMDB_BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getPopularMovies(
  page = 1
): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(
    `/movie/popular?language=en-US&page=${page}`
  );
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<MovieResponse> {
  return tmdbFetch<MovieResponse>(
    `/search/movie?language=en-US&page=${page}&query=${encodeURIComponent(query)}`
  );
}

export async function getMovieDetails(
  movieId: number
): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(
    `/movie/${movieId}?language=en-US`
  );
}

export async function getMovieVideos(
  movieId: number
): Promise<MovieVideosResponse> {
  return tmdbFetch<MovieVideosResponse>(
    `/movie/${movieId}/videos?language=en-US`
  );
}