"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryContextProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchInterval: false,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryContextProvider;