"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { MediaType, TMDBMovieById, TMDBTVbyId } from "~/lib/types";
import Loading from "~/components/Loading";
import Error from "~/components/Error";
import MovieCardById from "~/components/MovieByIdCard";
import TVByIdCard from "~/components/TVByIdCard";

const fetchMovie = async (movieId: string): Promise<TMDBMovieById> => {
    const { data } = await axios.get<TMDBMovieById>(`/api/movie/${movieId}`);
    return data;
};

const fetchTVShow = async (movieId: string): Promise<TMDBTVbyId> => {
    const { data } = await axios.get<TMDBTVbyId>(`/api/tv/${movieId}`);
    return data;
};

type Props = {
    movieId: string;
    mediaType: MediaType;
};

const MediaPage = ({ movieId, mediaType }: Props) => {
    const queryFn = mediaType === "movie" ? fetchMovie : fetchTVShow;

    const { data, error, isPending } = useQuery<TMDBMovieById | TMDBTVbyId>({
        queryKey: ["media", mediaType, movieId],
        queryFn: () => queryFn(movieId),
    });

    if (isPending) return <Loading />;
    if (error) return <Error />;

    return (
        <div className="w-full flex justify-center py-10">
            <div className="w-full px-4 md:px-16 max-w-screen-2xl">
                {mediaType === "movie" ? (
                    <MovieCardById movie={data as TMDBMovieById} />
                ) : (
                    <TVByIdCard tvShow={data as TMDBTVbyId} />
                )}
            </div>
        </div>
    );
};

export default MediaPage;
