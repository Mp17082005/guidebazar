// // // import { useState, useEffect } from "react";
// // // import { motion, useScroll, useTransform } from "framer-motion";
// // // import Navbar from "@/components/Navbar";
// // // import Hero from "@/components/Hero";
// // // import NewsTicker from "@/components/NewsTicker";
// // // import TrendingContent from "@/components/TrendingContent";
// // // import EventCarousel from "@/components/EventCarousel";
// // // import Footer from "@/components/Footer";
// // // import Timeline from "@/components/Timeline";
// // // import StatsSection from "@/components/StatsSection";
// // // import StudentDiscountPreview from "@/components/StudentDiscountPreview";
// // // import GradientSeparator from "@/components/GradientSeparator";

// // // const Index = () => {
// // //   const [mounted, setMounted] = useState(false);
// // //   const { scrollYProgress } = useScroll();

// // //   // Parallax effects for background elements
// // //   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
// // //   const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
// // //   const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

// // //   useEffect(() => {
// // //     setMounted(true);
// // //     return () => setMounted(false);
// // //   }, []);

// // //   // Page transition variants
// // //   const pageVariants = {
// // //     initial: { opacity: 0 },
// // //     animate: {
// // //       opacity: 1,
// // //       transition: {
// // //         duration: 0.8,
// // //         staggerChildren: 0.2,
// // //       }
// // //     },
// // //   };

// // //   const sectionVariants = {
// // //     initial: { opacity: 0, y: 50 },
// // //     animate: {
// // //       opacity: 1,
// // //       y: 0,
// // //       transition: {
// // //         duration: 0.8,
// // //         ease: "easeOut"
// // //       }
// // //     },
// // //   };

// // //   if (!mounted) {
// // //     return (
// // //       <div className="min-h-screen bg-black flex items-center justify-center">
// // //         <motion.div
// // //           animate={{ rotate: 360 }}
// // //           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// // //           className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full"
// // //         />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <motion.div
// // //       variants={pageVariants}
// // //       initial="initial"
// // //       animate="animate"
// // //       className="min-h-screen text-white overflow-x-hidden"
// // //     >
// // //       {/* Black background moved to the farthest back for animation visibility */}
// // //       <div className="fixed inset-0 -z-50 bg-black" />
// // //       {/* Enhanced Animated background */}
// // //       <div className="fixed inset-0 -z-10 overflow-hidden">
// // //         {/* Grid pattern with animation */}
// // //         <motion.div
// // //           style={{ y: backgroundY }}
// // //           className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
// // //         />

// // //         {/* Animated border lines */}
// // //         <motion.div
// // //           className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
// // //           animate={{
// // //             background: [
// // //               "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
// // //               "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.3), transparent)",
// // //               "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
// // //             ]
// // //           }}
// // //           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // //         />
// // //         <motion.div
// // //           className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
// // //           animate={{
// // //             background: [
// // //               "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
// // //               "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.3), transparent)",
// // //               "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
// // //             ]
// // //           }}
// // //           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
// // //         />
// // //         <motion.div
// // //           className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
// // //           animate={{
// // //             background: [
// // //               "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
// // //               "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.3), transparent)",
// // //               "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
// // //             ]
// // //           }}
// // //           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
// // //         />
// // //         <motion.div
// // //           className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
// // //           animate={{
// // //             background: [
// // //               "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
// // //               "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.3), transparent)",
// // //               "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
// // //             ]
// // //           }}
// // //           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
// // //         />

// // //         {/* Enhanced animated glow spots with parallax */}
// // //         <motion.div
// // //           style={{ y: glowY1 }}
// // //           className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
// // //           animate={{
// // //             background: [
// // //               "radial-gradient(circle, rgba(209, 58, 255, 0.2), transparent)",
// // //               "radial-gradient(circle, rgba(255, 77, 160, 0.3), transparent)",
// // //               "radial-gradient(circle, rgba(209, 58, 255, 0.2), transparent)",
// // //             ],
// // //             scale: [1, 1.2, 1],
// // //           }}
// // //           transition={{
// // //             background: { duration: 6, repeat: Infinity, ease: "easeInOut" },
// // //             scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
// // //           }}
// // //         />
// // //         <motion.div
// // //           style={{ y: glowY2 }}
// // //           className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
// // //           animate={{
// // //             background: [
// // //               "radial-gradient(circle, rgba(255, 77, 160, 0.2), transparent)",
// // //               "radial-gradient(circle, rgba(209, 58, 255, 0.3), transparent)",
// // //               "radial-gradient(circle, rgba(255, 77, 160, 0.2), transparent)",
// // //             ],
// // //             scale: [1.2, 1, 1.2],
// // //           }}
// // //           transition={{
// // //             background: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 },
// // //             scale: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }
// // //           }}
// // //         />

