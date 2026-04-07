"use client";

import { useEffect, useRef, useState } from "react";

const SECTIONS = ["#hero", "#about", "#skills", "#projects", "#experience", "#contact"];

export default function ScrollSnap() {
  const [isDesktop, setIsDesktop] = useState(false);
  const isSnapping = useRef(false);
  const currentIndex = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      // Garante que o mobile sempre tem scroll livre
      document.getElementById("scroll-snap-styles")?.remove();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }

    // Make sections full-height on desktop
    const style = document.createElement("style");
    style.id = "scroll-snap-styles";
    style.textContent = `
      html { scroll-behavior: auto !important; overflow: hidden; }
      body { overflow: hidden; }
      section { min-height: 100dvh; }
      section:not(#contact) { display: flex; flex-direction: column; justify-content: center; }
    `;
    document.head.appendChild(style);

    const getIndex = () => {
      const els = SECTIONS.map((s) => document.querySelector(s));
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      els.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };

    const snapTo = (index: number) => {
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));
      const el = document.querySelector(SECTIONS[clamped]);
      if (!el) return;
      currentIndex.current = clamped;
      isSnapping.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isSnapping.current = false; }, 800);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isSnapping.current) return;
      currentIndex.current = getIndex();
      if (e.deltaY > 0) snapTo(currentIndex.current + 1);
      else snapTo(currentIndex.current - 1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (isSnapping.current) return;
      currentIndex.current = getIndex();
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); snapTo(currentIndex.current + 1); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); snapTo(currentIndex.current - 1); }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.getElementById("scroll-snap-styles")?.remove();
    };
  }, [isDesktop]);

  return null;
}
