"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { MediaType, TimeWindowType, TMDBResponse } from "~/lib/types";
import MovieCardList from "~/components/MovieCardList";
import GradientButton from "~/components/GradientButton";
import Select from "~/components/Select";

const fetchTrending = async (
    mediaType: string,
    timeWindow: string,
    page: Number
): Promise<TMDBResponse> => {
    const { data } = await axios.get<TMDBResponse>(
        `/api/trending?mediaType=${mediaType}&timeWindow=${timeWindow}&page=${page}`
    );
    return data;
};

const HomePage = () => {
    const [mediaType, setMediaType] = useState<MediaType>("movie");
    const [timeWindow, setTimeWindow] = useState<TimeWindowType>("day");
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

    const handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMediaType(e.target.value as MediaType);
    };

    const handleTimeWindowChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setTimeWindow(e.target.value as TimeWindowType);
    };

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
            <div className="flex w-full px-4 md:px-16 max-w-screen-2xl pb-6">
                <div className="flex w-10 items-center justify-center rounded-tl-3xl rounded-bl-3xl border-r border-gray-200 bg-white p-5">
                    <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="pointer-events-none absolute w-5 fill-gray-500 transition"
                    >
                        <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    className="w-full max-w-80a bg-white pl-2 text-black font-semibold outline-0 text-xl"
                    placeholder="Bridge to tera something.."
                    id=""
                />
                <button className="bg-blue-500 p-3 rounded-tr-3xl rounded-br-3xl text-xl text-white font-semibold hover:bg-blue-800 transition-colors">
                    Search
                </button>
            </div>
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
                <div className="p-4 flex justify-center gap-4">
                    <GradientButton
                        disabled={page == 1}
                        handleClick={() => setPage((cur) => cur - 1)}
                    >
                        Previous
                    </GradientButton>
                    <GradientButton
                        disabled={
                            data?.total_pages !== undefined &&
                            page === data.total_pages - 1
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
