import React, { useState } from "react";
import Image from "next/image";
import { TMDBTVbyId } from "~/lib/types";
import CastAvatar from "~/components/CastAvatar";
import { getDirectors } from "~/lib/utils";
import Select from "../Select";

const IMAGE_LINK = process.env.NEXT_PUBLIC_TMDB_IMAGE_LINK;
const videoSources = new Map<
    number,
    {
        name: string;
        getUrl: (id: number, season: number, episode: number) => string;
    }
>([
    [
        1,
        {
            name: "Server 1",
            getUrl: (id, season, episode) =>
                `${process.env.NEXT_PUBLIC_SERVER_1}tv/${id}/${season}/${episode}`,
        },
    ],
    [
        2,
        {
            name: "Server 2",
            getUrl: (id, season, episode) =>
                `${process.env.NEXT_PUBLIC_SERVER_2}tv/${id}/${season}/${episode}`,
        },
    ],
    [
        3,
        {
            name: "Server 3",
            getUrl: (id, season, episode) =>
                `${process.env.NEXT_PUBLIC_SERVER_3}tv/${id}/${season}-${episode}`,
        },
    ],
    [
        4,
        {
            name: "Server 4",
            getUrl: (id, season, episode) =>
                `${process.env.NEXT_PUBLIC_SERVER_4}tv/${id}/${season}/${episode}`,
        },
    ],
    [
        5,
        {
            name: "Server 5",
            getUrl: (id, season, episode) =>
                `${process.env.NEXT_PUBLIC_SERVER_5}tv/${id}/${season}/${episode}`,
        },
    ],
    [
        6,
        {
            name: "Server 6",
            getUrl: (id, season, episode) =>
                `${process.env.NEXT_PUBLIC_SERVER_6}tv/${id}/${season}/${episode}`,
        },
    ],
    [
        7,
        {
            name: "Server 7",
            getUrl: (id, season, episode) =>
                `${process.env.NEXT_PUBLIC_SERVER_7}tv/${id}/${season}/${episode}`,
        },
    ],
    [
        8,
        {
            name: "Server 8",
            getUrl: (id, season, episode) =>
                `${process.env.NEXT_PUBLIC_SERVER_8}tv/${id}/${season}/${episode}`,
        },
    ],
]);

type Props = {
    tvShow: TMDBTVbyId;
};

