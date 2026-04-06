"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs,
  SiTailwindcss, SiPostgresql, SiDocker,
  SiMysql, SiMongodb, SiPrisma, SiSequelize,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const categories = [
  {
    name: "Frontend",
    color: "var(--accent-primary)",
    skills: [
      { name: "React", icon: SiReact, level: 90 },
      { name: "Next.js", icon: SiNextdotjs, level: 88 },
      { name: "TypeScript", icon: SiTypescript, level: 92 },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 85 },
    ],
  },
  {
    name: "Backend & Banco",
    color: "var(--accent-tertiary)",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 88 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 82 },
      { name: "MySQL", icon: SiMysql, level: 80 },
      { name: "MongoDB", icon: SiMongodb, level: 75 },
    ],
  },
  {
    name: "ORMs & DevOps",
    color: "var(--accent-secondary)",
    skills: [
      { name: "Prisma", icon: SiPrisma, level: 88 },
      { name: "Sequelize", icon: SiSequelize, level: 82 },
      { name: "Docker", icon: SiDocker, level: 78 },
      { name: "AWS", icon: FaAws, level: 72 },
    ],
  },
];

const extraTags = [
  "TypeORM", "DynamoDB", "REST APIs", "Git", "GitLab", "CI/CD",
  "Linux", "Vercel", "JWT", "Zod", "React Query", "Redux",
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

interface SkillBarProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  level: number;
  color: string;
  inView: boolean;
}

function SkillBar({ name, icon: Icon, level, color, inView }: SkillBarProps) {
  return (
    <motion.div variants={item} className="group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon size={16} style={{ color }} />
          <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {name}
          </span>
        </div>
        <span className="text-xs text-[var(--text-muted)] font-mono">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, rgba(108,99,255,0.4))` }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section">
      <div className="wrapper">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs font-mono text-[var(--accent-tertiary)] tracking-widest uppercase">
            02. Skills
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-tertiary)] to-transparent opacity-30" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-14"
        >
          Meu Tech <span className="gradient-text">Stack</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={container}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="glass border border-[var(--border)] rounded-2xl transition-all duration-300"
              style={{ "--cat-color": cat.color, padding: "2rem" } as React.CSSProperties}
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <h3 className="font-semibold text-sm tracking-wide" style={{ color: cat.color }}>
                  {cat.name}
                </h3>
              </div>
              <div className="flex flex-col gap-7">
                {cat.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    {...skill}
                    color={cat.color}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-3 justify-center"
        >
          {extraTags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs cursor-default transition-all"
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "9999px",
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                background: "rgba(255,255,255,0.03)",
                display: "inline-block",
                lineHeight: "1.5",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
