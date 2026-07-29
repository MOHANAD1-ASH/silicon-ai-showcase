import { MapPin, GraduationCap, Mail } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Section } from "./section";

export function About() {
  return (
    <Section
      id="about"
      label="About"
      title="The person behind the models"
      subtitle="Machine Learning Engineer with hands-on experience across the full breadth of ML."
    >
      <div className="reveal mx-auto max-w-3xl">
        <div className="min-w-0 space-y-5">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Machine Learning Engineer with hands-on experience across the 
            full breadth of ML: supervised and unsupervised learning, deep learning,
            computer vision, NLP, recommendation systems, and time series forecasting.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            That range shows up in the work itself — from a custom computer vision 
            pipeline for football tracking, to recommendation engines, classification
            systems, and NLP pipelines. Computer vision is where the most advanced
            systems live, but it's one specialty among several, not the whole story.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Currently pursuing a B.Sc. in Computer Science & Statistics at Helwan
            University (expected 2027), while training across three concurrent tracks:
            DEPI, EM Business Solutions, and Elevvo Pathways.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Skilled across the full ML lifecycle — data collection and annotation,
            preprocessing and feature engineering, model training and evaluation, and
            deployment via Streamlit and FastAPI. Comfortable independently owning a
            project from raw data to production-ready application, including designing
            custom algorithms for tracking and decision logic.
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
