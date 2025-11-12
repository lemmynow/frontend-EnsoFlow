"use client";

export async function initMocks() {
  if (typeof window === "undefined") {
    return;
  }

  // Enable MSW when mock mode is explicitly enabled
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

  if (useMockData) {
    try {
      const { worker } = await import("./browser");
      await worker.start({
        onUnhandledRequest: "bypass",
        quiet: false, // Show MSW logs for debugging
      });
      console.log("✅ Mock Service Worker started successfully");
    } catch (error) {
      console.error("❌ Failed to start Mock Service Worker:", error);
    }
  }
}
