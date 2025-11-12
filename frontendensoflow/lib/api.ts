import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies (JWT)
});

// Types
export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  github_connected: boolean;
  orgs: Array<{ id: string; login: string; avatar_url: string }>;
}

export interface GitHubOrg {
  id: string;
  login: string;
  avatar_url: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  repoTemplate: string;
  tags: string[];
  price: number; // Price in dollars (0 for free)
}

export interface CanvasNode {
  id: string;
  type: string;
  template?: string;
  provider?: string;
  position: { x: number; y: number };
  data: {
    config: Record<string, unknown>;
  };
}

export interface CanvasEdge {
  id: string;
  source: string;
  target: string;
}

export interface Canvas {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  status: string;
  createdAt: string;
  canvas: Canvas;
  endpoints: Array<{ name: string; url: string }>;
}

export interface LogEntry {
  time: string;
  level: string;
  text: string;
}

// API Methods
export const userApi = {
  me: () => api.get<User>("/user/me").then((res) => res.data),
};

export const githubApi = {
  getOrgs: () => api.get<GitHubOrg[]>("/github/orgs").then((res) => res.data),
};

export const templatesApi = {
  list: () => api.get<Template[]>("/templates").then((res) => res.data),
};

export const projectsApi = {
  list: () => api.get<Project[]>("/projects").then((res) => res.data),
  get: (id: string) => api.get<Project>(`/projects/${id}`).then((res) => res.data),
  create: (data: { name: string; owner: string; template?: string }) =>
    api.post<Project>("/projects", data).then((res) => res.data),
  updateCanvas: (id: string, canvas: Canvas) =>
    api.put<{ success: boolean }>(`/projects/${id}/canvas`, { canvas }).then((res) => res.data),
  deploy: (id: string) =>
    api.post<{ jobId: string }>(`/projects/${id}/deploy`).then((res) => res.data),
  getStatus: (id: string) =>
    api.get<{ status: string; stage: string }>(`/projects/${id}/status`).then((res) => res.data),
  getLogs: (id: string, since?: string) =>
    api.get<LogEntry[]>(`/projects/${id}/logs`, { params: { since } }).then((res) => res.data),
};
