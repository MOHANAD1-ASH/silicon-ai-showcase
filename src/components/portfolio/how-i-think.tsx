import { thinkingSteps } from "@/lib/portfolio-data";
import { Section } from "./section";

export function HowIThink() {
  return (
    <Section
      id="process"
      label="How I think"
      title="From understanding the problem to shipped model"
      subtitle="The loop I run on every project, whether it's a tracking pipeline or a tabular classifier."
    >
      <ol className="relative space-y-4 border-l border-border pl-6 md:pl-10">
        {thinkingSteps.map((s, i) => (
          <li
            key={s.step}
            className="reveal surface group relative rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/50 md:p-8"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span
              aria-hidden
              className="absolute -left-[1.85rem] top-8 grid h-3 w-3 place-items-center rounded-full bg-primary ring-4 ring-background transition-transform duration-500 group-hover:scale-150 md:-left-[2.85rem]"
            />
            <div className="grid gap-4 md:grid-cols-[auto_1fr] md:gap-8">
              <span className="font-display text-3xl font-bold text-primary/30 transition-colors group-hover:text-primary md:text-4xl">
                {s.step}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold md:text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
