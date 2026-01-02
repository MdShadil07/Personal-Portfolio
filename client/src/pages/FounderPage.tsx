import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Users,
  Clock,
  Target,
  Globe,
  CheckCircle2,
  BarChart3,
  Layers,
  ChevronRight,
  ShieldCheck,
  Smartphone,
  PieChart,
  Building2,
  Terminal,
  Layout,
  Server
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useNavigate, MemoryRouter } from 'react-router-dom';

// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- UI Components (Inlined for Stability) ---
const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 shadow-lg shadow-blue-500/25",
    outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-800",
    ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-11 px-6 py-2",
    sm: "h-9 rounded-md px-3 text-xs",
    lg: "h-14 rounded-2xl px-8 text-lg",
    icon: "h-10 w-10",
  };
  return (
    <button
      ref={ref}
      className={cn("inline-flex items-center justify-center rounded-xl font-bold transition-all focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95 transform duration-200", variants[variant], sizes[size], className)}
      {...props}
    />
  );
});
Button.displayName = "Button";

const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "border-transparent bg-blue-500 text-white hover:bg-blue-600 shadow-sm",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100",
    outline: "text-foreground border border-slate-200 dark:border-slate-700",
  };
  return <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />;
};

const Avatar = ({ className, ...props }) => (
  <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800", className)} {...props} />
);
const AvatarImage = ({ className, src, ...props }) => (
  <img className={cn("aspect-square h-full w-full object-cover", className)} src={src} {...props} />
);
const AvatarFallback = ({ className, children, ...props }) => (
  <div className={cn("flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium uppercase", className)} {...props}>
    {children}
  </div>
);

