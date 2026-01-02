import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Briefcase,
    Code2,
    Database,
    Globe,
    Zap,
    TrendingUp,
    Award,
    CheckCircle2,
    Building2,
    Clock,
    ChevronDown,
    ChevronUp,
    Terminal,
    Quote,
    UserCheck,
    Layout,
    Calendar,
    X,
    Loader2,
    Copy,
    MapPin,
    Video,
    Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// --- 1. TALENT SCORECARD (The "At-a-Glance" Summary) ---
// Simulates an ATS "Match" score with high-end visuals

export const TalentScorecard = ({
    matchScore = 98,
    role = "Senior Full Stack Engineer",
    availability = "Immediate",
    experience = "5+ Years"
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full max-w-md mx-auto"
        >
            {/* Glassmorphic Container */}
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl shadow-2xl">

                {/* Top Decoration */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

                <div className="p-8 relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Candidate Profile</h3>
                            <div className="text-2xl font-black text-slate-900 dark:text-white">{role}</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="relative flex items-center justify-center w-16 h-16">
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e2e8f0" strokeWidth="3" className="dark:stroke-slate-800" />
                                    <motion.path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="#10b981"
                                        strokeWidth="3"
                                        strokeDasharray="100, 100"
                                        initial={{ strokeDashoffset: 100 }}
                                        whileInView={{ strokeDashoffset: 100 - matchScore }}
                                        transition={{ duration: 1.5, delay: 0.2 }}
                                    />
                                </svg>
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{matchScore}%</span>
                            </div>
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase mt-1">Match</span>
                        </div>
                    </div>

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col gap-1">
                            <Clock className="w-4 h-4 text-blue-500 mb-1" />
                            <span className="text-xs text-slate-500 uppercase font-bold">Availability</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{availability}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col gap-1">
                            <Briefcase className="w-4 h-4 text-purple-500 mb-1" />
                            <span className="text-xs text-slate-500 uppercase font-bold">Experience</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{experience}</span>
                        </div>
                    </div>

                    {/* Core Competencies */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Competencies</h4>
                        {['System Architecture', 'React Ecosystem', 'Cloud Native', 'UI/UX Design'].map((skill, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{skill}</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <div key={star} className={cn("w-1.5 h-1.5 rounded-full", star <= 5 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700")} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                        <Button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] transition-transform shadow-lg h-12 rounded-xl font-bold">
                            Schedule Screening
                        </Button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// --- 2. IMPACT TIMELINE (The "Results" Section) ---
// Focuses on what was achieved, not just what was done.

const EXPERIENCE_DATA = [
    {
        id: 1,
        role: "Senior Frontend Engineer",
        company: "TechFlow",
        year: "2022 - Present",
        impact: [
            "Reduced cumulative layout shift (CLS) by 85% boosting SEO rankings.",
            "Architected a micro-frontend system allowing 4 teams to deploy independently.",
            "Mentored 3 junior devs to senior roles."
        ],
        color: "emerald"
    },
    {
        id: 2,
        role: "Full Stack Developer",
        company: "Innovate Labs",
        year: "2020 - 2022",
        impact: [
            "Implemented real-time collaboration features scaling to 10k concurrent users.",
            "Reduced AWS infrastructure costs by 30% via serverless migration.",
            "Integrated Stripe Connect for multi-vendor marketplace payouts."
        ],
        color: "blue"
    }
];

export const ImpactTimeline = () => {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-8">
            {EXPERIENCE_DATA.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="group relative pl-8 md:pl-0"
                >
                    {/* Desktop Layout: Standard vertical for readability */}
                    <div className="hidden md:block absolute left-[23px] top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 group-last:bottom-auto group-last:h-full" />

                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

                        {/* Icon Marker */}
                        <div className="absolute left-0 md:relative md:left-auto flex-shrink-0 z-10">
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-950 transition-transform group-hover:scale-110",
                                item.color === 'emerald' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
                            )}>
                                <Building2 className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative">
                            <div className="absolute top-6 right-6">
                                <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs">
                                    {item.year}
                                </Badge>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{item.role}</h3>
                            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6">{item.company}</p>

                            <div className="space-y-3">
                                {item.impact.map((point, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                        <p className="leading-relaxed">{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// --- 3. TECH STACK RADAR (The "Skills" Section) ---
// Organizes skills into logical groups with interaction.

const STACKS = [
    {
        category: "Frontend",
        icon: Layout,
        skills: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
        color: "text-blue-500 bg-blue-500/10 border-blue-500/20"
    },
    {
        category: "Backend",
        icon: Database,
        skills: ["Node.js", "PostgreSQL", "Redis", "GraphQL", "Supabase"],
        color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
    },
    {
        category: "DevOps",
        icon: Terminal,
        skills: ["Docker", "AWS", "CI/CD", "Vercel", "Git"],
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20"
    }
];

export const TechStackRadar = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STACKS.map((stack, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -5 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                        "p-6 rounded-[2rem] border bg-white dark:bg-slate-900/50 backdrop-blur-sm transition-all duration-300",
                        stack.border,
                        hoveredIndex === index ? "shadow-xl" : "shadow-sm"
                    )}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className={cn("p-3 rounded-2xl", stack.bg, stack.color)}>
                            <stack.icon className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">{stack.category}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {stack.skills.map((skill, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "text-xs font-bold px-3 py-1.5 rounded-lg border bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors",
                                    hoveredIndex === index ? "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700" : "border-slate-200 dark:border-slate-700"
                                )}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// --- 4. RECOMMENDATION ENGINE (Social Proof) ---
// Visualizes trust and endorsements from colleagues/managers.

const RECOMMENDATIONS = [
    {
        id: 1,
        name: "Sarah Connor",
        role: "VP of Engineering",
        company: "TechFlow",
        text: "Shadil is one of those rare engineers who understands product as well as code. He single-handedly optimized our core rendering engine.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        relation: "Managed Direct"
    },
    {
        id: 2,
        name: "David Chen",
        role: "Senior PM",
        company: "Innovate Labs",
        text: "Incredibly reliable. Shadil doesn't just build what you ask for; he builds what the user actually needs.",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
        relation: "Worked with"
    }
];

export const RecommendationEngine = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECOMMENDATIONS.map((rec, i) => (
                <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="group relative bg-white/50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-500 hover:shadow-lg"
                >
                    <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="w-10 h-10 text-slate-900 dark:text-white" />
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 relative z-10 italic text-sm md:text-base">
                        "{rec.text}"
                    </p>

                    <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-2 border-white dark:border-slate-800 shadow-md">
                            <AvatarImage src={rec.avatar} />
                            <AvatarFallback>{rec.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-bold text-slate-900 dark:text-white text-sm">{rec.name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                {rec.role} <span className="w-1 h-1 bg-slate-300 rounded-full" /> {rec.company}
                            </div>
                        </div>
                    </div>

                    {/* Verification Badge */}
                    <div className="absolute bottom-8 right-8 flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30">
                        <UserCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Verified</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// --- 5. SCHEDULING MODEL (High-End Interactive) ---
// A visually rich scheduling component for recruiters.

function toISOStringLocal(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

function generateICS(details) {
    const dtstamp = toISOStringLocal(new Date());
    const dtstart = toISOStringLocal(details.start);
    const dtend = toISOStringLocal(details.end);
    const uid = `invite-${Date.now()}@shadil.dev`;
    return [
        'BEGIN:VCALENDAR',
        'PRODID:-//ShadilDev//Portfolio Scheduler//EN',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART:${dtstart}`,
        `DTEND:${dtend}`,
        `SUMMARY:${details.title}`,
        `DESCRIPTION:${details.description}`,
        `LOCATION:${details.location || 'Google Meet'}`,
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');
}

export const ScheduleModal = ({ open, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [time, setTime] = useState('10:00');
    const [duration, setDuration] = useState(30);
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1); // 1: Form, 2: Success
    const [loading, setLoading] = useState(false);
    const [inviteLinks, setInviteLinks] = useState(null);

    useEffect(() => {
        if (open) setStep(1);
    }, [open]);

    if (!open) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate network request
        setTimeout(() => {
            const start = new Date(`${date}T${time}:00`);
            const end = new Date(start.getTime() + duration * 60000);
            const title = `Interview: ${name} x Md Shadil`;
            const description = `Agenda: ${message || 'Portfolio Review & Interview'}\n\nScheduled via Portfolio`;

            const ics = generateICS({ title, description, start, end });
            const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
            const icsUrl = URL.createObjectURL(blob);

            // GCal URL approximation
            const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&dates=${toISOStringLocal(start)}/${toISOStringLocal(end)}`;

            setInviteLinks({ icsUrl, gCalUrl });
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row min-h-[550px]"
                    >
                        {/* Close Button */}
                        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors z-20">
                            <X className="w-5 h-5 text-slate-500" />
                        </button>

                        {/* Left Side: Visual Summary */}
                        <div className="w-full md:w-2/5 bg-slate-900 relative p-8 md:p-12 text-white flex flex-col justify-between overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
                            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px]"></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2 text-emerald-400">
                                    <Calendar className="w-5 h-5" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Scheduler</span>
                                </div>
                                <h2 className="text-3xl font-black tracking-tight leading-tight">Let's build something great.</h2>
                            </div>

                            <div className="relative z-10 space-y-6 mt-8">
                                <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Avatar className="w-10 h-10 border-2 border-white/20">
                                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                                            <AvatarFallback>MS</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="text-sm font-bold">Md Shadil</div>
                                            <div className="text-[10px] text-slate-300">Senior Engineer</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-300">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        Available for new roles
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500 leading-relaxed">
                                    "I prioritize high-impact conversations. Looking forward to discussing how I can contribute to your engineering goals."
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form / Success */}
                        <div className="flex-1 p-8 md:p-12 bg-slate-50 dark:bg-slate-950 flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Book a time</h3>
                                            <p className="text-sm text-slate-500">Select a slot for a 30-min introduction call.</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                                                <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" placeholder="Jane Doe" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                                                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" placeholder="jane@company.com" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Date</label>
                                                <input required type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Time</label>
                                                <input required type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-sm" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase">Context (Optional)</label>
                                            <textarea value={message} onChange={e => setMessage(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-emerald-500 outline-none text-sm h-20 resize-none" placeholder="Briefly mention the role or topic..." />
                                        </div>

                                        <Button className="w-full h-12 rounded-xl font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity" disabled={loading}>
                                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Schedule"}
                                        </Button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-2">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Mission Confirmed!</h3>
                                            <p className="text-slate-500 max-w-xs mx-auto">
                                                I've received your request. A calendar invite has been sent to <strong>{email}</strong>.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3 w-full max-w-xs">
                                            <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-slate-200 dark:border-slate-700" onClick={() => window.open(inviteLinks?.gCalUrl)}>
                                                <Calendar className="w-4 h-4 mr-3 text-blue-500" /> Add to Google Calendar
                                            </Button>
                                            <Button variant="outline" className="w-full justify-start h-12 rounded-xl border-slate-200 dark:border-slate-700" onClick={() => window.open(inviteLinks?.icsUrl)}>
                                                <Download className="w-4 h-4 mr-3 text-slate-500" /> Download .ICS File
                                            </Button>
                                            <div className="flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Video className="w-3 h-3" /> Google Meet
                                                </div>
                                                <button className="text-xs font-bold text-emerald-600 hover:underline" onClick={() => navigator.clipboard.writeText("meet.google.com/abc-defg-hij")}>
                                                    Copy Link
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- Wrapper: Recruiter Widgets (Scorecard, Timeline, Tech Radar, Recommendations + Schedule Modal)
export const RecruiterWidgets = () => {
    const [openSchedule, setOpenSchedule] = useState(false);

    return (
        <div className="space-y-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <TalentScorecard />
                </div>

                <div className="mb-12">
                    <ImpactTimeline />
                </div>

                <div className="mb-12">
                    <TechStackRadar />
                </div>

                <div className="mb-12">
                    <RecommendationEngine />
                </div>

                <div className="flex items-center gap-4 mt-8">
                    <button onClick={() => setOpenSchedule(true)} className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700">Schedule Interview</button>
                </div>
            </div>

            <ScheduleModal open={openSchedule} onClose={() => setOpenSchedule(false)} />
        </div>
    );
}