import { Brain, Eye, Wrench, Rocket } from "lucide-react";
import { expertise } from "@/lib/portfolio-data";
import { Section } from "./section";

const icons = [Brain, Eye, Wrench, Rocket];

export function Expertise() {
  return (
    <Section
      id="expertise"
      label="Technical expertise"
      title="The stack behind the systems"
      subtitle="Full ML lifecycle ownership: data collection and annotation, training, evaluation, and deployment."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {expertise.map((group, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={group.category}
              className="reveal surface group rounded-2xl p-6 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_60px_-40px_var(--glow)] md:p-8"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="min-w-0 text-lg font-semibold">{group.category}</h3>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-border bg-panel-2 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
