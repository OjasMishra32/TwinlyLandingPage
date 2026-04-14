import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function IntroReveal() {
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const already = sessionStorage.getItem("twinly-intro-shown") === "1";
    if (prefersReduced || already) {
      setDone(true);
      return;
    }
    sessionStorage.setItem("twinly-intro-shown", "1");
    const t = window.setTimeout(() => setDone(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.1, delay: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 origin-bottom bg-background"
            style={{ height: "50%" }}
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.1, delay: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-0 origin-top bg-background"
            style={{ height: "50%" }}
          />

          <div className="relative flex items-center gap-5">
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 22 22"
              fill="none"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <defs>
                <linearGradient id="intro-mark" x1="0" y1="0" x2="22" y2="22">
                  <stop stopColor="hsl(170 90% 70%)" />
                  <stop offset="1" stopColor="hsl(260 90% 78%)" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="11" cy="11" r="9"
                stroke="url(#intro-mark)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.circle
                cx="11" cy="7" r="2.5"
                fill="url(#intro-mark)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.circle
                cx="11" cy="15" r="2.5"
                stroke="url(#intro-mark)"
                strokeWidth="1.5"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.75 }}
              />
            </motion.svg>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif-accent text-[38px] leading-none tracking-tight"
            >
              twinly
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            Booting your operator
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