// // //         {/* Additional floating particles */}
// // //         {[...Array(6)].map((_, i) => (
// // //           <motion.div
// // //             key={i}
// // //             className="absolute w-2 h-2 bg-white/10 rounded-full"
// // //             style={{
// // //               left: `${20 + i * 15}%`,
// // //               top: `${30 + i * 10}%`,
// // //             }}
// // //             animate={{
// // //               y: [0, -20, 0],
// // //               opacity: [0.1, 0.3, 0.1],
// // //               scale: [1, 1.5, 1],
// // //             }}
// // //             transition={{
// // //               duration: 4 + i,
// // //               repeat: Infinity,
// // //               ease: "easeInOut",
// // //               delay: i * 0.5,
// // //             }}
// // //           />
// // //         ))}
// // //       </div>

// // //       {/* Cosmic planet arc and floating stars background */}
// // //       <div className="fixed inset-0 -z-20 pointer-events-none">
// // //         {/* Large glowing arc (planet) at bottom center */}
// // //         <div
// // //           className="absolute left-1/2 bottom-[-120px] -translate-x-1/2"
// // //           style={{
// // //             width: '120vw',
// // //             height: '60vh',
// // //             borderRadius: '50% 50% 0 0/100% 100% 0 0',
// // //             background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.25) 0%, rgba(236,72,153,0.18) 40%, rgba(17,24,39,0.01) 80%)',
// // //             filter: 'blur(32px)',
// // //             boxShadow: '0 0 120px 60px #8B5CF6, 0 0 240px 120px #EC4899',
// // //             opacity: 0.85,
// // //           }}
// // //         />
// // //         {/* Soft floating stars */}
// // //         {[...Array(18)].map((_, i) => (
// // //           <motion.div
// // //             key={i}
// // //             className="absolute rounded-full bg-white/20 shadow-lg"
// // //             style={{
// // //               width: `${1.5 + Math.random() * 2.5}px`,
// // //               height: `${1.5 + Math.random() * 2.5}px`,
// // //               left: `${10 + Math.random() * 80}%`,
// // //               top: `${5 + Math.random() * 80}%`,
// // //               filter: 'blur(0.5px)',
// // //             }}
// // //             animate={{
// // //               y: [0, -10 - Math.random() * 20, 0],
// // //               opacity: [0.5, 1, 0.5],
// // //             }}
// // //             transition={{
// // //               duration: 8 + Math.random() * 6,
// // //               repeat: Infinity,
// // //               ease: 'easeInOut',
// // //               delay: i * 0.3,
// // //             }}
// // //           />
// // //         ))}
// // //       </div>

// // //       <Navbar />

// // //       <motion.div
// // //         variants={sectionVariants}
// // //         className="relative z-10 w-full overflow-x-hidden"
// // //       >
// // //         <Hero />
// // //         <motion.div
// // //           variants={sectionVariants}
// // //           className="w-full overflow-x-hidden"
// // //         >
// // //           <NewsTicker
// // //   items={[
// // //     { text: " Participate on Devpost", link: "https://devpost.com/" },
// // //     { text: " Crack challenges on Unstop", link: "https://unstop.com/" },
// // //     { text: " Govt Jobs – Apply via NCS", link: "https://www.ncs.gov.in/" },
// // //     { text: " Internships at ISRO", link: "https://www.isro.gov.in/Careers.html" },
// // //     { text: " Explore DRDO Opportunities", link: "https://drdo.gov.in/careers" },
// // //     { text: " MyGov Internships", link: "https://mygov.in/campaigns/internship/" },
// // //     { text: " CDAC Job Openings", link: "https://cdac.in/index.aspx?id=job_opportunities" },
// // //   ]}
// // // />


