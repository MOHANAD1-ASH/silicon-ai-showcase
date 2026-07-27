import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/portfolio-data";

function Counter({
  value,
  suffix,
  decimals,
  label,
  active,
}: {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  active: boolean;
}) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <div className="surface rounded-2xl p-6 text-center transition-transform hover:-translate-y-1 hover:border-primary/50">
      <div className="font-display text-3xl font-bold text-gradient sm:text-4xl md:text-5xl">
        {shown.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mono-label mt-3 text-muted-foreground">{label}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="px-6 py-16">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Counter
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            decimals={s.decimals ?? 0}
            label={s.label}
            active={active}
          />
        ))}
      </div>
    </section>
  );
}
