import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import portrait from "@/assets/vyshnav-portrait.png";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Code2,
  Brain,
  Database,
  Wrench,
  Globe,
  GraduationCap,
  Briefcase,
  Award,
  ExternalLink,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vyshnav C P — Full-Stack Developer & AI/ML Engineer" },
      { name: "description", content: "Portfolio of Vyshnav C P — building intelligent systems and scalable web apps with Python, Django, and Deep Learning." },
      { property: "og:title", content: "Vyshnav C P — Full-Stack Developer & AI/ML Engineer" },
      { property: "og:description", content: "Building intelligent systems and scalable web applications." },
    ],
  }),
  component: Portfolio,
});

/* ------------------------------- Data ------------------------------- */

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const ROLES = [
  "Full-Stack Developer",
  "AI/ML Engineer",
  "Django Developer",
  "Deep Learning Enthusiast",
];

const STATS = [
  { label: "Projects", value: "3" },
  { label: "Internships", value: "2" },
  { label: "Certifications", value: "1" },
  { label: "CGPA", value: "6.96" },
];

const SKILLS: { group: string; icon: ReactNode; items: string[] }[] = [
  { group: "Languages", icon: <Code2 className="h-5 w-5" />, items: ["Python", "C", "JavaScript"] },
  { group: "Web", icon: <Globe className="h-5 w-5" />, items: ["HTML", "CSS", "Django"] },
  { group: "Databases", icon: <Database className="h-5 w-5" />, items: ["MySQL", "SQL"] },
  { group: "AI / ML", icon: <Brain className="h-5 w-5" />, items: ["LSTM", "Deep Learning", "Sequence Modeling", "Behavior-Based Analysis"] },
  { group: "Tools", icon: <Wrench className="h-5 w-5" />, items: ["Git", "GitHub", "VS Code"] },
  { group: "CS Core", icon: <GraduationCap className="h-5 w-5" />, items: ["DSA", "OOP", "DBMS"] },
];

const PROJECTS = [
  {
    title: "AI-Powered Ransomware Detection System",
    tech: ["Python", "LSTM", "Deep Learning", "System Call Analysis"],
    desc: "LSTM sequence models that detect ransomware in real time by analyzing system call logs. Detects zero-day threats via behavior-based learning.",
  },
  {
    title: "Speech Recognition for Children with Speech Disorders",
    tech: ["Python", "Django", "LSTM", "MySQL", "HTML", "CSS"],
    desc: "AI-powered web app using LSTM to detect and classify speech disorders in children with high accuracy. Full Django REST backend with MySQL.",
  },
  {
    title: "Where Is My Doctor — Doctor Locator App",
    tech: ["Django", "MySQL", "HTML", "CSS"],
    desc: "Full-stack web app to locate nearby doctors by specialty and location. Fully responsive front-end built with HTML5 and CSS3.",
  },
];

const EXPERIENCE = [
  {
    role: "AI Project Intern",
    org: "AccelerateX — M A College of Engineering",
    date: "October 2024",
    desc: "Designed an LSTM-based deep learning model for real-world speech pattern analysis.",
  },
  {
    role: "Full Stack Web Development Trainee",
    org: "MAXLORE Innovations LLP",
    date: "September 2022",
    desc: "Trained in HTML, CSS, JavaScript, Django, MySQL. Built practice full-stack applications.",
  },
];

const EDUCATION = [
  { degree: "B.Tech in Computer Science & Engineering", school: "Mar Athanasius College of Engineering", period: "2023 – 2026", score: "CGPA: 6.96" },
  { degree: "Diploma in Computer Science", school: "Seethi Sahib Memorial Polytechnic College", period: "2020 – 2023", score: "CGPA: 8.58" },
  { degree: "Higher Secondary (Science)", school: "GHSS Niramaruthur", period: "2018 – 2020", score: "80.5%" },
];

