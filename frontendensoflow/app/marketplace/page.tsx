"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTemplates } from "@/lib/hooks/useTemplates";
import { useCreateProject } from "@/lib/hooks/useProjects";
import { useUser } from "@/lib/hooks/useUser";
import { useGuestMode } from "@/lib/hooks/useGuestMode";
import { AuthGuard } from "@/components/AuthGuard";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Sparkles, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Template } from "@/lib/api";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 },
};

export default function MarketplacePage() {
  const router = useRouter();
  const { data: user } = useUser();
  const { isGuestMode } = useGuestMode();
  const { data: templates, isLoading } = useTemplates();
  const createProject = useCreateProject();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [projectName, setProjectName] = useState("");

  const filteredTemplates = templates?.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDeploy = async () => {
    if (!selectedTemplate || !projectName.trim()) return;

    const project = await createProject.mutateAsync({
      name: projectName,
      owner: "johndoe",
      template: selectedTemplate.id,
    });

    setSelectedTemplate(null);
    setProjectName("");
    router.push(`/project/${project.id}/canvas`);
  };

  return (
    <AuthGuard allowGuest={true}>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container py-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Marketplace</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Choose from our curated templates to kickstart your project
            </p>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
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
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredTemplates?.map((template) => (
                <motion.div key={template.id} variants={item}>
                  <Card className="hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="text-4xl mb-2">{template.icon}</div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-secondary rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => {
                          if (isGuestMode || !user) {
                            router.push("/login");
                          } else {
                            setSelectedTemplate(template);
                            setProjectName(`${template.repoTemplate}-${Date.now()}`);
                          }
                        }}
                      >
                        {isGuestMode || !user ? (
                          <>
                            <LogIn className="h-4 w-4 mr-2" />
                            Login to Use
                          </>
                        ) : (
                          "Use Template"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>

      <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deploy {selectedTemplate?.name}</DialogTitle>
            <DialogDescription>
              Configure your project settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="my-project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedTemplate(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeploy}
              disabled={!projectName.trim() || createProject.isPending}
            >
              {createProject.isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AuthGuard>
  );
}
