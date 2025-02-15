import { Crew, TMDBMovie } from "./types";

export function getMovieTitle(movie: TMDBMovie): string {
    return movie?.media_type === "tv" ? movie?.name : movie?.title;
}

export function getMovieEmoji(movie: TMDBMovie): string {
    return movie?.media_type === "tv" ? "📺" : "🎥";
}

export const getDirectors = (crew: Crew[] | undefined) => {
    return crew
        ?.filter((member) => member.job === "Director")
        ?.map((director) => director.name);
};
