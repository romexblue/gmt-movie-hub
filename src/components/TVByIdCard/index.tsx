import React from "react";
import Image from "next/image";
import { TMDBTVbyId } from "~/lib/types";
import CastAvatar from "~/components/CastAvatar";
import { getDirectors } from "~/lib/utils";

const IMAGE_LINK = process.env.NEXT_PUBLIC_TMDB_IMAGE_LINK;

type Props = {
    tvShow: TMDBTVbyId;
};

const TVByIdCard = ({ tvShow }: Props) => {
    const directors = getDirectors(tvShow?.credits?.crew);

    return (
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 bg-gray-800 rounded-xl p-4">
            <div className="relative max-w-[28.125rem] w-full h-[30rem] [@media(min-width:445px)]:h-[43.75rem] rounded-3xl overflow-hidden duration-500 hover:scale-105 hover:shadow-md hover:shadow-violet-700">
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
            <div className="flex flex-col gap-2 bg-gray-900 p-10 rounded-3xl w-fit">
                <h1 className="text-3xl font-bold">{tvShow?.name}</h1>
                {tvShow?.first_air_date && (
                    <p className="text-xl font-light">
                        First Air Date: {tvShow.first_air_date}
                    </p>
                )}
                <div className="text-xl font-semibold">
                    {directors?.map((director) => director).join(", ")}
                </div>
                <p className="text-clip overflow-hidden">{tvShow?.overview}</p>
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
                        <span className="capitalize font-bold">TV Show</span>
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
                        <span className="font-bold text-2xl">Primary Cast</span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        {tvShow?.credits?.cast?.slice(0, 5).map((cast) => (
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
            </div>
        </div>
    );
};

export default TVByIdCard;
