import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  CheckCircle,
  Star,
  Calendar,
  Users,
  Tag,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradientSeparator from "@/components/GradientSeparator";

// Student discount default data
const defaultStudentDiscounts = [
  {
    id: 1,
    brand: "Canva",
    title: "Canva Pro Free for 12 Months",
    description:
      "Access premium templates, remove backgrounds, and collaborate with your team",
    category: "Creative Tools",
    verification: "GitHub Student Pack",
    discount: "100% OFF",
    originalPrice: "$119.99/year",
    eligibility: "Requires GitHub Student Developer Pack verification",
    instructions:
      "Sign up for GitHub Student Pack, then claim Canva Pro through the pack dashboard",
    link: "https://education.github.com/pack",
    verified: "2024-01-15",
    upvotes: 245,
    image: "🎨",
    tags: ["Design", "Templates", "Collaboration"],
    isLimitedTime: false,
    isPopular: true,
    rating: 4.9,
    usersUsed: 12500,
    savings: "₹9,600",
    isVerified: true,
    verificationUrl: "https://education.github.com/pack"
  },
  {
    id: 2,
    brand: "Notion",
    title: "Notion Personal Pro Free",
    description:
      "Unlimited blocks, file uploads, and version history for students",
    category: "Productivity & Tech",
    verification: ".edu Email",
    discount: "100% OFF",
    originalPrice: "$8/month",
    eligibility: "Requires valid .edu email address",
    instructions: "Sign up with your .edu email and verify your student status",
    link: "https://www.notion.so/students",
    verified: "2024-01-20",
    upvotes: 189,
    image: "📝",
    tags: ["Notes", "Organization", "Productivity"],
    isLimitedTime: false,
    isPopular: true,
    rating: 4.8,
    usersUsed: 8900,
    savings: "₹640/month",
    isVerified: true,
    verificationUrl: "https://www.notion.so/students"
  },
  {
    id: 3,
    brand: "Figma",
    title: "Figma Education Plan",
    description: "Free professional features for students and educators",
    category: "Creative Tools",
    verification: ".edu Email",
    discount: "100% OFF",
    originalPrice: "$12/month",
    eligibility: "Students and educators with .edu email",
    instructions:
      "Apply for education plan with your .edu email and course information",
    link: "https://www.figma.com/education/",
    verified: "2024-01-18",
    upvotes: 156,
    image: "🎯",
    tags: ["UI/UX", "Design", "Prototyping"],
    isLimitedTime: false,
    isPopular: false,
    rating: 4.7,
    usersUsed: 6500,
    savings: "₹960/month",
    isVerified: true,
    verificationUrl: "https://www.figma.com/education/"
  },
  {
    id: 4,
    brand: "Spotify",
    title: "Spotify Premium Student",
    description: "Ad-free music streaming with offline downloads",
    category: "Entertainment",
    verification: "UNiDAYS",
    discount: "50% OFF",
    originalPrice: "$9.99/month",
    eligibility: "Enrolled students verified through UNiDAYS",
    instructions: "Verify your student status through UNiDAYS and get 50% off",
    link: "https://www.spotify.com/student/",
    verified: "2024-01-22",
    upvotes: 298,
    image: "🎵",
    tags: ["Music", "Streaming", "Entertainment"],
    isLimitedTime: false,
    isPopular: true,
    rating: 4.6,
    usersUsed: 15200,
    savings: "₹400/month",
    isVerified: true,
    verificationUrl: "https://www.spotify.com/student/"
  },
  {
    id: 5,
    brand: "Adobe Creative Cloud",
    title: "Creative Cloud Student Discount",
    description:
      "Access to all Adobe apps including Photoshop, Illustrator, and Premiere Pro",
    category: "Creative Tools",
    verification: "Student ID",
    discount: "60% OFF",
    originalPrice: "$52.99/month",
    eligibility: "Students and teachers with valid ID",
    instructions: "Verify your student status and get 60% off the first year",
    link: "https://www.adobe.com/students.html",
    verified: "2024-01-25",
    upvotes: 187,
    image: "🎨",
    tags: ["Design", "Video", "Photography"],
    isLimitedTime: false,
    isPopular: true,
    rating: 4.8,
    usersUsed: 9800,
    savings: "₹1,270/month",
    isVerified: true,
    verificationUrl: "https://www.adobe.com/students.html"
  },
];

const categories = [
  "All",
  "Creative Tools",
  "Productivity & Tech",
  "Learning Platforms",
  "Entertainment",
  "Food & Lifestyle",
];
const verificationTypes = [
  "All",
  ".edu Email",
  "UNiDAYS",
  "StudentBeans",
  "GitHub Student Pack",
  "Student ID",
];
const sortOptions = ["Popular", "New", "Verified Recently", "Limited Time"];

