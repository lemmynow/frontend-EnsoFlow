"use client";

import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: userApi.me,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
