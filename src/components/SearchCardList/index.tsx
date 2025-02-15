import React from "react";
import Image from "next/image";

import Loading from "~/components/Loading";
import Error from "~/components/Error";
import { getMovieEmoji, getMovieTitle } from "~/lib/utils";
import { TMDBMovie } from "~/lib/types";

const IMAGE_LINK = process.env.NEXT_PUBLIC_TMDB_IMAGE_LINK;

type Props = {
    movieList: TMDBMovie[] | undefined;
    isLoading: boolean;
    isError: boolean;
};

const SearchCardList = ({ movieList = [], isLoading, isError }: Props) => {
    if (isLoading)
        return (
            <div className="min-h-96">
                <Loading />
            </div>
        );
    if (isError) return <Error />;

    const isTwoColumnLayout = movieList?.length > 3;

    return (
        <div className="w-full flex justify-center pt-10">
            <div className="w-full px-4 md:px-16 max-w-screen-2xl">
                <div
                    className={`grid gap-6 ${
                        isTwoColumnLayout
                            ? "grid-cols-1 md:grid-cols-2"
                            : "grid-cols-1"
                    }`}
                >
                    {movieList.map((movie) => {
                        const title = getMovieTitle(movie);
                        const movieEmoji = getMovieEmoji(movie);

                        return (
                            <div
                                key={movie?.id}
                                className={`flex gap-4 items-center ${
                                    isTwoColumnLayout
                                        ? "max-w-[31.25rem]"
                                        : "w-full"
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
                                    <h3 className="text-lg font-bold">
                                        {title}
                                    </h3>
                                    <span className="capitalize text-gray-300">
                                        {movieEmoji}
                                        {movie?.media_type}
                                    </span>
                                    {movie?.release_date && (
                                        <p className="text-gray-300">
                                            📅 {movie.release_date}
                                        </p>
                                    )}
                                    <p className="text-gray-400">
                                        ⭐ {movie?.vote_average}/10
                                    </p>
                                    <p className="text-gray-400 line-clamp-2">
                                        {movie?.overview}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SearchCardList;
