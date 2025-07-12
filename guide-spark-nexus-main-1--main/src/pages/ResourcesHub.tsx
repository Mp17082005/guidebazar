import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  CreditCard, 
  BookOpen, 
  Globe, 
  Users, 
  TrendingUp,
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ResourcesHub = () => {
  const resources = [
    {
      id: 1,
      title: "Student Discounts",
      description: "Unlock exclusive deals and save money on tools, apps, and services",
      icon: CreditCard,
      link: "/student-discounts",
      stats: {
        count: "15+",
        label: "Verified Deals",
        totalSavings: "₹50,000+"
      },
      featured: [
        { name: "Canva Pro", value: "100% OFF", type: "popular" },
        { name: "Adobe Creative", value: "60% OFF", type: "popular" },
        { name: "Spotify Premium", value: "50% OFF", type: "popular" },
      ],
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      id: 2,
      title: "Scholarships",
      description: "Find national and international scholarships to fund your education",
      icon: GraduationCap,
      link: "/scholarships",
      stats: {
        count: "10+",
        label: "Active Scholarships",
        totalSavings: "₹50 Crore+"
      },
      featured: [
        { name: "Fulbright Program", value: "$30,000", type: "international" },
        { name: "KVPY Fellowship", value: "₹7,000/month", type: "national" },
        { name: "Chevening Scholarship", value: "Full Funding", type: "international" },
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4"
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div
          className="flex items-center justify-center gap-4 mb-6"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BookOpen className="w-8 h-8 text-brand-purple" />
          <motion.h1
            className="text-4xl md:text-6xl font-bold relative"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, #ffffff, #8E44AD, #F06292, #ffffff)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Resources Hub
          </motion.h1>
          <Globe className="w-8 h-8 text-brand-pink" />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white/70 text-lg max-w-3xl mx-auto mb-8"
        >
          Discover exclusive student benefits, scholarships, and financial opportunities 
          to support your academic journey and career growth
        </motion.p>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Badge className="bg-brand-purple/20 text-brand-purple border-brand-purple/30 px-6 py-3 text-lg">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-bold">25+</span> Total Opportunities
          </Badge>
          <Badge className="bg-brand-pink/20 text-brand-pink border-brand-pink/30 px-6 py-3 text-lg">
            <Users className="w-5 h-5 mr-2" />
            <span className="font-bold">10,000+</span> Students Helped
          </Badge>
          <Badge className="bg-green-500/20 text-green-400 border-green-400/30 px-6 py-3 text-lg">
            <Star className="w-5 h-5 mr-2" />
            Worth Over <span className="font-bold">₹50 Crore</span>
          </Badge>
        </motion.div>
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-8 mb-12"
      >
        {resources.map((resource) => (
          <motion.div
            key={resource.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            <Card className={`bg-gradient-to-br ${resource.bgGradient} backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-500 h-full group cursor-pointer relative overflow-hidden`}>
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                animate={{
                  background: [
                    `linear-gradient(45deg, ${resource.gradient.includes('purple') ? 'rgba(142, 68, 173, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, transparent)`,
                    `linear-gradient(45deg, ${resource.gradient.includes('pink') ? 'rgba(240, 98, 146, 0.1)' : 'rgba(6, 182, 212, 0.1)'}, transparent)`,
                    `linear-gradient(45deg, ${resource.gradient.includes('purple') ? 'rgba(142, 68, 173, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, transparent)`,
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${resource.gradient} text-white`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <resource.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-brand-purple group-hover:to-brand-pink transition-all duration-300">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                      {resource.description}
                    </CardDescription>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="flex gap-4 mb-4">
                  <Badge className="bg-white/10 text-white border-white/20">
                    <strong>{resource.stats.count}</strong> {resource.stats.label}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
                    <strong>{resource.stats.totalSavings}</strong> Value
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 relative z-10">
                {/* Featured Items */}
                <div className="space-y-2">
                  <h4 className="text-white/80 font-semibold mb-3">Featured:</h4>
                  {resource.featured.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index + 0.5 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-white/90 text-sm">{item.name}</span>
                        {item.type !== "none" && (
                          <Badge variant="secondary" className="text-xs">
                            {item.type === "popular" && <Star className="w-3 h-3 mr-1" />}
                            {item.type === "popular" ? "Popular" : item.type === "international" ? "International" : "National"}
                          </Badge>
                        )}
                      </div>
                      <span className="text-brand-pink font-semibold text-sm">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="pt-4"
                >
                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${resource.gradient} hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 group/btn`}
                  >
                    <Link to={resource.link}>
                      Explore {resource.title}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Access Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Need Help Getting Started?</h2>
        <p className="text-white/60 mb-6">
          Our team is here to help you maximize your student benefits and find the right opportunities
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            Contact Support
          </Button>
          <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90">
            View All Resources
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResourcesHub;
