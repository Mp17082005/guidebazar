import { motion } from "framer-motion";
// REMOVED: import Navbar from "@/components/Navbar";
// REMOVED: import Footer from "@/components/Footer";

const FreeCourses = () => {
  return (
    // Removed the outermost div with min-h-screen and direct bg/text colors.
    // UserLayout will provide the min-h-screen, bg-black, and text-white.
    // The pt-24 pb-16 are also handled by UserLayout.
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4" // Keep container and horizontal padding
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Free Courses
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Access quality education at no cost with our free course offerings.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center text-white/60"
      >
        Coming soon...
      </motion.div>
    </motion.div>
  );
};

export default FreeCourses;
