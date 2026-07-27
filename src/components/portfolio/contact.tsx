import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { useReveal } from "@/hooks/use-reveal";

export function Contact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contact" ref={ref} className="scroll-mt-24 px-6 py-28 md:py-36">
      <div className="reveal mx-auto max-w-3xl text-center">
        <span className="mono-label text-primary">[ Get in touch ]</span>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          Ready to build <span className="text-gradient">intelligent systems</span> together?
        </h2>
        <p className="mt-5 text-muted-foreground">
          Open to opportunities in machine learning, computer vision and robotics software
          engineering.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_var(--glow)]"
          >
            <Mail className="h-4 w-4" /> Email me
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="surface inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="surface inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>
        <div className="mono-label mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 text-primary" /> {profile.email}
          </span>
          <span className="inline-flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-primary" /> {profile.phone}
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" /> {profile.location}
          </span>
        </div>
      </div>
    </section>
  );
}
