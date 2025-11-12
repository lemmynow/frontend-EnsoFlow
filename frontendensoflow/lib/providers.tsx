"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { initMocks } from "@/mocks/init";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const [mockingInitialized, setMockingInitialized] = useState(false);

  useEffect(() => {
    async function enableMocking() {
      await initMocks();
      setMockingInitialized(true);
    }

    enableMocking();
  }, []);

  if (!mockingInitialized && process.env.NODE_ENV === "development") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
