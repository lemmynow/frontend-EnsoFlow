"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import gsap from "gsap";
import { CustomNode } from "./CustomNode";
import { SidebarCatalog } from "./SidebarCatalog";
import { NodeConfigModal } from "./NodeConfigModal";
import { Button } from "../ui/button";
import { Save, Play } from "lucide-react";
import type { Canvas } from "@/lib/api";

const nodeTypes = {
  repo: CustomNode,
  backend: CustomNode,
  database: CustomNode,
  cache: CustomNode,
  frontend: CustomNode,
  worker: CustomNode,
};

interface CanvasViewProps {
  initialCanvas?: Canvas;
  onSave?: (canvas: Canvas) => void;
  onDeploy?: () => void;
  readOnly?: boolean;
}

let nodeId = 0;
const getNodeId = () => `node-${nodeId++}`;

export function CanvasView({ initialCanvas, onSave, onDeploy, readOnly = false }: CanvasViewProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);

  // Load initial canvas
  useEffect(() => {
    if (initialCanvas) {
      const loadedNodes = initialCanvas.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: {
          ...node.data,
          onConfigure: handleConfigureNode,
        },
      }));

      const loadedEdges = initialCanvas.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: "default",
        animated: true,
      }));

      setNodes(loadedNodes);
      setEdges(loadedEdges);
    }
  }, [initialCanvas]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
        type: "default",
        animated: true,
      } as Edge;

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: getNodeId(),
        type,
        position,
        data: {
          config: {},
          onConfigure: handleConfigureNode,
        },
      };

      setNodes((nds) => {
        const updatedNodes = nds.concat(newNode);

        // GSAP animation for new node
        setTimeout(() => {
          const nodeElement = document.querySelector(`[data-id="${newNode.id}"]`);
          if (nodeElement) {
            gsap.from(nodeElement, {
              scale: 0.6,
              opacity: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.5)",
            });
          }
        }, 0);

        return updatedNodes;
      });
    },
    [reactFlowInstance, setNodes]
  );

  const handleConfigureNode = (nodeId: string) => {
    setSelectedNode(nodeId);
    setConfigModalOpen(true);
  };

  const handleSaveNodeConfig = (config: Record<string, unknown>) => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode
          ? { ...node, data: { ...node.data, config } }
          : node
      )
    );
  };

  const handleSaveCanvas = () => {
    const canvas: Canvas = {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type || "default",
        position: node.position,
        data: node.data,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
      })),
    };

    // Save to localStorage for auto-save
    localStorage.setItem("canvas-autosave", JSON.stringify(canvas));

    onSave?.(canvas);
  };

  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const selectedNodeData = nodes.find((n) => n.id === selectedNode);

  return (
    <div className="flex h-full">
      {!readOnly && <SidebarCatalog onDragStart={handleDragStart} />}

      <div className="flex-1 flex flex-col">
        {!readOnly && (
          <div className="border-b bg-card p-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Canvas Builder</h2>
              <p className="text-sm text-muted-foreground">
                {nodes.length} resources • {edges.length} connections
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveCanvas} variant="outline" className="gap-2">
                <Save className="h-4 w-4" />
                Save Canvas
              </Button>
              <Button onClick={onDeploy} className="gap-2">
                <Play className="h-4 w-4" />
                Deploy
              </Button>
            </div>
          </div>
        )}

        <div ref={reactFlowWrapper} className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
            nodesDraggable={!readOnly}
            nodesConnectable={!readOnly}
            elementsSelectable={!readOnly}
            minZoom={0.2}
            maxZoom={2}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            <Controls />
            <MiniMap
              nodeColor={(node) => {
                const colorMap: Record<string, string> = {
                  repo: "#3b82f6",
                  backend: "#a855f7",
                  database: "#22c55e",
                  cache: "#ef4444",
                  frontend: "#06b6d4",
                  worker: "#f97316",
                };
                return colorMap[node.type || "default"] || "#888";
              }}
            />
          </ReactFlow>
        </div>
      </div>

      <NodeConfigModal
        open={configModalOpen}
        onClose={() => {
          setConfigModalOpen(false);
          setSelectedNode(null);
        }}
        nodeId={selectedNode}
        nodeType={selectedNodeData?.type || null}
        currentConfig={(selectedNodeData?.data.config as Record<string, unknown>) || {}}
        onSave={handleSaveNodeConfig}
      />
    </div>
  );
}
