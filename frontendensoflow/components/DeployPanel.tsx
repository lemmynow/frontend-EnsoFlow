"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectStatus, useProjectLogs } from "@/lib/hooks/useProjects";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { X, CheckCircle2, Circle, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeployPanelProps {
  projectId: string;
  open: boolean;
  onClose: () => void;
}

const deployStages = [
  { id: "provision-db", label: "Provisioning Database", icon: "🗄️" },
  { id: "create-repo", label: "Creating Repository", icon: "📦" },
  { id: "generate-code", label: "Generating Code", icon: "⚙️" },
  { id: "commit", label: "Committing Changes", icon: "💾" },
  { id: "deploy-runtime", label: "Deploying Runtime", icon: "🚀" },
];

export function DeployPanel({ projectId, open, onClose }: DeployPanelProps) {
  const { data: status } = useProjectStatus(projectId, open);
  const { data: logs } = useProjectLogs(projectId, open);

  const currentStageIndex = deployStages.findIndex((s) => s.id === status?.stage);
  const isComplete = status?.status === "deployed";
  const isFailed = status?.status === "failed";

  useEffect(() => {
    if (isComplete || isFailed) {
      // Auto-close after 3 seconds on completion or failure
      const timer = setTimeout(() => {
        // onClose(); // Commented out to keep panel open
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isFailed, onClose]);

  if (!open) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-background border-l shadow-2xl z-50 overflow-hidden flex flex-col"
    >
      <div className="border-b p-4 flex items-center justify-between bg-card">
        <div>
          <h2 className="text-xl font-bold">Deployment Progress</h2>
          <p className="text-sm text-muted-foreground">
            {isComplete
              ? "Deployment completed successfully"
              : isFailed
              ? "Deployment failed"
              : "Building and deploying your application..."}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Timeline */}
        <div className="p-6 border-b bg-card">
          <h3 className="text-sm font-semibold mb-4 text-muted-foreground">DEPLOYMENT STAGES</h3>
          <div className="space-y-4">
            {deployStages.map((stage, index) => {
              const isActive = index === currentStageIndex;
              const isCompleted = index < currentStageIndex || isComplete;
              const isCurrent = index === currentStageIndex && !isComplete && !isFailed;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="relative">
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </motion.div>
                    ) : isCurrent ? (
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className={cn(
                      "font-medium transition-colors",
                      isCompleted && "text-green-600",
                      isCurrent && "text-primary",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}>
                      <span className="mr-2">{stage.icon}</span>
                      {stage.label}
                    </div>
                  </div>

                  {isCurrent && (
                    <motion.div
                      className="h-1 w-20 bg-primary rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="h-full bg-primary-foreground"
                        animate={{ x: ["0%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
            >
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Deployment Successful!</span>
              </div>
            </motion.div>
          )}

          {isFailed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">Deployment Failed</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Logs */}
        <div className="p-6">
          <h3 className="text-sm font-semibold mb-4 text-muted-foreground">DEPLOYMENT LOGS</h3>
          <Card>
            <CardContent className="p-0">
              <div className="bg-black text-green-400 font-mono text-xs p-4 rounded-lg h-[400px] overflow-y-auto">
                <AnimatePresence>
                  {logs?.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "mb-1",
                        log.level === "error" && "text-red-400",
                        log.level === "success" && "text-green-400",
                        log.level === "warning" && "text-yellow-400"
                      )}
                    >
                      <span className="text-gray-500 mr-2">
                        [{new Date(log.time).toLocaleTimeString()}]
                      </span>
                      {log.text}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {logs?.length === 0 && (
                  <div className="text-gray-500">Waiting for logs...</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="border-t p-4 bg-card">
        <Button onClick={onClose} variant="outline" className="w-full">
          {isComplete || isFailed ? "Close" : "Minimize"}
        </Button>
      </div>
    </motion.div>
  );
}