// // //           {/* Separator after NewsTicker */}
// // //           <motion.div
// // //             initial={{ opacity: 0, scaleX: 0 }}
// // //             whileInView={{ opacity: 1, scaleX: 1 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 1, ease: "easeOut" }}
// // //             className="container mx-auto px-4 py-8"
// // //           >
// // //             <GradientSeparator thickness="medium" opacity="medium" />
// // //           </motion.div>

// // //           <EventCarousel />

// // //           {/* Separator after EventCarousel */}
// // //           <motion.div
// // //             initial={{ opacity: 0, scaleX: 0 }}
// // //             whileInView={{ opacity: 1, scaleX: 1 }}
// // //             viewport={{ once: true }}
// // //             transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
// // //             className="container mx-auto px-4 py-8"
// // //           >
// // //             <GradientSeparator thickness="medium" opacity="medium" />
// // //           </motion.div>

// // //           <TrendingContent />
// // //         </motion.div>
// // //       </motion.div>

// // //       {/* Separator before StudentDiscountPreview */}
// // //       <motion.div
// // //         initial={{ opacity: 0, scaleX: 0 }}
// // //         whileInView={{ opacity: 1, scaleX: 1 }}
// // //         viewport={{ once: true }}
// // //         transition={{ duration: 1, ease: "easeOut" }}
// // //         className="container mx-auto px-4 py-12"
// // //       >
// // //         <GradientSeparator thickness="thick" opacity="high" />
// // //       </motion.div>

// // //       <motion.div
// // //         initial={{ opacity: 0, y: 100 }}
// // //         whileInView={{ opacity: 1, y: 0 }}
// // //         viewport={{ once: true, amount: 0.1 }}
// // //         transition={{ duration: 1, ease: "easeOut" }}
// // //       >
// // //         <StudentDiscountPreview />
// // //       </motion.div>

// // //       {/* Separator before Timeline */}
// // //       <motion.div
// // //         initial={{ opacity: 0, scaleX: 0 }}
// // //         whileInView={{ opacity: 1, scaleX: 1 }}
// // //         viewport={{ once: true }}
// // //         transition={{ duration: 1, ease: "easeOut" }}
// // //         className="container mx-auto px-4 py-12"
// // //       >
// // //         <GradientSeparator thickness="thick" opacity="high" />
// // //       </motion.div>

// // //       <motion.div
// // //         initial={{ opacity: 0, y: 100 }}
// // //         whileInView={{ opacity: 1, y: 0 }}
// // //         viewport={{ once: true, amount: 0.1 }}
// // //         transition={{ duration: 1, ease: "easeOut" }}
// // //       >
// // //         <Timeline />
// // //       </motion.div>

// // //       {/* Separator before StatsSection */}
// // //       <motion.div
// // //         initial={{ opacity: 0, scaleX: 0 }}
// // //         whileInView={{ opacity: 1, scaleX: 1 }}
// // //         viewport={{ once: true }}
// // //         transition={{ duration: 1, ease: "easeOut" }}
// // //         className="container mx-auto px-4 py-12"
// // //       >
// // //         <GradientSeparator thickness="thick" opacity="high" />
// // //       </motion.div>

// // //       <motion.div
// // //         initial={{ opacity: 0, y: 100 }}
// // //         whileInView={{ opacity: 1, y: 0 }}
// // //         viewport={{ once: true, amount: 0.1 }}
// // //         transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
// // //       >
// // //         <StatsSection />
// // //       </motion.div>

// // //       {/* Separator before Footer */}
// // //       <motion.div
// // //         initial={{ opacity: 0, scaleX: 0 }}
// // //         whileInView={{ opacity: 1, scaleX: 1 }}
// // //         viewport={{ once: true }}
// // //         transition={{ duration: 1, ease: "easeOut" }}
// // //         className="container mx-auto px-4 py-12"
// // //       >
// // //         <GradientSeparator thickness="thick" opacity="high" />
// // //       </motion.div>

// // //       <motion.div
// // //         initial={{ opacity: 0 }}
// // //         whileInView={{ opacity: 1 }}
// // //         viewport={{ once: true }}
// // //         transition={{ duration: 0.8 }}
// // //       >
// // //         <Footer />
// // //       </motion.div>
// // //     </motion.div>
// // //   );
// // // };

