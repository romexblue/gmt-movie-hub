"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

import Error from "~/components/Error";
import Loading from "~/components/Loading";
import { MediaType, TimeWindowType, TMDBResponse } from "~/lib/types";

const fetchTrending = async (
    mediaType: string,
    timeWindow: string
): Promise<TMDBResponse> => {
    const { data } = await axios.get<TMDBResponse>(
        `/api/trending?mediaType=${mediaType}&timeWindow=${timeWindow}`
    );
    return data;
};

const IMAGE_LINK = process.env.NEXT_PUBLIC_TMDB_IMAGE_LINK;

const HomePage = () => {
    const [mediaType, setMediaType] = useState<MediaType>("all");
    const [timeWindow, setTimeWindow] = useState<TimeWindowType>("day");

    const { data, error, isPending } = useQuery<TMDBResponse>({
        queryKey: ["trending"],
        queryFn: () => fetchTrending(mediaType, timeWindow),
    });

    if (isPending) return <Loading />;
    if (error) return <Error />;

    const movieList = data?.results ?? [];
    console.log(movieList);
    return (
        <div className="flex flex-col">
            <div className="flex flex-col p-10 text-center">
                <h1 className="bg-gradient-to-r from-blue-500 to-indigo-500 inline-block text-transparent bg-clip-text font-black text-4xl md:text-6xl italic">
                    G Movie Hub
                </h1>
                <span className="text-xl md:text-3xl">
                    Discover and stream your favorite content!
                </span>
            </div>

            <div className="flex flex-wrap gap-4 px-4 md:px-16">
                {movieList?.map((movie) => {
                    const title =
                        movie?.media_type === "tv" ? movie?.name : movie?.title;

                    const movieEmoji = movie?.media_type === "tv" ? "📺" : "🎥";
                    return (
                        <div
                            key={movie.id}
                            className="group border border-gray-200 rounded-3xl max-w-52 p-4 relative overflow-hidden w-52 h-72 hover:scale-110 duration-200"
                        >
                            <Image
                                alt={title}
                                fill
                                className="object-cover duration-1000 hover:scale-110"
                                src={`${IMAGE_LINK}${movie?.poster_path}`}
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" // Add proper size handling for responsive design
                            />
                            <div className="movie-details absolute bottom-0 left-0 w-full bg-black/80 text-white p-3 h-auto transition-transform duration-500 transform translate-y-full group-hover:translate-y-0">
                                <h3 className="text-base font-bold">{title}</h3>
                                <span className="capitalize text-xs text-gray-300">
                                    {movieEmoji}
                                    {movie?.media_type}
                                </span>
                                <p className="text-xs text-gray-300">
                                    📅 {movie.release_date}
                                </p>
                                <p className="text-xs text-gray-400">
                                    ⭐ {movie.vote_average}/10
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
