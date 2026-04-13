"use client";

import { useEffect, useRef } from "react";

const SECTIONS = ["#hero", "#about", "#skills", "#projects", "#experience", "#contact"];

export default function ScrollSnap() {
  const isSnapping = useRef(false);

  useEffect(() => {
    const STYLE_ID = "scroll-snap-styles";

    const isSnapScreen = () => window.innerWidth >= 1024 && window.innerHeight >= 1080;

    const injectCSS = () => {
      if (document.getElementById(STYLE_ID)) return;
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        html { scroll-behavior: auto !important; overflow: hidden; }
        body { overflow: hidden; }
        #hero, #about, #skills, #projects, #experience { height: 100dvh; display: flex; flex-direction: column; justify-content: center; }
        #contact { height: 100dvh; display: flex; flex-direction: column; }
      `;
      document.head.appendChild(style);
    };

    const removeCSS = () => {
      document.getElementById(STYLE_ID)?.remove();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };

    const getClosestIndex = () => {
      const els = SECTIONS.map((s) => document.querySelector(s) as HTMLElement | null);
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      els.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2 - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };

    const snapTo = (index: number) => {
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, index));
      const el = document.querySelector(SECTIONS[clamped]);
      if (!el) return;
      isSnapping.current = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isSnapping.current = false; }, 900);
    };

    const onWheel = (e: WheelEvent) => {
      if (!isSnapScreen()) return;
      e.preventDefault();
      if (isSnapping.current) return;
      const current = getClosestIndex();
      if (e.deltaY > 0) snapTo(current + 1);
      else snapTo(current - 1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!isSnapScreen()) return;
      if (isSnapping.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); snapTo(getClosestIndex() + 1); }
      if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); snapTo(getClosestIndex() - 1); }
    };

    const onResize = () => {
      if (isSnapScreen()) {
        injectCSS();
      } else {
        removeCSS();
        isSnapping.current = false;
      }
    };

    // Init
    if (isSnapScreen()) {
      injectCSS();
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      removeCSS();
    };
  }, []);

  return null;
}
