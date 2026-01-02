import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic, BookOpen, PenTool, Headphones,
    ChevronRight, Star, Zap, TrendingUp, Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// --- Configuration ---
const SKILL_DATA = [
    {
        id: 'speaking',
        title: 'Speaking',
        level: 'C1',
        score: 88,
        icon: Mic,
        color: 'emerald',
        gradient: 'from-emerald-500 to-teal-500',
        subSkills: [
            { label: 'Pronunciation', value: 92 },
            { label: 'Fluency', value: 85 },
            { label: 'Intonation', value: 78 },
        ]
    },
    {
        id: 'listening',
        title: 'Listening',
        level: 'B2',
        score: 74,
        icon: Headphones,
        color: 'blue',
        gradient: 'from-blue-500 to-indigo-500',
        subSkills: [
            { label: 'Comprehension', value: 80 },
            { label: 'Accents', value: 65 },
            { label: 'Speed', value: 75 },
        ]
    },
    {
        id: 'writing',
        title: 'Writing',
        level: 'B2',
        score: 69,
        icon: PenTool,
        color: 'purple',
        gradient: 'from-purple-500 to-pink-500',
        subSkills: [
            { label: 'Grammar', value: 72 },
            { label: 'Vocabulary', value: 68 },
            { label: 'Structure', value: 65 },
        ]
    },
    {
        id: 'reading',
        title: 'Reading',
        level: 'C1',
        score: 91,
        icon: BookOpen,
        color: 'amber',
        gradient: 'from-amber-500 to-orange-500',
        subSkills: [
            { label: 'Speed', value: 95 },
            { label: 'Retention', value: 88 },
            { label: 'Analysis', value: 90 },
        ]
    }
];

// --- Sub-Components ---

const CircularProgress = ({ value, color, size = 60, strokeWidth = 4 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Circle */}
            <svg className="absolute inset-0 transform -rotate-90 w-full h-full">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    className="text-slate-100 dark:text-slate-800"
                />
                {/* Progress Circle */}
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    className={cn("text-current", `text-${color}-500`)} // Note: Ensure dynamic colors are safelisted or mapped
                    style={{ color: `var(--${color}-500)` }} // Fallback/alternative if using CSS variables
                />
            </svg>
            {/* Center Text */}
            <div className="absolute flex flex-col items-center">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{value}%</span>
            </div>
        </div>
    );
};

const SkillCard = ({ skill, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative h-full"
        >
            <div className={cn(
                "group relative h-full overflow-hidden rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 transition-all duration-500",
                "hover:shadow-2xl hover:-translate-y-1 hover:border-opacity-50",
                // Dynamic border color based on skill
                `hover:border-${skill.color}-500/30`
            )}>

                {/* Background Glow */}
                <div className={cn(
                    "absolute top-0 right-0 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                    `bg-${skill.color}-500/20`
                )} />

                <div className="relative z-10 p-6 flex flex-col h-full">

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div className={cn(
                            "p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110 shadow-sm",
                            `bg-${skill.color}-100 dark:bg-${skill.color}-900/20`,
                            `text-${skill.color}-600 dark:text-${skill.color}-400`
                        )}>
                            <skill.icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <Badge variant="outline" className="font-mono text-xs border-slate-200 dark:border-slate-700">
                            {skill.level}
                        </Badge>
                    </div>

                    {/* Main Info */}
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{skill.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                                <TrendingUp className="w-3 h-3" /> Top 15%
                            </p>
                        </div>
                        <div className={cn(`text-${skill.color}-500`)}>
                            <CircularProgress value={skill.score} color={skill.color} />
                        </div>
                    </div>

                    {/* Expandable Sub-skills */}
                    <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
                        <div className="space-y-3">
                            {skill.subSkills.map((sub, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 dark:text-slate-400 font-medium">{sub.label}</span>
                                        <span className="text-slate-900 dark:text-white font-bold">{sub.value}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className={cn("h-full rounded-full", `bg-${skill.color}-500`)}
                                            initial={{ width: 0 }}
                                            animate={{ width: isHovered ? `${sub.value}%` : '0%' }} // Animate on hover
                                            // Fallback to show some progress if not hovered for better UX on mobile
                                            style={{ width: isHovered ? `${sub.value}%` : `${sub.value * 0.3}%` }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

// --- Main Export ---
const SkillMastery = () => {
    return (
        <section className="py-12 w-full">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div className="space-y-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider"
                        >
                            <Activity className="w-4 h-4" /> Skill Breakdown
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white"
                        >
                            Mastery <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Matrix</span>
                        </motion.h2>
                    </div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors"
                    >
                        View Detailed Report <ChevronRight className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SKILL_DATA.map((skill, index) => (
                        <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default SkillMastery;