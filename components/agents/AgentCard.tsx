"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Info, Check } from "lucide-react";
import type { AgentDef } from "@/lib/agents/registry";
import { useAgentsStore } from "@/store/agentsStore";

function DangerBars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-3 w-1.5 rounded-sm transition-colors",
            i < level
              ? level >= 4
                ? "bg-red-500"
                : level >= 3
                  ? "bg-amber-400"
                  : "bg-emerald-400"
              : "bg-white/10",
          )}
        />
      ))}
    </div>
  );
}

interface AgentCardProps {
  agent: AgentDef;
  onIntel: (agent: AgentDef) => void;
  selected: boolean;
  onToggleSelect: (id: string) => void;
}

export function AgentCard({
  agent,
  onIntel,
  selected,
  onToggleSelect,
}: AgentCardProps) {
  const isActive = useAgentsStore((s) => s.activeAgents.has(agent.id));
  const toggleAgent = useAgentsStore((s) => s.toggleAgent);

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300",
        "glass-panel hover:border-white/12",
        isActive && "ring-2 ring-offset-0 animate-breathe-glow",
        selected && "border-white/20 bg-white/5",
      )}
      style={
        isActive
          ? ({
              "--tw-ring-color": agent.accentColor,
              boxShadow: `0 0 12px 2px color-mix(in oklch, ${agent.accentColor} 30%, transparent)`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* Selection checkbox */}
      <button
        onClick={() => onToggleSelect(agent.id)}
        className={cn(
          "absolute top-3 left-3 z-20 flex h-5 w-5 items-center justify-center rounded border transition-all",
          selected
            ? "border-white bg-white text-black"
            : "border-white/30 bg-black/40 backdrop-blur-sm hover:border-white/60",
        )}
      >
        {selected && <Check className="h-3 w-3" />}
      </button>

      {/* Portrait */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={agent.avatar}
          alt={agent.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Pipeline order badge */}
        {agent.pipelineOrder && (
          <div
            className="absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
            style={{
              background: agent.accentColor,
              color: "oklch(0.1 0 0)",
            }}
          >
            {agent.pipelineOrder}
          </div>
        )}

        {/* Name overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className="text-lg font-bold tracking-tight leading-tight">
            {agent.name}
          </h3>
          <Badge
            variant="outline"
            className="mt-1 font-mono text-[10px] border-white/20 text-white/70"
          >
            {agent.trigger}
          </Badge>
        </div>
      </div>

      {/* Info section */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {agent.tagline}
        </p>

        {agent.skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {agent.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-white/5 border border-white/8 px-1.5 py-0.5 text-[9px] text-muted-foreground"
              >
                {skill.length > 20 ? skill.slice(0, 18) + "…" : skill}
              </span>
            ))}
            {agent.skills.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-white/5 border border-white/8 px-1.5 py-0.5 text-[9px] text-muted-foreground">
                +{agent.skills.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>{agent.temperament}</span>
          <div className="flex items-center gap-1.5">
            <span className="opacity-60">Danger</span>
            <DangerBars level={agent.dangerLevel} />
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Button
            size="sm"
            variant={isActive ? "default" : "outline"}
            className={cn(
              "flex-1 text-xs gap-1.5 transition-all",
              isActive && "shadow-md",
            )}
            style={
              isActive
                ? {
                    background: agent.accentColor,
                    color: "oklch(0.1 0 0)",
                    borderColor: agent.accentColor,
                  }
                : undefined
            }
            onClick={() => toggleAgent(agent.id)}
          >
            <Zap className="h-3 w-3" />
            {isActive ? "Active" : "Activate"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs gap-1 text-muted-foreground hover:text-foreground"
            onClick={() => onIntel(agent)}
          >
            <Info className="h-3 w-3" />
            Intel
          </Button>
        </div>
      </div>
    </div>
  );
}
