import { MapPin, GraduationCap, Mail } from "lucide-react";
import portrait from "@/assets/mohanad-portrait.jpg.asset.json";
import { profile } from "@/lib/portfolio-data";
import { Section } from "./section";

export function About() {
  return (
    <Section
      id="about"
      label="About"
      title="The person behind the models"
      subtitle="Computer Science & Statistics student in Cairo, building real-time ML systems end to end."
    >
      <div className="reveal grid items-center gap-10 md:grid-cols-[320px_1fr]">
        <div className="relative mx-auto w-full max-w-[320px]">
          <div
            aria-hidden
            className="absolute -inset-4 rounded-[2rem] blur-2xl"
            style={{ background: "radial-gradient(circle at 40% 30%, var(--glow), transparent 70%)" }}
          />
          <img
            src={portrait.url}
            alt={`${profile.name}, Machine Learning Engineer`}
            className="relative aspect-[4/5] w-full rounded-[1.75rem] border border-primary/25 object-cover shadow-[0_30px_80px_-40px_var(--glow)]"
          />
        </div>
        <div className="min-w-0 space-y-5">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm {profile.name.split(" ")[0]}, a Machine Learning Engineer focused on computer
            vision. I like the unglamorous parts: recording and annotating my own datasets,
            benchmarking architectures honestly, writing custom tracking logic when off-the-shelf
            tools break, and shipping the result behind a UI someone can actually use.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Across three concurrent ML programmes and a CS & Statistics degree, I've taken projects
            from raw video and messy tabular data all the way to deployed, monitored apps on
            Streamlit, FastAPI and Azure.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              [MapPin, profile.location],
              [GraduationCap, "B.Sc. CS & Statistics · Helwan University"],
              [Mail, profile.email],
            ].map(([Icon, text], i) => {
              const I = Icon as typeof MapPin;
              return (
                <span
                  key={i}
                  className="mono-label inline-flex items-center gap-2 rounded-full border border-border bg-panel-2 px-3 py-1.5 text-muted-foreground"
                >
                  <I className="h-3.5 w-3.5 text-primary" />
                  {text as string}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
