"use client";

import { motion, useReducedMotion } from "motion/react";

const W = 600;
const H = 240;
const CY = 120; // vertical center of the vine
const AMP = 12; // was 24, a gentler wave so hanging shirts look believable
const TURNS = 3;

const stemPoint = (t: number) => ({
  x: t * W,
  y: CY + Math.sin(t * TURNS * Math.PI * 2) * AMP,
});

export const stemOffset = (t: number) => Math.sin(t * TURNS * Math.PI * 2) * AMP;
export const VINE_WIDTH = W;
function buildStem(steps = 200) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const p = stemPoint(i / steps);
    d += `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
  }
  return d.trim();
}

type Kind = "flower" | "leaf" | "bud";
type Twig = { t: number; side: 1 | -1; len: number; kind: Kind };

// fixed data (no Math.random, so server and client render identical markup)
const TWIGS: Twig[] = [
  { t: 0.05, side: -1, len: 46, kind: "leaf" },
  { t: 0.1, side: 1, len: 56, kind: "flower" },
  { t: 0.17, side: -1, len: 62, kind: "flower" },
  { t: 0.24, side: 1, len: 48, kind: "bud" },
  { t: 0.31, side: -1, len: 54, kind: "leaf" },
  { t: 0.38, side: 1, len: 62, kind: "flower" },
  { t: 0.45, side: -1, len: 52, kind: "flower" },
  { t: 0.52, side: 1, len: 56, kind: "leaf" },
  { t: 0.59, side: -1, len: 62, kind: "flower" },
  { t: 0.66, side: 1, len: 48, kind: "bud" },
  { t: 0.73, side: -1, len: 56, kind: "flower" },
  { t: 0.8, side: 1, len: 58, kind: "leaf" },
  { t: 0.87, side: -1, len: 50, kind: "flower" },
  { t: 0.94, side: 1, len: 44, kind: "bud" },
];

const STEM_LEAVES = [0.08, 0.21, 0.35, 0.49, 0.63, 0.77, 0.91];

const COLORS = {
  stem: "#6b6240",
  stemLight: "#9b8f62",
  leafA: "#3f7f78",
  leafB: "#5f8f6a",
  leafC: "#86a26a",
  petal: "#f5e8d3",
  petalEdge: "#d8c09a",
  center: "#c9a15a",
};

const LEAF_PATH = "M0 0 C 8 -7, 20 -7, 30 0 C 20 7, 8 7, 0 0 Z";
const PETAL_PATH = "M0 0 C -5 -6, -4 -14, 0 -17 C 4 -14, 5 -6, 0 0 Z";
const CENTER_DOTS = [0, 60, 120, 180, 240, 300].map((a) => {
  const rad = (a * Math.PI) / 180;
  return {
    cx: Math.round(Math.cos(rad) * 5 * 1e6) / 1e6,
    cy: Math.round(Math.sin(rad) * 5 * 1e6) / 1e6,
  };
});

const pop = {
  hidden: { opacity: 0, scale: 0 },
  show: (d: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: d, type: "spring" as const, stiffness: 220, damping: 16 },
  }),
};

function Leaf({ x, y, rot, color, scale = 1, delay }: {
  x: number; y: number; rot: number; color: string; scale?: number; delay: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <motion.g variants={pop} custom={delay} style={{ originX: 0, originY: 0 }}>
        <path d={LEAF_PATH} fill={color} />
        <path d="M2 0 L27 0" stroke="#ffffff" strokeOpacity={0.35} strokeWidth={0.7} />
      </motion.g>
    </g>
  );
}

function Flower({ x, y, rot, delay }: { x: number; y: number; rot: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <motion.g variants={pop} custom={delay} style={{ originX: 0, originY: 0 }}>
        {[0, 72, 144, 216, 288].map((a,i) => (
          <path
            key={i}
            d={PETAL_PATH}
            transform={`rotate(${a})`}
            fill={COLORS.petal}
            stroke={COLORS.petalEdge}
            strokeWidth={0.7}
          />
        ))}
        <circle r={2.6} fill={COLORS.center} />
        {CENTER_DOTS.map((d,i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r={0.7}
            fill="#8a6a2a"
          />
        ))}
      </motion.g>
    </g>
  );
}

function Bud({ x, y, rot, delay }: { x: number; y: number; rot: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <motion.g variants={pop} custom={delay} style={{ originX: 0, originY: 0 }}>
        <path
          d="M0 0 C 3 -3, 10 -3, 13 0 C 10 3, 3 3, 0 0 Z"
          fill="#e9d7b6"
          stroke={COLORS.petalEdge}
          strokeWidth={0.7}
        />
        <path d="M0 0 C 2 -2, 4 -2, 6 0 C 4 2, 2 2, 0 0 Z" fill="#7a8f5a" />
      </motion.g>
    </g>
  );
}

export default function BranchWithVine() {
  const reduce = useReducedMotion();
  const GROW = reduce ? 0 : 3; // seconds for the stem to grow across
  const stemD = buildStem();

  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{  overflow: "visible" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      role="img"
      aria-label="Flowering vine"
     
    >
      {/* TWIGS: behind the stem, each ends in a flower, bud or leaf */}
      {TWIGS.map((tw, i) => {
        const s = stemPoint(tw.t);
        const angle = (tw.side * (38 + (i % 3) * 9) * Math.PI) / 180;
        const dx = Math.sin(angle) * tw.len;
        const dy = -Math.cos(angle) * tw.len * tw.side; // up for side 1, down for side -1
        const end = { x: s.x + dx, y: s.y + dy };
        const ctrl = { x: s.x + dx * 0.2, y: s.y + dy * 0.9 };
        const mid = { x: s.x + dx * 0.55, y: s.y + dy * 0.55 };
        const tipRot = (Math.atan2(end.y - ctrl.y, end.x - ctrl.x) * 180) / Math.PI;
        const delay = reduce ? 0 : tw.t * GROW + 0.25;
        const tipDelay = delay + 0.5;
        const leafColor = [COLORS.leafA, COLORS.leafB, COLORS.leafC][i % 3];

        return (
          <g key={i}>
            <motion.path
              d={`M${s.x} ${s.y} Q${ctrl.x} ${ctrl.y} ${end.x} ${end.y}`}
              fill="none"
              stroke={COLORS.stem}
              strokeWidth={2}
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0 },
                show: { pathLength: 1, transition: { delay, duration: reduce ? 0 : 0.8, ease: "easeOut" } },
              }}
            />
            <Leaf
              x={mid.x}
              y={mid.y}
              rot={tipRot - tw.side * 55}
              color={leafColor}
              scale={0.55}
              delay={tipDelay - 0.2}
            />
            {tw.kind === "flower" && <Flower x={end.x} y={end.y} rot={tw.side * 20} delay={tipDelay} />}
            {tw.kind === "bud" && <Bud x={end.x} y={end.y} rot={tipRot} delay={tipDelay} />}
            {tw.kind === "leaf" && (
              <Leaf x={end.x} y={end.y} rot={tipRot} color={leafColor} scale={0.9} delay={tipDelay} />
            )}
          </g>
        );
      })}

      {/* leaves sitting directly on the vine stem */}
      {STEM_LEAVES.map((t, i) => {
        const p = stemPoint(t);
        const side = i % 2 ? 1 : -1;
        return (
          <Leaf
            key={`sl-${i}`}
            x={p.x}
            y={p.y}
            rot={side * 40}
            color={i % 2 ? COLORS.leafA : COLORS.leafB}
            scale={1}
            delay={reduce ? 0 : t * GROW + 0.4}
          />
        );
      })}

      {/* the vine stem: olive body plus a thin highlight */}
      <motion.path
        d={stemD}
        fill="none"
        stroke={COLORS.stem}
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: GROW, ease: "easeInOut" } },
        }}
      />
      <motion.path
        d={stemD}
        fill="none"
        stroke={COLORS.stemLight}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.8}
        transform="translate(0 -1)"
        variants={{
          hidden: { pathLength: 0 },
          show: { pathLength: 1, transition: { duration: GROW, ease: "easeInOut" } },
        }}
      />
    </motion.svg>
  );
}