import { timeline } from "@/lib/portfolio-data";
import { Section } from "./section";

export function Journey() {
  return (
    <Section
      id="journey"
      label="Journey"
      title="Where I've trained and built"
      subtitle="Three concurrent ML tracks alongside a Computer Science & Statistics degree."
    >
      <div className="space-y-0">
        {timeline.map((t, i) => (
          <div
            key={t.role}
            className="reveal grid gap-4 border-t border-border py-8 md:grid-cols-[200px_1fr] md:gap-10"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="mono-label pt-1 text-muted-foreground">{t.when}</div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold md:text-xl">{t.role}</h3>
              <div className="mono-label mt-1 text-primary">{t.org}</div>
              <ul className="mt-4 space-y-2">
                {t.points.map((p) => (
                  <li key={p} className="relative pl-5 text-sm text-muted-foreground">
                    <span className="absolute left-0 text-primary">›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
