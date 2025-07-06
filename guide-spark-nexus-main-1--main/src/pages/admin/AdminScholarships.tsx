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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Calendar, Users, DollarSign } from "lucide-react";

const scholarships = [
  {
    id: 1,
    title: "Fulbright Scholarship Program",
    type: "International",
    country: "USA",
    amount: "$30,000",
    deadline: "2025-01-15",
    eligibility: "Graduate students, Young professionals",
    description:
      "Prestigious scholarship for international educational exchange between the US and other countries.",
  },
  {
    id: 2,
    title: "DAAD Scholarships",
    type: "International",
    country: "Germany",
    amount: "€850/month",
    deadline: "2024-12-31",
    eligibility: "Master's and PhD students",
    description:
      "German Academic Exchange Service scholarships for international students.",
  },
  {
    id: 3,
    title: "Commonwealth Scholarships",
    type: "International",
    country: "UK",
    amount: "Full funding",
    deadline: "2025-02-28",
    eligibility: "Citizens of Commonwealth countries",
    description:
      "Full scholarships for postgraduate study in the UK for Commonwealth citizens.",
  },
  {
    id: 4,
    title: "INSPIRE Fellowship",
    type: "National",
    country: "India",
    amount: "₹80,000/year",
    deadline: "2024-11-30",
    eligibility: "Science students in India",
    description:
      "Department of Science and Technology fellowship for pursuing research in basic sciences.",
  },
];

// Renamed the main component from 'Scholarships' to 'AdminScholarships'
const AdminScholarships = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const filteredScholarships = scholarships.filter((scholarship) => {
    return (
      (selectedCountry === "all" || scholarship.country === selectedCountry) &&
      (selectedType === "all" || scholarship.type === selectedType)
    );
  });

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
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
              Scholarships
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Find national and international scholarships to fund your
              education and dreams.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-8 justify-center"
          >
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20 text-white">
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="India">India</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-white/20 text-white">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="National">National</SelectItem>
                <SelectItem value="International">International</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Scholarships Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredScholarships.map((scholarship) => (
              <Card
                key={scholarship.id}
                className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-white">
                      {scholarship.title}
                    </CardTitle>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        scholarship.type === "International"
                          ? "bg-brand-purple/20 text-brand-purple"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {scholarship.type}
                    </span>
                  </div>
                  <CardDescription className="text-white/70">
                    {scholarship.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-white/80">
                      <Globe className="h-4 w-4" />
                      <span>{scholarship.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <DollarSign className="h-4 w-4" />
                      <span>{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {scholarship.deadline}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Users className="h-4 w-4" />
                      <span>{scholarship.eligibility}</span>
                    </div>
                  </div>
                  <Button className="mt-4 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 w-full">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Removed: <Footer /> */}
    </div>
  );
};

// Changed export default from Scholarships to AdminScholarships
export default AdminScholarships;
