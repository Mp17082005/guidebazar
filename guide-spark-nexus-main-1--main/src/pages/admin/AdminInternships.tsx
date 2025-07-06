import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Removed: import Navbar from "@/components/Navbar";
// Removed: import Footer from "@/components/Footer";
import InternshipHero from "@/components/internships/InternshipHero";
import InternshipFilters from "@/components/internships/InternshipFilters";
import InternshipGrid from "@/components/internships/InternshipGrid";
import HiringBanner from "@/components/internships/HiringBanner";
import PostInternshipCTA from "@/components/internships/PostInternshipCTA";

// Renamed the main component from 'Internships' to 'AdminInternships'
const AdminInternships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      {/* Removed: <Navbar /> */}

      <div className="relative z-10 w-full">
        <div className="w-full px-4 pt-20 pb-16">
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

      {/* Removed: <Footer /> */}
    </div>
  );
};

// Changed export default from Internships to AdminInternships
export default AdminInternships;
