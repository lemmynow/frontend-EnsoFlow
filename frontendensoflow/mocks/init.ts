"use client";

export async function initMocks() {
  console.log("🔍 initMocks called, window:", typeof window);

  if (typeof window === "undefined") {
    console.log("⚠️  Running on server, skipping MSW initialization");
    return;
  }

  // Enable MSW when mock mode is explicitly enabled
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";
  console.log("🔍 useMockData:", useMockData, "env value:", process.env.NEXT_PUBLIC_USE_MOCK_DATA);

  if (useMockData) {
    try {
      console.log("📦 Importing MSW browser worker...");
      const { worker } = await import("./browser");
      console.log("📦 Worker imported, starting...");
      await worker.start({
        onUnhandledRequest: "bypass",
        quiet: false, // Show MSW logs for debugging
      });
      console.log("✅ Mock Service Worker started successfully");
    } catch (error) {
      console.error("❌ Failed to start Mock Service Worker:", error);
      throw error; // Re-throw to be caught by the calling code
    }
  } else {
    console.log("ℹ️  Mock mode not enabled, skipping MSW");
  }
}
