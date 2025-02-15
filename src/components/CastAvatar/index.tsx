import React from "react";
import Image from "next/image";
import { Cast } from "~/lib/types";

const IMAGE_LINK = process.env.NEXT_PUBLIC_TMDB_IMAGE_LINK;

type Props = {
    cast: Cast;
};
const CastAvatar = ({ cast }: Props) => {
    return (
        <div className="text-center flex flex-col justify-center items-center max-w-36">
            <div className="relative min-w-36 w-36 h-36 rounded-full overflow-hidden duration-500 hover:scale-105 border border-violet-600">
                {cast?.profile_path ? (
                    <Image
                        alt={cast.name}
                        fill
                        className="object-cover"
                        src={`${IMAGE_LINK}${cast?.profile_path}`}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-400 text-sm text-center">
                        No Image Available
                    </div>
                )}
            </div>
            <h4 className="line-clamp-1">{cast?.name}</h4>
            <span className="text-sm line-clamp-1">{cast?.character}</span>
        </div>
    );
};

export default CastAvatar;
