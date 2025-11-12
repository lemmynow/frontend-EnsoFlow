"use client";

import { useState } from "react";

const GUEST_MODE_KEY = "ensoflow_guest_mode";

// Helper to check if we're on the client
const isClient = typeof window !== "undefined";

export function useGuestMode() {
  const [isGuestMode, setIsGuestMode] = useState<boolean>(() => {
    // Initialize from localStorage on first render (client-side only)
    if (isClient) {
      return localStorage.getItem(GUEST_MODE_KEY) === "true";
    }
    return false;
  });

  const enableGuestMode = () => {
    if (isClient) {
      localStorage.setItem(GUEST_MODE_KEY, "true");
    }
    setIsGuestMode(true);
  };

  const disableGuestMode = () => {
    if (isClient) {
      localStorage.removeItem(GUEST_MODE_KEY);
    }
    setIsGuestMode(false);
  };

  return {
    isGuestMode,
    isInitialized: isClient, // We're initialized when we're on the client
    enableGuestMode,
    disableGuestMode,
  };
}
