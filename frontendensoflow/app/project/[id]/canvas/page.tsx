"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useProject, useUpdateCanvas, useDeployProject } from "@/lib/hooks/useProjects";
import { AuthGuard } from "@/components/AuthGuard";
import { CanvasView } from "@/components/canvas/CanvasView";
import { DeployPanel } from "@/components/DeployPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Canvas } from "@/lib/api";

export default function CanvasPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { data: project, isLoading } = useProject(resolvedParams.id);
  const updateCanvas = useUpdateCanvas(resolvedParams.id);
  const deployProject = useDeployProject(resolvedParams.id);
  const [deployPanelOpen, setDeployPanelOpen] = useState(false);

  const handleSaveCanvas = async (canvas: Canvas) => {
    try {
      await updateCanvas.mutateAsync(canvas);
      // Show success toast
    } catch (error) {
      console.error("Failed to save canvas:", error);
    }
  };

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
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AuthGuard>
    );
  }

  if (!project) {
    return (
      <AuthGuard>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Project not found</h2>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="h-screen flex flex-col">
        <div className="border-b bg-card p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/project/${resolvedParams.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{project.name}</h1>
            <p className="text-sm text-muted-foreground">Canvas Builder</p>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <CanvasView
            initialCanvas={project.canvas}
            onSave={handleSaveCanvas}
            onDeploy={handleDeploy}
          />
        </div>
      </div>

      <DeployPanel
        projectId={resolvedParams.id}
        open={deployPanelOpen}
        onClose={() => setDeployPanelOpen(false)}
      />
    </AuthGuard>
  );
}