// // import { useState, useEffect } from "react";
// // import { motion, useScroll, useTransform } from "framer-motion";
// // // REMOVED: import Navbar from "@/components/Navbar";
// // import Hero from "@/components/Hero";
// // import NewsTicker from "@/components/NewsTicker";
// // import TrendingContent from "@/components/TrendingContent";
// // import EventCarousel from "@/components/EventCarousel";
// // // REMOVED: import Footer from "@/components/Footer";
// // import Timeline from "@/components/Timeline";
// // import StatsSection from "@/components/StatsSection";
// // import StudentDiscountPreview from "@/components/StudentDiscountPreview";
// // import GradientSeparator from "@/components/GradientSeparator";

// // const Index = () => {
// //   const [mounted, setMounted] = useState(false);
// //   const { scrollYProgress } = useScroll();

// //   // Parallax effects for background elements
// //   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
// //   const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
// //   const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

// //   useEffect(() => {
// //     setMounted(true);
// //     return () => {
// //       setMounted(false);
// //     };
// //   }, []);

// //   // Page transition variants
// //   const pageVariants = {
// //     initial: { opacity: 0 },
// //     animate: {
// //       opacity: 1,
// //       transition: {
// //         duration: 0.8,
// //         staggerChildren: 0.2,
// //       },
// //     },
// //   };

// //   const sectionVariants = {
// //     initial: { opacity: 0, y: 50 },
// //     animate: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.8,
// //         ease: "easeOut",
// //       },
// //     },
// //   };

// //   if (!mounted) {
// //     return (
// //       <div className="min-h-screen bg-black flex items-center justify-center">
// //         <motion.div
// //           animate={{ rotate: 360 }}
// //           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
// //           className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full"
// //         />
// //       </div>
// //     );
// //   }

// //   return (
// //     // Removed: min-h-screen from here. UserLayout provides it.
// //     // Added: pt-0 to ensure content starts right after UserLayout's padding.
// //     <motion.div
// //       variants={pageVariants}
// //       initial="initial"
// //       animate="animate"
// //       className="text-white overflow-x-hidden pt-0" // Removed min-h-screen, added pt-0
// //     >
// //       {/* Background elements remain fixed and behind content */}
// //       <div className="fixed inset-0 -z-50 bg-black" />
// //       <div className="fixed inset-0 -z-10 overflow-hidden">
// //         <motion.div
// //           style={{ y: backgroundY }}
// //           className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
// //         />
// //         <motion.div
// //           className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
// //           animate={{
// //             background: [
// //               "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
// //               "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.3), transparent)",
// //               "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
// //             ],
// //           }}
// //           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// //         />
// //         <motion.div
// //           className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent"
// //           animate={{
// //             background: [
// //               "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
// //               "linear-gradient(90deg, transparent, rgba(209, 58, 255, 0.3), transparent)",
// //               "linear-gradient(90deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
// //             ],
// //           }}
// //           transition={{
// //             duration: 4,
// //             repeat: Infinity,
// //             ease: "easeInOut",
// //             delay: 2,
// //           }}
// //         />
// //         <motion.div
// //           className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
// //           animate={{
// //             background: [
// //               "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
// //               "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.3), transparent)",
// //               "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.2), transparent)",
// //             ],
// //           }}
// //           transition={{
// //             duration: 5,
// //             repeat: Infinity,
// //             ease: "easeInOut",
// //             delay: 1,
// //           }}
// //         />
// //         <motion.div
// //           className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-purple/20 to-transparent"
// //           animate={{
// //             background: [
// //               "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
// //               "linear-gradient(180deg, transparent, rgba(209, 58, 255, 0.3), transparent)",
// //               "linear-gradient(180deg, transparent, rgba(255, 77, 160, 0.2), transparent)",
// //             ],
// //           }}
// //           transition={{
// //             duration: 5,
// //             repeat: Infinity,
// //             ease: "easeInOut",
// //             delay: 3,
// //           }}
// //         />

