"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

export function useSectionInView() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return { ref, inView };
}
