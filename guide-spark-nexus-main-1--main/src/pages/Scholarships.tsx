import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe, Calendar, Users, DollarSign, Trash2 } from "lucide-react";

interface Scholarship {
  id: number;
  title: string;
  type: string;
  country: string;
  amount: string;
  deadline: string;
  eligibility: string;
  description: string;
}

const defaultScholarships: Scholarship[] = [
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
  {
    id: 5,
    title: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    type: "National",
    country: "India",
    amount: "₹7,000/month",
    deadline: "2025-01-20",
    eligibility: "Students pursuing basic sciences",
    description:
      "Fellowship program by IISc and IISER for students interested in research careers in science.",
  },
  {
    id: 6,
    title: "JN Tata Endowment Scholarship",
    type: "International",
    country: "Multiple",
    amount: "Up to ₹10 Lakh",
    deadline: "2025-03-31",
    eligibility: "Indian students for higher education abroad",
    description:
      "Financial assistance for Indian students pursuing higher education at recognized institutions abroad.",
  },
  {
    id: 7,
    title: "Erasmus Mundus Scholarships",
    type: "International",
    country: "Europe",
    amount: "€1,400/month",
    deadline: "2025-01-15",
    eligibility: "Master's and PhD students",
    description:
      "EU-funded scholarships for international students to study in Europe.",
  },
  {
    id: 8,
    title: "Chevening Scholarships",
    type: "International",
    country: "UK",
    amount: "Full funding",
    deadline: "2024-11-05",
    eligibility: "Outstanding emerging leaders",
    description:
      "UK government's global scholarship programme for one-year master's degrees.",
  },
  {
    id: 9,
    title: "Aditya Birla Scholarship",
    type: "National",
    country: "India",
    amount: "₹2.5 Lakh/year",
    deadline: "2025-04-30",
    eligibility: "IIT, IIM, and other premier institute students",
    description:
      "Merit-based scholarship for students in premier engineering and management institutes.",
  },
  {
    id: 10,
    title: "Reliance Foundation Scholarships",
    type: "National",
    country: "India",
    amount: "₹6 Lakh/year",
    deadline: "2025-05-15",
    eligibility: "Undergraduate students",
    description:
      "Comprehensive scholarship program covering tuition and living expenses for meritorious students.",
  },
];

const Scholarships = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);

  // Load scholarships from backend API
  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/scholarships');
        const data = await response.json();
        
        if (data.success) {
          setScholarships(data.scholarships);
        } else {
          console.error('Failed to fetch scholarships:', data.message);
          // Fallback to default scholarships if API fails
          setScholarships(defaultScholarships);
        }
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        // Fallback to default scholarships if API fails
        setScholarships(defaultScholarships);
      }
    };

    fetchScholarships();
  }, []);

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

  const handleDeleteScholarship = async (scholarshipId: number) => {
    if (!confirm("Are you sure you want to delete this scholarship?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/scholarships/${scholarshipId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setScholarships(prev => prev.filter(scholarship => scholarship.id !== scholarshipId));
        console.log("Scholarship deleted successfully");
      } else {
        console.error('Failed to delete scholarship:', data.message);
        alert('Failed to delete scholarship. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      alert('Error deleting scholarship. Please try again.');
    }
  };

  return (
    // Removed outermost div with min-h-screen and direct bg/text colors.
    // UserLayout will provide these.
    // The pt-24 pb-16 are also handled by UserLayout.
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4" // Keep container and horizontal padding
    >
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
          Find national and international scholarships to fund your education
          and dreams.
        </p>
      </motion.div>

      {/* Enhanced Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mb-8"
      >
        <Badge className="bg-brand-purple/20 text-brand-purple border-brand-purple/30 px-4 py-2">
          <span className="font-semibold">{scholarships.length}</span> Active Scholarships
        </Badge>
        <Badge className="bg-brand-pink/20 text-brand-pink border-brand-pink/30 px-4 py-2">
          <span className="font-semibold">
            {scholarships.filter(s => s.type === "International").length}
          </span> International Opportunities
        </Badge>
        <Badge className="bg-green-500/20 text-green-400 border-green-400/30 px-4 py-2">
          Worth Over <span className="font-semibold">₹50 Crore</span> Total
        </Badge>
      </motion.div>

      {/* Enhanced Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-wrap gap-4 mb-8 justify-center"
      >
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-white/20 text-white">
            <SelectItem value="all">All Countries</SelectItem>
            <SelectItem value="USA">🇺🇸 USA</SelectItem>
            <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
            <SelectItem value="UK">🇬🇧 UK</SelectItem>
            <SelectItem value="India">🇮🇳 India</SelectItem>
            <SelectItem value="Europe">🇪🇺 Europe</SelectItem>
            <SelectItem value="Multiple">🌍 Multiple Countries</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-white/20 text-white">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="National">🏠 National</SelectItem>
            <SelectItem value="International">✈️ International</SelectItem>
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
              <Button 
                variant="destructive" 
                size="sm" 
                className="mt-2 w-full"
                onClick={() => handleDeleteScholarship(scholarship.id)}
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Scholarships;
