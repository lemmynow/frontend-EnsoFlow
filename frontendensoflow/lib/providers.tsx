"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { initMocks } from "@/mocks/init";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      // Reduce stale time to help with mock data updates
      staleTime: 0,
    },
  },
});

// Check if mock mode is enabled
const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export function Providers({ children }: { children: ReactNode }) {
  const [mockingInitialized, setMockingInitialized] = useState(!useMockData);

  useEffect(() => {
    async function enableMocking() {
      if (useMockData) {
        console.log("🎭 Mock mode enabled - using mock data");

        // Set a timeout to prevent infinite loading
        const timeout = setTimeout(() => {
          console.warn("⚠️  MSW initialization timeout, continuing anyway");
          setMockingInitialized(true);
        }, 5000); // 5 second timeout

        try {
          await initMocks();
          clearTimeout(timeout);
          console.log("✅ Mocking initialized successfully");
          setMockingInitialized(true);
        } catch (error) {
          clearTimeout(timeout);
          console.error("❌ Failed to initialize mocking:", error);
          setMockingInitialized(true);
        }
      }
    }

    enableMocking();
  }, []);

  // Show loading spinner while MSW is initializing
  if (!mockingInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Initializing mock data...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
