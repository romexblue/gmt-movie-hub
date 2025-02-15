import React from "react";
import Image from "next/image";
import Link from "next/link";

import { TMDBMovie } from "~/lib/types";
import { getMovieEmoji, getMovieTitle } from "~/lib/utils";

const IMAGE_LINK = process.env.NEXT_PUBLIC_TMDB_IMAGE_LINK;

const MovieCard = ({ movie }: { movie: TMDBMovie }) => {
    const title = getMovieTitle(movie);
    const movieEmoji = getMovieEmoji(movie);

    return (
        <Link
            href={`/${movie?.media_type}/${movie?.id}`}
            className="group border border-gray-200 rounded-3xl max-w-60 p-4 relative overflow-hidden w-60 h-96 hover:scale-110 duration-200"
        >
            {movie?.poster_path ? (
                <Image
                    alt={title}
                    fill
                    className="object-fit duration-1000 hover:scale-110"
                    src={`${IMAGE_LINK}${movie?.poster_path}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-400 text-sm text-center">
                    No Image Available
                </div>
            )}
            <div className="movie-details absolute bottom-0 left-0 w-full bg-black/80 text-white p-3 h-auto transition-transform duration-500 transform translate-y-full group-hover:translate-y-0">
                <h3 className="text-base font-bold">{title}</h3>
                <span className="capitalize text-xs text-gray-300">
                    {movieEmoji}
                    {movie?.media_type}
                </span>
                {movie?.release_date && (
                    <p className="text-xs text-gray-300">
                        📅 {movie.release_date}
                    </p>
                )}
                <p className="text-xs text-gray-400">
                    ⭐ {movie?.vote_average}/10
                </p>
            </div>
        </Link>
    );
};

export default MovieCard;
