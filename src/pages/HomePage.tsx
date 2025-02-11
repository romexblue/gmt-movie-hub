"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Error from "~/components/Error";
import Loading from "~/components/Loading";
import { TMDBResponse } from "~/lib/types";

const fetchTrending = async () => {
  const { data } = await axios.get("/api/trending");
  return data;
};

const HomePage = () => {
  const { data, error, isPending } = useQuery<TMDBResponse>({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  });

  if (isPending) return <Loading />;
  if (error) return <Error />;

  const movieList = data?.results ?? [];

  return (
    <div className="flex flex-col">
      <h1 className="font-semibold text-xl">Trending movies this week</h1>
      <div className="flex flex-wrap gap-4">
        {movieList?.map((movie) => (
          <div className="border border-gray-200 rounded-md w-fit max-w-52 p-4">
            <h2 className="font-semibold text-lg">{movie?.title}</h2>
            <p>{movie?.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
