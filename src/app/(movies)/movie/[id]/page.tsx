import React from "react";
import MediaPage from "~/pages/MediaPage";

type Props = {
    params: Promise<{ id?: string }>;
};

const Page = async ({ params }: Props) => {
    const { id = "" } = await params;

    return <MediaPage movieId={id} mediaType={"movie"} />;
};

export default Page;
