import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const TMDB_LINK = process.env.TMDB_LINK;

    if (!TMDB_API_KEY || !TMDB_LINK) {
        return Response.json(
            { error: "Missing API key or base URL" },
            { status: 500 }
        );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const page = searchParams.get("page") || "1";

    if (!query) {
        return Response.json(
            { error: "Query parameter is required" },
            { status: 400 }
        );
    }

    try {
        const { data } = await axios.get(`${TMDB_LINK}/search/multi`, {
            params: {
                api_key: TMDB_API_KEY,
                query,
                page,
            },
        });

        return Response.json(data);
    } catch (error) {
        return Response.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
