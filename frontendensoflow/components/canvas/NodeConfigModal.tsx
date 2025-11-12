"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface NodeConfig {
  [key: string]: unknown;
}

interface NodeConfigModalProps {
  open: boolean;
  onClose: () => void;
  nodeId: string | null;
  nodeType: string | null;
  currentConfig: NodeConfig;
  onSave: (config: NodeConfig) => void;
}

const providerOptions: Record<string, string[]> = {
  database: ["neon", "supabase", "planetscale", "mongodb-atlas"],
  cache: ["upstash-redis", "redis-cloud"],
  backend: ["railway", "vercel", "fly-io"],
  frontend: ["vercel", "netlify", "cloudflare-pages"],
};

const ormOptions = ["drizzle", "prisma", "typeorm", "mongoose"];
const languageOptions = ["typescript", "javascript"];
const planOptions = ["free", "serverless", "pro"];

export function NodeConfigModal({
  open,
  onClose,
  nodeId,
  nodeType,
  currentConfig,
  onSave,
}: NodeConfigModalProps) {
  const [config, setConfig] = useState<NodeConfig>(currentConfig);

  useEffect(() => {
    setConfig(currentConfig);
  }, [currentConfig, nodeId]);

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const updateConfig = (key: string, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const renderConfigFields = () => {
    switch (nodeType) {
      case "repo":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="owner">Owner</Label>
              <Input
                id="owner"
                placeholder="username or org"
                value={(config.owner as string) || ""}
                onChange={(e) => updateConfig("owner", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Repository Name</Label>
              <Input
                id="name"
                placeholder="my-repo"
                value={(config.name as string) || ""}
                onChange={(e) => updateConfig("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                placeholder="main"
                value={(config.branch as string) || "main"}
                onChange={(e) => updateConfig("branch", e.target.value)}
              />
            </div>
          </>
        );

      case "database":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select
                value={(config.provider as string) || ""}
                onValueChange={(value) => updateConfig("provider", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providerOptions.database.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-name">Database Name</Label>
              <Input
                id="db-name"
                placeholder="my_database"
                value={(config.name as string) || ""}
                onChange={(e) => updateConfig("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <Select
                value={(config.plan as string) || "serverless"}
                onValueChange={(value) => updateConfig("plan", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  {planOptions.map((plan) => (
                    <SelectItem key={plan} value={plan}>
                      {plan}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "backend":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select
                value={(config.template as string) || ""}
                onValueChange={(value) => updateConfig("template", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nestjs">NestJS</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="fastify">Fastify</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={(config.language as string) || "typescript"}
                onValueChange={(value) => updateConfig("language", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="orm">ORM</Label>
              <Select
                value={(config.orm as string) || ""}
                onValueChange={(value) => updateConfig("orm", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ORM" />
                </SelectTrigger>
                <SelectContent>
                  {ormOptions.map((orm) => (
                    <SelectItem key={orm} value={orm}>
                      {orm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "cache":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select
                value={(config.provider as string) || ""}
                onValueChange={(value) => updateConfig("provider", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providerOptions.cache.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "frontend":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="framework">Framework</Label>
              <Select
                value={(config.framework as string) || ""}
                onValueChange={(value) => updateConfig("framework", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nextjs">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="provider">Hosting Provider</Label>
              <Select
                value={(config.provider as string) || ""}
                onValueChange={(value) => updateConfig("provider", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providerOptions.frontend.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "worker":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Worker Name</Label>
              <Input
                id="name"
                placeholder="email-worker"
                value={(config.name as string) || ""}
                onChange={(e) => updateConfig("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="runtime">Runtime</Label>
              <Select
                value={(config.runtime as string) || ""}
                onValueChange={(value) => updateConfig("runtime", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select runtime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nodejs">Node.js</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      default:
        return <div className="text-sm text-muted-foreground">No configuration options available</div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Configure {nodeType}</DialogTitle>
          <DialogDescription>
            Customize the settings for this resource
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {renderConfigFields()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
