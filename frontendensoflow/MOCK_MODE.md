# Mock Mode Documentation

## Overview

EnsoFlow includes a comprehensive mock data system that allows you to develop and test the application without needing a backend API server. This is powered by [Mock Service Worker (MSW)](https://mswjs.io/), which intercepts API requests at the network level and returns realistic mock data.

## Enabling Mock Mode

To enable mock mode, set the `NEXT_PUBLIC_USE_MOCK_DATA` environment variable to `true`:

### Option 1: Using .env.local (Recommended)

Create or edit `.env.local` in the `frontendensoflow` directory:

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

### Option 2: Inline Environment Variable

```bash
NEXT_PUBLIC_USE_MOCK_DATA=true npm run dev
```

## Features Available in Mock Mode

When mock mode is enabled, all API endpoints are intercepted and return realistic mock data:

### 1. User Authentication
- Mock user: `johndoe`
- GitHub connected status
- Multiple organizations

### 2. Marketplace Templates
- 6 pre-configured templates:
  - Next.js + Drizzle (Full-stack)
  - NestJS API (Backend)
  - Express + MongoDB (Backend)
  - React SPA (Frontend)
  - Django REST API (Backend)
  - Vue.js + Tailwind (Frontend)

### 3. Projects
- 4 mock projects with different statuses:
  - `my-awesome-app` - Deployed
  - `api-gateway` - Building
  - `e-commerce-platform` - Deployed (with full canvas)
  - `blog-cms` - Draft

### 4. Canvas Editing
- Full drag-and-drop functionality
- Node creation and connection
- Canvas auto-save

### 5. Deployment
- Mock deployment logs
- Status polling
- Deployment stages simulation

## Visual Indicator

When mock mode is active, you'll see a yellow badge in the bottom-right corner of the screen:

```
🎭 Mock Mode Active
```

This helps you know when you're working with mock data.

## Console Logging

Mock mode includes helpful console logs:

- ✅ "Mock Service Worker started successfully" - MSW initialized
- 🎭 "Mock mode enabled - using mock data" - Mock mode is active
- MSW request logs showing intercepted API calls (in development mode)

## Disabling Mock Mode

To disable mock mode and use a real API backend:

1. Set `NEXT_PUBLIC_USE_MOCK_DATA=false` in `.env.local`
2. Or remove the variable entirely
3. Restart the development server

## Mock Data Customization

You can customize the mock data by editing:

- `mocks/handlers.ts` - All mock API endpoints and data
- `mocks/browser.ts` - MSW worker configuration
- `mocks/init.ts` - Initialization logic

### Example: Adding More Templates

Edit `mocks/handlers.ts`:

```typescript
const mockTemplates = [
  // ... existing templates
  {
    id: "tmpl-7",
    name: "Your New Template",
    description: "Description here",
    icon: "🎨",
    repoTemplate: "your-template-repo",
    tags: ["frontend", "custom"],
  },
];
```

### Example: Adding More Projects

Edit the `mockProjects` array in `mocks/handlers.ts`:

```typescript
const mockProjects = [
  // ... existing projects
  {
    id: "proj-5",
    name: "your-project",
    owner: "your-username",
    status: "deployed",
    createdAt: new Date().toISOString(),
    canvas: {
      nodes: [],
      edges: [],
    },
    endpoints: [],
  },
];
```

## Technical Details

### How It Works

1. MSW intercepts `fetch` and `XMLHttpRequest` calls in the browser
2. Requests matching `${API_BASE}/api/*` patterns are intercepted
3. Mock handlers return predefined responses with realistic delays
4. Unmatched requests bypass MSW and go to the network

### Response Delays

Mock endpoints include realistic delays to simulate network latency:

- User endpoint: 300ms
- Templates: 200ms
- Projects list: 300ms
- Project detail: 200ms
- Create project: 400ms
- Deploy: 500ms

### Data Persistence

Mock data is stored in memory and **does not persist** between page refreshes. If you create a new project in mock mode, it will be lost when you reload the page.

## Troubleshooting

### Issue: Pages showing blank/loading indefinitely

**Solution:** Make sure mock mode is enabled in `.env.local` and restart the dev server.

### Issue: Mock Service Worker not starting

**Solution:** Check the browser console for errors. MSW requires a service worker which may be blocked by some browser extensions.

### Issue: Changes to mock data not reflecting

**Solution:**
1. Make sure you've saved the changes in `mocks/handlers.ts`
2. Restart the development server
3. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: "Mock Mode Active" badge not showing

**Solution:** Verify that `NEXT_PUBLIC_USE_MOCK_DATA=true` is set and the dev server has been restarted. Environment variables require a server restart to take effect.

## Best Practices

1. **Development**: Use mock mode when working on UI/UX without needing a backend
2. **Testing**: Mock mode is great for testing user flows and edge cases
3. **Documentation**: Add new mock data when adding new features
4. **Production**: Never enable mock mode in production environments

## Related Files

- `lib/providers.tsx` - MSW initialization and React Query setup
- `lib/api.ts` - API client and TypeScript types
- `lib/hooks/` - React Query hooks that consume the API
- `components/MockModeIndicator.tsx` - Visual indicator component