const TVByIdCard = ({ tvShow }: Props) => {
    const directors = getDirectors(tvShow?.credits?.crew);
    const videoSourceOptions = Array.from(videoSources, ([id, source]) => ({
        label: source.name,
        value: id,
    }));

    const [isWatching, setIsWatching] = useState(false);
    const [selectedSource, setSelectedSource] = useState<number>(
        videoSourceOptions[0]?.value || 1
    );

    const [selectedSeason, setSelectedSeason] = useState<string>(
        tvShow?.seasons?.length ? tvShow.seasons[0].name : ""
    );
    const [selectedEpisode, setSelectedEpisode] = useState<number>(
        tvShow?.seasons ? 1 : 1
    );

    const selectedSeasonObj = tvShow?.seasons?.find(
        (season) => season.name === selectedSeason
    );

    const getVideoUrl = (
        serverId: number,
        id: number,
        season: number,
        episode: number
    ): string => {
        return videoSources.get(serverId)?.getUrl(id, season, episode) || "";
    };

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-gray-800 rounded-xl p-4">
            <div className="flex flex-col max-w-[28.125rem] w-full gap-4">
                <div
                    className={`relative h-[30rem] [@media(min-width:445px)]:h-[43.75rem] rounded-3xl overflow-hidden duration-500 hover:scale-105 hover:shadow-md hover:shadow-violet-700 ${
                        isWatching && "hidden lg:block"
                    }`}
                >
                    {tvShow?.poster_path ? (
                        <Image
                            alt={tvShow.name}
                            fill
                            className="object-cover"
                            src={`${IMAGE_LINK}${tvShow?.poster_path}`}
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-400 text-sm text-center">
                            No Image Available
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setIsWatching(true)}
                            className="p-4 bg-violet-500 rounded-md w-fit text-xl font-semibold hover:ring-4 hover:ring-blue-800 duration-300"
                        >
                            Click Here To Watch
                        </button>
                        {isWatching && (
                            <Select
                                value={selectedSource}
                                onChange={(e) =>
                                    setSelectedSource(Number(e.target.value))
                                }
                                options={videoSourceOptions}
                            />
                        )}
                    </div>
                    {isWatching && (
                        <div className="flex justify-center gap-4">
                            <Select
                                value={selectedSeason}
                                onChange={(e) => {
                                    const newSeason = tvShow?.seasons?.find(
                                        (s) => s.name === e.target.value
                                    );
                                    setSelectedSeason(e.target.value);
                                    setSelectedEpisode(newSeason ? 1 : 1);
                                }}
                                options={tvShow?.seasons?.map((show) => ({
                                    label: show.name,
                                    value: show.name || "",
                                }))}
                            />

                            <Select
                                value={selectedEpisode || 1}
                                onChange={(e) =>
                                    setSelectedEpisode(Number(e.target.value))
                                }
                                options={
                                    selectedSeasonObj
                                        ? Array.from(
                                              {
                                                  length: selectedSeasonObj.episode_count,
                                              },
                                              (_, i) => ({
                                                  label: `Episode ${i + 1}`,
                                                  value: i + 1,
                                              })
                                          )
                                        : []
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2 bg-gray-900 p-10 rounded-3xl w-fit">
                {isWatching ? (
                    <>
                        <iframe
                            className="w-full h-[38.9rem] rounded-xl aspect-video"
                            src={getVideoUrl(
                                selectedSource,
                                tvShow.id,
                                selectedSeasonObj?.season_number || 1,
                                selectedEpisode
                            )}
                            allowFullScreen
                        />
                        <p>
                            Ads may appear due to the media player. These are
                            served by the video provider and are not controlled
                            by our site.{" "}
                            <small>I recommend using brave browser</small>
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold">{tvShow?.name}</h1>
                        {tvShow?.first_air_date && (
                            <p className="text-xl font-light">
                                First Air Date: {tvShow.first_air_date}
                            </p>
                        )}
                        <div className="text-xl font-semibold">
                            {directors?.map((director) => director).join(", ")}
                        </div>
                        <p className="text-clip overflow-hidden">
                            {tvShow?.overview}
                        </p>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 pt-2">
                            <div className="flex items-center gap-2">
                                <span>🌍</span>
                                <span>Language:</span>
                                <span className="uppercase font-bold">
                                    {tvShow?.spoken_languages?.at(0)?.iso_639_1}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span>🎬</span>
                                <span className="">Type:</span>
                                <span className="capitalize font-bold">
                                    TV Show
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span>⏳</span>
                                <span className="">Runtime:</span>
                                <span className="font-bold">N/A</span>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                <span>🏷️</span>
                                <span className="">Genres:</span>
                                <span className="font-bold">
                                    {tvShow?.genres
                                        ?.map((genre) => genre.name)
                                        .join(", ")}
                                </span>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col lg:flex-row justify-between">
                            <span>
                                <span className="font-bold text-lg">
                                    ⭐ {tvShow?.vote_average}
                                </span>
                                &nbsp;/10
                            </span>

                            <span>
                                <span className="font-bold text-lg">
                                    🔥
                                    {tvShow?.popularity
                                        ? tvShow.popularity.toFixed(2)
                                        : "N/A"}
                                </span>
                                <span>&nbsp;Popularity</span>
                            </span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col lg:flex-row justify-between">
                            <span>
                                💵 Budget:&nbsp;
                                <span className="font-bold text-lg">N/A</span>
                            </span>

                            <span>
                                📈 Revenue:&nbsp;
                                <span className="font-bold text-lg">N/A</span>
                            </span>
                        </div>
                        <hr className="my-4" />
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <svg
                                    className="w-6 h-6 min-w-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5s-3 1.34-3 3 1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.95.05 1.16.84 1.95 1.99 1.95 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                </svg>
                                <span className="font-bold text-2xl">
                                    Primary Cast
                                </span>
                            </div>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                {tvShow?.credits?.cast
                                    ?.slice(0, 5)
                                    .map((cast) => (
                                        <CastAvatar key={cast.id} cast={cast} />
                                    ))}
                            </div>
                        </div>
                        <hr className="mb-4 mt-10" />
                        <div className="flex flex-col gap-4">
                            <span className="font-bold text-2xl">
                                🏢 Production Companies
                            </span>
                            <div>
                                {tvShow?.production_companies
                                    ?.map((company) => company.name)
                                    .join(", ")}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TVByIdCard;
