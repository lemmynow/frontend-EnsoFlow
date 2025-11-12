"use client";

import { Database, Server, Globe, Cpu, Code, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";

export interface NodeType {
  id: string;
  type: string;
  label: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

const nodeTypes: NodeType[] = [
  {
    id: "repo",
    type: "repo",
    label: "Repository",
    icon: Code,
    color: "bg-blue-500",
    description: "Connect a GitHub repository",
  },
  {
    id: "backend",
    type: "backend",
    label: "Backend",
    icon: Server,
    color: "bg-purple-500",
    description: "API server (NestJS, Express, etc.)",
  },
  {
    id: "database",
    type: "database",
    label: "Database",
    icon: Database,
    color: "bg-green-500",
    description: "PostgreSQL, MongoDB, etc.",
  },
  {
    id: "cache",
    type: "cache",
    label: "Cache",
    icon: Zap,
    color: "bg-red-500",
    description: "Redis, Memcached",
  },
  {
    id: "frontend",
    type: "frontend",
    label: "Frontend",
    icon: Globe,
    color: "bg-cyan-500",
    description: "Next.js, React, Vue",
  },
  {
    id: "worker",
    type: "worker",
    label: "Worker",
    icon: Cpu,
    color: "bg-orange-500",
    description: "Background jobs & queues",
  },
];

interface SidebarCatalogProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export function SidebarCatalog({ onDragStart }: SidebarCatalogProps) {
  return (
    <div className="w-80 border-r bg-card p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Resources</h2>
        <p className="text-sm text-muted-foreground">
          Drag and drop to add resources to your canvas
        </p>
      </div>

      <div className="space-y-3">
        {nodeTypes.map((nodeType, index) => {
          const Icon = nodeType.icon;

          return (
            <motion.div
              key={nodeType.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className="cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 hover:scale-105"
                draggable
                onDragStart={(e) => onDragStart(e, nodeType.type)}
              >
                <CardHeader className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${nodeType.color}`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-sm">{nodeType.label}</CardTitle>
                      <CardDescription className="text-xs">
                        {nodeType.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Quick Tips</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Drag resources to the canvas</li>
          <li>• Connect nodes by dragging edges</li>
          <li>• Click nodes to configure them</li>
          <li>• Save canvas before deploying</li>
        </ul>
      </div>
    </div>
  );
}

export { nodeTypes };
