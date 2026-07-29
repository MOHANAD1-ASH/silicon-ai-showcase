import { ArrowUpRight, Play, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import portrait from "@/public/mohanad-portrait.jpg";
import { ParticleField } from "./particle-field";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden px-6 pb-24 pt-36 md:pt-44">
      <div className="grid-bg absolute inset-0 -z-20 opacity-70" aria-hidden />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-12rem] -z-20 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, var(--glow), transparent 60%), radial-gradient(circle at 70% 60%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 62%)",
          animation: "pulse-glow 7s ease-in-out infinite",
        }}
      />
      <div className="absolute inset-0 -z-10 opacity-70" aria-hidden>
        <ParticleField />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_auto]">
        <div className="min-w-0">
        <span className="mono-label inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-primary">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Available for ML / CV roles · {profile.location}
        </span>

        <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          {profile.name}
        </h1>
        <p className="mono-label mt-4 text-base text-accent sm:text-lg">{profile.title}</p>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {profile.tagline} Computer vision, NLP and recommendation systems — from custom tracking
          algorithms written from scratch to deployed, monitored dashboards.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_var(--glow)]"
          >
            View Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#expertise"
            className="surface group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent"
          >
            <Play className="h-4 w-4" />
            Technical Skills
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </div>

        </div>

        <div className="relative order-first mx-auto w-40 shrink-0 sm:w-52 md:order-none md:w-60">
          <div
            aria-hidden
            className="absolute -inset-6 rounded-full blur-2xl"
            style={{
              background: "radial-gradient(circle at 50% 40%, var(--glow), transparent 70%)",
            }}
          />
          <img
            src={portrait.url}
            alt={`${profile.name}, Machine Learning Engineer`}
            className="relative aspect-square w-full rounded-full border border-primary/30 object-cover shadow-[0_24px_70px_-30px_var(--glow)]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
          {[
            ["Focus", "Computer Vision"],
            ["Best mAP@50", "98.5%"],
            ["Realtime", "16 ms / frame"],
            ["Degree", "CS & Statistics"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="mono-label text-muted-foreground">{k}</dt>
              <dd className="mt-1 font-display text-sm font-semibold sm:text-base">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
