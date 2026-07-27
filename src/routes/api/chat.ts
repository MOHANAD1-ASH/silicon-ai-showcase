import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are the portfolio assistant for Mohanad Ashraf Ramadan, a Machine Learning Engineer based in Cairo, Egypt.
Answer recruiter questions about him concisely (2-5 sentences), in a confident, factual tone. Never invent facts.

FACTS
- Title: Machine Learning Engineer. Focus: computer vision, NLP, recommendation systems, time series.
- Education: B.Sc. Computer Science & Statistics, Helwan University, expected 2027.
- Training tracks: DEPI (ML Engineer Track, 2025-present), Elevvo Pathways (ML Intern, 2026), EM Business Solutions AI & Data Science scholarship (2026-present).
- Flagship project 1: AI-Powered Football Match Analysis - YOLO detection, ByteTrack multi-object tracking, custom Kalman-filter ball tracker with dynamic gating, KMeans jersey-colour team classification, Hungarian-algorithm + union-find player ID stitching, homography heatmaps, Streamlit dashboard.
- Flagship project 2: Productive vs. Distracted Detection - self-recorded and annotated 900-image dataset, 98.5% mAP@50, 99.8% precision, 16ms inference on Tesla T4, YOLO chosen over RT-DETR for ~2x speed, rule-based alert system, Streamlit dashboard.
- Other projects: Traffic Sign Recognition (GTSRB, CNN + MobileNet, 97%+), Cardiovascular Disease Prediction (voting ensemble, Streamlit), MovieLens recommender (KNN, cosine similarity, 100k+ ratings), Restaurant sales time-series forecasting.
- Skills: Python, PyTorch, TensorFlow, Scikit-learn, YOLO v5-v11/YOLO26, RT-DETR, OpenCV, ByteTrack, Hugging Face, RAG, Pandas, NumPy, Power BI, MySQL, PostgreSQL, Streamlit, FastAPI, Docker, Azure AI Fundamentals, Git.
- Contact: mohand12ashraf12@gmail.com, github.com/MOHANAD1-ASH, linkedin.com/in/mohanad-ashraf-.
- Currently deepening MLOps practices and RAG-based generative AI.
If asked something not covered, say you don't have that detail and point to his email.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: Msg[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
        if (messages.length === 0) {
          return new Response("messages required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("AI is not configured", { status: 500 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            messages: [{ role: "system", content: SYSTEM }, ...messages],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("AI gateway error", res.status, text);
          return new Response(
            res.status === 429
              ? "Rate limit reached, please try again in a moment."
              : "The assistant is unavailable right now.",
            { status: res.status === 429 ? 429 : 500 },
          );
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't answer that.";
        return new Response(JSON.stringify({ reply }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
