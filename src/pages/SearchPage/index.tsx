"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
