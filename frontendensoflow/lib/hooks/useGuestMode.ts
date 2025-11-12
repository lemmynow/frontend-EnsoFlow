"use client";

import { useState, useEffect } from "react";

const GUEST_MODE_KEY = "ensoflow_guest_mode";

export function useGuestMode() {
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check localStorage for guest mode flag
    const guestModeFlag = localStorage.getItem(GUEST_MODE_KEY);
    setIsGuestMode(guestModeFlag === "true");
    setIsInitialized(true);
  }, []);

  const enableGuestMode = () => {
    localStorage.setItem(GUEST_MODE_KEY, "true");
    setIsGuestMode(true);
  };

  const disableGuestMode = () => {
    localStorage.removeItem(GUEST_MODE_KEY);
    setIsGuestMode(false);
  };

  return {
    isGuestMode,
    isInitialized,
    enableGuestMode,
    disableGuestMode,
  };
}
