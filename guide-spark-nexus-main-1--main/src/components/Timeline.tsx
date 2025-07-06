import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const milestones = [
    {
        number: "01",
        year: "2021",
        title: "Launched Guide Bazaar Alpha",
        description: "Started with a vision to connect students nationwide with comprehensive learning resources.",
    },
    {
        number: "02",
        year: "2021",
        title: "First Community Hub",
        description: "Reached 1,000+ active students across 50+ colleges and universities.",
    },
    {
        number: "03",
        year: "2022",
        title: "Platform Beta Launch",
        description: "Launched a comprehensive platform for student resources and career guidance.",
    },
    {
        number: "04",
        year: "2022",
        title: "Startup Incubation Program",
        description: "Introduced startup mentorship and funding programs for student entrepreneurs.",
    },
    {
        number: "05",
        year: "2023",
        title: "Financial Literacy Suite",
        description: "Added comprehensive finance education tools and investment guidance.",
    },
    {
        number: "06",
        year: "2023",
        title: "Internship Network Launch",
        description: "Connected students with 500+ internship opportunities from top companies.",
    },
    {
        number: "07",
        year: "2023",
        title: "Scholarship Portal",
        description: "Helped students access ₹50+ crores in scholarships and grants.",
    },
    {
        number: "08",
        year: "2024",
        title: "AI Career Guidance",
        description: "Implemented AI-powered career guidance and personalized learning paths.",
    },
    {
        number: "09",
        year: "2024",
        title: "Global Community Expansion",
        description: "Extended services to international students and global universities.",
    },
    {
        number: "10",
        year: "2025",
        title: "Future Vision Roadmap",
        description: "Building the world's largest student ecosystem and learning community.",
    },
];

const Timeline = () => {
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start end", "end start"],
    });

    // Smooth spring animations for better performance
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
    const knobY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), springConfig);
    const lineProgress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), springConfig);

    // Parallax effects
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const headerY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section className="relative bg-black py-16 px-4 overflow-hidden">
            {/* Animated Background Elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute inset-0 opacity-30"
            >
                <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute top-1/3 right-20 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
            </motion.div>

            {/* Section Header with Parallax */}
            <motion.div
                style={{ y: headerY }}
                className="text-center mb-16 relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    <motion.h2
                        className="text-4xl md:text-6xl font-bold text-white mb-4 relative"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        style={{
                            background: "linear-gradient(90deg, #ffffff, #d13aff, #ff4da0, #ffffff)",
                            backgroundSize: "200% 100%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Our Journey
                    </motion.h2>


                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
                >
                    From a simple vision to a thriving ecosystem - discover the milestones that shaped our story
                </motion.p>

                {/* Animated underline */}
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-4 rounded-full"
                />
            </motion.div>

            <div
                className="w-full max-w-6xl mx-auto relative"
                ref={timelineRef}
            >
                {/* Vertical Timeline Line with Enhanced Animation */}
                <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 z-0">
                    {/* Background line with pulse effect */}
                    <motion.div
                        className="w-full h-full bg-white/10 rounded-full relative overflow-hidden"
                        animate={{
                            boxShadow: [
                                "0 0 0px 0px rgba(209, 58, 255, 0.1)",
                                "0 0 8px 2px rgba(209, 58, 255, 0.2)",
                                "0 0 0px 0px rgba(209, 58, 255, 0.1)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {/* Animated shimmer effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            style={{ height: "20%" }}
                        />
                    </motion.div>

                    {/* Animated progress line */}
                    <motion.div
                        className="absolute top-0 left-0 w-full rounded-full overflow-hidden"
                        style={{
                            height: useTransform(lineProgress, [0, 1], ["0%", "100%"]),
                        }}
                    >
                        <motion.div
                            className="w-full h-full relative"
                            style={{
                                background: "linear-gradient(to bottom, #d13aff, #ff4da0, #d13aff)",
                                backgroundSize: "100% 200%",
                            }}
                            animate={{
                                backgroundPosition: ["0% 0%", "0% 100%"],
                                boxShadow: [
                                    "0 0 8px 1px #d13aff33, 0 0 16px 2px #ff4da033",
                                    "0 0 12px 2px #ff4da033, 0 0 20px 3px #d13aff33",
                                ],
                            }}
                            transition={{
                                backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" },
                                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                            }}
                        />
                    </motion.div>
                </div>

                {/* Timeline Items with Enhanced Animations */}
                <div className="relative z-10 space-y-16">
                    {milestones.map((milestone, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <motion.div
                                key={milestone.number}
                                initial={{
                                    opacity: 0,
                                    x: isLeft ? -100 : 100,
                                    rotateY: isLeft ? -15 : 15,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    x: 0,
                                    rotateY: 0,
                                }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'} relative`}
                            >
                                {/* Content Card with Hover Effects */}
                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                        rotateY: isLeft ? 5 : -5,
                                        z: 50,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`w-full md:w-5/12 p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300 cursor-pointer group ${isLeft ? 'text-right' : 'text-left'
                                        }`}
                                    style={{
                                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                                    }}
                                >


                                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                                        <motion.span
                                            className="text-3xl font-serif text-white/90 group-hover:text-purple-300 transition-colors"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            {milestone.number}
                                        </motion.span>
                                        <motion.span
                                            className="text-xs uppercase tracking-widest text-pink-400 font-semibold bg-pink-400/10 px-2 py-1 rounded-full"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {milestone.year}
                                        </motion.span>
                                    </div>

                                    <motion.h3
                                        className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                    >
                                        {milestone.title}
                                    </motion.h3>

                                    <motion.p
                                        className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                    >
                                        {milestone.description}
                                    </motion.p>

                                    {/* Hover glow effect */}
                                    <motion.div
                                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400/0 to-pink-400/0 group-hover:from-purple-400/5 group-hover:to-pink-400/5 transition-all duration-300 pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    />
                                </motion.div>


                            </motion.div>
                        );
                    })}
                </div>

                {/* Enhanced Moving Knob */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 z-30"
                    style={{ top: knobY }}
                >
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 16px 4px #d13aff44, 0 0 32px 8px #ff4da044",
                                "0 0 24px 6px #ff4da044, 0 0 16px 4px #d13aff44",
                            ],
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                            rotate: { repeat: Infinity, duration: 8, ease: "linear" }
                        }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-xl border-2 border-white/20 relative overflow-hidden"
                    >
                        {/* Inner rotating element */}
                        <motion.div
                            className="w-6 h-6 rounded-full bg-white/30 relative"
                            animate={{ rotate: [0, -360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2" />
                        </motion.div>

                        {/* Sparkle effects */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full" />
                            <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/60 rounded-full" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Timeline;