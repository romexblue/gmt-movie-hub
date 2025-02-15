"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import SearchBar from "~/components/SearchBar";
import SearchCardList from "~/components/SearchCardList";
import { TMDBResponse } from "~/lib/types";
import GradientButton from "~/components/GradientButton";

const fetchSearch = async (
    page: number,
    searchString: string
): Promise<TMDBResponse> => {
    const { data } = await axios.get<TMDBResponse>(
        `/api/search?query=${searchString}&page=${page}`
    );
    return data;
};

type Props = {
    searchString: string;
};

const SearchPage = ({ searchString }: Props) => {
    const [page, setPage] = useState(1);

    const { data, error, isPending } = useQuery<TMDBResponse>({
        queryKey: ["search", searchString, page],
        queryFn: () => fetchSearch(page, searchString),
    });

    return (
        <div>
            <div className="w-full flex justify-center bg-gray-800 p-4">
                <div className="flex justify-center items-center w-full max-w-screen-2xl gap-8">
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text font-black text-4xl md:text-6xl italic"
                    >
                        G
                    </Link>
                    <SearchBar containerClass="" />
                </div>
            </div>

            <SearchCardList
                movieList={data?.results}
                isError={!!error}
                isLoading={isPending}
            />

            <div className="p-8 flex justify-center gap-4 mt-4">
                <GradientButton
                    disabled={page === 1}
                    handleClick={() => setPage((cur) => cur - 1)}
                >
                    Previous
                </GradientButton>
                <GradientButton
                    disabled={
                        data?.total_pages !== undefined &&
                        page >= data.total_pages
                    }
                    handleClick={() => setPage((cur) => cur + 1)}
                >
                    Next
                </GradientButton>
            </div>
        </div>
    );
};

export default SearchPage;
