import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agents of Chaos — Design Pipeline",
  description: "AI agent profiles for the Agents of Chaos design pipeline.",
};

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