// --- DATA: Case Studies ---
const CASE_STUDIES = [
  {
    id: 1,
    client: "FinTech Global",
    title: "Scaling to 1M+ Users",
    description: "Re-architected the legacy dashboard into a micro-frontend ecosystem, reducing load times by 60% and enabling seamless scaling for enterprise clients.",
    impact: ["$2M+ Annual Revenue", "99.99% Uptime", "3x User Growth"],
    tags: ["Scalability", "Architecture", "Performance"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    color: "blue"
  },
  {
    id: 2,
    client: "E-Comm Ventures",
    title: "Headless Commerce Engine",
    description: "Built a custom headless storefront that increased mobile conversion rates by 45%. Integrated AI-driven recommendations to boost average order value.",
    impact: ["+45% Mobile Conv.", "0.8s Load Time", "SEO Domination"],
    tags: ["E-Commerce", "UX/UI", "Growth"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    color: "purple"
  }
];

const EXPERIENCE = [
  {
    id: 1,
    role: "Senior Frontend Engineer",
    company: "TechFlow Solutions",
    period: "2022 - Present",
    description: "Leading the frontend architecture migration to Next.js 14. Improved site performance by 40% and established a new design system used by 5+ teams.",
    skills: ["React", "Next.js", "TypeScript", "GraphQL"],
    logo: "TF"
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Innovate Labs",
    period: "2020 - 2022",
    description: "Developed and maintained multiple SaaS products. Implemented real-time collaboration features using WebSockets and Redis.",
    skills: ["Node.js", "PostgreSQL", "Vue.js", "AWS"],
    logo: "IL"
  },
  {
    id: 3,
    role: "Junior Web Developer",
    company: "Creative Agency X",
    period: "2018 - 2020",
    description: "Built responsive marketing sites and e-commerce themes. Collaborated closely with designers to ensure pixel-perfect implementation.",
    skills: ["JavaScript", "Shopify", "SCSS", "PHP"],
    logo: "CA"
  }
];

const SKILLS_CATEGORIES = [
  {
    title: "Frontend Ecosystem",
    icon: Layout,
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux Toolkit"]
  },
  {
    title: "Backend & Infrastructure",
    icon: Server,
    skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "Docker", "AWS Lambda"]
  },
  {
    title: "Tools & Practices",
    icon: Terminal,
    skills: ["Git/GitHub Actions", "Jest/Testing Lib", "Figma", "Agile/Scrum", "CI/CD Pipelines"]
  }
];

// --- COMPONENTS ---

const MetricCard = ({ label, value, icon: Icon, trend }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
  >
    <div className="flex justify-between items-start mb-4">
       <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400">
          <Icon className="w-6 h-6" />
       </div>
       <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          {trend}
       </Badge>
    </div>
    <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">{value}</div>
    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</div>
  </motion.div>
);

const ProcessStep = ({ number, title, desc, icon: Icon, isLast }) => (
  <div className="flex gap-6 relative">
    {/* Line */}
    {!isLast && (
      <div className="absolute left-[28px] top-16 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 to-transparent dark:from-blue-900/50" />
    )}
    
    <div className="flex-shrink-0">
       <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-100 dark:border-blue-900 flex items-center justify-center shadow-lg relative z-10">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold flex items-center justify-center">
             {number}
          </div>
       </div>
    </div>
    <div className="pb-12 pt-2">
       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
       <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">{desc}</p>
    </div>
  </div>
);

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.2, duration: 0.5 }}
      className="relative pl-8 pb-12 last:pb-0 border-l-2 border-slate-200 dark:border-slate-800 last:border-0"
    >
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-900 dark:bg-white border-4 border-white dark:border-slate-900 shadow-sm"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.role}</h3>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md w-fit mt-1 sm:mt-0">
          {item.period}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
        <Building2 className="w-4 h-4" /> {item.company}
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 max-w-2xl">
        {item.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {item.skills.map(skill => (
          <Badge key={skill} variant="outline" className="text-[10px] border-slate-200 dark:border-slate-700 text-slate-500">
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
};

const SkillCard = ({ category, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
        <category.icon className="w-5 h-5" />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white">{category.title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {category.skills.map(skill => (
        <div key={skill} className="flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700/50">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {skill}
        </div>
      ))}
    </div>
  </motion.div>
);

// --- MAIN PAGE CONTENT ---
const FounderPageContent = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-500/30 pb-20">
      
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[60]" style={{ scaleX }} />

      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white pl-0 hover:bg-transparent group"
          >
            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
               <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-semibold">Back to Portal</span>
          </Button>
          <div className="flex gap-4">
             <Button variant="outline" className="rounded-full hidden sm:flex">
                View GitHub
             </Button>
             <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                Book Consultation
             </Button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
         {/* Background FX */}
         <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-blue-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]"></div>
         </div>

         <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-8"
            >
               <Rocket className="w-3.5 h-3.5" />
               <span>Product-First Engineering</span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-8"
            >
               I build products that <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                  scale & convert.
               </span>
            </motion.h1>

            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-12 max-w-2xl mx-auto"
            >
               Stop worrying about technical debt and scalability. I partner with founders to turn complex visions into robust, user-centric reality.
            </motion.p>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left"
            >
               <MetricCard icon={Users} value="100k+" label="Users Impacted" trend="Global Reach" />
               <MetricCard icon={TrendingUp} value="$5M+" label="Revenue Enabled" trend="ROI Focus" />
               <MetricCard icon={Clock} value="2x" label="Faster Delivery" trend="Agile Process" />
            </motion.div>
         </div>
      </section>

      {/* --- Case Studies --- */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
         <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-16">
               <div className="max-w-2xl">
                  <h3 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">Proven Track Record</h3>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Selected Case Studies</h2>
               </div>
               <Button variant="ghost" className="hidden md:flex gap-2">
                  View All Projects <ArrowRight className="w-4 h-4" />
               </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
               {CASE_STUDIES.map((study, i) => (
                  <motion.div 
                     key={study.id}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.2 }}
                     className="group cursor-pointer"
                  >
                     <div className="relative h-[300px] rounded-3xl overflow-hidden mb-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                        <img 
                           src={study.image} 
                           alt={study.title}
                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-6 left-6 z-20">
                           <Badge className="bg-white/90 text-slate-900 backdrop-blur-md border-0 shadow-lg font-bold">
                              {study.client}
                           </Badge>
                        </div>
                     </div>
                     
                     <div className="space-y-4">
                        <div className="flex gap-2 mb-2">
                           {study.tags.map(tag => (
                              <span key={tag} className="text-xs font-bold text-slate-500 uppercase tracking-wider">{tag}</span>
                           ))}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                           {study.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                           {study.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                           {study.impact.map((stat, j) => (
                              <div key={j} className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                 {stat}
                              </div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Workflow / Process --- */}
      <section className="py-24">
         <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div>
               <h3 className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mb-2">How I Work</h3>
               <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
                  From Vision to Velocity.
               </h2>
               <p className="text-lg text-slate-600 dark:text-slate-400 mb-12">
                  My development philosophy ensures we don't just write code, but build sustainable assets for your company.
               </p>

               <div className="space-y-2">
                  <ProcessStep 
                     number="01" 
                     title="Discovery & Strategy" 
                     desc="We align on business goals, user needs, and technical constraints to build the right thing." 
                     icon={Target}
                  />
                  <ProcessStep 
                     number="02" 
                     title="Architecture & MVP" 
                     desc="Rapid prototyping with a scalable foundation. We ship early to get feedback fast." 
                     icon={Layers}
                  />
                  <ProcessStep 
                     number="03" 
                     title="Scale & Optimize" 
                     desc="Refining performance, SEO, and user experience based on real-world data." 
                     icon={BarChart3}
                     isLast
                  />
               </div>
            </div>
            
            {/* Visual Side (3D Card) */}
            <div className="relative flex justify-center">
               <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
               <motion.div 
                 whileHover={{ rotateY: 5, rotateX: -5 }}
                 className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-2xl"
               >
                  <div className="flex justify-between items-center mb-8">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                           <ShieldCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                           <div className="font-bold text-slate-900 dark:text-white">Delivery Guarantee</div>
                           <div className="text-xs text-slate-500">Standard Protocol</div>
                        </div>
                     </div>
                     <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                  </div>
                  
                  <div className="space-y-4">
                     {['Weekly Sprints & Demos', 'Clean, Documented Code', 'Post-Launch Support', 'SEO & Performance Audit'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                           <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
                           <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        </div>
                     ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
                     <p className="text-xs text-slate-400 mb-4">Average Project Timeline: 4-8 Weeks</p>
                     <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-lg shadow-blue-500/20">
                        Start Your Project
                     </Button>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* --- Tech Stack --- */}
      <section className="py-20 bg-white/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
         <div className="container mx-auto px-4">
            <div className="mb-12 text-center md:text-left">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Technical Proficiency</h3>
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white">The Stack</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {SKILLS_CATEGORIES.map((cat, i) => (
                 <SkillCard key={i} category={cat} index={i} />
              ))}
           </div>
         </div>
      </section>

      {/* --- Footer CTA --- */}
      <footer className="mt-20 py-20 bg-slate-900 text-white text-center">
         <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-black mb-8">Ready to disrupt the market?</h2>
            <p className="text-slate-400 text-lg mb-10">
               I only take on 2-3 select projects per quarter to ensure maximum focus. 
               Let's see if we're a good match.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold text-lg px-10 h-14 rounded-full">
                  Book Discovery Call
               </Button>
               <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 hover:text-white font-bold text-lg px-10 h-14 rounded-full">
                  View Availability
               </Button>
            </div>
         </div>
      </footer>

    </div>
  );
};

// Wrapper to provide Router context
export default function FounderPage() {
  return (
    <MemoryRouter>
      <FounderPageContent />
    </MemoryRouter>
  );
}