/* --------------------------- Custom hooks --------------------------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function useTypewriter(words: string[], typeSpeed = 80, deleteSpeed = 40, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setI((p) => (p + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? word.slice(0, prev.length - 1) : word.slice(0, prev.length + 1),
      );
    }, deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, typeSpeed, deleteSpeed, pause]);
  return text;
}

/* ----------------------------- Components ---------------------------- */

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 200}px, ${e.clientY - 200}px, 0)`;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-40 blur-3xl transition-transform duration-200 ease-out hidden md:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--color-cyan-glow) 35%, transparent), transparent 60%)",
      }}
    />
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/70 backdrop-blur-xl border-b border-border/60" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="font-mono text-sm tracking-tight">
          <span className="gradient-text font-semibold">{"<vyshnav />"}</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); go("contact"); }}
          className="hidden md:inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          Let's talk <ArrowRight className="h-4 w-4" />
        </a>
        <button
          aria-label="Toggle menu"
          className="md:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV.map((n) => (
              <li key={n.id}>
                <button onClick={() => go(n.id)} className="w-full py-2 text-left text-sm text-muted-foreground hover:text-foreground">
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const typed = useTypewriter(ROLES);
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      {/* Animated background */}
      <div aria-hidden className="absolute inset-0 -z-10 mesh-bg" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-primary/30 blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-secondary/30 blur-3xl animate-float-slower" />
        <div className="absolute bottom-0 left-10 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-4 py-1.5 text-xs font-mono text-muted-foreground backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Available for internships & opportunities
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            VYSHNAV <span className="gradient-text">C P</span>
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-6 flex items-center justify-center font-mono text-base md:text-xl">
            <span className="text-muted-foreground">&gt;&nbsp;</span>
            <span className="text-foreground">{typed}</span>
            <span className="ml-1 inline-block h-5 w-[2px] bg-primary animate-blink md:h-6" />
          </div>
        </Reveal>
        <Reveal delay={320}>
          <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
            Building intelligent systems and scalable web applications.
          </p>
        </Reveal>
        <Reveal delay={420}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_-5px_var(--primary)] transition hover:shadow-[0_0_40px_-2px_var(--primary)]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:border-primary/60 hover:bg-card/60"
            >
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </div>
        </Reveal>
        <Reveal delay={520}>
          <div className="mt-10 flex items-center justify-center gap-5 text-muted-foreground">
            <a href="https://github.com/Vyshnav-cp" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/vyshnav-c-p" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:vyshnavcp2026@gmail.com" aria-label="Email" className="transition hover:text-primary">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal>
      <div className="mb-12 flex flex-col items-start">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{kicker}</span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-primary to-secondary" />
      </div>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeader kicker="01 / About" title="A bit about me" />
      <div className="grid gap-12 md:grid-cols-5 md:items-center">
        <Reveal className="md:col-span-2">
          <div className="relative mx-auto w-full max-w-sm">
            {/* Rotating gradient ring */}
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2rem] opacity-70 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--color-cyan-glow), var(--color-violet-glow), var(--color-cyan-glow))",
                animation: "spin 12s linear infinite",
              }}
            />
            {/* Floating glow blobs */}
            <div aria-hidden className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-primary/40 blur-3xl animate-float-slow" />
            <div aria-hidden className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-secondary/40 blur-3xl animate-float-slower" />

            {/* Portrait frame */}
            <div className="group relative overflow-hidden rounded-[2rem] border border-primary/30 bg-card/60 p-1 backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <img
                  src={portrait}
                  alt="Vyshnav C P — portrait"
                  className="relative z-10 h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Shimmer sweep */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                />
                {/* Grid pattern overlay */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
              </div>
            </div>

            {/* Floating status badge */}
            <div className="absolute -bottom-3 -right-3 z-20 flex items-center gap-2 rounded-full border border-primary/40 bg-background/90 px-3 py-1.5 font-mono text-[11px] backdrop-blur animate-float-slow">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-foreground">currently building</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-3" delay={120}>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a Computer Science Engineering student at{" "}
            <span className="text-foreground">Mar Athanasius College of Engineering</span> with hands-on
            experience in full-stack web development and AI / deep learning. I specialize in{" "}
            <span className="text-foreground">Python, Django, and LSTM-based machine learning systems</span> —
            building applications that combine clean engineering with real intelligence.
          </p>
          <p className="mt-5 text-base text-muted-foreground">
            Currently exploring sequence modeling, behavior-based threat detection, and scalable backends.
            Open to internships, collaborations, and full-time opportunities.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/40 px-3 py-1.5">
              <MapPin className="h-4 w-4 text-primary" /> Malappuram, Kerala, India
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/40 px-3 py-1.5 font-mono">
              <Mail className="h-4 w-4 text-primary" /> vyshnavcp2026@gmail.com
            </span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass-card glass-card-hover rounded-2xl p-4">
                <div className="font-display text-2xl font-bold gradient-text">{s.value}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeader kicker="02 / Skills" title="Tools I work with" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((s, i) => (
          <Reveal key={s.group} delay={i * 70}>
            <div className="glass-card glass-card-hover h-full rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  {s.icon}
                </span>
                <h3 className="font-display text-lg font-semibold">{s.group}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border/80 bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeader kicker="03 / Work" title="Selected projects" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <article className="glass-card glass-card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <a
                  href="https://github.com/Vyshnav-cp"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View on GitHub"
                  className="text-muted-foreground transition group-hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 font-mono text-[11px] text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeader kicker="04 / Experience" title="Where I've worked" />
      <div className="relative ml-3 border-l border-border/80 pl-8 md:ml-6">
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.role} delay={i * 100}>
            <div className="relative mb-10 last:mb-0">
              <span className="absolute -left-[42px] top-1.5 grid h-6 w-6 place-items-center rounded-full border border-primary/50 bg-background">
                <Briefcase className="h-3 w-3 text-primary" />
              </span>
              <div className="glass-card glass-card-hover rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{e.role}</h3>
                  <span className="font-mono text-xs text-primary">{e.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{e.org}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeader kicker="05 / Education" title="Academic background" />
      <div className="grid gap-5 md:grid-cols-3">
        {EDUCATION.map((e, i) => (
          <Reveal key={e.degree} delay={i * 100}>
            <div className="glass-card glass-card-hover h-full rounded-2xl p-6">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-base font-semibold leading-snug">{e.degree}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{e.school}</p>
              <div className="mt-4 flex items-center justify-between font-mono text-xs">
                <span className="text-muted-foreground">{e.period}</span>
                <span className="text-primary">{e.score}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-16">
        <Reveal>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Certifications</h3>
        </Reveal>
        <Reveal delay={100}>
          <div className="glass-card glass-card-hover mt-4 flex items-start gap-4 rounded-2xl p-6">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary/15 text-secondary">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <h4 className="font-display text-base font-semibold">The Joy of Computing Using Python</h4>
              <p className="mt-1 text-sm text-muted-foreground">NPTEL / IIT Madras · October 2023</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSending(true);
    setError(null);
    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.sendForm(
        "service_tue1sei",
        "template_ywy3y3u",
        formRef.current,
        { publicKey: "rmhMGviCzAHhO9zX5" }
      );
      setSent(true);
      formRef.current.reset();
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      console.error(err);
      setError("Failed to send. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-24">
      <SectionHeader kicker="06 / Contact" title="Let's build something" />
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-lg text-muted-foreground">
            Open to internships, collaborations, and full-time opportunities. Reach out — I'll get back to you.
          </p>
          <div className="mt-8 space-y-4">
            <a href="mailto:vyshnavcp2026@gmail.com" className="group flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/40 text-primary transition group-hover:border-primary/60">
                <Mail className="h-5 w-5" />
              </span>
              <span className="font-mono text-sm text-muted-foreground transition group-hover:text-foreground">
                vyshnavcp2026@gmail.com
              </span>
            </a>
            <a href="tel:+917994289652" className="group flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/40 text-primary transition group-hover:border-primary/60">
                <Phone className="h-5 w-5" />
              </span>
              <span className="font-mono text-sm text-muted-foreground transition group-hover:text-foreground">
                +91 79942 89652
              </span>
            </a>
            <a href="https://github.com/Vyshnav-cp" target="_blank" rel="noreferrer" className="group flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/40 text-primary transition group-hover:border-primary/60">
                <Github className="h-5 w-5" />
              </span>
              <span className="font-mono text-sm text-muted-foreground transition group-hover:text-foreground">
                github.com/Vyshnav-cp
              </span>
            </a>
            <a href="https://linkedin.com/in/vyshnav-c-p" target="_blank" rel="noreferrer" className="group flex items-center gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/40 text-primary transition group-hover:border-primary/60">
                <Linkedin className="h-5 w-5" />
              </span>
              <span className="font-mono text-sm text-muted-foreground transition group-hover:text-foreground">
                linkedin.com/in/vyshnav-c-p
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form ref={formRef} onSubmit={onSubmit} className="glass-card rounded-2xl p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Name</label>
                <input
                  required
                  maxLength={100}
                  type="text"
                  name="from_name"
                  className="mt-2 w-full rounded-lg border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  required
                  maxLength={255}
                  type="email"
                  name="reply_to"
                  className="mt-2 w-full rounded-lg border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Message</label>
                <textarea
                  required
                  maxLength={1000}
                  rows={5}
                  name="message"
                  className="mt-2 w-full resize-none rounded-lg border border-border bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell me about your project or opportunity…"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:shadow-[0_0_30px_-5px_var(--primary)]"
              >
                {sending ? "Sending…" : sent ? "Thanks — I'll be in touch!" : (<>Send Message <ArrowRight className="h-4 w-4" /></>)}
              </button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <p className="font-mono text-xs text-muted-foreground">
          Designed & Built by <span className="text-foreground">Vyshnav C P</span> © 2025
        </p>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="https://github.com/Vyshnav-cp" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-primary">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://linkedin.com/in/vyshnav-c-p" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition hover:text-primary">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="mailto:vyshnavcp2026@gmail.com" aria-label="Email" className="transition hover:text-primary">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-primary/40 bg-card/70 text-primary backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

function Loader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="font-display text-2xl font-bold gradient-text">VYSHNAV C P</div>
        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-border">
          <div className="h-full w-1/3 animate-[slide-in-right_0.9s_ease-out_forwards] bg-gradient-to-r from-primary to-secondary" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Page ------------------------------- */

function Portfolio() {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
