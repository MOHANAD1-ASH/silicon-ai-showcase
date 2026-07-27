import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Cpu, RefreshCw, Upload, Zap } from "lucide-react";
import { Section } from "./section";

type Det = { bbox: [number, number, number, number]; class: string; score: number };
type Media = { url: string; type: "image" | "video" } | null;

export function LiveDemo() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<unknown>(null);
  const rafRef = useRef(0);
  const streamRef = useRef<MediaStream | null>(null);

  const [media, setMedia] = useState<Media>(null);
  const [webcam, setWebcam] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "running" | "error">("idle");
  const [dets, setDets] = useState<Det[]>([]);
  const [latency, setLatency] = useState(0);
  const [size, setSize] = useState({ w: 1, h: 1 });

  const loadModel = useCallback(async () => {
    if (modelRef.current) return modelRef.current;
    setStatus("loading");
    const tf = await import("@tensorflow/tfjs");
    await tf.ready();
    const cocoSsd = await import("@tensorflow-models/coco-ssd");
    modelRef.current = await cocoSsd.load({ base: "lite_mobilenet_v2" });
    return modelRef.current;
  }, []);

  const detectOnce = useCallback(async (el: HTMLImageElement | HTMLVideoElement) => {
    const model = (await loadModel()) as {
      detect: (e: HTMLImageElement | HTMLVideoElement) => Promise<Det[]>;
    };
    const t0 = performance.now();
    const out = await model.detect(el);
    setLatency(performance.now() - t0);
    setDets(out.filter((d) => d.score > 0.45));
  }, [loadModel]);

  const runImage = useCallback(async () => {
    const el = imgRef.current;
    if (!el) return;
    try {
      setStatus("running");
      setSize({ w: el.naturalWidth, h: el.naturalHeight });
      await detectOnce(el);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [detectOnce]);

  const loopVideo = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      setStatus("running");
      setSize({ w: el.videoWidth || 1, h: el.videoHeight || 1 });
      await loadModel();
      const step = async () => {
        if (!videoRef.current) return;
        await detectOnce(videoRef.current);
        rafRef.current = requestAnimationFrame(() => void step());
      };
      void step();
    } catch {
      setStatus("error");
    }
  }, [detectOnce, loadModel]);

  const stopAll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => () => stopAll(), [stopAll]);

  const onPick = (f: File | undefined) => {
    if (!f) return;
    stopAll();
    setWebcam(false);
    setDets([]);
    setMedia({ url: URL.createObjectURL(f), type: f.type.startsWith("video") ? "video" : "image" });
  };

  const startWebcam = async () => {
    try {
      stopAll();
      setMedia(null);
      setDets([]);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      setWebcam(true);
      requestAnimationFrame(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          void videoRef.current.play();
        }
      });
    } catch {
      setStatus("error");
    }
  };

  const showVideo = webcam || media?.type === "video";

  return (
    <Section
      id="demo"
      label="Live demo"
      title="Real object detection, running in your browser"
      subtitle="A real convolutional detector (COCO-SSD on TensorFlow.js) runs fully on your device — upload an image or clip, or open your webcam. Nothing is uploaded anywhere."
    >
      <div className="reveal grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div
          ref={wrapRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onPick(e.dataTransfer.files?.[0]);
          }}
          className="surface relative aspect-video overflow-hidden rounded-2xl"
        >
          {!media && !webcam ? (
            <button
              onClick={() => inputRef.current?.click()}
              className="group grid h-full w-full place-items-center gap-3 px-6 text-center"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <Upload className="h-6 w-6" />
              </span>
              <span className="font-display text-lg font-semibold">Drop an image or video</span>
              <span className="mono-label text-muted-foreground">
                or click to browse · inference runs on-device
              </span>
            </button>
          ) : null}

          {media?.type === "image" ? (
            <img
              ref={imgRef}
              src={media.url}
              alt="Frame being analysed by the detector"
              onLoad={() => void runImage()}
              className="h-full w-full object-contain"
            />
          ) : null}

          {showVideo ? (
            <video
              ref={videoRef}
              src={media?.url}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => void loopVideo()}
              className="h-full w-full object-contain"
            />
          ) : null}

          {(media || webcam) && size.w > 1 ? (
            <div className="pointer-events-none absolute inset-0">
              <div
                className="relative mx-auto h-full"
                style={{ aspectRatio: `${size.w} / ${size.h}`, maxWidth: "100%" }}
              >
                {dets.map((d, i) => (
                  <div
                    key={`${d.class}-${i}`}
                    className="absolute rounded-md border-2 border-primary/90"
                    style={{
                      left: `${(d.bbox[0] / size.w) * 100}%`,
                      top: `${(d.bbox[1] / size.h) * 100}%`,
                      width: `${(d.bbox[2] / size.w) * 100}%`,
                      height: `${(d.bbox[3] / size.h) * 100}%`,
                      boxShadow: "0 0 0 1px var(--glow), 0 0 30px -6px var(--glow)",
                    }}
                  >
                    <span className="mono-label absolute -top-6 left-0 whitespace-nowrap rounded bg-primary px-1.5 py-0.5 text-[0.6rem] text-primary-foreground">
                      {d.class} {(d.score * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {status === "loading" ? (
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="mono-label text-primary">loading detector weights…</div>
            </div>
          ) : null}

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
              ["model", "coco-ssd · lite_mobilenet_v2"],
              ["runtime", "TensorFlow.js (WebGL)"],
              ["latency", latency ? `${latency.toFixed(0)} ms` : "—"],
              ["fps", latency ? (1000 / latency).toFixed(1) : "—"],
              ["detections", dets.length ? String(dets.length) : "—"],
              ["conf. threshold", "0.45"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-border pb-2"
              >
                <dt className="mono-label text-muted-foreground">{k}</dt>
                <dd className="font-display text-sm font-semibold text-foreground">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 flex-1 space-y-2 overflow-hidden">
            {dets.length ? (
              dets.map((d, i) => (
                <div
                  key={`${d.class}-log-${i}`}
                  className="mono-label flex items-center justify-between rounded-lg bg-panel-2 px-3 py-2 text-[0.62rem]"
                >
                  <span className="text-foreground">
                    #{i + 1} {d.class}
                  </span>
                  <span className="text-primary">{(d.score * 100).toFixed(1)}%</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                {status === "error"
                  ? "Couldn't start the detector on this device — try another browser or input."
                  : "Upload a frame or start the webcam to populate the detection log."}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <Upload className="h-4 w-4" /> Upload
            </button>
            <button
              onClick={() => void startWebcam()}
              className="surface inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"
            >
              <Camera className="h-4 w-4" /> Webcam
            </button>
            <button
              disabled={!media || media.type !== "image"}
              onClick={() => void runImage()}
              className="surface inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-40"
            >
              <RefreshCw className="h-4 w-4" /> Re-run
            </button>
          </div>
          <p className="mono-label mt-4 flex items-center gap-2 text-[0.6rem] text-muted-foreground">
            <Zap className="h-3 w-3 text-accent" /> Real on-device inference — my custom YOLO
            pipelines live in the GitHub repos.
          </p>
        </div>
      </div>
    </Section>
  );
}
