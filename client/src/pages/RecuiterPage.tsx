import { motion, useScroll, useSpring } from 'framer-motion';
import { useState } from 'react';
import {
   Download,
   Calendar,
   Github,
   Linkedin,
   Mail,
   ChevronLeft,
   Trophy,
   Zap,
   ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
// Avatar primitive not needed here — using full-bleed <img> instead
import SkillsShowcase from '@/components/dashboard/skillshowcase.jsx';
import { RecruiterWidgets, ScheduleModal } from '@/components/RecuiterComponent.jsx';


// --- Mock Data ---
// Professional Journey data removed — section replaced by Recruiter components
/* Technical proficiency data removed — section replaced by SkillsShowcase component */

const HIGHLIGHT_PROJECTS = [
   {
      id: 1,
      title: "Lumina Analytics",
      tagline: "Enterprise Data Visualization Platform",
      metrics: ["20k+ Daily Users", "99.9% Uptime", "<100ms Latency"],
      tech: ["React", "D3.js", "Node.js"],
      color: "blue"
   },
   {
      id: 2,
      title: "Aura Commerce",
      tagline: "Headless E-commerce Solution",
      metrics: ["+45% Conversion Rate", "SEO Optimized", "Global CDN"],
      tech: ["Next.js", "Shopify API", "Redis"],
      color: "emerald"
   }
];

// SkillCard removed — Technical Proficiency replaced by SkillsShowcase

// --- Main Component ---
export default function RecruiterPage() {
   const { scrollYProgress } = useScroll();
   const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
   const [openSchedule, setOpenSchedule] = useState(false);

   return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500/30">

         {/* Progress Bar */}
         <motion.div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50" style={{ scaleX }} />

         {/* --- Navigation (Back) --- */}
         <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
               <Button variant="ghost" className="gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white">
                  <ChevronLeft className="w-4 h-4" /> Back to Portal
               </Button>
               <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="rounded-full">
                     <Github className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                     <Linkedin className="w-5 h-5 text-blue-600" />
                  </Button>
                  <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full px-6">
                     Contact Me
                  </Button>
               </div>
            </div>
         </nav>

         <main className="container mx-auto px-4 py-12 space-y-24">

            {/* --- HERO SECTION --- */}
            <section className="grid lg:grid-cols-12 gap-12 items-center">
               <div className="lg:col-span-7 space-y-8">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider"
                  >
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     Open to Work
                  </motion.div>

                  <div className="space-y-4">
                     <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white"
                     >
                        Md Shadil
                     </motion.h1>
                     <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl font-bold text-slate-400"
                     >
                        Full Stack Engineer & UI Architect
                     </motion.h2>
                  </div>

                  <motion.p
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed"
                  >
                     I build accessible, pixel-perfect, and performant web applications.
                     With 5+ years of experience in the React ecosystem, I specialize in
                     bridging the gap between design and engineering.
                  </motion.p>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                     className="flex flex-wrap gap-4"
                  >
                     <Button size="lg" className="h-12 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 transition-all hover:-translate-y-1">
                        <Download className="w-4 h-4 mr-2" /> Download Resume
                     </Button>
                     <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900">
                        <Mail className="w-4 h-4 mr-2" /> Copy Email
                     </Button>
                  </motion.div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                     {[
                        { label: "Years Exp.", value: "5+" },
                        { label: "Projects", value: "42" },
                        { label: "Commitment", value: "100%" }
                     ].map((stat, i) => (
                        <div key={i}>
                           <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                           <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right: Profile Visual */}
               <div className="lg:col-span-5 flex justify-center lg:justify-end">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5 }}
                     className="relative w-[350px] h-[450px] rounded-[2.5rem] bg-slate-100 dark:bg-slate-900 overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
                  >
                     {/* Use a full-bleed image instead of Avatar to avoid round cropping */}
                     <img src="/Assests/blackcopy.jpg" alt="Md Shadil" className="w-full h-full object-cover block" />

                     <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent"></div>
                     <div className="absolute bottom-8 left-8 text-white">
                        <div className="text-sm font-medium opacity-80">Currently in</div>
                        <div className="text-xl font-bold flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> India
                        </div>
                     </div>
                  </motion.div>
               </div>
            </section>

            {/* --- SKILLS SHOWCASE (Technical + Soft) --- */}
            <section>
               <SkillsShowcase />
            </section>

            {/* --- RECRUITER WIDGETS (scorecard, timeline, radar, recommendations, schedule) --- */}
            <section id="recruiter-widgets">
               <RecruiterWidgets />
            </section>

            {/* --- TECH STACK --- */}
            <section>
               <div className="flex items-center gap-4 mb-10">
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Technical Proficiency</h3>
                  <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
               </div>

            </section>

            {/* Professional Journey removed — replaced by recruiter components above */}

            {/* --- FEATURED IMPACT --- */}
            <section>
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Impact Highlights</h2>
               <div className="grid md:grid-cols-2 gap-8">
                  {HIGHLIGHT_PROJECTS.map((project, i) => (
                     <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="group relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-10 hover:-translate-y-2 transition-transform duration-300"
                     >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-linear-to-br ${project.color === 'blue' ? 'from-blue-600/20 to-purple-600/20' : 'from-emerald-600/20 to-teal-600/20'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                        <div className="relative z-10">
                           <div className="flex justify-between items-start mb-6">
                              <div>
                                 <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{project.tagline}</div>
                                 <h3 className="text-2xl font-bold">{project.title}</h3>
                              </div>
                              <div className="p-3 rounded-full bg-white/10 backdrop-blur-md">
                                 <Trophy className="w-6 h-6 text-yellow-400" />
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4 mb-8">
                              {project.metrics.map((metric, idx) => (
                                 <div key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-200">
                                    <Zap className="w-4 h-4 text-yellow-400" /> {metric}
                                 </div>
                              ))}
                           </div>

                           <div className="flex items-center justify-between pt-6 border-t border-white/10">
                              <div className="flex gap-2">
                                 {project.tech.map(t => (
                                    <span key={t} className="text-xs bg-white/10 px-2 py-1 rounded-md text-slate-300">{t}</span>
                                 ))}
                              </div>
                              <Button variant="link" className="text-white hover:text-emerald-400 p-0">
                                 Case Study <ArrowRight className="w-4 h-4 ml-1" />
                              </Button>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </section>

         </main>

         {/* --- CTA Footer --- */}
         <footer className="py-20 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="container mx-auto px-4 text-center">
               <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">Ready to Build Something Great?</h2>
               <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
                  I am currently available for full-time roles and select freelance projects.
                  Let's schedule a time to discuss how I can contribute to your team.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="h-14 px-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg shadow-xl shadow-emerald-500/20" onClick={() => setOpenSchedule(true)}>
                     <Calendar className="w-5 h-5 mr-2" /> Schedule Interview
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-lg hover:bg-white dark:hover:bg-slate-800">
                     <Mail className="w-5 h-5 mr-2" /> Email Me
                  </Button>
               </div>
               <p className="mt-12 text-sm text-slate-500">© {new Date().getFullYear()} Md Shadil. All rights reserved.</p>
            </div>
         </footer>

         <ScheduleModal open={openSchedule} onClose={() => setOpenSchedule(false)} />

      </div>
   );
}