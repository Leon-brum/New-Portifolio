"use client";

import { useSectionInView } from "@/hooks/useSectionInView";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    type: "work",
    role: "Full Stack Developer",
    company: "Go Live Tech",
    period: "2023 — Presente",
    description:
      "Desenvolvimento de aplicações web completas — desde a modelagem do banco de dados até a interface do usuário. Trabalho com TypeScript em toda a stack, utilizando React/Next.js no front e Node.js no back, com deploys via Docker e AWS.",
    tags: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS"],
  },
];

const highlights = [
  { label: "ORMs utilizados", value: "Prisma · Sequelize · TypeORM" },
  { label: "Bancos de dados", value: "PostgreSQL · MySQL · MongoDB · DynamoDB" },
  { label: "Frontend", value: "React · Next.js · Tailwind · diversas libs de UI" },
  { label: "DevOps & Cloud", value: "Docker · AWS · CI/CD · deploy em qualquer ambiente" },
];

export default function Experience() {
  
  const { ref, inView } = useSectionInView();

  return (
    <section id="experience" className="section">
      <div className="wrapper" style={{ maxWidth: "56rem" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
            04. Experiência
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-primary)] to-transparent opacity-30" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-12"
          style={{ marginBottom: "3rem", marginTop: "1rem" }}
        >
          Onde <span className="gradient-text">Trabalhei</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-primary)] via-[var(--accent-tertiary)] to-transparent opacity-20" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="relative pl-14 group"
              >
                <div className="absolute left-0 top-0 w-10 h-10 rounded-xl glass border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent-primary)] transition-all duration-300">
                  <Briefcase size={16} className="text-[var(--accent-primary)]" />
                </div>

                <div className="glass border border-[var(--border)] rounded-2xl group-hover:border-[var(--accent-primary)] transition-all duration-300" style={{ padding: "1.75rem 2rem" }}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2" style={{ marginBottom: "1rem" }}>
                    <div>
                      <h3 className="font-bold text-lg text-[var(--text-primary)]">{exp.role}</h3>
                      <p className="text-[var(--accent-primary)] text-sm font-medium" style={{ marginTop: "0.25rem" }}>{exp.company}</p>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] font-mono whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed" style={{ marginBottom: "1.25rem" }}>
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs rounded-md bg-[var(--bg-primary)] text-[var(--text-muted)] font-mono border border-[var(--border)]"
                        style={{ padding: "0.3rem 0.65rem" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlights grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{ marginTop: "2.5rem", gap: "1rem" }}
          className="grid sm:grid-cols-2"
        >
          {highlights.map(({ label, value }) => (
            <div
              key={label}
              className="glass border border-[var(--border)] rounded-xl hover:border-[var(--accent-primary)] transition-all duration-300 group"
              style={{ padding: "1.25rem 1.5rem" }}
            >
              <p className="text-xs text-[var(--text-muted)] font-mono group-hover:text-[var(--accent-primary)] transition-colors" style={{ marginBottom: "0.5rem" }}>
                {label}
              </p>
              <p className="text-sm text-[var(--text-secondary)] font-medium">{value}</p>
            </div>
          ))}
        </motion.div>

        {/* Note about GitLab */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-center text-xs text-[var(--text-muted)] font-mono"
        >
          A maioria dos projetos está no GitLab corporativo da empresa.{" "}
          <span className="text-[var(--accent-primary)]">Projetos pessoais em breve.</span>
        </motion.p>
      </div>
    </section>
  );
}
