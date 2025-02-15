import React from "react";

import Loading from "~/components/Loading";
import Error from "~/components/Error";
import SearchCard from "~/components/SearchCard";
import { TMDBMovie } from "~/lib/types";

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
                    {movieList.map((movie) => (
                        <SearchCard
                            key={movie?.id}
                            movie={movie}
                            isTwoColumnLayout={isTwoColumnLayout}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchCardList;
