import React from "react";
import { TMDBMovie } from "~/lib/types";
import MovieCard from "~/components/MovieCard";
import Loading from "~/components/Loading";
import Error from "~/components/Error";

type Props = {
    movieList: TMDBMovie[] | undefined;
    isLoading: boolean;
    isError: boolean;
};

const MovieCardList = ({ movieList, isLoading, isError }: Props) => {
    if (isLoading)
        return (
            <div className="min-h-96">
                <Loading />
            </div>
        );
    if (isError) return <Error />;

    return (
        <div className="flex flex-wrap justify-center gap-6 bg-gray-800 rounded-xl p-4">
            {movieList?.map((movie) => (
                <MovieCard key={movie?.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieCardList;
