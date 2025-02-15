import { TMDBMovie } from "./types";

export function getMovieTitle(movie: TMDBMovie): string {
    return movie?.media_type === "tv" ? movie?.name : movie?.title;
}

export function getMovieEmoji(movie: TMDBMovie): string {
    return movie?.media_type === "tv" ? "📺" : "🎥";
}
