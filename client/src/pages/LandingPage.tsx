import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MouseEvent as ReactMouseEvent, ComponentType, SVGProps } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  Briefcase,
  Code2,
  Rocket,
  ArrowRight,
  Coffee,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ChevronRight,
  Eye,
  Sparkles,
  Moon,
  Sun,
  Terminal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import Logo from '@/components/Logo';

// --- Configuration: User Roles ---
interface Role {
  id: string;
  label: string;
  sub: string;
  description: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string;
  gradient: string;
  bg: string;
  border: string;
  shadow: string;
  action: string;
}

const ROLES: Role[] = [
  {
    id: 'recruiter',
    label: "Recruiter",
    sub: "Hiring Talent",
    description: "Straight to the point: Resume, ATS-friendly skills, and experience timeline.",
    icon: Briefcase,
    color: "emerald",
    gradient: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
    shadow: "group-hover:shadow-emerald-500/20",
    action: "View Resume"
  },
  {
    id: 'founder',
    label: "Founder / Client",
    sub: "Building Product",
    description: "Case studies focusing on ROI, scalability, and product architecture.",
    icon: Rocket,
    color: "blue",
    gradient: "from-blue-500 to-indigo-600",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
    shadow: "group-hover:shadow-blue-500/20",
    action: "View Case Studies"
  },
  {
    id: 'peer',
    label: "Developer",
    sub: "Code Review",
    description: "Deep dive into my GitHub repos, clean code philosophy, and tech stack.",
    icon: Code2,
    color: "purple",
    gradient: "from-purple-500 to-pink-600",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50",
    shadow: "group-hover:shadow-purple-500/20",
    action: "Inspect Code"
  },
  {
    id: 'visitor',
    label: "Just Visiting",
    sub: "Explore",
    description: "A visual journey through my creative work and personal projects.",
    icon: Eye,
    color: "amber",
    gradient: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/50",
    shadow: "group-hover:shadow-amber-500/20",
    action: "Enter Portfolio"
  }
];

// Module-scoped Particle class used by the canvas background.
class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  z: number;

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = Math.random() > 0.5 ? 'rgba(59, 130, 246, ' : 'rgba(16, 185, 129, ';
    this.opacity = 1;
    this.z = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.speedX * this.z;
    this.y += this.speedY * this.z;
    this.opacity -= 0.015;
    if (this.size > 0.2) this.size -= 0.05;
  }

  draw() {
    this.ctx.fillStyle = this.color + this.opacity + ')';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

// --- 3D Particle Canvas Component ---
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number | null = null;
    const particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Use module-scoped Particle implementation (declared below)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Spawn particles on mouse move
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(ctx, mouseX, mouseY));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].opacity <= 0 || particles[i].size <= 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

// --- Sub-Components ---

const RoleCard = ({ role, mouseX, mouseY }: { role: Role; mouseX: MotionValue<number>; mouseY: MotionValue<number> }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        if (role.id === 'recruiter') navigate('/recruiter');
        else if (role.id === 'visitor') navigate('/');
      }}
      className={cn(
        "group relative flex flex-col h-80 w-full md:w-[260px] rounded-4xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-500",
        role.border,
        "hover:-translate-y-2 hover:scale-[1.02] z-10 hover:z-20 hover:shadow-xl",
        role.shadow
      )}
    >
      {/* Dynamic Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.15),
              transparent 80%
            )
          `,
        }}
      />

      {/* Gradient Overlay on Hover */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-linear-to-br",
        role.gradient
      )} />

      <div className="relative z-10 flex flex-col h-full p-5 items-center text-center">
        
        {/* Icon Container */}
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg border-2 border-white dark:border-slate-800",
          role.bg
        )}>
          <role.icon className={cn("w-8 h-8", `text-${role.color}-600 dark:text-${role.color}-400`)} strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <div className="space-y-2 mb-auto w-full">
          <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-white transition-colors duration-300">
            {role.label}
          </h3>
          <div className={cn(
            "text-[9px] font-extrabold uppercase tracking-[0.2em] py-1 px-2.5 rounded-full bg-slate-100 dark:bg-slate-800 w-fit mx-auto transition-colors group-hover:bg-white/20 group-hover:text-white",
            `text-${role.color}-600 dark:text-${role.color}-400`
          )}>
            {role.sub}
          </div>
        </div>

        {/* Description (Reveals on hover) */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 bg-linear-to-t from-white via-white/95 to-transparent dark:from-slate-950 dark:via-slate-950/95 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
           <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
              {role.description}
           </p>
           <Button className={cn(
              "w-full rounded-xl font-bold shadow-lg group-hover:shadow-xl transition-all duration-300 h-10 text-xs",
              `bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105`
           )}>
              {role.action} <ChevronRight className="w-3 h-3 ml-1" />
           </Button>
        </div>

      </div>
    </motion.div>
  );
};

