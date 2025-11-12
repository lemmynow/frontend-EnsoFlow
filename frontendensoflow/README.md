# EnsoFlow - Visual PaaS Platform Frontend

A modern, visual Platform-as-a-Service (PaaS) frontend built with Next.js, featuring drag-and-drop canvas for building and deploying applications.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI (shadcn/ui style)
- **Animations**: Framer Motion + GSAP
- **Canvas/Flow**: React Flow (xyflow/react)
- **State Management**: TanStack Query (React Query)
- **API Mocking**: MSW (Mock Service Worker)
- **HTTP Client**: Axios

## Features

### Authentication
- GitHub OAuth integration (redirects to backend)
- Protected routes with AuthGuard
- User session management

### Dashboard
- Project list with status indicators
- Create new projects
- Animated project cards with Framer Motion
- Quick access to canvas editor and deployment

### Marketplace
- Template gallery with search
- Pre-configured project templates
- One-click template deployment
- Tags and categorization

### Canvas Builder
- Visual drag-and-drop interface
- 6 resource types:
  - Repository (GitHub integration)
  - Backend (NestJS, Express, etc.)
  - Database (PostgreSQL, MongoDB, etc.)
  - Cache (Redis, Memcached)
  - Frontend (Next.js, React, Vue)
  - Worker (Background jobs)
- Node configuration modals
- Edge connections between resources
- Auto-save to localStorage
- GSAP animations on node drop
- React Flow controls and minimap

### Deployment
- Deploy panel with real-time logs
- Animated deployment timeline
- Stage-by-stage progress tracking
- Live log streaming
- Success/failure notifications

### Project Management
- Project detail pages
- Read-only canvas preview
- Resource overview
- Endpoint management
- Deployment history

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
# or
yarn install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_GITHUB_OAUTH_URL=http://localhost:4000/auth/github
NODE_ENV=development
```

### Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The app uses **Mock Service Worker (MSW)** in development mode, so you don't need a backend running to develop and test features.

### Building for Production

Build the application:

```bash
npm run build
# or
pnpm build
# or
yarn build
```

Start the production server:

```bash
npm run start
# or
pnpm start
# or
yarn start
```

### Linting

Run ESLint:

```bash
npm run lint
# or
pnpm lint
# or
yarn lint
```

## Project Structure

```
/frontendensoflow
  /app                      # Next.js App Router
    /(auth)                 # Auth route group
      /login               # Login page
    /dashboard             # Dashboard page
    /marketplace           # Template marketplace
    /project/[id]          # Project detail page
      /canvas              # Canvas builder page
    layout.tsx             # Root layout
    page.tsx               # Home (redirects)
    globals.css            # Global styles
  /components              # React components
    /canvas                # Canvas-specific components
      CanvasView.tsx       # Main canvas component
      SidebarCatalog.tsx   # Resource sidebar
      CustomNode.tsx       # React Flow custom nodes
      NodeConfigModal.tsx  # Node configuration
    /ui                    # UI primitives (shadcn-style)
      button.tsx
      card.tsx
      dialog.tsx
      input.tsx
      label.tsx
      select.tsx
      tabs.tsx
    AuthGuard.tsx          # Auth protection
    Navbar.tsx             # Navigation bar
    DeployPanel.tsx        # Deployment panel
  /lib                     # Utilities and hooks
    /hooks                 # Custom React hooks
      useUser.ts
      useProjects.ts
      useTemplates.ts
    api.ts                 # API client & types
    providers.tsx          # React Query provider
    utils.ts               # Utility functions
  /mocks                   # MSW mocks
    handlers.ts            # API handlers
    browser.ts             # Browser worker
    init.ts                # MSW initialization
  /public                  # Static assets
  .env.example             # Environment template
  .env.local               # Local environment (gitignored)
  next.config.ts           # Next.js config
  tailwind.config.js       # Tailwind config
  tsconfig.json            # TypeScript config
```

## API Integration

### Endpoints

The frontend expects these backend endpoints:

#### Authentication
- `GET /api/user/me` - Get current user

#### GitHub
- `GET /api/github/orgs` - List GitHub organizations

#### Templates
- `GET /api/templates` - List project templates

#### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id/canvas` - Update canvas
- `POST /api/projects/:id/deploy` - Deploy project
- `GET /api/projects/:id/status` - Get deployment status
- `GET /api/projects/:id/logs` - Get deployment logs

### Canvas JSON Format

The canvas is stored as JSON with this structure:

```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "database",
      "position": { "x": 100, "y": 100 },
      "data": {
        "config": {
          "provider": "neon",
          "name": "my-db",
          "plan": "serverless"
        }
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2"
    }
  ]
}
```

## Development with Mocks

The app uses MSW to mock API responses during development. This allows you to:

- Develop without a backend
- Test different scenarios
- Work offline
- Avoid CORS issues

Mock handlers are in `/mocks/handlers.ts`. Customize them to match your needs.

To disable mocks, set `NODE_ENV=production` or modify `/mocks/init.ts`.

## Animations

### Framer Motion
- Page transitions
- Card hover effects
- Modal animations
- List stagger animations
- Deploy panel slide-in

### GSAP
- Login button hover (elastic effect)
- Canvas node drop (elastic bounce)
- Custom timeline animations

## Customization

### Theme

Colors are defined in `/app/globals.css` using CSS variables. Modify these to change the color scheme.

### Adding New Node Types

1. Add to `/components/canvas/SidebarCatalog.tsx`
2. Add configuration in `/components/canvas/NodeConfigModal.tsx`
3. Update `nodeTypes` in `/components/canvas/CanvasView.tsx`

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Set environment variables
4. Deploy

### Other Platforms

The app is a standard Next.js application and can be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Docker (self-hosted)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:4000` |
| `NEXT_PUBLIC_GITHUB_OAUTH_URL` | GitHub OAuth endpoint | `http://localhost:4000/auth/github` |
| `NODE_ENV` | Environment | `development` |

## License

MIT License - feel free to use this project for learning or production.

---

Built with ❤️ using Next.js and React Flow
