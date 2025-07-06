import { motion } from "framer-motion";
import { useState } from "react";
// REMOVED: import Navbar from "@/components/Navbar";
// REMOVED: import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, BookOpen, Download, Upload } from "lucide-react";

const materials = [
  {
    id: 1,
    title: "Data Structures and Algorithms",
    type: "PDF",
    category: "B.Tech",
    subject: "Computer Science",
    size: "2.4 MB",
    downloads: 1250,
    uploadedBy: "Prof. Sharma",
    date: "2024-06-10",
  },
  {
    id: 2,
    title: "Marketing Management Video Lectures",
    type: "Video",
    category: "MBA",
    subject: "Marketing",
    size: "145 MB",
    downloads: 890,
    uploadedBy: "Dr. Patel",
    date: "2024-06-08",
  },
  {
    id: 3,
    title: "JEE Advanced Physics Notes",
    type: "PDF",
    category: "Competitive Exams",
    subject: "Physics",
    size: "5.1 MB",
    downloads: 1800,
    uploadedBy: "Coach Khan",
    date: "2024-06-05",
  },
  {
    id: 4,
    title: "Financial Modeling in Excel",
    type: "Book",
    category: "Finance",
    subject: "Finance",
    size: "1.2 MB",
    downloads: 720,
    uploadedBy: "Finance Dept.",
    date: "2024-06-03",
  },
  {
    id: 5,
    title: "React JS Crash Course",
    type: "Video",
    category: "B.Tech",
    subject: "Web Development",
    size: "320 MB",
    downloads: 1500,
    uploadedBy: "Dev Mentor",
    date: "2024-06-01",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "PDF":
      return <FileText className="h-4 w-4" />;
    case "Video":
      return <Video className="h-4 w-4" />;
    case "Book":
      return <BookOpen className="h-4 w-4" />;
    default:
      return null;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "PDF":
      return "bg-red-500/20 text-red-500";
    case "Video":
      return "bg-blue-500/20 text-blue-500";
    case "Book":
      return "bg-green-500/20 text-green-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
};

const CourseMaterials = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaterials = materials.filter((material) => {
    const matchesTab =
      selectedTab === "all" || material.type.toLowerCase() === selectedTab;
    const matchesCategory =
      selectedCategory === "all" ||
      material.category.toLowerCase() === selectedCategory;
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesCategory && matchesSearch;
  });

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
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Course Materials
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Access a wide range of study materials, notes, videos, and books for
          various subjects and exams.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="w-full md:w-1/4">
          <Input
            placeholder="Search materials..."
            className="w-full bg-white/5 border-white/10 text-white placeholder:text-white/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white border-gray-700">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="b.tech">B.Tech</SelectItem>
              <SelectItem value="mba">MBA</SelectItem>
              <SelectItem value="competitive exams">
                Competitive Exams
              </SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="web development">Web Development</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Tabs
            value={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-white/10 p-1 rounded-lg">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple data-[state=active]:to-brand-pink data-[state=active]:text-white data-[state=active]:shadow-sm text-white/70"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="pdf"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple data-[state=active]:to-brand-pink data-[state=active]:text-white data-[state=active]:shadow-sm text-white/70"
              >
                PDFs
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple data-[state=active]:to-brand-pink data-[state=active]:text-white data-[state=active]:shadow-sm text-white/70"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="book"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple data-[state=active]:to-brand-pink data-[state=active]:text-white data-[state=active]:shadow-sm text-white/70"
              >
                Books
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMaterials.length > 0 ? (
            filteredMaterials.map((material) => (
              <Card
                key={material.id}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-white/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-brand-purple/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTypeColor(
                        material.type
                      )}`}
                    >
                      {getTypeIcon(material.type)}
                      {material.type}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-brand-purple/20 text-brand-purple">
                      {material.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold text-white">
                    {material.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {material.subject} • {material.size}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-white/60 mb-4">
                    <div>Uploaded by: {material.uploadedBy}</div>
                    <div>Date: {material.date}</div>
                    <div>{material.downloads} downloads</div>
                  </div>
                  <Button className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">No materials found</h3>
              <p className="text-white/60">
                Try adjusting your filters or search criteria
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      <div className="text-center py-8">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Can't find what you're looking for?
        </h2>
        <p className="text-white/70 mb-6 max-w-2xl mx-auto">
          Help your peers by uploading your own notes, assignments, or study
          guides.
        </p>
        <Button className="bg-white text-brand-purple hover:bg-white/90">
          <Upload className="h-5 w-5 mr-2" />
          Upload Materials
        </Button>
      </div>
    </motion.div>
  );
};

export default CourseMaterials;
