import { useEffect, useMemo, useRef, useState } from "react";
import { Cpu, RefreshCw, Upload, Zap } from "lucide-react";
import { Section } from "./section";

type Box = { x: number; y: number; w: number; h: number; label: string; conf: number };

const LABELS = ["person", "laptop", "phone", "focus_zone", "keyboard"];

function makeBoxes(seed: number): Box[] {
  const rnd = (n: number) => {
    const x = Math.sin(seed * 9301 + n * 49297) * 233280;
    return x - Math.floor(x);
  };
  const count = 3 + Math.floor(rnd(1) * 2);
  return Array.from({ length: count }, (_, i) => ({
    x: 6 + rnd(i + 2) * 55,
    y: 8 + rnd(i + 9) * 50,
    w: 18 + rnd(i + 17) * 26,
    h: 18 + rnd(i + 23) * 30,
    label: LABELS[Math.floor(rnd(i + 31) * LABELS.length)],
    conf: 0.72 + rnd(i + 41) * 0.27,
  }));
}

export function LiveDemo() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<{ url: string; type: "image" | "video"; name: string } | null>(
    null,
  );
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [seed, setSeed] = useState(1);
  const [fps, setFps] = useState(0);

  const boxes = useMemo(() => makeBoxes(seed), [seed]);

  useEffect(() => {
    return () => {
      if (file) URL.revokeObjectURL(file.url);
    };
  }, [file]);

  useEffect(() => {
    if (phase !== "running") return;
    setProgress(0);
    const started = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - started) / 1800, 1);
      setProgress(t * 100);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setPhase("done");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, seed]);

  useEffect(() => {
    if (phase !== "done") return;
    const id = window.setInterval(() => setFps(58 + Math.random() * 8), 420);
    return () => window.clearInterval(id);
  }, [phase]);

  const onPick = (f: File | undefined) => {
    if (!f) return;
    const type = f.type.startsWith("video") ? "video" : "image";
    setFile({ url: URL.createObjectURL(f), type, name: f.name });
    setSeed((s) => s + 1);
    setPhase("running");
  };

  return (
    <Section
      id="demo"
      label="Live demo"
      title="Run a simulated detection pass"
      subtitle="Drop in an image or short clip and watch the inference overlay render. This runs a visual simulation of my YOLO pipeline in the browser — no upload leaves your device."
    >
      <div className="reveal grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onPick(e.dataTransfer.files?.[0]);
          }}
          className="surface relative aspect-video overflow-hidden rounded-2xl"
        >
          {!file ? (
            <button
              onClick={() => inputRef.current?.click()}
              className="group grid h-full w-full place-items-center gap-3 px-6 text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Upload className="h-6 w-6" />
              </span>
              <span className="font-display text-lg font-semibold">Drop an image or video</span>
              <span className="mono-label text-muted-foreground">
                or click to browse · processed locally
              </span>
            </button>
          ) : (
            <>
              {file.type === "image" ? (
                <img src={file.url} alt="Uploaded preview" className="h-full w-full object-cover" />
              ) : (
                <video
                  src={file.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-background/20" />

              {phase === "running" ? (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-x-0 h-0.5 bg-primary shadow-[0_0_24px_4px_var(--glow)]"
                    style={{ animation: "scanline 1.1s linear infinite" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mono-label mb-2 text-primary">
                      running inference… {progress.toFixed(0)}%
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-background/70">
                      <div
                        className="h-full rounded-full bg-primary transition-[width] duration-100"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </>
              ) : null}

              {phase === "done"
                ? boxes.map((b, i) => (
                    <div
                      key={i}
                      className="absolute rounded-md border-2 border-primary/90"
                      style={{
                        left: `${b.x}%`,
                        top: `${b.y}%`,
                        width: `${b.w}%`,
                        height: `${b.h}%`,
                        boxShadow: "0 0 0 1px var(--glow), 0 0 30px -6px var(--glow)",
                        animation: `fade-in 0.4s ease-out ${i * 0.12}s both`,
                      }}
                    >
                      <span className="mono-label absolute -top-6 left-0 whitespace-nowrap rounded bg-primary px-1.5 py-0.5 text-[0.6rem] text-primary-foreground">
                        {b.label} {(b.conf * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))
                : null}
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => onPick(e.target.files?.[0])}
          />
        </div>

        <div className="surface flex flex-col rounded-2xl p-6">
          <div className="mono-label flex items-center gap-2 text-primary">
            <Cpu className="h-3.5 w-3.5" /> inference telemetry
          </div>
          <dl className="mt-6 space-y-4">
            {[
              ["model", phase === "done" ? "yolo-v11n (sim)" : "—"],
              ["device", phase === "done" ? "Tesla T4" : "—"],
              ["latency", phase === "done" ? "16 ms" : "—"],
              ["fps", phase === "done" ? fps.toFixed(1) : "—"],
              ["detections", phase === "done" ? String(boxes.length) : "—"],
              ["conf. threshold", "0.55"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-border pb-2">
                <dt className="mono-label text-muted-foreground">{k}</dt>
                <dd className="font-display text-sm font-semibold text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex-1 space-y-2 overflow-hidden">
            {phase === "done" ? (
              boxes.map((b, i) => (
                <div
                  key={i}
                  className="mono-label flex items-center justify-between rounded-lg bg-panel-2 px-3 py-2 text-[0.62rem]"
                  style={{ animation: `fade-in 0.4s ease-out ${i * 0.1}s both` }}
                >
                  <span className="text-foreground">
                    #{i + 1} {b.label}
                  </span>
                  <span className="text-primary">{(b.conf * 100).toFixed(1)}%</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Upload a frame to populate the detection log.
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Upload className="h-4 w-4" /> Upload
            </button>
            <button
              disabled={!file}
              onClick={() => {
                setSeed((s) => s + 1);
                setPhase("running");
              }}
              className="surface inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-40"
            >
              <RefreshCw className="h-4 w-4" /> Re-run
            </button>
          </div>
          <p className="mono-label mt-4 flex items-center gap-2 text-[0.6rem] text-muted-foreground">
            <Zap className="h-3 w-3 text-accent" /> Simulated output — real pipeline lives in the
            GitHub repos.
          </p>
        </div>
      </div>
    </Section>
  );
}
