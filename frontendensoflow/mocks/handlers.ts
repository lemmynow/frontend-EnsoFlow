import { http, HttpResponse, delay } from "msw";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

// Mock data
const mockUser = {
  id: "user-1",
  username: "johndoe",
  avatarUrl: "https://github.com/johndoe.png",
  github_connected: true,
  orgs: [
    { id: "org-1", login: "acme-corp", avatar_url: "https://github.com/acme-corp.png" },
    { id: "org-2", login: "dev-team", avatar_url: "https://github.com/dev-team.png" },
  ],
};

const mockOrgs = [
  { id: "org-1", login: "acme-corp", avatar_url: "https://github.com/acme-corp.png" },
  { id: "org-2", login: "dev-team", avatar_url: "https://github.com/dev-team.png" },
  { id: "org-3", login: "startup-inc", avatar_url: "https://github.com/startup-inc.png" },
];

const mockTemplates = [
  {
    id: "tmpl-1",
    name: "Next.js + Drizzle",
    description: "Full-stack Next.js app with Drizzle ORM and PostgreSQL",
    icon: "⚡",
    repoTemplate: "nextjs-drizzle-template",
    tags: ["frontend", "fullstack"],
    price: 49,
  },
  {
    id: "tmpl-2",
    name: "NestJS API",
    description: "RESTful API with NestJS, TypeORM, and PostgreSQL",
    icon: "🚀",
    repoTemplate: "nestjs-api-template",
    tags: ["backend", "api"],
    price: 39,
  },
  {
    id: "tmpl-3",
    name: "Express + MongoDB",
    description: "Node.js API with Express and MongoDB",
    icon: "🍃",
    repoTemplate: "express-mongo-template",
    tags: ["backend", "api"],
    price: 0,
  },
  {
    id: "tmpl-4",
    name: "React SPA",
    description: "Single Page Application with React and Vite",
    icon: "⚛️",
    repoTemplate: "react-vite-template",
    tags: ["frontend"],
    price: 0,
  },
  {
    id: "tmpl-5",
    name: "Django REST API",
    description: "Python REST API with Django and PostgreSQL",
    icon: "🐍",
    repoTemplate: "django-rest-template",
    tags: ["backend", "api", "python"],
    price: 29,
  },
  {
    id: "tmpl-6",
    name: "Vue.js + Tailwind",
    description: "Modern Vue.js app with Tailwind CSS",
    icon: "💚",
    repoTemplate: "vue-tailwind-template",
    tags: ["frontend"],
    price: 0,
  },
];

const mockProjects = [
  {
    id: "proj-1",
    name: "my-awesome-app",
    owner: "johndoe",
    status: "deployed",
    createdAt: new Date("2024-01-15").toISOString(),
    canvas: {
      nodes: [
        {
          id: "repo1",
          type: "repo",
          template: "nextjs-drizzle",
          position: { x: 100, y: 120 },
          data: {
            config: { owner: "johndoe", name: "my-awesome-app", branch: "main" },
          },
        },
        {
          id: "db1",
          type: "database",
          provider: "neon",
          position: { x: 400, y: 120 },
          data: {
            config: { plan: "serverless", name: "main-db" },
          },
        },
      ],
      edges: [{ id: "e1", source: "repo1", target: "db1" }],
    },
    endpoints: [
      { name: "Production", url: "https://my-awesome-app.vercel.app" },
    ],
  },
  {
    id: "proj-2",
    name: "api-gateway",
    owner: "acme-corp",
    status: "building",
    createdAt: new Date("2024-02-01").toISOString(),
    canvas: {
      nodes: [
        {
          id: "api1",
          type: "backend",
          template: "nestjs",
          position: { x: 250, y: 200 },
          data: {
            config: { language: "ts", orm: "drizzle" },
          },
        },
      ],
      edges: [],
    },
    endpoints: [],
  },
  {
    id: "proj-3",
    name: "e-commerce-platform",
    owner: "johndoe",
    status: "deployed",
    createdAt: new Date("2024-03-10").toISOString(),
    canvas: {
      nodes: [
        {
          id: "frontend1",
          type: "frontend",
          template: "react-vite",
          position: { x: 100, y: 100 },
          data: {
            config: { framework: "react", build: "vite" },
          },
        },
        {
          id: "backend1",
          type: "backend",
          template: "express",
          position: { x: 400, y: 100 },
          data: {
            config: { runtime: "node", framework: "express" },
          },
        },
        {
          id: "db2",
          type: "database",
          provider: "mongodb",
          position: { x: 700, y: 100 },
          data: {
            config: { type: "mongodb", plan: "shared" },
          },
        },
      ],
      edges: [
        { id: "e2", source: "frontend1", target: "backend1" },
        { id: "e3", source: "backend1", target: "db2" },
      ],
    },
    endpoints: [
      { name: "Production", url: "https://shop.example.com" },
      { name: "API", url: "https://api.shop.example.com" },
    ],
  },
  {
    id: "proj-4",
    name: "blog-cms",
    owner: "dev-team",
    status: "draft",
    createdAt: new Date("2024-04-05").toISOString(),
    canvas: {
      nodes: [],
      edges: [],
    },
    endpoints: [],
  },
];

