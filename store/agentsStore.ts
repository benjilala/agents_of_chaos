import { create } from "zustand";
import { PRESETS } from "@/lib/agents/registry";

interface AgentsStoreState {
  activeAgents: Set<string>;
  customPrompts: Record<string, string>;

  toggleAgent: (id: string) => void;
  activatePreset: (presetKey: string) => void;
  setActive: (ids: string[]) => void;
  clearAll: () => void;
  isActive: (id: string) => boolean;

  updatePrompt: (id: string, prompt: string) => void;
  resetPrompt: (id: string) => void;
  getCustomPrompt: (id: string) => string | undefined;
}

export const useAgentsStore = create<AgentsStoreState>((set, get) => ({
  activeAgents: new Set<string>(),
  customPrompts: {},

  toggleAgent: (id) =>
    set((state) => {
      const next = new Set(state.activeAgents);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { activeAgents: next };
    }),

  activatePreset: (presetKey) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;
    set({ activeAgents: new Set(preset.agentIds) });
  },

  setActive: (ids) => set({ activeAgents: new Set(ids) }),

  clearAll: () => set({ activeAgents: new Set() }),

  isActive: (id) => get().activeAgents.has(id),

  updatePrompt: (id, prompt) =>
    set((state) => ({
      customPrompts: { ...state.customPrompts, [id]: prompt },
    })),

  resetPrompt: (id) =>
    set((state) => {
      const next = { ...state.customPrompts };
      delete next[id];
      return { customPrompts: next };
    }),

  getCustomPrompt: (id) => get().customPrompts[id],
}));
