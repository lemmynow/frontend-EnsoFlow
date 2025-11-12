"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useProject, useDeployProject } from "@/lib/hooks/useProjects";
import { AuthGuard } from "@/components/AuthGuard";
import { Navbar } from "@/components/Navbar";
import { CanvasView } from "@/components/canvas/CanvasView";
import { DeployPanel } from "@/components/DeployPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Play, ExternalLink, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatDateTime } from "@/lib/utils";

const Tabs_Root = Tabs;

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: project, isLoading } = useProject(resolvedParams.id);
  const deployProject = useDeployProject(resolvedParams.id);
  const [deployPanelOpen, setDeployPanelOpen] = useState(false);

  const handleDeploy = async () => {
    try {
      await deployProject.mutateAsync();
      setDeployPanelOpen(true);
    } catch (error) {
      console.error("Failed to deploy:", error);
    }
  };

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  if (!project) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background">
          <Navbar />
          <div className="container py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Project not found</h2>
              <Button asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </AuthGuard>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
      deployed: { color: "text-green-500 bg-green-500/10", icon: CheckCircle2 },
      building: { color: "text-yellow-500 bg-yellow-500/10", icon: Clock },
      draft: { color: "text-gray-500 bg-gray-500/10", icon: Clock },
      failed: { color: "text-red-500 bg-red-500/10", icon: Clock },
    };

    const config = statusConfig[status] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.color}`}>
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium capitalize">{status}</span>
      </div>
    );
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-3">{project.name}</h1>
                <p className="text-muted-foreground text-lg">
                  Owner: <span className="font-medium">{project.owner}</span> • Created {formatDateTime(project.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {getStatusBadge(project.status)}
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link href={`/project/${resolvedParams.id}/canvas`}>
                    <Edit className="h-4 w-4" />
                    Edit Canvas
                  </Link>
                </Button>
                <Button onClick={handleDeploy} size="lg" className="gap-2">
                  <Play className="h-4 w-4" />
                  Deploy
                </Button>
              </div>
            </div>
          </motion.div>

          <Tabs_Root defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
              <TabsTrigger value="overview" className="text-base">Overview</TabsTrigger>
              <TabsTrigger value="canvas" className="text-base">Canvas</TabsTrigger>
              <TabsTrigger value="resources" className="text-base">Resources</TabsTrigger>
              <TabsTrigger value="endpoints" className="text-base">Endpoints</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Project Info</CardTitle>
                    <CardDescription>Basic project information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground font-medium">Status</span>
                      <span className="font-semibold capitalize">{project.status}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground font-medium">Resources</span>
                      <span className="font-semibold">{project.canvas.nodes.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground font-medium">Connections</span>
                      <span className="font-semibold">{project.canvas.edges.length}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                    <CardDescription>Common project tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild variant="outline" size="lg" className="w-full justify-start gap-2">
                      <Link href={`/project/${resolvedParams.id}/canvas`}>
                        <Edit className="h-4 w-4" />
                        Edit Canvas
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full justify-start gap-2"
                      onClick={handleDeploy}
                    >
                      <Play className="h-4 w-4" />
                      Redeploy
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="canvas">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Canvas Preview</CardTitle>
                  <CardDescription>Read-only view of your project canvas</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[600px]">
                    <CanvasView initialCanvas={project.canvas} readOnly />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Provisioned Resources</CardTitle>
                  <CardDescription>
                    All resources created for this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.canvas.nodes.map((node) => (
                      <div
                        key={node.id}
                        className="flex items-center justify-between p-5 border-2 rounded-lg hover:shadow-md hover:border-primary/30 transition-all"
                      >
                        <div>
                          <div className="font-semibold capitalize text-lg">{node.type}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {node.data.config.name as string || node.id}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">
                          {node.data.config.provider as string || node.data.config.template as string || "-"}
                        </div>
                      </div>
                    ))}

                    {project.canvas.nodes.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <p className="text-lg">No resources yet. Add resources in the canvas builder.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="endpoints">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl">Deployment Endpoints</CardTitle>
                  <CardDescription>Access your deployed application</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.endpoints.map((endpoint, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-5 border-2 rounded-lg hover:shadow-md hover:border-primary/30 transition-all"
                      >
                        <div>
                          <div className="font-semibold text-lg">{endpoint.name}</div>
                          <div className="text-sm text-muted-foreground mt-1">{endpoint.url}</div>
                        </div>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                          <a href={endpoint.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Open
                          </a>
                        </Button>
                      </div>
                    ))}

                    {project.endpoints.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <p className="text-lg">No endpoints yet. Deploy your project to get endpoints.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs_Root>
        </main>
      </div>

      <DeployPanel
        projectId={resolvedParams.id}
        open={deployPanelOpen}
        onClose={() => setDeployPanelOpen(false)}
      />
    </AuthGuard>
  );
}
