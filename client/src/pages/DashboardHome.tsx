import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Overview } from "@/components/dashboard/Overview";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import PortfolioHero from "@/components/dashboard/Dashboard.hero";
import { FocusMode, SkillRadar, DailyHabits } from "@/components/dashboard/Dashboardskill.jsx";
import FeaturedProjects from "@/components/dashboard/featuredProject.jsx";
import Contact from "@/components/Contact";
import SkillMastery from "@/components/dashboard/skillMastery.jsx";
import SkillsShowcase from "@/components/dashboard/skillshowcase.jsx";

export default function DashboardHome() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Default dashboard to light theme on first render
    setTheme("light");
  }, [setTheme]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12 pb-10 bg-slate-50 dark:bg-slate-950 min-h-screen"
    >
      <PortfolioHero
        name="Md Shadil"
        role="Full Stack Developer"
        bio="3rd Year B.Tech CS Student at Galgotias University. Passionate about building scalable web applications and solving complex problems."
      />

      {/* Skills & Habits Section (Moved up) */}
      <div className="px-4 md:px-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Daily Focus & Habits</h2>
        <div className="grid gap-6 md:grid-cols-3 items-start">
          <div className="md:col-span-2">
            <SkillRadar />
          </div>
          <div className="space-y-6">
            <FocusMode />
            <DailyHabits />
          </div>
        </div>
      </div>

      {/* Skill Mastery & Showcase */}
      <SkillMastery />
      <SkillsShowcase />

      {/* Dashboard Overview */}
      <div className="px-4 md:px-6 space-y-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        </div>
        <StatsCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Overview />
          <RecentActivity />
        </div>
      </div>

      <FeaturedProjects />

      <Contact />
    </motion.div>
  );
}
