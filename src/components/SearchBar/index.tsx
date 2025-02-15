"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    containerClass?: string;
    isLarge?: boolean;
};

const SearchBar = ({ containerClass = "", isLarge = false }: Props) => {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className={containerClass}>
            <div className="flex w-full rounded-3xl shadow-lg shadow-gray-900 [&:has(:focus-visible)]:shadow-none [&:has(:focus-visible)]:ring-2 [&:has(:focus-visible)]:ring-violet-600 duration-300">
                <div className="flex w-10 items-center justify-center rounded-tl-3xl rounded-bl-3xl border-r border-gray-200 bg-gray-700 p-5">
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
                    className={`w-full ${
                        !isLarge && "max-w-80"
                    } text-white bg-gray-700 pl-2 font-semibold outline-0 ${
                        isLarge ? "text-xl" : "text-lg"
                    }`}
                    placeholder="Bridge to Terabithia"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    className={`bg-gradient-to-br from-purple-600 to-blue-500 ${
                        isLarge ? "pl-4 p-4" : "p-2"
                    } rounded-tr-3xl rounded-br-3xl text-white font-semibold focus:ring-4 focus:outline-none focus:ring-blue-800 group-hover:from-purple-600 group-hover:to-blue-500`}
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
