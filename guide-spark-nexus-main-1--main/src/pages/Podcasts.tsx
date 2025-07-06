import { useState } from "react";
import { motion } from "framer-motion";
// REMOVED: import Navbar from '@/components/Navbar';
// REMOVED: import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Play } from "lucide-react";

const Podcasts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Career",
    "Entrepreneurship",
    "Finance",
    "Personal Growth",
    "Technology",
  ];

  const allPodcasts = [
    {
      id: 1,
      title: "Top 5 AI Tools for Students",
      image: "https://i.ytimg.com/vi/ZWM_f0ZYfOY/hqdefault.jpg",
      duration: "1:00",
      host: "StudyX",
      category: "Technology",
      videoUrl: "https://www.youtube.com/embed/ZWM_f0ZYfOY?autoplay=1",
    },
    {
      id: 2,
      title: "Student Entrepreneurs: Success Stories",
      image: "https://i.ytimg.com/vi/KscA8DA9Ckw/hqdefault.jpg",
      duration: "12:34",
      host: "YEA Stories",
      category: "Entrepreneurship",
      videoUrl: "https://www.youtube.com/embed/KscA8DA9Ckw?autoplay=1",
    },
    {
      id: 3,
      title: "Decoding Financial Independence (FIRE)",
      image: "https://i.ytimg.com/vi/IOSO-0n-R2U/hqdefault.jpg",
      duration: "7:45",
      host: "FIRE Explored",
      category: "Finance",
      videoUrl: "https://www.youtube.com/embed/IOSO-0n-R2U?autoplay=1",
    },
    {
      id: 4,
      title: "Building Mental Resilience",
      image: "https://i.ytimg.com/vi/8j40I2JZ_MI/hqdefault.jpg",
      duration: "15:20",
      host: "Mind Matters",
      category: "Personal Growth",
      videoUrl: "https://www.youtube.com/embed/8j40I2JZ_MI?autoplay=1",
    },
    {
      id: 5,
      title: "The Future of Work",
      image: "https://i.ytimg.com/vi/EuDnSqAo784/hqdefault.jpg",
      duration: "2:05",
      host: "WEF Insights",
      category: "Technology",
      videoUrl: "https://www.youtube.com/embed/EuDnSqAo784?autoplay=1",
    },
  ];

  const filteredPodcasts = allPodcasts.filter((podcast) => {
    const matchesSearch =
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.host.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || podcast.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // Removed outermost div with min-h-screen and direct bg/text colors.
    // UserLayout will provide these.
    // The pt-20 pb-10 are also handled by UserLayout.
    <div className="container mx-auto px-4">
      {" "}
      {/* Keep container and horizontal padding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Podcast Library
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Listen to insightful conversations and expert advice
        </p>
      </motion.div>
      {/* Search and Filter - Updated to match Finance page style */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6 md:space-y-8 w-full overflow-x-hidden mb-8"
      >
        {/* Search Bar - Prominent */}
        <div className="relative max-w-2xl mx-auto px-4 w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl md:rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 shadow-lg border border-purple-500/30 w-full">
            <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            <Input
              placeholder="Search podcasts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 w-full text-white focus:border-purple-500"
            />
          </div>
        </div>

        {/* Categories Filter */}
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-700/50 mx-4 w-[calc(100%-2rem)] max-w-none">
          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
            <Filter className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0" />
            <span className="font-semibold text-white text-sm md:text-base">
              Categories
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                    : "border-gray-600 text-gray-300 hover:border-purple-400 transition-all duration-300 rounded-lg md:rounded-xl px-3 md:px-4 py-2 text-xs md:text-sm min-h-[44px] w-full bg-gray-800/50 hover:bg-gray-700/50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Podcasts Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {filteredPodcasts.map((podcast, index) => (
          <motion.div
            key={podcast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="glass-card border-none overflow-hidden group cursor-pointer">
              <div className="relative">
                <img
                  src={podcast.image}
                  alt={podcast.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <Button
                    size="sm"
                    className="bg-white text-purple-600 hover:bg-white/90 mr-2"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Play
                  </Button>
                  <span className="text-white text-sm">{podcast.duration}</span>
                </div>
                <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs py-1 px-2 rounded">
                  {podcast.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-pink transition-all duration-300 line-clamp-2 mb-2">
                  {podcast.title}
                </h3>
                <p className="text-sm text-white/60">{podcast.host}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {filteredPodcasts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-white/70 text-lg">
            No podcasts found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
};
export default Podcasts;
