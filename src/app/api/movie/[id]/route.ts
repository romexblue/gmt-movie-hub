import axios from "axios";
import { NextRequest } from "next/server";

type Props = {
    params: Promise<{ id?: string }>;
};

export async function GET(request: NextRequest, contenxt: Props) {
    const TMDB_API_KEY = process.env.TMDB_API_KEY;
    const TMDB_LINK = process.env.TMDB_LINK;

    if (!TMDB_API_KEY || !TMDB_LINK) {
        return Response.json(
            { error: "Missing API key or base URL" },
            { status: 500 }
        );
    }

    const { id: movieId } = await contenxt.params;

    if (!movieId) {
        return Response.json(
            { error: "Movie ID is required" },
            { status: 400 }
        );
    }

    try {
        const { data } = await axios.get(`${TMDB_LINK}/movie/${movieId}`, {
            params: {
                api_key: TMDB_API_KEY,
                append_to_response: "credits",
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
