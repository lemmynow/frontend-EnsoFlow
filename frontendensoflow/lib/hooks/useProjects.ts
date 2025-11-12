"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi, type Canvas } from "../api";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: projectsApi.list,
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => projectsApi.get(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}

export function useUpdateCanvas(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (canvas: Canvas) => projectsApi.updateCanvas(projectId, canvas),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
}

export function useDeployProject(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => projectsApi.deploy(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
    },
  });
}

export function useProjectStatus(projectId: string, enabled = true) {
  return useQuery({
    queryKey: ["project-status", projectId],
    queryFn: () => projectsApi.getStatus(projectId),
    enabled: !!projectId && enabled,
    refetchInterval: 2000, // Poll every 2 seconds during deployment
  });
}

export function useProjectLogs(projectId: string, enabled = true) {
  return useQuery({
    queryKey: ["project-logs", projectId],
    queryFn: () => projectsApi.getLogs(projectId),
    enabled: !!projectId && enabled,
    refetchInterval: 1000, // Poll every second for logs
  });
}
