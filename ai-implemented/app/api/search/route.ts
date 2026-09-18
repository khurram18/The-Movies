import type { NextRequest } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = Number(searchParams.get("page")) || 1;

  if (!query || query.trim() === "") {
    return Response.json(
       { error: "Missing query parameter 'q'." },
       { status: 400 }
    );
  }

  try {
    const data = await searchMovies(query, page);

    return Response.json(data);
  } catch (error) {
    const message =
       error instanceof Error ? error.message : "Search request failed.";

    return Response.json(
       { error: message },
       { status: 500 }
    );
  }
}
