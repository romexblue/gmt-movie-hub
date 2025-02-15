import Link from "next/link";
import SearchBar from "~/components/SearchBar";

export default function MovieLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="w-full flex justify-center bg-gray-800 p-4">
                <div className="flex justify-center items-center w-full max-w-screen-2xl gap-8">
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text font-black text-4xl md:text-6xl italic"
                    >
                        G
                    </Link>
                    <SearchBar containerClass="" />
                </div>
            </div>
            {children}
        </div>
    );
}
