"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RotateCcw, Save } from "lucide-react";
import type { AgentDef } from "@/lib/agents/registry";
import { useAgentsStore } from "@/store/agentsStore";

interface UpskillDialogProps {
  agent: AgentDef | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpskillDialog({ agent, open, onOpenChange }: UpskillDialogProps) {
  const customPrompt = useAgentsStore((s) =>
    agent ? s.customPrompts[agent.id] : undefined,
  );
  const updatePrompt = useAgentsStore((s) => s.updatePrompt);
  const resetPrompt = useAgentsStore((s) => s.resetPrompt);

  const [draft, setDraft] = useState("");

  useEffect(() => {
    if (agent) {
      setDraft(customPrompt ?? agent.systemPrompt);
    }
  }, [agent, customPrompt]);

  if (!agent) return null;

  const hasChanges = draft !== (customPrompt ?? agent.systemPrompt);
  const isCustom = customPrompt !== undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl glass-surface border-white/8">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Upskill: {agent.name}
          </DialogTitle>
          <DialogDescription>
            Edit this agent&apos;s system prompt. Changes persist for this
            session.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="min-h-[260px] font-mono text-sm bg-white/5 border-white/10 resize-y"
          placeholder="System prompt..."
        />

        <DialogFooter className="gap-2 sm:gap-0">
          {isCustom && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5 text-muted-foreground"
              onClick={() => {
                resetPrompt(agent.id);
                setDraft(agent.systemPrompt);
              }}
            >
              <RotateCcw className="h-3 w-3" />
              Reset to Default
            </Button>
          )}
          <Button
            size="sm"
            className="gap-1.5"
            disabled={!hasChanges}
            onClick={() => {
              updatePrompt(agent.id, draft);
              onOpenChange(false);
            }}
          >
            <Save className="h-3 w-3" />
            Save Custom Prompt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
