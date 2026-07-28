import { MapPin, GraduationCap, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Section } from "./section";

export function About() {
  return (
    <Section
      id="about"
      label="About"
      title="The person behind the models"
      subtitle="Computer Science & Statistics student in Cairo, building real-time ML systems end to end."
    >
      <div className="reveal mx-auto max-w-3xl">
        <div className="min-w-0 space-y-5">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Computer Science &amp; Statistics student and Machine Learning Engineer with hands-on
            experience building end-to-end ML and deep learning solutions — from data preprocessing
            and feature engineering to model training, evaluation and deployment.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            My focus is computer vision: object detection and tracking with YOLO, RT-DETR, OpenCV,
            ByteTrack and custom Kalman-filtering logic, alongside CNNs and transfer learning for
            classification. I also work across NLP and Generative AI with Hugging Face Transformers
            and RAG-based applications.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I care about models that actually ship: honest benchmarking, real latency budgets, and
            deployment through Streamlit, FastAPI, MLflow and Azure — turning research-grade
            pipelines into applications people can use.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              [MapPin, profile.location],
              [GraduationCap, "B.Sc. CS & Statistics · Helwan University"],
              [Mail, profile.email],
            ].map(([Icon, text], i) => {
              const I = Icon as typeof MapPin;
              return (
                <span
                  key={i}
                  className="mono-label inline-flex items-center gap-2 rounded-full border border-border bg-panel-2 px-3 py-1.5 text-muted-foreground"
                >
                  <I className="h-3.5 w-3.5 text-primary" />
                  {text as string}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
