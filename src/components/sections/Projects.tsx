"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    description:
      "A modern SaaS platform with real-time collaboration, built with Next.js and WebSockets. Features a drag-and-drop interface and multi-tenant architecture.",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    category: "fullstack",
    featured: true,
    stars: 124,
    color: "from-[var(--accent-primary)] to-[var(--accent-tertiary)]",
    demo: "#",
    repo: "#",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "High-performance e-commerce solution with Stripe integration, inventory management, and an admin dashboard with analytics.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    category: "fullstack",
    featured: true,
    stars: 87,
    color: "from-[var(--accent-secondary)] to-[var(--accent-primary)]",
    demo: "#",
    repo: "#",
  },
  {
    id: 3,
    title: "AI Content Dashboard",
    description:
      "Dashboard that integrates multiple AI APIs to generate, manage and schedule content. Built with a clean, minimal UI.",
    tags: ["React", "Python", "FastAPI", "OpenAI"],
    category: "frontend",
    featured: false,
    stars: 56,
    color: "from-[var(--accent-tertiary)] to-[var(--accent-primary)]",
    demo: "#",
    repo: "#",
  },
  {
    id: 4,
    title: "Dev CLI Tool",
    description:
      "A powerful CLI toolkit for developers that automates common setup tasks, generates boilerplate, and manages project configurations.",
    tags: ["Node.js", "TypeScript", "CLI"],
    category: "backend",
    featured: false,
    stars: 203,
    color: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
    demo: "#",
    repo: "#",
  },
  {
    id: 5,
    title: "Design System",
    description:
      "A comprehensive component library with 60+ components, dark mode support, accessibility-first, and full TypeScript types.",
    tags: ["React", "Storybook", "CSS", "TypeScript"],
    category: "frontend",
    featured: false,
    stars: 312,
    color: "from-[var(--accent-secondary)] to-[var(--accent-tertiary)]",
    demo: "#",
    repo: "#",
  },
  {
    id: 6,
    title: "Real-time Chat App",
    description:
      "End-to-end encrypted messaging app with rooms, file sharing, and presence indicators. Mobile-responsive.",
    tags: ["Next.js", "Socket.io", "Redis", "MongoDB"],
    category: "fullstack",
    featured: false,
    stars: 145,
    color: "from-[var(--accent-tertiary)] to-[var(--accent-secondary)]",
    demo: "#",
    repo: "#",
  },
];

const filters = ["all", "fullstack", "frontend", "backend"];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState("all");

  const filtered = projects.filter((p) => active === "all" || p.category === active);

  return (
    <section id="projects" className="section">
      <div className="wrapper">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-[var(--accent-secondary)] tracking-widest uppercase">
            03. Projects
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-secondary)] to-transparent opacity-30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Things I&apos;ve <span className="gradient-text-pink">Built</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                  active === f
                    ? "bg-[var(--accent-primary)] text-white"
                    : "glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={card}
                layout
                className="glass border border-[var(--border)] rounded-2xl overflow-hidden group hover:border-[var(--accent-primary)] transition-all duration-300 flex flex-col"
              >
                {/* Top color bar */}
                <div className={`h-1 bg-gradient-to-r ${project.color}`} />

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-base text-[var(--text-primary)] group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[var(--text-muted)] text-xs">
                      <Star size={12} className="fill-current text-yellow-500" />
                      <span>{project.stars}</span>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-md bg-[var(--bg-primary)] text-[var(--text-muted)] font-mono border border-[var(--border)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.a
                      href={project.repo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      <FaGithub size={14} />
                      Code
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 text-xs text-[var(--accent-primary)] hover:text-[var(--accent-tertiary)] transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors font-medium"
          >
            View all projects on GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
