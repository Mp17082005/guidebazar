import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
// REMOVED: import Footer from '@/components/Footer';
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCloseButton from "@/components/profile/ProfileCloseButton";
import OverviewCards from "@/components/profile/OverviewCards";
import DailyPlanner from "@/components/profile/DailyPlanner";
import CoursesPanel from "@/components/profile/CoursesPanel";
import InternshipTracker from "@/components/profile/InternshipTracker";
import EventsSection from "@/components/profile/EventsSection";
import ScholarshipsSection from "@/components/profile/ScholarshipsSection";
import SkillAnalytics from "@/components/profile/SkillAnalytics";
import AchievementsSection from "@/components/profile/AchievementsSection";
import SettingsSection from "@/components/profile/SettingsSection";

const Profile = () => {
  const [searchParams] = useSearchParams();
  const sectionParam = searchParams.get("section");
  const [activeSection, setActiveSection] = useState(
    sectionParam || "overview"
  );

  useEffect(() => {
    if (sectionParam) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam]);

  const sections = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "courses", label: "Courses", icon: "📚" },
    { id: "internships", label: "Internships", icon: "💼" },
    { id: "events", label: "Events", icon: "📅" },
    { id: "scholarships", label: "Scholarships", icon: "🎓" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "achievements", label: "Achievements", icon: "🏆" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            <OverviewCards />
            <DailyPlanner />
          </>
        );
      case "courses":
        return <CoursesPanel />;
      case "internships":
        return <InternshipTracker />;
      case "events":
        return <EventsSection />;
      case "scholarships":
        return <ScholarshipsSection />;
      case "analytics":
        return <SkillAnalytics />;
      case "achievements":
        return <AchievementsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <OverviewCards />;
    }
  };

  return (
    // Removed outermost div with min-h-screen and direct bg/text colors and overflow-x-hidden.
    // UserLayout will provide these.
    // The pt-8 px-4 sm:px-6 lg:px-8 are also handled by UserLayout.
    <div className="max-w-7xl mx-auto">
      {" "}
      {/* Keep max-width and horizontal margins */}
      {/* Profile Close Button */}
      <ProfileCloseButton />
      {/* Hero Section with Heading and Subheading */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-brand-purple to-brand-pink bg-clip-text text-transparent leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Dashboard, Your Journey{" "}
          <motion.span
            className="inline-block"
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            🚀
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Everything you need to grow, learn, and succeed in one{" "}
          <span className="bg-gradient-to-r from-brand-purple to-brand-pink bg-clip-text text-transparent font-semibold">
            unified dashboard
          </span>
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center items-center gap-4 mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-brand-purple to-transparent" />
          <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-brand-pink to-transparent" />
        </motion.div>
      </motion.div>
      <ProfileHeader />
      {/* Navigation Tabs */}
      <div className="mb-8 mt-8">
        <div className="flex flex-wrap gap-2 bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeSection === section.id
                  ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="hidden sm:inline">{section.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Active Section Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-16"
      >
        {renderActiveSection()}
      </motion.div>
    </div>
  );
};

export default Profile;
