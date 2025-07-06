import { useState } from "react";
import { motion } from "framer-motion";
// REMOVED: import Navbar from '@/components/Navbar';
// REMOVED: import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const YouTubeShorts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Tech",
    "Finance",
    "Entrepreneurship",
    "Study Tips",
    "Career",
  ];

  const allShorts = [
    {
      id: 1,
      title: "How to Land Your First Tech Internship",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      views: "200k",
      creator: "Internship",
      category: "Tech",
      videoUrl: "https://www.youtube.com/embed/imyQYtSZ-po", // Example YouTube embed URL
    },
    {
      id: 2,
      title: "5 Financial Hacks Every Student Should Know",
      thumbnail:
        "https://images.unspxlash.com/photo-1579621970795-87facc2f976d",
      views: "89K",
      creator: "Student internship",
      category: "internship",
      videoUrl: "https://www.youtube.com/embed/J11Qme3vAio", // Replace with actual video ID
    },
    {
      id: 3,
      title: "Day in the Life of a Student Entrepreneur",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      views: "210K",
      creator: "Online internship",
      category: "Entrepreneurship",
      videoUrl: "https://www.youtube.com/embed/P6iRc0P9sKo", // Replace with actual video ID
    },
    {
      id: 4,
      title: "Quick Tips for Better Productivity",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      views: "67K",
      creator: "Free Internships",
      category: "Study Tips",
      videoUrl: "https://www.youtube.com/embed/etj9K4g58kQ", // Replace with actual video ID
    },
    {
      id: 5,
      title: "Best Study Techniques for Exams",
      thumbnail: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      views: "156K",
      creator: "job feedback",
      category: "Study Tips",
      videoUrl: "https://www.youtube.com/embed/khGjvu5jWtE", // Replace with actual video ID
    },
    {
      id: 6,
      title: "Building Your First Startup",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      views: "92K",
      creator: "Startup Guru",
      category: "Entrepreneurship",
      videoUrl: "https://www.youtube.com/embed/bNpx7gpSqbY", // Replace with actual video ID
    },
    {
      id: 7,
      title: "Interview Tips That Actually Work",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      views: "178K",
      creator: "Being Sucessful Entrepreneur ",
      category: "Career",
      videoUrl: "https://www.youtube.com/embed/eHJnEHyyN1Y", // Replace with actual video ID
    },
    {
      id: 8,
      title: "Coding Bootcamp vs University",
      thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0",
      views: "234K",
      creator: "How to Create Company",
      category: "Tech",
      videoUrl: "https://www.youtube.com/embed/Qa_4c9zrxf0", // Replace with actual video ID
    },
  ];
  const filteredShorts = allShorts.filter((short) => {
    const matchesSearch =
      short.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      short.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || short.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // Removed the outermost div with min-h-screen and direct bg/text colors.
    // UserLayout will provide the min-h-screen, bg-black, and text-white.
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
          YouTube Shorts
        </h1>
        <p className="text-xl text-white/70 mb-8">
          Discover viral short-form content to boost your learning
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
            <div className="relative w-full">
              <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <Input
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 w-full text-white focus:border-purple-500"
              />
            </div>
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
      {/* Videos Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {filteredShorts.map((short, index) => (
          <motion.div
            key={short.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="glass-card border-none overflow-hidden group cursor-pointer">
              <div
                className="relative"
                style={{
                  paddingTop:
                    "177.77%" /* For 9:16 aspect ratio (9/16 * 100) */,
                }}
              >
                {/* Replaced img with iframe */}
                <iframe
                  src={short.videoUrl}
                  title={short.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  // You can add 'muted' and 'autoplay' for a more "shorts" like auto-play experience
                  // But be mindful of user experience and browser autoplay policies.
                  // src={${short.videoUrl}?autoplay=1&mute=1}
                ></iframe>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded">
                  {short.views} views
                </div>
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs py-1 px-2 rounded">
                  {short.category}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-purple group-hover:to-brand-pink transition-all duration-300 line-clamp-2 mb-2">
                  {short.title}
                </h3>
                <p className="text-sm text-white/60">{short.creator}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {filteredShorts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-white/70 text-lg">
            No videos found matching your criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default YouTubeShorts;
