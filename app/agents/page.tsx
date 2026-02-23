"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AGENTS,
  PRESETS,
  type AgentDef,
  type AgentCategory,
} from "@/lib/agents/registry";
import { useAgentsStore } from "@/store/agentsStore";
import { AgentCard } from "@/components/agents/AgentCard";
import { AgentDetailSheet } from "@/components/agents/AgentDetailSheet";
import { UpskillDialog } from "@/components/agents/UpskillDialog";
import { ActivateDialog } from "@/components/agents/ActivateDialog";
import { PipelineBar } from "@/components/agents/PipelineBar";
import { Skull } from "lucide-react";

type FilterTab = "all" | AgentCategory;

export default function AgentsPage() {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [intelAgent, setIntelAgent] = useState<AgentDef | null>(null);
  const [intelOpen, setIntelOpen] = useState(false);
  const [upskillAgent, setUpskillAgent] = useState<AgentDef | null>(null);
  const [upskillOpen, setUpskillOpen] = useState(false);
  const [activateOpen, setActivateOpen] = useState(false);

  const activeIds = useAgentsStore((s) => s.activeAgents);
  const toggleAgent = useAgentsStore((s) => s.toggleAgent);
  const activatePreset = useAgentsStore((s) => s.activatePreset);

  const filteredAgents =
    filter === "all" ? AGENTS : AGENTS.filter((a) => a.category === filter);

  const handleIntel = useCallback((agent: AgentDef) => {
    setIntelAgent(agent);
    setIntelOpen(true);
  }, []);

  const handleUpskill = useCallback((agent: AgentDef) => {
    setUpskillAgent(agent);
    setUpskillOpen(true);
    setIntelOpen(false);
  }, []);

  const handleToggleSelect = useCallback(
    (id: string) => toggleAgent(id),
    [toggleAgent],
  );

  const tabs: { value: FilterTab; label: string; count: number }[] = [
    { value: "all", label: "All Agents", count: AGENTS.length },
    {
      value: "pipeline",
      label: "Pipeline",
      count: AGENTS.filter((a) => a.category === "pipeline").length,
    },
    {
      value: "specialist",
      label: "Specialists",
      count: AGENTS.filter((a) => a.category === "specialist").length,
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/8 glass-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <Skull className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight leading-none">
                  AGENTS OF CHAOS
                </h1>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Design pipeline &middot; 15 agents
                </p>
              </div>
            </div>
          </div>

          {/* Filter tabs + preset buttons */}
          <div className="flex items-center justify-between gap-4 pb-3 overflow-x-auto">
            <div className="flex items-center gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    filter === tab.value
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  )}
                >
                  {tab.label}
                  <Badge
                    variant="secondary"
                    className="h-4 min-w-4 px-1 text-[10px] font-mono"
                  >
                    {tab.count}
                  </Badge>
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-1">
                Presets
              </span>
              {Object.entries(PRESETS).map(([key, preset]) => (
                <Button
                  key={key}
                  size="sm"
                  variant="outline"
                  className="h-7 text-[10px] px-2 border-white/10 hover:border-white/20"
                  onClick={() => activatePreset(key)}
                  title={preset.description}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile presets */}
      <div className="sm:hidden px-4 pt-4 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-1 shrink-0">
          Presets
        </span>
        {Object.entries(PRESETS).map(([key, preset]) => (
          <Button
            key={key}
            size="sm"
            variant="outline"
            className="h-7 text-[10px] px-2 border-white/10 shrink-0"
            onClick={() => activatePreset(key)}
          >
            {preset.label}
          </Button>
        ))}
      </div>

      {/* Agent grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onIntel={handleIntel}
              selected={activeIds.has(agent.id)}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>
      </main>

      {/* Detail sheet */}
      <AgentDetailSheet
        agent={intelAgent}
        open={intelOpen}
        onOpenChange={setIntelOpen}
        onUpskill={handleUpskill}
      />

      {/* Upskill dialog */}
      <UpskillDialog
        agent={upskillAgent}
        open={upskillOpen}
        onOpenChange={setUpskillOpen}
      />

      {/* Activate dialog */}
      <ActivateDialog open={activateOpen} onOpenChange={setActivateOpen} />

      {/* Pipeline bar */}
      <PipelineBar onRunPipeline={() => setActivateOpen(true)} />
    </div>
  );
}
