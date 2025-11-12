"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Database, Server, Globe, Cpu, Code, Zap } from "lucide-react";
import { Card } from "../ui/card";

const iconMap: Record<string, React.ElementType> = {
  repo: Code,
  backend: Server,
  database: Database,
  cache: Zap,
  frontend: Globe,
  worker: Cpu,
};

const colorMap: Record<string, string> = {
  repo: "bg-blue-500",
  backend: "bg-purple-500",
  database: "bg-green-500",
  cache: "bg-red-500",
  frontend: "bg-cyan-500",
  worker: "bg-orange-500",
};

export const CustomNode = memo(({ data, id, type }: NodeProps) => {
  const Icon = iconMap[type || "repo"] || Database;
  const color = colorMap[type || "repo"] || "bg-gray-500";
  const config = (data.config as Record<string, unknown>) || {};
  const onConfigure = data.onConfigure as ((nodeId: string) => void) | undefined;

  return (
    <Card
      className="min-w-[200px] shadow-lg border-2 hover:shadow-xl transition-all cursor-pointer hover:border-primary/50"
      onClick={() => onConfigure?.(id)}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-primary"
      />

      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${color}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm capitalize">{type}</div>
            <div className="text-xs text-muted-foreground truncate">
              {config.name as string || config.owner as string || id}
            </div>
          </div>
        </div>

        {Object.keys(config).length > 0 && (
          <div className="text-xs space-y-1">
            {(config.provider as string) && (
              <div className="text-muted-foreground">
                Provider: {config.provider as string}
              </div>
            )}
            {(config.template as string) && (
              <div className="text-muted-foreground">
                Template: {config.template as string}
              </div>
            )}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-primary"
      />
    </Card>
  );
});

CustomNode.displayName = "CustomNode";
