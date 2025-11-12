"use client";

import { useEffect, useState } from "react";

export function MockModeIndicator() {
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    setUseMockData(process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true");
  }, []);

  if (!useMockData) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-500/90 text-yellow-950 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium">
        <span className="text-lg">🎭</span>
        <span>Mock Mode Active</span>
      </div>
    </div>
  );
}
