"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Play } from "lucide-react";
import { AGENTS, PRESETS } from "@/lib/agents/registry";
import { useAgentsStore } from "@/store/agentsStore";

interface PipelineBarProps {
  onRunPipeline: () => void;
}

export function PipelineBar({ onRunPipeline }: PipelineBarProps) {
  const activeIds = useAgentsStore((s) => s.activeAgents);
  const clearAll = useAgentsStore((s) => s.clearAll);
  const activatePreset = useAgentsStore((s) => s.activatePreset);

  const count = activeIds.size;
  if (count === 0) return null;

  const activeAgents = AGENTS.filter((a) => activeIds.has(a.id)).sort(
    (a, b) => (a.pipelineOrder ?? 99) - (b.pipelineOrder ?? 99),
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/8 glass-surface">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Avatar stack */}
        <div className="flex items-center -space-x-2 shrink-0">
          {activeAgents.slice(0, 7).map((agent) => (
            <div
              key={agent.id}
              className="relative h-8 w-8 rounded-full border-2 border-background overflow-hidden"
            >
              <Image
                src={agent.avatar}
                alt={agent.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
          {count > 7 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-white/10 text-xs font-medium">
              +{count - 7}
            </div>
          )}
        </div>

        <Badge variant="secondary" className="font-mono text-xs shrink-0">
          {count} agent{count !== 1 ? "s" : ""}
        </Badge>

        {/* Preset quick buttons (desktop) */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <Button
              key={key}
              size="sm"
              variant="ghost"
              className="text-[10px] h-7 px-2 text-muted-foreground hover:text-foreground whitespace-nowrap"
              onClick={() => activatePreset(key)}
            >
              {preset.label}
            </Button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="ghost"
            className="gap-1 text-muted-foreground"
            onClick={clearAll}
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
          <Button
            size="sm"
            className="gap-1.5 font-semibold"
            onClick={onRunPipeline}
          >
            <Play className="h-3 w-3" />
            Run Pipeline
          </Button>
        </div>
      </div>
    </div>
  );
}
