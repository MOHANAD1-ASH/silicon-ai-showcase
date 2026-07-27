import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export function Section({
  id,
  label,
  title,
  subtitle,
  children,
}: {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="scroll-mt-24 px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal mb-14 max-w-2xl">
          <span className="mono-label text-primary">[ {label} ]</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {subtitle ? <p className="mt-4 text-muted-foreground">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
