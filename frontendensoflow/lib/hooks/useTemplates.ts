"use client";

import { useQuery } from "@tanstack/react-query";
import { templatesApi } from "../api";

export function useTemplates() {
  return useQuery({
    queryKey: ["templates"],
    queryFn: templatesApi.list,
  });
}
