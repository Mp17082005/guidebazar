import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// REMOVED: import Navbar from "@/components/Navbar";
// REMOVED: import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Plus,
  X,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/startups";

const Startups = () => {
  const [mounted, setMounted] = useState(false);
  const [showStartupForm, setShowStartupForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [withInternships, setWithInternships] = useState(false);
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    fetchStartups();
    return () => setMounted(false);
  }, []);

  const fetchStartups = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStartups(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch startups");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStartup = async (formData: any) => {
    const payload = {
      ...formData,
      founder: formData.founder || formData.name,
      website: formData.website || '',
      tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()) : [],
      createdBy: formData.createdBy || prompt('Enter your email (for demo):') || 'anonymous',
    };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit startup");
      const newStartup = await res.json();
      setStartups([newStartup, ...startups]);
      setShowStartupForm(false);
      setError(null);
    } catch (err) {
      setError("Failed to submit startup");
    }
  };

  const handleEdit = (startup: any) => {
    setEditingId(startup._id);
    setEditForm({ ...startup, tags: (startup.tags || []).join(', ') });
  };

  const handleEditChange = (e: any) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, tags: editForm.tags.split(',').map((t: string) => t.trim()) }),
      });
      if (!res.ok) throw new Error('Failed to update startup');
      const updated = await res.json();
      setStartups(startups.map(s => s._id === editingId ? updated : s));
      setEditingId(null);
      setEditForm(null);
      setError(null);
    } catch {
      setError('Failed to update startup');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this startup?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setStartups(startups.filter(s => s._id !== id));
    } catch {
      setError('Failed to delete startup');
    }
  };

  const mentors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      company: "TechVentures Inc.",
      expertise: "Product Strategy, AI Implementation",
      background: "Former VP at Google with 15+ years of experience",
      availability: "1:1 mentoring sessions",
      linkedin: "https://linkedin.com/in/priyasharma",
    },
    {
      id: 2,
      name: "Rajiv Khanna",
      company: "Horizon Ventures",
      expertise: "Startup Funding, Business Development",
      background: "Angel investor, helped startups raise over $50M",
      availability: "Open for pitch deck reviews",
      linkedin: "https://linkedin.com/in/rajivkhanna",
    },
  ];

  const industries = [
    "EdTech",
    "FinTech",
    "Sustainability",
    "Food Tech",
    "AI",
    "Transportation",
    "Logistics",
  ];
  const locations = [
    "Bangalore, India",
    "Mumbai, India",
    "Delhi, India",
    "Pune, India",
  ];

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry =
      !selectedIndustry || startup.tags.includes(selectedIndustry);
    const matchesLocation =
      !selectedLocation || startup.location === selectedLocation;
    const matchesInternships =
      !withInternships ||
      startup.positions.some((pos) => pos.type === "Internship");

    return (
      matchesSearch && matchesIndustry && matchesLocation && matchesInternships
    );
  });

  const handleInternshipFilter = (checked: boolean | "indeterminate") => {
    setWithInternships(checked === true);
  };

  return (
    // Removed outermost div with min-h-screen and direct bg/text colors and overflow-hidden.
    // UserLayout will provide these.
    // The pt-24 pb-16 are also handled by UserLayout.
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4" // Keep container and horizontal padding
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
            Startup Founder Directory
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Connect with innovative startups and explore opportunities for
            collaboration, internships, and jobs.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
              <Input
                placeholder="Search startups by name or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10"
              />
            </div>
            <Button
              onClick={() => setShowStartupForm(true)}
              className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 gap-2"
            >
              <Plus size={18} />
              Post Startup
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Industry</label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-white/5 border-white/10 rounded-md px-3 py-2 text-white"
              >
                <option value="">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry} className="bg-black">
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-white/5 border-white/10 rounded-md px-3 py-2 text-white"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location} className="bg-black">
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="internships"
                checked={withInternships}
                onCheckedChange={handleInternshipFilter}
              />
              <label htmlFor="internships" className="text-sm font-medium">
                With Internships
              </label>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/70">
            Showing {filteredStartups.length} of {startups.length} startups
          </p>
        </div>

        {/* Startup Cards */}
        <motion.div
          className="space-y-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {filteredStartups.map((startup) => (
            <motion.div
              key={startup.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="glass-card p-6 hover:border-brand-purple/50 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {startup.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(startup.tags || []).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-brand-purple/20 text-brand-purple"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-white/80 mb-4">{startup.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-white/60">
                      <Calendar className="w-4 h-4 mr-2" />
                      Founded: {(startup.founded || 'N/A')}
                    </div>
                    <div className="flex items-center text-white/60">
                      <MapPin className="w-4 h-4 mr-2" />
                      {startup.location || 'N/A'}
                    </div>
                  </div>

                  {/* Founders */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white/70 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Founders
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {(startup.founders || []).map((founder, i) => (
                        <div
                          key={i}
                          className="bg-white/5 px-3 py-2 rounded-lg"
                        >
                          <p className="text-sm font-medium">{founder.name || 'N/A'}</p>
                          <p className="text-xs text-white/60">
                            {founder.role || 'N/A'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Open Positions */}
                  {Array.isArray(startup.positions) && startup.positions.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/70 mb-2 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Open Positions
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(startup.positions || []).map((position, i) => (
                          <Badge
                            key={i}
                            variant={
                              position.type === "Internship"
                                ? "outline"
                                : "default"
                            }
                            className={
                              position.type === "Internship"
                                ? "border-brand-pink text-brand-pink"
                                : "bg-gradient-to-r from-brand-purple to-brand-pink"
                            }
                          >
                            {position.role || 'N/A'} ({position.type || 'N/A'})
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 hover:border-brand-purple/50"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-brand-purple to-brand-pink"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Industry Experts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Connect with Industry Experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {mentor.name}
                </h3>
                <p className="text-brand-purple font-medium mb-2">
                  {mentor.company}
                </p>
                <p className="text-white/80 mb-2">
                  <strong>Expertise:</strong> {mentor.expertise}
                </p>
                <p className="text-white/70 mb-3">{mentor.background}</p>
                <p className="text-white/60 mb-4">
                  <strong>Availability:</strong> {mentor.availability}
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 hover:border-brand-purple/50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View LinkedIn
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-brand-purple to-brand-pink"
                  >
                    Request Mentoring
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Post Startup Form Modal */}
        <AnimatePresence>
          {showStartupForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowStartupForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Post Your Startup</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStartupForm(false)}
                  >
                    <X size={20} />
                  </Button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    handleSubmitStartup(Object.fromEntries(formData));
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Startup Name
                    </label>
                    <Input
                      name="name"
                      placeholder="Your startup name"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      placeholder="What does your startup do?"
                      className="bg-white/5 border-white/10"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Founded Year
                      </label>
                      <Input
                        name="founded"
                        type="number"
                        placeholder="2023"
                        className="bg-white/5 border-white/10"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Location
                      </label>
                      <Input
                        name="location"
                        placeholder="City, Country"
                        className="bg-white/5 border-white/10"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-pink"
                  >
                    Submit Startup
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Startups;
