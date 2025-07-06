import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// Removed: import Navbar from "@/components/Navbar";
// Removed: import Footer from "@/components/Footer";

// Refactored components (these imports are correct as they point to shared components)
import FinanceHero from "@/components/finance/FinanceHero";
import SmartFilters from "@/components/finance/SmartFilters";
import GuidedPath from "@/components/finance/GuidedPath";
import LearningCards from "@/components/finance/LearningCards";
import SmartTools from "@/components/finance/SmartTools";
import RecommendationsSection from "@/components/finance/RecommendationsSection";
import CallToActionSection from "@/components/finance/CallToActionSection";

// Renamed the main component from 'Finance' to 'AdminFinance'
const AdminFinance = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
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
            className="max-w-7xl mx-auto space-y-12 sm:space-y-16 md:space-y-20 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Hero Section */}
            <FinanceHero
              showAdvanced={showAdvanced}
              setShowAdvanced={setShowAdvanced}
            />

            {/* Smart Tools & Calculators - Now second section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <SmartTools />
            </motion.div>

            {/* Smart Filters + Search */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full"
            >
              <SmartFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </motion.div>

            {/* Guided Path / Interactive Quiz */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <GuidedPath />
            </motion.div>

            {/* Core Learning Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-full"
            >
              <LearningCards selectedCategory={selectedCategory} />
            </motion.div>

            {/* Recommendations & Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full"
            >
              <RecommendationsSection />
            </motion.div>

            {/* Call-to-Action Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="w-full"
            >
              <CallToActionSection />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Removed: <Footer /> */}
    </div>
  );
};

// Changed export default from Finance to AdminFinance
export default AdminFinance;
