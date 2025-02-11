import axios from "axios";
import { TMDBResponse } from "~/lib/types";

export async function GET() {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const TMDB_LINK = process.env.TMDB_LINK;

  if (!TMDB_API_KEY || !TMDB_LINK) {
    return Response.json(
      { error: "Missing API key or base URL" },
      { status: 500 }
    );
  }

  try {
    const { data } = await axios.get<TMDBResponse>(`${TMDB_LINK}/trending/all/week`, {
      params: {
        api_key: TMDB_API_KEY,
      },
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
}
