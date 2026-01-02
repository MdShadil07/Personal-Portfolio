import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Check, 
  Target, Brain, Zap, Code2, Palette, 
  Terminal, Globe, ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// --- 1. FOCUS MODE WIDGET ---
// A minimalist timer with a "breathing" ring animation
export const FocusMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60); // 25 minutes

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => setTime((t) => t - 1), 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative w-full h-full bg-slate-900 text-white rounded-[2rem] p-6 overflow-hidden shadow-xl border border-slate-800 flex flex-col items-center justify-center group">
      
      {/* Background Pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ scale: isActive ? [1, 1.2, 1] : 1, opacity: isActive ? [0.1, 0.3, 0.1] : 0.1 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 text-center">
        <div className="mb-2 flex items-center justify-center gap-2 opacity-70">
          <Zap className="w-4 h-4 text-emerald-400 fill-current" />
          <span className="text-xs font-bold uppercase tracking-widest">Deep Work</span>
        </div>
        
        <div className="text-6xl md:text-7xl font-black tracking-tighter mb-8 font-mono">
          {formatTime(time)}
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={toggleTimer}
            className={cn(
              "h-14 w-14 rounded-full border-0 shadow-lg transition-all duration-300 hover:scale-110",
              isActive ? "bg-rose-500 hover:bg-rose-600" : "bg-emerald-500 hover:bg-emerald-600"
            )}
          >
            {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current pl-1" />}
          </Button>
          
          <Button 
            onClick={resetTimer}
            variant="outline"
            className="h-14 w-14 rounded-full border-2 border-slate-700 bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- 2. SKILL RADAR WIDGET ---
// A holographic radar chart showing current focus balance
export const SkillRadar = () => {
  // Config for 5 axes
  const stats = [
    { label: "Code", value: 85, icon: Terminal },
    { label: "Design", value: 70, icon: Palette },
    { label: "Strategy", value: 60, icon: Target },
    { label: "Comm", value: 90, icon: Globe },
    { label: "Analysis", value: 75, icon: Brain },
  ];

  // Generate polygon points (simplified for 5 points)
  const polyPoints = "100,20 176,76 147,164 53,164 24,76"; // Outer
  const dataPoints = "100,35 160,85 135,145 65,145 40,85"; // Inner (Approximate based on values)

  return (
    <div className="relative w-full bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 overflow-hidden shadow-sm group">
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Skill Matrix</h3>
        <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 font-bold">
          Level 42
        </span>
      </div>

      <div className="relative flex items-center justify-center h-48 md:h-56">
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-60 overflow-visible">
           {/* Background Grid */}
           {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
              <polygon 
                 key={i}
                 points={polyPoints} 
                 fill="none" 
                 stroke="currentColor" 
                 strokeWidth="1" 
                 className="text-slate-100 dark:text-slate-800"
                 transform={`scale(${scale})`}
                 style={{ transformOrigin: '100px 100px' }}
              />
           ))}
           
           {/* Data Shape */}
           <motion.polygon 
              points={dataPoints}
              fill="rgba(16, 185, 129, 0.2)" 
              stroke="#10b981" 
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
           />

           {/* Icons at vertices */}
           {/* Manually positioned for the 5-point layout */}
           <foreignObject x="85" y="-10" width="30" height="30">
             <div className="flex items-center justify-center w-full h-full text-slate-400"><Terminal className="w-4 h-4" /></div>
           </foreignObject>
           <foreignObject x="170" y="60" width="30" height="30">
             <div className="flex items-center justify-center w-full h-full text-slate-400"><Palette className="w-4 h-4" /></div>
           </foreignObject>
           <foreignObject x="135" y="160" width="30" height="30">
             <div className="flex items-center justify-center w-full h-full text-slate-400"><Brain className="w-4 h-4" /></div>
           </foreignObject>
           <foreignObject x="35" y="160" width="30" height="30">
             <div className="flex items-center justify-center w-full h-full text-slate-400"><Globe className="w-4 h-4" /></div>
           </foreignObject>
           <foreignObject x="0" y="60" width="30" height="30">
             <div className="flex items-center justify-center w-full h-full text-slate-400"><Target className="w-4 h-4" /></div>
           </foreignObject>
        </svg>
      </div>
    </div>
  );
};

// --- 3. DAILY HABITS WIDGET ---
// Interactive checklist
export const DailyHabits = () => {
  const [habits, setHabits] = useState([
    { id: 1, text: "Review Pull Requests", completed: true },
    { id: 2, text: "30m Algo Practice", completed: false },
    { id: 3, text: "Update Documentation", completed: false },
  ]);

  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
       <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Daily Targets</h3>
          <span className="text-xs font-medium text-slate-500">
            {habits.filter(h => h.completed).length}/{habits.length} Done
          </span>
       </div>
       
       <div className="space-y-3">
          {habits.map((habit) => (
            <motion.div 
              key={habit.id}
              layout
              initial={false}
              onClick={() => toggleHabit(habit.id)}
              className={cn(
                "group flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-200",
                habit.completed 
                  ? "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/30" 
                  : "bg-slate-50 dark:bg-slate-800/50 border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              )}
            >
               <div className={cn(
                 "w-6 h-6 rounded-full flex items-center justify-center border transition-colors",
                 habit.completed 
                   ? "bg-emerald-500 border-emerald-500 text-white" 
                   : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-emerald-400"
               )}>
                 {habit.completed && <Check className="w-3.5 h-3.5" />}
               </div>
               <span className={cn(
                 "text-sm font-medium transition-all",
                 habit.completed 
                   ? "text-slate-400 line-through" 
                   : "text-slate-700 dark:text-slate-200"
               )}>
                 {habit.text}
               </span>
            </motion.div>
          ))}
       </div>
       
       <Button variant="ghost" className="w-full mt-4 text-xs text-slate-400 hover:text-slate-900 dark:hover:text-white">
          View History <ChevronRight className="w-3 h-3 ml-1" />
       </Button>
    </div>
  );
};

// Ensure explicit named exports for ESM resolution
// (No additional named exports needed — components are already exported above.)