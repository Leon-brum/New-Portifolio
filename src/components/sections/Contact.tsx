"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaGitlab } from "react-icons/fa6";

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/Leonardo", handle: "github.com/Leonardo" },
  { icon: FaGitlab, label: "GitLab", href: "#", handle: "GitLab Corporativo" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/leonardo", handle: "linkedin.com/in/leonardo" },
  { icon: Mail, label: "Email", href: "mailto:leonardo@email.com", handle: "leonardo@email.com" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section">
      <div className="wrapper">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="text-xs font-mono text-[var(--accent-secondary)] tracking-widest uppercase">
            05. Contato
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent-secondary)] to-transparent opacity-30" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Vamos <span className="gradient-text-pink">Trabalhar Juntos</span>
          </h2>
          <p className="text-[var(--text-muted)] text-base" style={{ maxWidth: "32rem", margin: "0 auto" }}>
            Tem um projeto em mente ou quer trocar uma ideia? Minha caixa de entrada está aberta.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass border border-[var(--border)] rounded-2xl p-8 flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-[var(--text-muted)] font-medium">Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-[var(--text-muted)] font-medium">Email</label>
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-[var(--text-muted)] font-medium">Mensagem</label>
              <textarea
                required
                rows={5}
                placeholder="Me conta sobre o projeto..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-tertiary)] text-white font-semibold text-sm shadow-lg hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300"
            >
              {sent ? "Mensagem enviada! ✓" : <><Send size={16} /> Enviar Mensagem</>}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="glass border border-[var(--border)] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin size={18} className="text-[var(--accent-primary)]" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">Localização</span>
              </div>
              <p className="text-[var(--text-muted)] text-sm pl-7">Brasil</p>
            </div>

            <div className="glass border border-[var(--border)] rounded-2xl p-6">
              <p className="text-xs text-[var(--text-muted)] mb-4 uppercase tracking-wider font-medium">
                Me encontre em
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(({ icon: Icon, label, href, handle }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg glass border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent-primary)] transition-all duration-200">
                      <Icon size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        {handle}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="glass border border-emerald-500/20 rounded-2xl p-5 bg-emerald-500/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">Disponível para trabalhar</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Aberto a projetos freelance e oportunidades full-time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