interface StudentDiscount {
  id: number;
  brand: string;
  title: string;
  description: string;
  category: string;
  verification: string;
  discount: string;
  originalPrice: string;
  eligibility: string;
  instructions: string;
  link: string;
  verified?: string;
  upvotes?: number;
  image?: string;
  tags?: string[];
  isLimitedTime?: boolean;
  isPopular?: boolean;
  rating?: number;
  usersUsed?: number;
  savings?: string;
  isVerified?: boolean;
  verificationUrl?: string;
}

const StudentDiscounts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVerification, setSelectedVerification] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [studentDiscounts, setStudentDiscounts] = useState<StudentDiscount[]>([]);

  // Load student discounts from localStorage (from admin panel) or use default
  useEffect(() => {
    const savedDiscounts = localStorage.getItem('adminStudentDiscounts');
    if (savedDiscounts) {
      setStudentDiscounts(JSON.parse(savedDiscounts));
    } else {
      setStudentDiscounts(defaultStudentDiscounts);
    }
  }, []);

  const filteredAndSortedDiscounts = useMemo(() => {
    const filtered = studentDiscounts.filter((discount) => {
      const matchesSearch =
        discount.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        discount.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || discount.category === selectedCategory;
      const matchesVerification =
        selectedVerification === "All" ||
        discount.verification === selectedVerification;

      return matchesSearch && matchesCategory && matchesVerification;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Popular":
          return (b.upvotes || 0) - (a.upvotes || 0);
        case "New":
          return (
            new Date(b.verified || 0).getTime() - new Date(a.verified || 0).getTime()
          );
        case "Verified Recently":
          return (
            new Date(b.verified || 0).getTime() - new Date(a.verified || 0).getTime()
          );
        case "Limited Time":
          return (b.isLimitedTime ? 1 : 0) - (a.isLimitedTime ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [studentDiscounts, searchTerm, selectedCategory, selectedVerification, sortBy]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Student Discounts
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Unlock exclusive deals and save money on the tools you need for your education and career.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <Badge className="bg-brand-purple/20 text-brand-purple border-brand-purple/30 px-4 py-2">
          <span className="font-semibold">{studentDiscounts.length}</span> Verified Deals
        </Badge>
        <Badge className="bg-brand-pink/20 text-brand-pink border-brand-pink/30 px-4 py-2">
          <Users className="w-4 h-4 mr-2" />
          {studentDiscounts.reduce(
            (sum, discount) => sum + (discount.upvotes || 0),
            0
          )}
          + Students Helped
        </Badge>
        <Badge className="bg-green-500/20 text-green-400 border-green-400/30 px-4 py-2">
          Save Over <span className="font-semibold">₹50,000+</span> Total
        </Badge>
      </motion.div>

      <GradientSeparator />

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
            <Input
              placeholder="Search discounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="bg-white/10 border-white/20">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-brand-purple/30"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </motion.div>

      {/* Discounts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredAndSortedDiscounts.map((discount, index) => (
            <motion.div
              key={discount.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{discount.image}</span>
                      <div>
                        <CardTitle className="text-lg font-bold text-white">
                          {discount.brand}
                        </CardTitle>
                        <p className="text-sm text-white/70">{discount.title}</p>
                      </div>
                    </div>
                    {discount.isPopular && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-white/70">
                    {discount.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-400">
                        {discount.discount}
                      </span>
                      <span className="text-white/60 line-through">
                        {discount.originalPrice}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Users className="w-4 h-4 text-brand-purple" />
                      <span>{discount.upvotes || 0} students helped</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Calendar className="w-4 h-4 text-brand-pink" />
                      <span>
                        Verified{" "}
                        {discount.verified ? new Date(discount.verified).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {discount.tags?.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * tagIndex }}
                        >
                          <Badge variant="outline" className="text-xs border-white/20 text-white/60">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-black/90 border-white/20 text-white">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <span className="text-2xl">{discount.image}</span>
                              {discount.title}
                            </DialogTitle>
                            <DialogDescription className="text-white/70">
                              {discount.description}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-white mb-2">
                                How to Get This Deal:
                              </h4>
                              <p className="text-white/80">
                                {discount.instructions}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                              <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                              <span className="text-white/60 text-sm">
                                Last verified:{" "}
                                {discount.verified ? new Date(discount.verified).toLocaleDateString() : 'N/A'}
                              </span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        className="flex-1 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90"
                        onClick={() => window.open(discount.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Get Deal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default StudentDiscounts;
