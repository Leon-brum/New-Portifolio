"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10">
      <div className="wrapper">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="text-lg font-bold gradient-text font-mono">
            {"<dev />"}
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
            Built with{" "}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart size={12} className="text-[var(--accent-secondary)] fill-current" />
            </motion.span>{" "}
            using Next.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
