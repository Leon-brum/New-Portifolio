"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Clock, Briefcase, Rocket } from "lucide-react";

const stats = [
  { icon: Code2, value: "2+", label: "Anos de Experiência" },
  { icon: Briefcase, value: "Go Live", label: "Empresa Atual" },
  { icon: Clock, value: "Full", label: "Stack Developer" },
  { icon: Rocket, value: "∞", label: "Vontade de Aprender" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section">
      <div className="wrapper">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="text-xs font-mono text-[var(--accent-primary)] tracking-widest uppercase">
            01. Sobre mim
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-primary)] to-transparent opacity-30" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.h2 variants={item} className="text-4xl md:text-5xl font-bold mb-8">
              Construindo coisas{" "}
              <span className="gradient-text">que fazem sentido</span>
            </motion.h2>

            <motion.p variants={item} className="text-[var(--text-secondary)] leading-relaxed mb-5">
              Sou um desenvolvedor Full Stack com quase 2 anos de experiência, trabalhando
              atualmente na <span className="text-[var(--accent-primary)] font-medium">Go Live Tech</span>.
              Gosto de entregar código limpo, bem estruturado e com tipagem forte — TypeScript é
              praticamente obrigatório nos meus projetos.
            </motion.p>

            <motion.p variants={item} className="text-[var(--text-secondary)] leading-relaxed mb-10">
              Tenho experiência com toda a stack — desde modelagem de banco de dados relacionais e
              NoSQL, passando por APIs REST, até interfaces modernas com React e Next.js. Também
              cuido de deploys com Docker e AWS quando necessário.
              A maioria dos meus projetos vive no GitLab corporativo da empresa, mas em breve
              chegarão projetos pessoais por aí.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-2">
              {["Curioso", "Detalhista", "Colaborativo", "Focado em qualidade"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-xs rounded-full border border-[var(--border)] text-[var(--text-secondary)] font-medium"
                  style={{ background: "rgba(108,99,255,0.08)" }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div
                key={label}
                variants={item}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass border border-[var(--border)] rounded-2xl hover:border-[var(--accent-primary)] transition-all duration-300 group"
                style={{ padding: "1.25rem" }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(108,99,255,0.12)" }}
                  >
                    <Icon size={16} style={{ color: "var(--accent-primary)" }} />
                  </div>
                  <p className="text-xl font-bold gradient-text leading-none">{value}</p>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-snug pl-11">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
