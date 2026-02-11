import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = [
  { year: 1972, value: 35, info: "Шинжлэх ухаан, техникийн мэдээллийн төв" },
  { year: 1997, value: 40, info: "Шинжлэх ухаан, техникийн мэдээллийн төв” корпораци" },
  { year: 2002, value: 34, info: "Мэдээллийн технологийн үндэсний парк" },
  { year: 2003, value: 25, info: "АНХНЫ ИНКУБАТОР" },
  { year: 2006, value: 35, info: "МЭДЭЭЛЛИЙН ТЕХНОЛОГИЙН ИНЖЕНЕРИЙН ШАЛГАЛТ" },
  { year: 2013, value: 52, info: "COWORKING SPACE" },
  { year: 2014, value: 62, info: "СИЛИКОН ХАУС ТӨСӨЛ, ICDL ШАЛГАЛТ" },
  { year: 2021, value: 78, info: "“ЭНТРЕПРЕНЁР” ХӨТӨЛБӨР, IDEA HUB, АХИСАН ТҮВШНИЙ ИНКУБАТОР" },
  { year: 2025, value: 95, info: "Virtual Zone, “ӨРГӨӨ 2” ГАРАВ, Techweek" },
];

const W = 1000;
const H = 420;
const PAD_X = 80;
const PAD_Y = 70;

const Roadmap = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const points = useMemo(() => {
    return DATA.map((d, i) => ({
      x: PAD_X + (i * (W - PAD_X * 2)) / (DATA.length - 1),
      y: H - (PAD_Y + (d.value * (H - PAD_Y * 2)) / 100),
      ...d,
    }));
  }, []);

  const pathD = useMemo(() => {
    return points.reduce((acc, p, i, arr) => {
      if (i === 0) return `M ${p.x},${p.y}`;
      const prev = arr[i - 1];
      const cx = (prev.x + p.x) / 2;
      return `${acc} C ${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
    }, '');
  }, [points]);

  return (
    <div className="relative w-full bg-[#03065d] py-24 md:py-32 overflow-hidden">
      <section id="roadmap" className="itp-roadmap-section overflow-visible">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8 relative">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-16 md:mb-20 text-center tracking-tight">
          Байгууллагын түүхэн замнал
        </h2>

        <div className="relative min-h-[420px] md:min-h-[480px]">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto overflow-visible pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="50%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Light vertical grid lines */}
            {points.map((p, i) => (
              <line
                key={`grid-${i}`}
                x1={p.x}
                y1={PAD_Y - 10}
                x2={p.x}
                y2={H - PAD_Y + 10}
                stroke="rgba(255,255,255,0.08)"
                strokeDasharray="5 7"
              />
            ))}

            {/* Main animated path */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.2, ease: 'easeOut' }}
            />

            {/* Points + interaction */}
            {points.map((p, i) => (
              <g
                key={i}
                className="pointer-events-auto"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(i)}
                onBlur={() => setHoveredIndex(null)}
                tabIndex={0}
                role="button"
                aria-label={`${p.year} он - ${p.info}`}
              >
                {/* Larger invisible hit area */}
                <circle cx={p.x} cy={p.y} r={28} fill="transparent" />

                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === i ? 12 : 8}
                  fill={hoveredIndex === i ? '#ffffff' : '#ec4899'}
                  stroke="#ffffff"
                  strokeWidth={hoveredIndex === i ? 4 : 3}
                  filter={hoveredIndex === i ? 'url(#glow)' : undefined}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />

                <text
                  x={p.x}
                  y={H - 12}
                  textAnchor="middle"
                  fill={hoveredIndex === i ? '#ffffff' : 'rgba(255,255,255,0.65)'}
                  fontSize="18"
                  fontWeight="700"
                  className="transition-all duration-200"
                >
                  {p.year}
                </text>
              </g>
            ))}
          </svg>

          {/* Popup tooltip */}
          <AnimatePresence>
            {hoveredIndex !== null && (
              <motion.div
                key={hoveredIndex}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 20 }}
                transition={{ duration: 0.25 }}
                className="absolute z-50 pointer-events-none"
                style={{
                  left: `${Math.max(18, Math.min(82, (points[hoveredIndex].x / W) * 100))}%`,
                  top: `${Math.max(0, (points[hoveredIndex].y / H) * 100 - 18)}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="bg-white/98 backdrop-blur-sm px-6 py-5 rounded-2xl shadow-2xl border-l-8 border-pink-500 min-w-[280px] max-w-[340px] text-slate-900">
                  <div className="text-pink-600 font-black text-3xl mb-2 tracking-tight">
                    {points[hoveredIndex].year}
                  </div>
                  <div className="text-base font-medium leading-relaxed">
                    {points[hoveredIndex].info}
                  </div>
                </div>

                {/* Arrow using pseudo element */}
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-5 h-5 bg-white rotate-45 shadow-xl border-b border-r border-slate-200/80" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Roadmap;