import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Stats } from "@/components/portfolio/stats";
import { Projects } from "@/components/portfolio/projects";
import { LiveDemo } from "@/components/portfolio/live-demo";
import { Expertise } from "@/components/portfolio/expertise";
import { HowIThink } from "@/components/portfolio/how-i-think";
import { Journey } from "@/components/portfolio/journey";
import { Contact } from "@/components/portfolio/contact";
import { Chatbot } from "@/components/portfolio/chatbot";
import { profile } from "@/lib/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohanad Ashraf — Machine Learning Engineer" },
      {
        name: "description",
        content:
          "Machine Learning Engineer in Cairo building real-time computer vision systems: YOLO tracking pipelines, 98.5% mAP detection models, and deployed ML dashboards.",
      },
      { property: "og:title", content: "Mohanad Ashraf — Machine Learning Engineer" },
      {
        property: "og:description",
        content:
          "Real-time computer vision, NLP and recommendation systems — from custom tracking algorithms to deployed dashboards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Stats />
        <Projects />
        <LiveDemo />
        <Expertise />
        <HowIThink />
        <Journey />
        <Contact />
      </main>
      <footer className="mono-label border-t border-border px-6 py-8 text-center text-muted-foreground">
        © {new Date().getFullYear()} {profile.name} — built with React, TanStack Start & Tailwind.
      </footer>
      <Chatbot />
    </div>
  );
}
