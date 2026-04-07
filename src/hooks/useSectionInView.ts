"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

export function useSectionInView() {
  const ref = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // once: false no desktop (scroll snap repete), once: true no mobile
  const inView = useInView(ref, { once: !isDesktop, margin: "-20%" });

  return { ref, inView };
}
