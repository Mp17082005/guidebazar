import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// REMOVED: import Navbar from "@/components/Navbar";
// REMOVED: import Footer from "@/components/Footer";
import InternshipHero from "@/components/internships/InternshipHero";
import InternshipFilters from "@/components/internships/InternshipFilters";
import InternshipGrid from "@/components/internships/InternshipGrid";
import HiringBanner from "@/components/internships/HiringBanner";
import PostInternshipCTA from "@/components/internships/PostInternshipCTA";

const Internships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    // Removed outermost div with min-h-screen and direct bg/text colors and overflow-x-hidden.
    // UserLayout will provide these.
    // The pt-20 pb-16 are also handled by UserLayout.
    <div className="relative z-10 w-full">
      {" "}
      {/* Keep this wrapper for internal layout */}
      <div className="w-full px-4">
        {" "}
        {/* Removed pt-20 pb-16 from here, UserLayout handles it */}
        <motion.div
          className="max-w-7xl mx-auto space-y-8 sm:space-y-12 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Section */}
          <InternshipHero />

          {/* Hiring Banner */}
          <HiringBanner />

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <InternshipFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedDomain={selectedDomain}
              setSelectedDomain={setSelectedDomain}
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
            />
          </motion.div>

          {/* Internship Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full"
          >
            <InternshipGrid
              searchQuery={searchQuery}
              selectedType={selectedType}
              selectedDomain={selectedDomain}
              selectedDuration={selectedDuration}
            />
          </motion.div>

          {/* Post Internship CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full"
          >
            <PostInternshipCTA />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Internships;