// //         {/* Enhanced animated glow spots with parallax */}
// //         <motion.div
// //           style={{ y: glowY1 }}
// //           className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
// //           animate={{
// //             background: [
// //               "radial-gradient(circle, rgba(209, 58, 255, 0.2), transparent)",
// //               "radial-gradient(circle, rgba(255, 77, 160, 0.3), transparent)",
// //               "radial-gradient(circle, rgba(209, 58, 255, 0.2), transparent)",
// //             ],
// //             scale: [1, 1.2, 1],
// //           }}
// //           transition={{
// //             background: { duration: 6, repeat: Infinity, ease: "easeInOut" },
// //             scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
// //           }}
// //         />
// //         <motion.div
// //           style={{ y: glowY2 }}
// //           className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30"
// //           animate={{
// //             background: [
// //               "radial-gradient(circle, rgba(255, 77, 160, 0.2), transparent)",
// //               "radial-gradient(circle, rgba(209, 58, 255, 0.3), transparent)",
// //               "radial-gradient(circle, rgba(255, 77, 160, 0.2), transparent)",
// //             ],
// //             scale: [1.2, 1, 1.2],
// //           }}
// //           transition={{
// //             background: {
// //               duration: 6,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //               delay: 3,
// //             },
// //             scale: {
// //               duration: 8,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //               delay: 4,
// //             },
// //           }}
// //         />

// //         {/* Additional floating particles */}
// //         {[...Array(6)].map((_, i) => (
// //           <motion.div
// //             key={i}
// //             className="absolute w-2 h-2 bg-white/10 rounded-full"
// //             style={{
// //               left: `${20 + i * 15}%`,
// //               top: `${30 + i * 10}%`,
// //             }}
// //             animate={{
// //               y: [0, -20, 0],
// //               opacity: [0.1, 0.3, 0.1],
// //               scale: [1, 1.5, 1],
// //             }}
// //             transition={{
// //               duration: 4 + i,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //               delay: i * 0.5,
// //             }}
// //           />
// //         ))}
// //       </div>

// //       <motion.div
// //         variants={sectionVariants}
// //         className="relative z-10 w-full overflow-x-hidden"
// //       >
// //         {/* All your content components */}
// //         <Hero />
// //         <motion.div
// //           variants={sectionVariants}
// //           className="w-full overflow-x-hidden"
// //         >
// //           <NewsTicker
// //             items={[
// //               { text: " Participate on Devpost", link: "https://devpost.com/" },
// //               {
// //                 text: " Crack challenges on Unstop",
// //                 link: "https://unstop.com/",
// //               },
// //               {
// //                 text: " Govt Jobs – Apply via NCS",
// //                 link: "https://www.ncs.gov.in/",
// //               },
// //               {
// //                 text: " Internships at ISRO",
// //                 link: "https://www.isro.gov.in/Careers.html",
// //               },
// //               {
// //                 text: " Explore DRDO Opportunities",
// //                 link: "https://drdo.gov.in/careers",
// //               },
// //               {
// //                 text: " MyGov Internships",
// //                 link: "https://mygov.in/campaigns/internship/",
// //               },
// //               {
// //                 text: " CDAC Job Openings",
// //                 link: "https://cdac.in/index.aspx?id=job_opportunities",
// //               },
// //             ]}
// //           />

// //           {/* Separator after NewsTicker */}
// //           <motion.div
// //             initial={{ opacity: 0, scaleX: 0 }}
// //             whileInView={{ opacity: 1, scaleX: 1 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 1, ease: "easeOut" }}
// //             className="container mx-auto px-4 py-8"
// //           >
// //             <GradientSeparator thickness="medium" opacity="medium" />
// //           </motion.div>

// //           <EventCarousel />

// //           {/* Separator after EventCarousel */}
// //           <motion.div
// //             initial={{ opacity: 0, scaleX: 0 }}
// //             whileInView={{ opacity: 1, scaleX: 1 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
// //             className="container mx-auto px-4 py-8"
// //           >
// //             <GradientSeparator thickness="medium" opacity="medium" />
// //           </motion.div>

// //           <TrendingContent />
// //         </motion.div>
// //       </motion.div>

// //       {/* Separator before StudentDiscountPreview */}
// //       <motion.div
// //         initial={{ opacity: 0, scaleX: 0 }}
// //         whileInView={{ opacity: 1, scaleX: 1 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 1, ease: "easeOut" }}
// //         className="container mx-auto px-4 py-12"
// //       >
// //         <GradientSeparator thickness="thick" opacity="high" />
// //       </motion.div>

