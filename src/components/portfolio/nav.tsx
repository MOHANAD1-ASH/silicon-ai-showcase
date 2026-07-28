import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#expertise", label: "Expertise" },
  { href: "#process", label: "Process" },
  { href: "#journey", label: "Journey" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4">
        <a href="#top" className="mono-label min-w-0 truncate font-semibold text-foreground">
          M_ASHRAF<span className="text-primary">.</span>
        </a>
        <div className="flex shrink-0 items-center gap-1">
          <div className="mr-2 hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="mono-label hidden rounded-full border border-primary/40 px-4 py-2 text-primary transition-all hover:bg-primary hover:text-primary-foreground sm:inline-block"
          >
            Contact
          </a>
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="surface grid h-9 w-9 place-items-center rounded-full md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-border bg-background/95 px-6 py-3 backdrop-blur-xl md:hidden">
          {links.concat({ href: "#contact", label: "Contact" }).map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