const mockLogs = [
  { time: new Date().toISOString(), level: "info", text: "🚀 Starting deployment..." },
  { time: new Date().toISOString(), level: "info", text: "📦 Provisioning database..." },
  { time: new Date().toISOString(), level: "success", text: "✅ Database created: neon-db-abc123" },
  { time: new Date().toISOString(), level: "info", text: "📝 Creating repository..." },
  { time: new Date().toISOString(), level: "success", text: "✅ Repository created: github.com/user/repo" },
  { time: new Date().toISOString(), level: "info", text: "🔨 Generating code from template..." },
  { time: new Date().toISOString(), level: "info", text: "💾 Committing to repository..." },
  { time: new Date().toISOString(), level: "success", text: "✅ Code committed successfully" },
  { time: new Date().toISOString(), level: "info", text: "🚢 Deploying to runtime..." },
  { time: new Date().toISOString(), level: "success", text: "✅ Deployment complete!" },
];

export const handlers = [
  // User endpoints
  http.get(`${API_BASE}/api/user/me`, async () => {
    await delay(300);
    return HttpResponse.json(mockUser);
  }),

  // GitHub orgs
  http.get(`${API_BASE}/api/github/orgs`, async () => {
    await delay(200);
    return HttpResponse.json(mockOrgs);
  }),

  // Templates
  http.get(`${API_BASE}/api/templates`, async () => {
    await delay(200);
    return HttpResponse.json(mockTemplates);
  }),

  // Projects
  http.get(`${API_BASE}/api/projects`, async () => {
    await delay(300);
    return HttpResponse.json(mockProjects);
  }),

  http.get(`${API_BASE}/api/projects/:id`, async ({ params }) => {
    await delay(200);
    const project = mockProjects.find((p) => p.id === params.id);
    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(project);
  }),

  http.post(`${API_BASE}/api/projects`, async ({ request }) => {
    await delay(400);
    const body = (await request.json()) as {
      name: string;
      owner: string;
      template?: string;
    };

    const newProject = {
      id: `proj-${Date.now()}`,
      name: body.name,
      owner: body.owner,
      status: "draft",
      createdAt: new Date().toISOString(),
      canvas: {
        nodes: [],
        edges: [],
      },
      endpoints: [],
    };

    mockProjects.push(newProject);
    return HttpResponse.json(newProject, { status: 201 });
  }),

  http.put(`${API_BASE}/api/projects/:id/canvas`, async ({ params, request }) => {
    await delay(300);
    const body = (await request.json()) as { canvas: unknown };
    const project = mockProjects.find((p) => p.id === params.id);

    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }

    project.canvas = body.canvas as typeof project.canvas;
    return HttpResponse.json({ success: true });
  }),

  // Deploy
  http.post(`${API_BASE}/api/projects/:id/deploy`, async ({ params }) => {
    await delay(500);
    const project = mockProjects.find((p) => p.id === params.id);

    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }

    project.status = "provisioning";
    return HttpResponse.json({ jobId: `job-${Date.now()}` });
  }),

  // Project status
  http.get(`${API_BASE}/api/projects/:id/status`, async ({ params }) => {
    await delay(200);
    const project = mockProjects.find((p) => p.id === params.id);

    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      status: project.status,
      stage: project.status === "provisioning" ? "create-db" : "complete",
    });
  }),

  // Logs
  http.get(`${API_BASE}/api/projects/:id/logs`, async () => {
    await delay(150);
    return HttpResponse.json(mockLogs);
  }),
];