// //       <motion.div
// //         initial={{ opacity: 0, y: 100 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true, amount: 0.1 }}
// //         transition={{ duration: 1, ease: "easeOut" }}
// //       >
// //         <StudentDiscountPreview />
// //       </motion.div>

// //       {/* Separator before Timeline */}
// //       <motion.div
// //         initial={{ opacity: 0, scaleX: 0 }}
// //         whileInView={{ opacity: 1, scaleX: 1 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 1, ease: "easeOut" }}
// //         className="container mx-auto px-4 py-12"
// //       >
// //         <GradientSeparator thickness="thick" opacity="high" />
// //       </motion.div>

// //       <motion.div
// //         initial={{ opacity: 0, y: 100 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true, amount: 0.1 }}
// //         transition={{ duration: 1, ease: "easeOut" }}
// //       >
// //         <Timeline />
// //       </motion.div>

// //       {/* Separator before StatsSection */}
// //       <motion.div
// //         initial={{ opacity: 0, scaleX: 0 }}
// //         whileInView={{ opacity: 1, scaleX: 1 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 1, ease: "easeOut" }}
// //         className="container mx-auto px-4 py-12"
// //       >
// //         <GradientSeparator thickness="thick" opacity="high" />
// //       </motion.div>

// //       <motion.div
// //         initial={{ opacity: 0, y: 100 }}
// //         whileInView={{ opacity: 1, y: 0 }}
// //         viewport={{ once: true, amount: 0.1 }}
// //         transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
// //       >
// //         <StatsSection />
// //       </motion.div>

// //       {/* Footer is now handled by UserLayout, no need to render it here */}
// //     </motion.div>
// //   );
// // };

// // export default Index;


// import { useState, useEffect } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// // REMOVED: import Navbar from "@/components/Navbar"; // Already removed
// import Hero from "@/components/Hero";
// import NewsTicker from "@/components/NewsTicker";
// import TrendingContent from "@/components/TrendingContent";
// import EventCarousel from "@/components/EventCarousel";
// // REMOVED: import Footer from "@/components/Footer"; // Already removed
// import Timeline from "@/components/Timeline";
// import StatsSection from "@/components/StatsSection";
// import StudentDiscountPreview from "@/components/StudentDiscountPreview";
// import GradientSeparator from "@/components/GradientSeparator";

// const Index = () => {
//   const [mounted, setMounted] = useState(false);
//   const { scrollYProgress } = useScroll();

//   // Parallax effects for background elements - THESE ARE NOW IN USERLAYOUT
//   // const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
//   // const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
//   // const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

//   useEffect(() => {
//     setMounted(true);
//     return () => setMounted(false);
//   }, []);

