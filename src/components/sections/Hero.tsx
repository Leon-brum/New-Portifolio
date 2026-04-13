"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Image from "next/image";

const ROLES = [
  "Full Stack Developer",
  "React & Next.js Dev",
  "TypeScript Enthusiast",
  "Node.js & AWS Builder",
];

const PARTICLES_COUNT = 60;

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: PARTICLES_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 99, 255, ${p.alpha})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function TypewriterText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1500);
      return () => clearTimeout(t);
    }

    const current = ROLES[roleIndex];

    if (!deleting && displayed === current) {
      setPause(true);
      setTimeout(() => setDeleting(true), 1500);
      return;
    }

    if (deleting && displayed === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
      return;
    }

    const speed = deleting ? 40 : 80;
    const t = setTimeout(() => {
      setDisplayed(
        deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIndex, pause]);

  return (
    <span className="gradient-text font-mono">
      {displayed}
      <span className="cursor-blink text-[var(--accent-primary)]">|</span>
    </span>
  );
}

const socials = [
  { icon: FaGithub, href: "https://github.com/Leon-brum", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/leonardo-moreno-b8015a294/", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://www.instagram.com/leo_of_cinder/", label: "Instagram" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ paddingTop: "5rem" }}>
      <Particles />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[var(--accent-primary)] opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[var(--accent-tertiary)] opacity-5 blur-3xl pointer-events-none" />

      <div className="wrapper relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full text-xs text-[var(--text-secondary)] mb-6 relative overflow-hidden"
              style={{
                padding: "0.4rem 1.1rem",
                background: "var(--bg-card)",
                border: "1px solid transparent",
                backgroundClip: "padding-box",
              }}
            >
              {/* Animated border */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(var(--bg-card), var(--bg-card)) padding-box, linear-gradient(90deg, var(--accent-primary), var(--accent-tertiary), var(--accent-secondary), var(--accent-primary)) border-box",
                  border: "1px solid transparent",
                  animation: "border-spin 3s linear infinite",
                }}
              />
              <span className="w-2 h-2 rounded-full bg-emerald-400 relative z-10" style={{ flexShrink: 0 }} />
              <span className="relative z-10">Open to new opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-5"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Leonardo</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-2xl md:text-3xl font-medium text-[var(--text-secondary)] h-10"
              style={{ marginBottom: "2.5rem" }}
            >
              <TypewriterText />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed"
              style={{ maxWidth: "32rem", marginBottom: "3rem" }}
            >
              Full Stack Developer com quase 2 anos de experiência, apaixonado por construir
              aplicações modernas, escaláveis e bem tipadas — do banco de dados à interface.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
              style={{ marginBottom: "2.5rem" }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.875rem 2.5rem",
                  borderRadius: "0.75rem",
                  background: "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 24px rgba(108,99,255,0.3)",
                  transition: "all 0.3s",
                }}
              >
                Ver Projetos
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.875rem 2.5rem",
                  borderRadius: "0.75rem",
                  border: "1.5px solid var(--border)",
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                  background: "var(--bg-card)",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.3s",
                }}
              >
                Entrar em Contato
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl glass border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative flex-shrink-0"
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "110%",
                height: "110%",
                borderRadius: "50%",
                background: "radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)",
                opacity: 0.25,
                filter: "blur(24px)",
                pointerEvents: "none",
              }}
            />
            {/* Border gradient */}
            <div
              className="relative p-1 rounded-full"
              style={{ background: "linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))" }}
            >
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden bg-[var(--bg-card)]">
                <Image
                  src="/minha_foto.jpeg"
                  alt="Leonardo — Full Stack Developer"
                  width={288}
                  height={288}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-3 -right-3 glass border border-[var(--border)] rounded-xl font-mono text-[var(--accent-tertiary)]"
              style={{ padding: "0.5rem 0.875rem", fontSize: "0.75rem", whiteSpace: "nowrap" }}
            >
              {"</> Full Stack"}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] text-xs"
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
