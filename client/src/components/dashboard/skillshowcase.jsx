import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Database,
  Layout,
  Server,
  Cloud,
  GitBranch,
  Users,
  MessageSquare,
  Lightbulb,
  BrainCircuit,
  Clock,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Configuration ---
const TECHNICAL_SKILLS = [
  {
    category: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    category: "Backend",
    icon: Server,
    skills: ["Node.js", "Express", "Python", "GraphQL", "REST APIs"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    category: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    category: "DevOps",
    icon: Cloud,
    skills: ["Docker", "AWS", "CI/CD", "Vercel", "Git"],
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  }
];

const SOFT_SKILLS = [
  { id: 1, label: "Problem Solving", icon: BrainCircuit, x: 10, y: 20, delay: 0 },
  { id: 2, label: "Communication", icon: MessageSquare, x: 80, y: 15, delay: 0.5 },
  { id: 3, label: "Leadership", icon: Users, x: 85, y: 70, delay: 1 },
  { id: 4, label: "Creativity", icon: Lightbulb, x: 15, y: 80, delay: 1.5 },
  { id: 5, label: "Time Management", icon: Clock, x: 50, y: 5, delay: 0.8 },
  { id: 6, label: "Adaptability", icon: Target, x: 50, y: 90, delay: 1.2 },
];

// --- Sub-Components ---

const TechCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border p-6 transition-all duration-300 hover:shadow-2xl",
        category.border
      )}
    >
      {/* Hover Glow */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-transparent via-transparent to-white/5",
        category.bg.replace('/10', '/5')
      )} />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={cn("p-3 rounded-2xl", category.bg, category.color)}>
            <category.icon className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{category.category}</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <span
              key={i}
              className={cn(
                "text-xs font-medium px-3 py-1.5 rounded-full border bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 transition-colors",
                "group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:border-slate-200 dark:group-hover:border-slate-700"
              )}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const SoftSkillNode = ({ skill }) => {
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-2"
      style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: skill.delay * 0.2, type: "spring" }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="relative group cursor-pointer">
        <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg group-hover:border-emerald-500/50 transition-colors">
          <skill.icon className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-emerald-500 transition-colors" />
        </div>
      </div>
      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-1 rounded-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
        {skill.label}
      </span>
    </motion.div>
  );
};

export default function SkillsShowcase() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="relative w-full py-24 overflow-hidden">

      {/* --- Background Decoration --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/5 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">&</span> Soft Skills
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              A comprehensive overview of my technical expertise and interpersonal abilities.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* --- Left: Technical Grid --- */}
          <div className="grid sm:grid-cols-2 gap-4 relative">
            {TECHNICAL_SKILLS.map((category, index) => (
              <TechCard key={index} category={category} index={index} />
            ))}

            {/* Center Connector (Visual) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-3xl -z-10" />
          </div>

          {/* --- Right: Soft Skills Network --- */}
          <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">

            {/* Central Hub */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative z-20 w-24 h-24 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center shadow-2xl"
            >
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20" />
              <div className="text-white dark:text-slate-900 font-black text-xl tracking-tight">Core</div>
            </motion.div>

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="lineGradient" x1="50%" y1="50%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="currentColor" className="text-slate-300 dark:text-slate-700" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              {SOFT_SKILLS.map((skill, i) => (
                <motion.line
                  key={i}
                  x1="50%" y1="50%"
                  x2={`${skill.x}%`} y2={`${skill.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                />
              ))}
            </svg>

            {/* Skill Nodes */}
            {SOFT_SKILLS.map((skill) => (
              <SoftSkillNode key={skill.id} skill={skill} />
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}