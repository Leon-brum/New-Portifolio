"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSectionInView } from "@/hooks/useSectionInView";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

const projects = [
  {
    id: 1,
    title: "Go AMS",
    description:
      "Plataforma fullstack de automação de processos desenvolvida do zero. Inclui criação de projetos, workflows visuais com ReactFlow, sistema multi-tenant, cadastros PF/PJ e autenticação robusta via AWS Cognito. Automações em tempo real com SSE.",
    tags: ["Next.js", "React", "Sequelize", "MySQL", "DynamoDB", "AWS Cognito", "Lambda", "SSE", "ReactFlow", "Tailwind"],
    category: "fullstack",
    featured: true,
    stars: 0,
    color: "from-[var(--accent-primary)] to-[var(--accent-tertiary)]",
    demo: "https://goams-frontend.fly.dev/LoginPage",
    repo: "#",
  },
  {
    id: 2,
    title: "GoLiveZap",
    description:
      "Plataforma completa de atendimento via WhatsApp com integração à API oficial da Meta. Suporte a lançamento de campanhas, múltiplos atendentes, filas e automações em tempo real com recursos AWS.",
    tags: ["Next.js", "React", "PostgreSQL", "Sequelize", "AWS Cognito", "Real-time", "Tailwind"],
    category: "fullstack",
    featured: true,
    stars: 0,
    color: "from-[var(--accent-secondary)] to-[var(--accent-primary)]",
    demo: "#",
    repo: "#",
  },
  {
    id: 3,
    title: "RH Med — Saúde Mental",
    description:
      "Aplicação para a empresa RH Med com formulários dinâmicos de saúde mental criados pela equipe médica. Colaboradores preenchem avaliações com métricas e dashboards totalmente variáveis conforme a montagem dos formulários.",
    tags: ["Next.js", "React", "SQL Server", "Sequelize", "AWS Cognito", "Tailwind"],
    category: "fullstack",
    featured: false,
    stars: 0,
    color: "from-[var(--accent-tertiary)] to-[var(--accent-primary)]",
    demo: "#",
    repo: "#",
  },
  {
    id: 4,
    title: "BMS RHTech",
    description:
      "Sistema de RH para a empresa BMS com gestão de funcionários, cálculo de folha, pagamentos e demais processos de recursos humanos. Backend e frontend com banco na Azure.",
    tags: ["Next.js", "React", "Azure SQL", "Sequelize", "Tailwind"],
    category: "fullstack",
    featured: false,
    stars: 0,
    color: "from-[var(--accent-primary)] to-[var(--accent-secondary)]",
    demo: "#",
    repo: "#",
  },
  {
    id: 5,
    title: "Documentação Go AMS",
    description:
      "Site de documentação estático do Go AMS, desenvolvido com foco em clareza e navegação fluida. Apresenta guias, referências de API e fluxos da plataforma com design moderno.",
    tags: ["Next.js", "React", "Tailwind", "MDX"],
    category: "frontend",
    featured: false,
    stars: 0,
    color: "from-[var(--accent-secondary)] to-[var(--accent-tertiary)]",
    demo: "#",
    repo: "#",
  },
];

const filters = [
  { value: "todos", label: "Todos" },
  { value: "fullstack", label: "Fullstack" },
  { value: "frontend", label: "Frontend" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  visible: { opacity: 1 },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Projects() {
  const { ref } = useSectionInView();
  const [active, setActive] = useState("todos");

  const filtered = projects.filter((p) => active === "todos" || p.category === active);

  return (
    <section id="projects" className="section">
      <div className="wrapper">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-[var(--accent-secondary)] tracking-widest uppercase">
            03. Projetos
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-secondary)] to-transparent opacity-30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold" style={{ marginBottom: "4rem", marginTop: "1rem" }}>
            O que eu <span className="gradient-text-pink">Construí</span>
          </h2>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap" style={{ marginBottom: "1rem" }}>
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`rounded-lg font-medium transition-all duration-200 ${
                  active === f.value
                    ? "bg-[var(--accent-primary)] text-white"
                    : "glass border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
                style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={card}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                className="glass border border-[var(--border)] rounded-2xl overflow-hidden group hover:border-[var(--accent-primary)] transition-all duration-300 flex flex-col"
              style={{ minHeight: "240px" }}
              >
                {/* Top color bar */}
                <div className={`h-1 bg-gradient-to-r ${project.color}`} />

                <div style={{ padding: "1.5rem 1.75rem" }} className="flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-lg text-[var(--text-primary)] group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                    <span
                      className="text-xs font-mono"
                      style={{ padding: "0.2rem 0.6rem", borderRadius: "6px", background: "rgba(108,99,255,0.12)", color: "var(--accent-primary)", whiteSpace: "nowrap" }}
                    >
                      Corporativo
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs rounded-md font-mono border border-[var(--border)]"
                        style={{ padding: "0.3rem 0.65rem", background: "var(--bg-primary)", color: "var(--text-muted)", lineHeight: "1.4", display: "inline-block" }}
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
                      Código
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 text-xs text-[var(--accent-primary)] hover:text-[var(--accent-tertiary)] transition-colors"
                    >
                      <ExternalLink size={14} />
                      Ver Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-10"
        >
          <a
            href="#"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors font-medium"
          >
            Ver todos os projetos no GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
