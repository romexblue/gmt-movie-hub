"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { MediaType, TimeWindowType, TMDBResponse } from "~/lib/types";
import MovieCardList from "~/components/MovieCardList";
import GradientButton from "~/components/GradientButton";
import Select from "~/components/Select";
import SearchBar from "~/components/SearchBar";

const fetchTrending = async (
    mediaType: string,
    timeWindow: string,
    page: number
): Promise<TMDBResponse> => {
    const { data } = await axios.get<TMDBResponse>(
        `/api/trending?mediaType=${mediaType}&timeWindow=${timeWindow}&page=${page}`
    );
    return data;
};

const HomePage = () => {
    const [mediaType, setMediaType] = useState<MediaType>("movie");
    const [timeWindow, setTimeWindow] = useState<TimeWindowType>("week");
    const [page, setPage] = useState(1);

    const { data, error, isPending } = useQuery<TMDBResponse>({
        queryKey: ["trending", mediaType, timeWindow, page],
        queryFn: () => fetchTrending(mediaType, timeWindow, page),
    });

    const mediaLabel =
        mediaType === "all"
            ? "media"
            : mediaType === "movie"
            ? "movies"
            : "TV shows";

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col p-10 text-center">
                <h1 className="bg-gradient-to-r from-blue-500 to-indigo-500 inline-block text-transparent bg-clip-text font-black text-4xl md:text-6xl italic">
                    G Movie Hub
                </h1>
                <span className="text-xl md:text-3xl">
                    Discover and stream your favorite content!
                </span>
            </div>
            <SearchBar
                containerClass="flex w-full px-4 md:px-16 max-w-screen-2xl pb-6"
                isLarge
            />
            <div className="px-4 md:px-16 max-w-screen-2xl w-full">
                <h1 className="font-semibold text-2xl md:text-4xl pb-4">
                    Trending {mediaLabel}{" "}
                    {timeWindow === "day" ? "today" : "this week"}
                </h1>
                <div className="flex gap-4 pb-4">
                    <Select
                        value={mediaType}
                        onChange={(e) =>
                            setMediaType(e.target.value as MediaType)
                        }
                        options={[
                            { label: "All", value: "all" },
                            { label: "Movies", value: "movie" },
                            { label: "TV Shows", value: "tv" },
                        ]}
                    />
                    <Select
                        value={timeWindow}
                        onChange={(e) =>
                            setTimeWindow(e.target.value as TimeWindowType)
                        }
                        options={[
                            { label: "Day", value: "day" },
                            { label: "Week", value: "week" },
                        ]}
                    />
                </div>
                <MovieCardList
                    movieList={data?.results}
                    isLoading={isPending}
                    isError={!!error}
                />
                <div className="p-8 flex justify-center gap-4">
                    <GradientButton
                        disabled={page == 1}
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
        </div>
    );
};

export default HomePage;
