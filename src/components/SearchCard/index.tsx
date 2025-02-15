import React from "react";
import Image from "next/image";
import Link from "next/link";

import { TMDBMovie } from "~/lib/types";
import { getMovieEmoji, getMovieTitle } from "~/lib/utils";

const IMAGE_LINK = process.env.NEXT_PUBLIC_TMDB_IMAGE_LINK;

type Props = {
    movie: TMDBMovie;
    isTwoColumnLayout: boolean;
};

const SearchCard = ({ movie, isTwoColumnLayout }: Props) => {
    const title = getMovieTitle(movie);
    const movieEmoji = getMovieEmoji(movie);
    return (
        <Link
            href={`/${movie?.media_type}/${movie?.id}`}
            className={`flex gap-4 items-center hover:ring-2 duration-500 hover:shadow-lg hover:shadow-violet-600 rounded-xl ${
                isTwoColumnLayout ? "max-w-[31.25rem]" : "w-full"
            }`}
        >
            <div className="relative rounded-xl h-40 w-28 min-w-28 overflow-hidden">
                {movie?.poster_path ? (
                    <Image
                        alt={title}
                        fill
                        className="object-cover"
                        src={`${IMAGE_LINK}${movie?.poster_path}`}
                        sizes="(max-width: 640px) 30vw, (max-width: 1024px) 15vw, 10vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-400 text-sm text-center">
                        No Image Available
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <span className="capitalize text-gray-300">
                    {movieEmoji}
                    {movie?.media_type}
                </span>
                {movie?.release_date && (
                    <p className="text-gray-300">📅 {movie.release_date}</p>
                )}
                <p className="text-gray-400">⭐ {movie?.vote_average}/10</p>
                <p className="text-gray-400 line-clamp-2">{movie?.overview}</p>
            </div>
        </Link>
    );
};

export default SearchCard;
