import axios from "axios";
import { NextRequest } from "next/server";
import { TMDBResponse } from "~/lib/types";

export async function GET(request: NextRequest) {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const TMDB_LINK = process.env.TMDB_LINK;
    if (!TMDB_API_KEY || !TMDB_LINK) {
        return Response.json(
            { error: "Missing API key or base URL" },
            { status: 500 }
        );
    }

    // Get search params from URL
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get("mediaType") || "all";
    const timeWindow = searchParams.get("timeWindow") || "day";
    const page = searchParams.get("page") || 1;

    try {
        const { data } = await axios.get<TMDBResponse>(
            `${TMDB_LINK}/trending/${mediaType}/${timeWindow}?page=${page}&language=en-US`,
            {
                params: { api_key: TMDB_API_KEY },
            }
        );

        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
