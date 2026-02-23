"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Copy, Check, ArrowRight } from "lucide-react";
import { AGENTS, type AgentDef } from "@/lib/agents/registry";
import { useAgentsStore } from "@/store/agentsStore";

interface ActivateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ActivateDialog({ open, onOpenChange }: ActivateDialogProps) {
  const activeIds = useAgentsStore((s) => s.activeAgents);
  const customPrompts = useAgentsStore((s) => s.customPrompts);
  const [problem, setProblem] = useState("");
  const [copied, setCopied] = useState(false);

  const activeAgents = AGENTS.filter((a) => activeIds.has(a.id)).sort(
    (a, b) => (a.pipelineOrder ?? 99) - (b.pipelineOrder ?? 99),
  );

  const composePrompt = () => {
    const parts: string[] = [];

    if (activeAgents.length > 1) {
      parts.push(
        `# Agent Pipeline (${activeAgents.length} agents)\n\nRun the following agents in order:\n`,
      );
    }

    activeAgents.forEach((agent, i) => {
      const prompt = customPrompts[agent.id] ?? agent.systemPrompt;
      if (activeAgents.length > 1) {
        parts.push(`## Step ${i + 1}: ${agent.name} (${agent.trigger})\n`);
      }
      parts.push(prompt);
      parts.push(`\n**Output Format:** ${agent.outputFormat}\n`);
    });

    if (problem.trim()) {
      parts.push(`\n---\n\n# Problem Statement\n\n${problem.trim()}`);
    }

    return parts.join("\n");
  };

  const handleCopy = async () => {
    const composed = composePrompt();
    try {
      await navigator.clipboard.writeText(composed);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select and copy from a temporary textarea
      const ta = document.createElement("textarea");
      ta.value = composed;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glass-surface border-white/8 max-h-[80vh] !grid-rows-[auto] !grid-cols-1 flex flex-col gap-3 overflow-hidden p-5">
        <DialogHeader className="shrink-0">
          <DialogTitle>Run Pipeline</DialogTitle>
          <DialogDescription>
            Compose a prompt from {activeAgents.length} active agent
            {activeAgents.length !== 1 ? "s" : ""}. Copy and paste into a new
            chat.
          </DialogDescription>
        </DialogHeader>

        {/* Pipeline order */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin shrink-0">
          {activeAgents.map((agent, i) => (
            <div key={agent.id} className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2 py-1">
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
                <span className="text-xs font-medium whitespace-nowrap">
                  {agent.name}
                </span>
              </div>
              {i < activeAgents.length - 1 && (
                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Problem statement input */}
        <div className="space-y-1.5 shrink-0">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Problem Statement
          </label>
          <Textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe the problem or feature you want the agents to work on..."
            className="min-h-[56px] max-h-[90px] bg-white/5 border-white/10 text-sm resize-y"
          />
        </div>

        {/* Preview — takes remaining space, scrolls internally */}
        <ScrollArea className="min-h-0 flex-1 rounded-lg bg-white/5 border border-white/8 overflow-hidden">
          <pre className="p-3 text-xs font-mono text-foreground/80 whitespace-pre-wrap break-words">
            {composePrompt()}
          </pre>
        </ScrollArea>

        {/* Copy action — always visible at bottom */}
        <Button
          className="w-full gap-2 shrink-0"
          size="lg"
          onClick={handleCopy}
          disabled={!problem.trim()}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              Copied to Clipboard
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              Copy Pipeline Prompt
            </>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
