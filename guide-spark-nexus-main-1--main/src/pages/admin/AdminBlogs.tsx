import { motion } from "framer-motion";
import { useState } from "react";
// Removed: import Navbar from "@/components/Navbar";
// Removed: import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, TrendingUp, Calendar, X } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Top Digital Marketing Trends in 2025",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721",
    readTime: "3 min read",
    author: "Maxwell Iskiev",
    authorType: "Marketing",
    category: "Marketing",
    views: 2300,
    isPopular: true,
    excerpt: "A guide to building a strong personal brand before graduation...",
    fullContent: "https://blog.hubspot.com/marketing/personal-branding",
  },
  {
    id: 2,
    title: "College Info Geek",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    readTime: "5 min read",
    author: "Thomas Frank",
    authorType: "Poets",
    category: "Poems",
    views: 1800,
    isPopular: true,
    excerpt:
      "Cut down your software costs with these student-friendly tools...",
    fullContent: "https://collegeinfogeek.com/student-discounts-software/",
  },
  {
    id: 3,
    title: "Introduction to Stock Markets",
    image: "https://images.unsplash.com/photo-1559526324-593bc073d938",
    readTime: "4 min read",
    author: "Varsity by Zerodha",
    authorType: "Finance",
    category: "Finance",
    views: 2000,
    isPopular: false,
    excerpt: "You don't need thousands to start investing...",
    fullContent:
      "https://zerodha.com/varsity/module/introduction-to-stock-markets/",
  },
  {
    id: 4,
    title: "7 Time Management tips",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    readTime: "6 min read",
    author: "Shayna Joubert",
    authorType: "Productivity",
    category: "Productivity",
    views: 1500,
    isPopular: false,
    excerpt: "Time is your most valuable resource in college...",
    fullContent:
      "https://www.northeastern.edu/graduate/blog/time-management-tips/",
  },
  {
    id: 5,
    title: "Health Care",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
    readTime: "4 min read",
    author: "Thomas",
    authorType: "health",
    category: "health",
    views: 3100,
    isPopular: true,
    excerpt: "Earn while you learn with these student-friendly side hustles...",
    fullContent: "https://collegeinfogeek.com/make-money/",
  },
];

// Changed component name from Blogs to AdminBlogs
const AdminBlogs = () => {
  const [activeTab, setActiveTab] = useState("newest");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const sortedBlogs = [...blogs].sort((a, b) => {
    if (activeTab === "newest") {
      return b.id - a.id;
    } else {
      return b.views - a.views;
    }
  });

  const getAuthorTypeColor = (type) => {
    switch (type) {
      case "Student":
        return "bg-blue-500/20 text-blue-400";
      case "Founder":
        return "bg-brand-purple/20 text-brand-purple";
      case "Expert":
        return "bg-green-500/20 text-green-400";
      case "Tech":
        return "bg-cyan-500/20 text-cyan-400";
      case "Finance":
        return "bg-yellow-500/20 text-yellow-400";
      case "Productivity":
        return "bg-orange-500/20 text-orange-400";
      case "Entrepreneurship":
        return "bg-pink-500/20 text-pink-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Removed: <Navbar /> */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
              Blogs
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover insights, tips, and stories from students, entrepreneurs,
              and industry experts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full max-w-md"
            >
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger
                  value="newest"
                  className="data-[state=active]:bg-brand-purple"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Newest
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="data-[state=active]:bg-brand-purple"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Popular
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {sortedBlogs.map((blog) => (
              <Card
                key={blog.id}
                className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-brand-pink/20 text-brand-pink">
                      {blog.category}
                    </span>
                    {blog.isPopular && activeTab === "popular" && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Trending
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {blog.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{blog.author}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getAuthorTypeColor(
                          blog.authorType
                        )}`}
                      >
                        {blog.authorType}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">
                      {blog.views} views
                    </span>
                    <Button
                      className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Removed: <Footer /> */}

      {/* Modal Section */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedBlog.title}</h2>
            <p className="text-sm text-gray-700 mb-4">{selectedBlog.excerpt}</p>
            <a
              href={selectedBlog.fullContent}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Read Full Article Link ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// Changed export default from Blogs to AdminBlogs
export default AdminBlogs;
