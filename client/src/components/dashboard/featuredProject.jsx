import React, { useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import {
   ExternalLink, Github, ArrowUpRight, Layers, ArrowRight,
   Zap, Globe, Layout, Database, Smartphone, Star, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// --- Configuration ---
const PROJECTS = [
   {
      id: 1,
      title: "Lumina Analytics",
      category: "SaaS Platform",
      description: "A mesmerizing real-time data visualization dashboard for AI-driven marketing teams. Features predictive modeling and drag-and-drop reporting.",
      tech: ["React", "TypeScript", "D3.js", "Node.js"],
      stats: { label: "Active Users", value: "12k+" },
      imageGradient: "from-blue-500 to-indigo-600",
      icon: BarChartIcon,
      links: { demo: "#", repo: "#" },
      size: "wide" // wide card
   },
   {
      id: 2,
      title: "Aura Commerce",
      category: "E-Commerce",
      description: "Headless commerce storefront built for extreme performance and SEO. Sub-second load times and seamless checkout flow.",
      tech: ["Next.js", "Shopify", "Tailwind"],
      stats: { label: "Conversion", value: "+45%" },
      imageGradient: "from-emerald-400 to-teal-600",
      icon: ShoppingBagIcon,
      links: { demo: "#", repo: "#" },
      size: "tall" // tall card
   },
   {
      id: 3,
      title: "Echo Chat",
      category: "Communication",
      description: "End-to-end encrypted messaging app with real-time translation and voice notes. Built with WebRTC and Socket.io.",
      tech: ["Vue", "Firebase", "WebRTC"],
      stats: { label: "Messages/Day", value: "1M+" },
      imageGradient: "from-orange-400 to-rose-600",
      icon: MessageCircleIcon,
      links: { demo: "#", repo: "#" },
      size: "tall"
   },
   {
      id: 4,
      title: "Vortex UI Kit",
      category: "Design System",
      description: "A comprehensive React component library used by over 500+ developers. Accessible, themable, and animation-ready.",
      tech: ["React", "Storybook", "Framer Motion"],
      stats: { label: "NPM Downloads", value: "50k" },
      imageGradient: "from-purple-500 to-pink-600",
      icon: LayersIcon,
      links: { demo: "#", repo: "#" },
      size: "wide"
   }
];

// --- Icons (Lucide Proxies) ---
function BarChartIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg> }
function ShoppingBagIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg> }
function MessageCircleIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg> }
function LayersIcon(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" /></svg> }

// --- Sub-Components ---

const ProjectCard = ({ project }) => {
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);

   function handleMouseMove({ currentTarget, clientX, clientY }) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
   }

   const isWide = project.size === 'wide';

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-50px" }}
         transition={{ duration: 0.5 }}
         className={cn(
            "group relative rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-500",
            isWide ? "md:col-span-2" : "md:col-span-1"
         )}
         onMouseMove={handleMouseMove}
      >
         {/* Spotlight Overlay */}
         <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
               background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
            }}
         />

         <div className="relative h-full flex flex-col">

            {/* Image / Visual Area */}
            <div className={cn(
               "relative overflow-hidden",
               isWide ? "h-64 md:h-80" : "h-56 md:h-64"
            )}>
               {/* Abstract Gradient Background representing the project preview */}
               <div className={cn(
                  "absolute inset-0 bg-linear-to-br transition-transform duration-700 group-hover:scale-105",
                  project.imageGradient
               )}>
                  {/* Noise Texture */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

                  {/* Decorative Pattern Overlay */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-size-[24px_24px]"></div>

                  {/* Floating Project Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 text-white shadow-2xl transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                        <project.icon className="w-10 h-10" />
                     </div>
                  </div>
               </div>

               {/* Stat Pill Floating */}
               <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
                     <Zap className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                     {project.stats.value} {project.stats.label}
                  </div>
               </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8 flex flex-col relative z-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">

               <div className="flex justify-between items-start mb-4">
                  <div>
                     <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                        {project.category}
                     </div>
                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {project.title}
                     </h3>
                  </div>
                  <Button size="icon" variant="outline" className="rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                     <ArrowUpRight className="w-5 h-5" />
                  </Button>
               </div>

               <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed line-clamp-2">
                  {project.description}
               </p>

               {/* Tech Stack & Links */}
               <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                     {project.tech.map((t) => (
                        <Badge key={t} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium px-2.5 py-1 rounded-lg border-slate-200 dark:border-slate-700">
                           {t}
                        </Badge>
                     ))}
                  </div>
                  <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                     <a href={project.links.repo} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <Github className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                     </a>
                     <a href={project.links.demo} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <Globe className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                     </a>
                  </div>
               </div>

            </div>
         </div>
      </motion.div>
   );
};

// --- Main Component ---
const FeaturedProjects = () => {
   return (
      <section className="py-24 relative overflow-hidden">

         {/* Background Elements */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-slate-50/80 to-transparent dark:from-slate-900/80"></div>
         </div>

         <div className="container px-4 mx-auto relative z-10">

            {/* Section Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="max-w-2xl">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider mb-3"
                  >
                     <Layers className="w-4 h-4" /> Selected Works
                  </motion.div>
                  <motion.h2
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.1 }}
                     className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
                  >
                     Engineering <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-blue-500">Impact.</span>
                  </motion.h2>
               </div>

               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
               >
                  <Button variant="ghost" className="gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white group">
                     View All Projects <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
               </motion.div>
            </div>

            {/* Projects Grid (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
               {PROJECTS.map((project, index) => (
                  <ProjectCard key={project.id} project={project} />
               ))}
            </div>

            {/* Footer Stat */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mt-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
            >
               <div className="flex flex-col items-center gap-1">
                  <div className="text-3xl font-black text-slate-900 dark:text-white">50+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Open Source Commits</div>
               </div>
               <div className="w-px h-12 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
               <div className="flex flex-col items-center gap-1">
                  <div className="text-3xl font-black text-slate-900 dark:text-white">10k+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Lines of Code</div>
               </div>
               <div className="w-px h-12 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>
               <div className="flex flex-col items-center gap-1">
                  <div className="text-3xl font-black text-slate-900 dark:text-white">100%</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Pixel Obsession</div>
               </div>
            </motion.div>

         </div>
      </section>
   );
};

export default FeaturedProjects;