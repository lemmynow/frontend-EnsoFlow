"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useProjects, useCreateProject } from "@/lib/hooks/useProjects";
import { AuthGuard } from "@/components/AuthGuard";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Rocket, Database, Code, Clock } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;

    await createProject.mutateAsync({
      name: newProjectName,
      owner: "johndoe", // This should come from user context
    });

    setIsDialogOpen(false);
    setNewProjectName("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed":
        return "text-success";
      case "building":
        return "text-warning";
      case "failed":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "deployed":
        return "bg-success/10 border-success/20";
      case "building":
        return "bg-warning/10 border-warning/20";
      case "failed":
        return "bg-destructive/10 border-destructive/20";
      default:
        return "bg-muted/50 border-border";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return <Rocket className="h-4 w-4" />;
      case "building":
        return <Clock className="h-4 w-4 animate-spin" />;
      default:
        return <Code className="h-4 w-4" />;
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen">
        <Navbar />

        <main className="container py-12">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Projects
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage and deploy your applications
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Start building your application with EnsoFlow
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      placeholder="my-awesome-app"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCreateProject();
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateProject}
                    disabled={!newProjectName.trim() || createProject.isPending}
                  >
                    {createProject.isPending ? "Creating..." : "Create Project"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {projects?.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <Link href={`/project/${project.id}`}>
                    <Card className="hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] hover:border-primary/60 transition-all duration-300 cursor-pointer group h-full border-2 relative overflow-hidden">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <CardHeader className="pb-4 relative z-10">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="group-hover:text-primary transition-colors text-xl mb-2 truncate">
                              {project.name}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {project.owner}
                            </CardDescription>
                          </div>
                          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${getStatusBg(project.status)} ${getStatusColor(project.status)}`}>
                            {getStatusIcon(project.status)}
                            <span className="text-xs font-semibold capitalize">
                              {project.status}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 relative z-10">
                        <div className="flex items-center gap-2.5 text-sm bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-2.5 rounded-lg border border-primary/20">
                          <Database className="h-4 w-4 text-primary" />
                          <span className="font-medium text-foreground">{project.canvas.nodes.length} resources</span>
                        </div>
                        <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                          Created {formatDate(project.createdAt)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}

              {projects?.length === 0 && (
                <motion.div variants={item} className="col-span-full">
                  <Card className="border-dashed border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-pulse" />

                    <CardContent className="flex flex-col items-center justify-center py-16 relative z-10">
                      <div className="gradient-primary p-4 rounded-full mb-6 shadow-lg">
                        <Database className="h-12 w-12 text-primary-foreground" />
                      </div>
                      <p className="text-xl font-semibold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        No projects yet
                      </p>
                      <p className="text-muted-foreground mb-6 text-center max-w-md">
                        Create your first project to get started with EnsoFlow
                      </p>
                      <Button size="lg" onClick={() => setIsDialogOpen(true)} className="gap-2 shadow-lg shadow-primary/30">
                        <Plus className="h-4 w-4" />
                        Create Project
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
