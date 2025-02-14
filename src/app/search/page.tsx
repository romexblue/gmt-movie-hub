import React from "react";
import SearchPage from "~/pages/SearchPage";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { q = "" } = await searchParams;

  return <SearchPage searchString={q} />;
};

export default Page;
