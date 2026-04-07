"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSectionInView } from "@/hooks/useSectionInView";
import { Mail, MapPin, Send, Heart } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/Leon-brum", handle: "github.com/Leon-brum" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/leonardo-moreno-b8015a294/", handle: "linkedin.com/in/leonardo-moreno" },
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/leo_of_cinder/", handle: "@leo_of_cinder" },
  { icon: Mail, label: "Email", href: "mailto:leu-profissional@hotmail.com", handle: "leu-profissional@hotmail.com" },
];

export default function Contact() {
  const { ref, inView } = useSectionInView();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="section" style={{ display: "flex", flexDirection: "column" }}>
      <div className="wrapper" style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ marginBottom: "2rem", marginTop: "1rem" }}>
            Vamos <span className="gradient-text-pink">Trabalhar Juntos</span>
          </h2>
          <p className="text-[var(--text-muted)] text-base" style={{ maxWidth: "32rem", margin: "0 auto", marginBottom: "1rem" }}>
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
            className="glass border border-[var(--border)] rounded-2xl flex flex-col"
            style={{ padding: "2rem", gap: "1.5rem", height: "100%" }}
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
                  className="text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,99,255,0.15)", padding: "0.75rem 1rem" }}
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
                  className="text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,99,255,0.15)", padding: "0.75rem 1rem" }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2" style={{ flexGrow: 1 }}>
              <label className="text-xs text-[var(--text-muted)] font-medium">Mensagem</label>
              <textarea
                required
                placeholder="Me conta sobre o projeto..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors resize-none rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(108,99,255,0.15)", padding: "0.75rem 1rem", flexGrow: 1 }}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-tertiary)] text-white font-semibold text-sm shadow-lg hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all duration-300"
              style={{ padding: "0.875rem", cursor: "pointer" }}
            >
              {sent ? "Mensagem enviada! ✓" : <><Send size={16} /> Enviar Mensagem</>}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ gap: "1.25rem" }}
            className="flex flex-col"
          >
            <div className="glass border border-[var(--border)] rounded-2xl" style={{ padding: "1rem 1.5rem" }}>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-[var(--accent-primary)]" />
                <span className="text-sm font-medium text-[var(--text-secondary)]">Localização</span>
                <span className="text-sm text-[var(--text-muted)]">— Brasil</span>
              </div>
            </div>

            <div className="glass border border-[var(--border)] rounded-2xl" style={{ padding: "1.5rem" }}>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium" style={{ marginBottom: "1rem" }}>
                Me encontre em
              </p>
              <div className="flex flex-col" style={{ gap: "1rem" }}>
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

          </motion.div>
        </div>

        {/* Available badge — full width below both columns */}
        <div
          className="glass border border-emerald-500/20 rounded-2xl bg-emerald-500/5"
          style={{ padding: "1rem 1.5rem", marginTop: "1.25rem" }}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-sm font-medium text-emerald-400">Disponível para trabalhar</span>
            <span className="text-xs text-[var(--text-muted)]">— Aberto a projetos freelance e oportunidades full-time.</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ width: "100%", borderTop: "1px solid var(--border)", padding: "1.5rem clamp(1.25rem, 5vw, 4rem)" }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4" style={{ maxWidth: "1152px", margin: "0 auto" }}>
          <a href="#" className="text-lg font-bold gradient-text font-mono">{"<dev />"}</a>
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {["#about","#skills","#projects","#experience","#contact"].map((href) => (
              <a key={href} href={href} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors capitalize">
                {href.replace("#","")}
              </a>
            ))}
          </nav>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
            Built with{" "}
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Heart size={12} style={{ color: "var(--accent-secondary)" }} className="fill-current" />
            </motion.span>{" "}
            using Next.js & Framer Motion
          </p>
        </div>
      </div>
    </section>
  );
}
