"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Copy, Wrench } from "lucide-react";
import type { AgentDef } from "@/lib/agents/registry";
import { useAgentsStore } from "@/store/agentsStore";

interface AgentDetailSheetProps {
  agent: AgentDef | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpskill: (agent: AgentDef) => void;
}

export function AgentDetailSheet({
  agent,
  open,
  onOpenChange,
  onUpskill,
}: AgentDetailSheetProps) {
  const customPrompt = useAgentsStore((s) =>
    agent ? s.customPrompts[agent.id] : undefined,
  );

  if (!agent) return null;

  const promptText = customPrompt ?? agent.systemPrompt;

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = promptText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg border-white/8 glass-surface p-0 flex flex-col">
        {/* Hero header */}
        <div className="relative h-48 w-full shrink-0 overflow-hidden">
          <Image
            src={agent.avatar}
            alt={agent.name}
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 z-10">
            <SheetHeader className="p-0">
              <SheetTitle className="text-xl font-bold tracking-tight text-foreground">
                {agent.name}
              </SheetTitle>
            </SheetHeader>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className="font-mono text-[10px] border-white/20 text-white/70"
              >
                {agent.trigger}
              </Badge>
              <Badge variant="secondary" className="text-[10px]">
                {agent.category}
              </Badge>
              {customPrompt && (
                <Badge
                  variant="outline"
                  className="text-[10px] border-amber-400/40 text-amber-400"
                >
                  Upskilled
                </Badge>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{agent.tagline}</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="mandate" className="flex-1 flex flex-col min-h-0">
          <TabsList className="mx-6 mt-4 bg-white/5 w-fit">
            <TabsTrigger value="mandate" className="text-xs">
              Mandate
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-xs">
              Rules
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">
              Skills
            </TabsTrigger>
            <TabsTrigger value="output" className="text-xs">
              Output
            </TabsTrigger>
            <TabsTrigger value="prompt" className="text-xs">
              Prompt
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 min-h-0">
            <div className="px-6 py-4 pb-24">
              <TabsContent value="mandate" className="mt-0">
                <ol className="space-y-3">
                  {agent.mandate.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold mt-0.5"
                        style={{
                          background: agent.accentColor,
                          color: "oklch(0.1 0 0)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ol>
              </TabsContent>

              <TabsContent value="rules" className="mt-0">
                <ul className="space-y-3">
                  {agent.rules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="text-muted-foreground shrink-0 mt-0.5">
                        &bull;
                      </span>
                      <span className="text-foreground/90">{rule}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="skills" className="mt-0">
                {agent.skills.length > 0 ? (
                  <ul className="space-y-3">
                    {agent.skills.map((skill, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span
                          className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold mt-0.5"
                          style={{
                            background: `color-mix(in oklch, ${agent.accentColor} 20%, transparent)`,
                            color: agent.accentColor,
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground/90 leading-relaxed">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No acquired skills yet. Use Upskill to add capabilities.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="output" className="mt-0">
                <div className="rounded-lg bg-white/5 border border-white/8 p-4">
                  <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                    {agent.outputFormat}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="prompt" className="mt-0 space-y-3">
                <div className="rounded-lg bg-white/5 border border-white/8 p-4">
                  <pre className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap font-mono">
                    {promptText}
                  </pre>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5"
                  onClick={copyPrompt}
                >
                  <Copy className="h-3 w-3" />
                  Copy Prompt
                </Button>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>

        {/* Bottom action */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/8 glass-surface">
          <Button
            className="w-full gap-2"
            variant="outline"
            onClick={() => onUpskill(agent)}
          >
            <Wrench className="h-4 w-4" />
            Upskill Agent
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
