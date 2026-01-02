import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
    ArrowRight, Download, Github, Linkedin, Twitter,
    Code2, Palette, Terminal, Cpu, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ShareButton from "@/components/ui/share";
import { cn } from "@/lib/utils";

// --- Configuration ---
const SKILLS = [
    { id: 1, icon: Code2, label: "Frontend", x: -45, y: -30, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 2, icon: Palette, label: "Design", x: 45, y: -40, color: "text-pink-500", bg: "bg-pink-500/10" },
    { id: 3, icon: Terminal, label: "Backend", x: -40, y: 40, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { id: 4, icon: Cpu, label: "System", x: 40, y: 30, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export default function PortfolioHero({
    name = "Alex Chen",
    role = "Full Stack Engineer",
    bio = "Crafting digital experiences with precision and passion. Specializing in React, Node.js, and intuitive UI design."
}) {

    const containerRef = useRef<HTMLDivElement>(null);

    // --- 3D Tilt Logic ---
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        const xPct = (mouseXPos / width) - 0.5;
        const yPct = (mouseYPos / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full min-h-[800px] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 perspective-1000"
        >

            {/* --- Background Ambience --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_70%)]"></div>
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Grid Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>

            <div className="container px-4 relative z-10 grid lg:grid-cols-12 gap-16 items-center">

                {/* --- Left: Content & Bio --- */}
                <div className="lg:col-span-7 space-y-8 text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mx-auto lg:mx-0">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Open to work</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                            Hi, I'm {name}. <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 via-teal-500 to-blue-600 animate-gradient-x">
                                {role}
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            {bio}
                        </p>
                    </motion.div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                    >
                        <Button size="lg" className="h-14 px-8 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-xl hover:scale-105 transition-transform duration-300">
                            View Projects <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-transparent hover:bg-white/50 dark:hover:bg-slate-900/50 font-bold backdrop-blur-sm">
                            <Download className="w-5 h-5 mr-2" /> Download CV
                        </Button>
                    </motion.div>

                    {/* Socials */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex items-center justify-center lg:justify-start gap-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/60"
                    >
                        {[Github, Linkedin, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors transform hover:scale-110">
                                <Icon className="w-6 h-6" />
                            </a>
                        ))}
                        <ShareButton onClick={() => navigator.share?.({title: name, text: bio}).catch(()=>{})} />
                        <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
                        <div className="text-sm font-medium text-slate-500">Based in San Francisco</div>
                    </motion.div>
                </div>

                {/* --- Right: 3D Profile Card --- */}
                <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2 mb-12 lg:mb-0">

                    {/* 3D Tilted Card Container */}
                    <motion.div
                        style={{ rotateX, rotateY }}
                        className="relative z-20 w-[320px] h-[420px] bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-white/60 dark:border-slate-700/50 shadow-2xl shadow-slate-200/50 dark:shadow-black/50"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent opacity-50 rounded-[2.5rem] pointer-events-none z-30"></div>

                        {/* Card Content */}
                        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">

                            {/* Avatar Ring */}
                            <div className="relative mb-6 group cursor-pointer">
                                <div className="absolute -inset-1 bg-linear-to-br from-emerald-400 to-blue-500 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-xl relative z-10">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="object-cover" />
                                    <AvatarFallback>AC</AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white dark:border-slate-900 z-20">
                                    <Zap className="w-4 h-4 fill-current" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{role}</p>

                            {/* Stats Mini-Grid */}
                            <div className="grid grid-cols-2 gap-4 w-full">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <div className="text-xl font-bold text-slate-900 dark:text-white">5+</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Years Exp.</div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <div className="text-xl font-bold text-slate-900 dark:text-white">42</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase">Projects</div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                    {/* --- Orbiting Skill Nodes --- */}
                    {SKILLS.map((skill, i) => (
                        <motion.div
                            key={skill.id}
                            className={cn(
                                "absolute z-30 flex items-center gap-2 p-2 pr-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-lg border border-slate-100 dark:border-slate-700/50 pointer-events-none",
                            )}
                            style={{
                                x: skill.x * 3, // Initial offset
                                y: skill.y * 3
                            }}
                            animate={{
                                y: [skill.y * 3, skill.y * 3 - 10, skill.y * 3],
                            }}
                            transition={{
                                duration: 3 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            }}
                        >
                            <div className={cn("p-1.5 rounded-full", skill.bg, skill.color)}>
                                <skill.icon className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{skill.label}</span>
                        </motion.div>
                    ))}

                    {/* Back Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-linear-to-br from-emerald-400/20 to-blue-500/20 blur-[80px] -z-10 rounded-full pointer-events-none"></div>

                </div>

            </div>
        </section>
    );
}