//   // Page transition variants
//   const pageVariants = {
//     initial: { opacity: 0 },
//     animate: {
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const sectionVariants = {
//     initial: { opacity: 0, y: 50 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       },
//     },
//   };

//   return (
//     // Removed the outermost div that had min-h-screen and direct bg/text colors.
//     // UserLayout now provides these.
//     // The pt-0n was also removed.
//     // Ensure this main div has `position: relative` if any children use absolute positioning
//     <motion.div
//       className="relative z-10 w-full" // Added relative and z-10
//       variants={pageVariants}
//       initial="initial"
//       animate={mounted ? "animate" : "initial"} // Animate only after component mounts
//     >
//       {/* Background elements removed from here, now in UserLayout */}

//       {/* Hero Section */}
//       <motion.div variants={sectionVariants}>
//         <Hero />
//       </motion.div>

//       {/* News Ticker */}
//       <motion.div variants={sectionVariants}>
//         <NewsTicker />
//       </motion.div>

//       {/* Trending Content */}
//       <motion.div variants={sectionVariants}>
//         <TrendingContent />
//       </motion.div>

//       {/* Event Carousel */}
//       <motion.div variants={sectionVariants}>
//         <EventCarousel />
//       </motion.div>

//       {/* Student Discount Preview */}
//       <motion.div
//         initial={{ opacity: 0, y: 100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.1 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       >
//         <StudentDiscountPreview />
//       </motion.div>

//       {/* Separator before Timeline */}
//       <motion.div
//         initial={{ opacity: 0, scaleX: 0 }}
//         whileInView={{ opacity: 1, scaleX: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className="container mx-auto px-4 py-12"
//       >
//         <GradientSeparator thickness="thick" opacity="high" />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.1 }}
//         transition={{ duration: 1, ease: "easeOut" }}
//       >
//         <Timeline />
//       </motion.div>

//       {/* Separator before StatsSection */}
//       <motion.div
//         initial={{ opacity: 0, scaleX: 0 }}
//         whileInView={{ opacity: 1, scaleX: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className="container mx-auto px-4 py-12"
//       >
//         <GradientSeparator thickness="thick" opacity="high" />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 100 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.1 }}
//         transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
//       >
//         <StatsSection />
//       </motion.div>

//       {/* Separator before Footer */}
//       <motion.div
//         initial={{ opacity: 0, scaleX: 0 }}
//         whileInView={{ opacity: 1, scaleX: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1, ease: "easeOut" }}
//         className="container mx-auto px-4 py-12"
//       >
//         <GradientSeparator thickness="thick" opacity="high" />
//       </motion.div>

//       {/* REMOVED: <Footer /> */}
//     </motion.div>
//   );
// };

// export default Index;

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NewsTicker from "@/components/NewsTicker"; // Ensure this import is correct
import TrendingContent from "@/components/TrendingContent";
import EventCarousel from "@/components/EventCarousel";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import StatsSection from "@/components/StatsSection";
import StudentDiscountPreview from "@/components/StudentDiscountPreview";
import GradientSeparator from "@/components/GradientSeparator";

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax effects for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const glowY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // --- News Ticker Data ---
  const newsItems = [
    { text: "New Scholarship Opportunities Available!", link: "/scholarships" },
    { text: "Join Our Upcoming Tech Summit - Register Now!", link: "/events" },
    {
      text: "Exclusive Student Discounts on Software!",
      link: "/student-discounts",
    },
    {
      text: "Internship Applications Open for Summer 2025!",
      link: "/internships",
    },
    {
      text: "Financial Literacy Workshop Series Begins Soon!",
      link: "/finance",
    },
    { text: "Explore Our New Free Courses!", link: "/free-courses" },
    { text: "Connect with Mentors in Our Student Network!", link: "/network" },
    { text: "Startup Pitch Competition - Apply Today!", link: "/startups" },
    { text: "Latest Blog Post: Mastering Time Management!", link: "/blogs" },
    { text: "Check Out Our New Podcast Episodes!", link: "/podcasts" },
  ];

  return (
    <motion.div
      className="min-h-screen bg-black text-white relative overflow-x-hidden"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      {/* Background elements for parallax effect */}
      {mounted && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url('/images/hero-background.jpg')`, // Ensure this path is correct
              y: backgroundY,
            }}
          ></motion.div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-purple rounded-full mix-blend-screen filter blur-3xl opacity-30"
            style={{ y: glowY1 }}
          ></motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-pink rounded-full mix-blend-screen filter blur-3xl opacity-30"
            style={{ y: glowY2 }}
          ></motion.div>
        </>
      )}

      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <motion.div variants={sectionVariants}>
          <Hero />
        </motion.div>

        {/* News Ticker Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NewsTicker items={newsItems} /> {/* Pass the newsItems here */}
        </motion.div>

        {/* Trending Content Section */}
        <motion.div variants={sectionVariants}>
          <TrendingContent />
        </motion.div>

        {/* Event Carousel Section */}
        <motion.div variants={sectionVariants}>
          <EventCarousel />
        </motion.div>

        {/* Student Discount Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <StudentDiscountPreview />
        </motion.div>

        {/* Separator before Timeline */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="container mx-auto px-4 py-12"
        >
          <GradientSeparator thickness="thick" opacity="high" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Timeline />
        </motion.div>

        {/* Separator before StatsSection */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="container mx-auto px-4 py-12"
        >
          <GradientSeparator thickness="thick" opacity="high" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <StatsSection />
        </motion.div>

        {/* Separator before Footer */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="container mx-auto px-4 py-12"
        >
          <GradientSeparator thickness="thick" opacity="high" />
        </motion.div>
      </main>

      <Footer />
    </motion.div>
  );
};

export default Index;
