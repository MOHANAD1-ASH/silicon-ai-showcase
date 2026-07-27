import { ArrowUpRight, Github } from "lucide-react";
import { featuredProjects, moreProjects } from "@/lib/portfolio-data";
import { Section } from "./section";

export function Projects() {
  return (
    <Section
      id="projects"
      label="Featured work"
      title="Systems built end-to-end"
      subtitle="Hover a card to pull up the model card: accuracy, throughput and architecture."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {featuredProjects.map((p) => (
          <article
            key={p.title}
            className="reveal surface group relative overflow-hidden rounded-2xl hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_30px_80px_-40px_var(--glow)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.image}
                alt={`${p.title} preview`}
                loading="lazy"
                width={1280}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-transparent" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 h-px bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100"
                style={{ animation: "scanline 2.4s linear infinite" }}
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid grid-cols-3 gap-2">
                  {p.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-primary/30 bg-background/80 px-3 py-2 backdrop-blur"
                    >
                      <div className="font-display text-sm font-bold text-primary">{m.value}</div>
                      <div className="mono-label mt-0.5 text-[0.6rem] text-muted-foreground">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mono-label mt-2 text-[0.62rem] text-accent">model: {p.model}</div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h3 className="text-xl font-semibold md:text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
              <ul className="mt-5 space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="relative pl-5 text-sm text-muted-foreground">
                    <span className="absolute left-0 text-primary">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="mono-label rounded-full border border-border bg-secondary px-2.5 py-1 text-[0.62rem] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="mono-label mt-6 inline-flex items-center gap-2 text-accent hover:underline"
              >
                <Github className="h-3.5 w-3.5" /> View source
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {moreProjects.map((p) => (
          <a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="reveal surface group flex flex-col rounded-xl p-5 hover:-translate-y-1 hover:border-accent/60"
          >
            <h4 className="text-base font-semibold">{p.title}</h4>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.blurb}</p>
            <span className="mono-label mt-4 text-[0.62rem] text-muted-foreground">{p.tags}</span>
            <span className="mono-label mt-3 inline-flex items-center gap-1 text-accent">
              Source <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}
