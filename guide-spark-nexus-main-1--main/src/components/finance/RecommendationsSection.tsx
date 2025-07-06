
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, BookOpen, Video, ArrowRight, Clock, TrendingUp, Eye, Star } from "lucide-react";

const RecommendationsSection = () => {
  const trendingTopics = [
    { title: "Best SIPs for 2024", views: "2.5k", badge: "Hot", trend: "+25%" },
    { title: "Credit Cards for Students", views: "1.8k", badge: "Popular", trend: "+18%" },
    { title: "Emergency Fund Planning", views: "1.2k", badge: "Essential", trend: "+12%" }
  ];

  const featuredArticles = [
    { title: "5 Money Mistakes Every Student Makes", readTime: "5 min", rating: 4.8 },
    { title: "How to Start Investing with ₹1000", readTime: "7 min", rating: 4.9 },
    { title: "Understanding Health Insurance", readTime: "4 min", rating: 4.7 }
  ];

  const explainerVideos = [
    { title: "SIP vs FD: What's Better?", duration: "2:30", views: "15k" },
    { title: "Stock Market for Beginners", duration: "3:15", views: "22k" },
    { title: "Budget Like a Pro", duration: "1:45", views: "8k" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Recommendations & Resources
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Stay updated with trending topics and expert insights
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trending This Week */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
        >
          <Card className="border border-orange-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm h-full relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-white group-hover:text-orange-300 transition-colors">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Flame className="h-5 w-5 text-white" />
                </motion.div>
                Trending This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group/item shadow-sm hover:shadow-md border border-gray-700/50"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-white group-hover/item:text-orange-300 transition-colors">
                        {topic.title}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Eye className="h-3 w-3" />
                          {topic.views} views
                        </div>
                        <div className="flex items-center gap-1 text-green-400 text-sm font-medium">
                          <TrendingUp className="h-3 w-3" />
                          {topic.trend}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="ml-3 bg-orange-500/20 text-orange-300 border-orange-500/30"
                    >
                      {topic.badge}
                    </Badge>
                  </div>
                </motion.div>
              ))}
              <Button variant="ghost" className="w-full mt-4 text-gray-200 hover:text-white hover:bg-orange-500/20 border border-gray-600 hover:border-orange-500/30 rounded-xl transition-all duration-300">
                View All Trending
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
        >
          <Card className="border border-blue-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm h-full relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-white group-hover:text-blue-300 transition-colors">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <BookOpen className="h-5 w-5 text-white" />
                </motion.div>
                Featured Articles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group/item shadow-sm hover:shadow-md border border-gray-700/50"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-semibold text-white group-hover/item:text-blue-300 transition-colors mb-3">
                    {article.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="h-3 w-3" />
                      {article.readTime} read
                    </div>
                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                      <Star className="h-3 w-3 fill-current" />
                      {article.rating}
                    </div>
                  </div>
                </motion.div>
              ))}
              <Button variant="ghost" className="w-full mt-4 text-gray-200 hover:text-white hover:bg-blue-500/20 border border-gray-600 hover:border-blue-500/30 rounded-xl transition-all duration-300">
                Read More Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Short Videos */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
        >
          <Card className="border border-pink-500/30 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm h-full relative overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="flex items-center gap-3 text-xl text-white group-hover:text-pink-300 transition-colors">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Video className="h-5 w-5 text-white" />
                </motion.div>
                60s Explainer Videos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {explainerVideos.map((video, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group/item shadow-sm hover:shadow-md border border-gray-700/50"
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-semibold text-white group-hover/item:text-pink-300 transition-colors mb-3">
                    {video.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Video className="h-3 w-3" />
                      {video.duration}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Eye className="h-3 w-3" />
                      {video.views} views
                    </div>
                  </div>
                </motion.div>
              ))}
              <Button variant="ghost" className="w-full mt-4 text-gray-200 hover:text-white hover:bg-pink-500/20 border border-gray-600 hover:border-pink-500/30 rounded-xl transition-all duration-300">
                Watch More Videos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecommendationsSection;
