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
      <div className="min-h-screen">
        <Navbar />

        <main className="container py-12">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="gradient-primary p-3 rounded-xl shadow-lg shadow-primary/30">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Marketplace
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Choose from our curated templates to kickstart your project
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
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
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredTemplates?.map((template) => (
                <motion.div key={template.id} variants={item}>
                  <Card className="hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02] hover:border-primary/60 transition-all duration-300 group h-full flex flex-col border-2 relative overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="gradient-accent p-3 rounded-xl text-4xl shadow-md">{template.icon}</div>
                        <div className="text-right">
                          {template.price === 0 ? (
                            <span className="text-lg font-bold text-success bg-success/10 px-3 py-1 rounded-full">Free</span>
                          ) : (
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 px-3 py-1 rounded-lg">
                              <span className="text-2xl font-bold text-primary">${template.price}</span>
                              <span className="text-sm text-muted-foreground">/use</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors text-xl mb-2">
                        {template.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col justify-end space-y-4 relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {template.tags.map((tag, index) => (
                          <span
                            key={tag}
                            className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                              index % 3 === 0
                                ? "bg-primary/10 border-primary/20 text-primary"
                                : index % 3 === 1
                                ? "bg-secondary/10 border-secondary/20 text-secondary"
                                : "bg-accent/10 border-accent/20 text-accent"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Button
                        className="w-full gap-2 shadow-md shadow-primary/20"
                        size="lg"
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
                            <LogIn className="h-4 w-4" />
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