// --- Main Component ---

export default function PortfolioLanding() {
  const containerRef = useRef(null);
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    return hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // --- Theme Toggle Logic ---
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // --- Global Mouse Tracking ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "min-h-screen w-full font-sans selection:bg-emerald-500/30 flex flex-col relative overflow-hidden transition-colors duration-500",
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      )}
    >
       {/* --- Custom Particle Background --- */}
       <ParticleBackground />

       {/* --- Navbar --- */}
       <nav className="absolute top-0 w-full z-50 py-6 px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3 font-bold text-lg tracking-tight z-20">
             <div className="w-9 h-9 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-slate-900 shadow-lg hover:rotate-12 transition-transform">
               <Terminal className="w-4 h-4" />
             </div>
             {/* Inline SVG component so the logo color follows site theme */}
             <span className="hidden sm:inline h-9 w-auto text-slate-900 dark:text-white">
               <Logo className="h-9 w-auto" />
             </span>
          </div>
          
          <div className="flex items-center gap-5 z-20">
             {/* Socials */}
             <div className="hidden sm:flex gap-4 opacity-70">
                <Github className="w-4 h-4 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors hover:scale-110" />
                <Linkedin className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors hover:scale-110" />
                <Mail className="w-4 h-4 cursor-pointer hover:text-emerald-500 transition-colors hover:scale-110" />
             </div>
             
             {/* Theme Toggle */}
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={toggleTheme}
               className="rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all backdrop-blur-sm w-9 h-9"
             >
               {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
             </Button>
          </div>
       </nav>

       {/* --- Ambient Background --- */}
       <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-240 h-240 bg-emerald-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-240 h-240 bg-blue-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[64px_64px]"></div>
       </div>

       {/* --- Main Content --- */}
       <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-4 py-12">
          
          {/* Intro Text */}
          <div className="text-center mb-16 md:mb-20 max-w-5xl mx-auto space-y-6 relative z-20">
             <motion.div 
               initial={{ opacity: 0, y: -20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 0.6, delay: 0.2 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-md"
             >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">{greeting}, Future Collaborator</span>
             </motion.div>

             <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }} 
               animate={{ opacity: 1, scale: 1 }} 
               transition={{ delay: 0.1, duration: 0.8, type: "spring" }}
               className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white relative z-20 leading-tight"
             >
                Hello, I'm Md Shadil.
             </motion.h1>
             
             <motion.p 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               transition={{ delay: 0.4 }}
               className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium leading-relaxed relative z-20"
             >
                Identify yourself to unlock a tailored portfolio experience.
             </motion.p>
          </div>

          {/* --- The Selection Grid --- */}
          <div className="w-full max-w-[1200px] relative z-20">
             <div className="flex flex-wrap justify-center gap-6 md:gap-8 perspective-1000">
                 {ROLES.map((role) => (
                   <RoleCard 
                     key={role.id} 
                     role={role} 
                     mouseX={mouseX} 
                     mouseY={mouseY} 
                   />
                 ))}
             </div>
          </div>

          {/* --- Footer Note --- */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5 }}
            className="mt-20 text-center relative z-20"
          >
             <Button variant="outline" className="rounded-full px-6 h-12 border-2 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-105 text-xs font-bold uppercase tracking-wider">
                Skip customization and view full portfolio <ArrowRight className="ml-2 w-3.5 h-3.5" />
             </Button>
          </motion.div>

       </main>

       {/* Footer Gradient Overlay */}
       <div className="fixed bottom-0 left-0 w-full h-24 bg-linear-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none z-0"></div>
       
       {/* --- Footer Minimal --- */}
       <footer className="relative z-10 py-6 text-center text-[10px] text-slate-400 border-t border-slate-200/50 dark:border-slate-800/50 w-full uppercase tracking-widest font-bold">
          <div className="sm:hidden flex justify-center gap-6 mb-4 opacity-70">
             <Github className="w-4 h-4 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors" />
             <Linkedin className="w-4 h-4 hover:text-blue-600 cursor-pointer transition-colors" />
             <Twitter className="w-4 h-4 hover:text-sky-500 cursor-pointer transition-colors" />
          </div>
          <p>© {new Date().getFullYear()} Md Shadil. Built with React & Framer Motion.</p>
       </footer>

    </div>
  );
}