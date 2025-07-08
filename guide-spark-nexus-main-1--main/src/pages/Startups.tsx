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
  Linkedin,
  Trash2,
  Tag
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const { currentUser } = useAuth();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStartup, setEditStartup] = useState<any>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editSuccess, setEditSuccess] = useState("");
  const [editError, setEditError] = useState("");

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
    console.log('FormData:', formData);
    const payload = {
      ...formData,
      founder: formData.founder || formData.name,
      founderLinkedin: formData.founderLinkedin || '',
      foundedYear: formData.foundedYear || new Date().getFullYear(),
      website: formData.website || '',
      tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()) : [],
      positions: [
        {
          type: formData.positionType,
          role: formData.positionRole,
          applyLink: formData.applyLink
        }
      ],
      industry: formData.industry,
      logo: logoPreview || '',
    };
    if (formData.createdBy && formData.createdBy.trim() !== "") {
      payload.createdBy = formData.createdBy;
    }
    console.log('Payload:', payload);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      console.log('Backend response:', text);
      if (!res.ok) throw new Error("Failed to submit startup");
      const newStartup = JSON.parse(text);
      setStartups([newStartup, ...startups]);
      setShowStartupForm(false);
      setError(null);
    } catch (err) {
      setError("Failed to submit startup");
      console.error(err);
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
      !selectedIndustry || (startup.industry && startup.industry === selectedIndustry);
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

  // Add helper for badge color
  const industryColor = (industry: string) => {
    switch ((industry || '').toLowerCase()) {
      case 'food tech': return 'bg-green-500/20 text-green-700 border-green-400';
      case 'edtech': return 'bg-blue-500/20 text-blue-700 border-blue-400';
      case 'fintech': return 'bg-cyan-500/20 text-cyan-700 border-cyan-400';
      case 'sustainability': return 'bg-lime-500/20 text-lime-700 border-lime-400';
      case 'ai': return 'bg-purple-500/20 text-purple-700 border-purple-400';
      case 'transportation': return 'bg-orange-500/20 text-orange-700 border-orange-400';
      case 'logistics': return 'bg-yellow-500/20 text-yellow-700 border-yellow-400';
      case 'med tech': return 'bg-pink-500/20 text-pink-700 border-pink-400';
      default: return 'bg-gray-500/20 text-gray-700 border-gray-400';
    }
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
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px 0 rgba(142,68,173,0.25)",
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="glass-card card-hover relative overflow-hidden group p-6 hover:border-brand-pink/60 hover:shadow-brand-pink/30 transition-all duration-500"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-full bg-gradient-to-br from-brand-purple/30 via-brand-pink/20 to-brand-purple/10 animate-float blur-2xl"></div>
              </div>
              <div className="flex flex-col lg:flex-row gap-6 relative z-10">
                <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center mr-6">
                  {startup.logo && typeof startup.logo === 'string' && startup.logo.length > 0 ? (
                    <img src={startup.logo} alt="Logo" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-4xl text-brand-purple">🚀</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {startup.name}
                      </h3>
                      {startup.industry && (
                        <span className={`inline-block rounded-full px-4 py-1 border font-semibold text-sm mb-2 ${industryColor(startup.industry)}`}>
                          {startup.industry}
                        </span>
                      )}
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
                      Founded: {startup.foundedYear || 'N/A'}
                    </div>
                    <div className="flex items-center text-white/60">
                      <MapPin className="w-4 h-4 mr-2" />
                      {startup.location || 'N/A'}
                    </div>
                    <div className="flex items-center text-white/60">
                      <Tag className="w-4 h-4 mr-2" />
                      {startup.industry || 'N/A'}
                    </div>
                    {startup.createdBy && (
                      <div className="flex items-center text-white/60">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        {startup.createdBy}
                      </div>
                    )}
                  </div>

                  {/* Founders */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white/70 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Founder
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-white/5 px-3 py-2 rounded-lg">
                        <p className="text-sm font-medium">{startup.founder || 'N/A'}</p>
                      </div>
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
                    {startup.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 hover:border-brand-purple/50"
                        onClick={() => window.open(startup.website, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    )}
                    
                    {startup.founderLinkedin && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 hover:border-brand-purple/50"
                        onClick={() => window.open(startup.founderLinkedin, '_blank')}
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        Founder LinkedIn
                      </Button>
                    )}
                    
                    {startup.positions?.[0]?.applyLink && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-brand-purple to-brand-pink"
                        onClick={() => window.open(startup.positions[0].applyLink, '_blank')}
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Apply Now
                      </Button>
                    )}
                    
                    {currentUser && startup.createdBy === currentUser.email && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-brand-purple/50 text-brand-purple"
                        onClick={() => { setEditStartup(startup); setEditModalOpen(true); }}
                      >
                        Edit
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:bg-red-900/20"
                      onClick={() => handleDelete(startup._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
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
                        name="foundedYear"
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
                  <div>
                    <label className="block text-sm font-medium mb-2">Founder Name</label>
                    <Input
                      name="founder"
                      placeholder="Founder Name"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Founder LinkedIn</label>
                    <Input
                      name="founderLinkedin"
                      placeholder="https://linkedin.com/in/username"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Email (optional)</label>
                    <Input
                      name="createdBy"
                      type="email"
                      placeholder="contact@yourcompany.com"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Logo</label>
                    <div
                      className="border border-dashed border-white/20 rounded-md p-8 text-center hover:bg-white/5 cursor-pointer transition-colors"
                      onDrop={e => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith("image/")) {
                          const reader = new FileReader();
                          reader.onload = ev => setLogoPreview(ev.target?.result as string);
                          reader.readAsDataURL(file);
                          setLogoFile(file);
                        }
                      }}
                      onDragOver={e => e.preventDefault()}
                    >
                      <Plus size={24} className="mx-auto mb-2 text-white/50" />
                      <p className="text-sm text-white/70">
                        Click or drag and drop an image (JPG, PNG, WEBP)
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file && file.type.startsWith("image/")) {
                            const reader = new FileReader();
                            reader.onload = ev => setLogoPreview(ev.target?.result as string);
                            reader.readAsDataURL(file);
                            setLogoFile(file);
                          }
                        }}
                        id="startup-logo-upload"
                      />
                      <label htmlFor="startup-logo-upload" className="cursor-pointer text-brand-purple underline block mt-2">Browse</label>
                      {logoPreview && (
                        <img src={logoPreview} alt="Logo Preview" className="mx-auto mt-4 max-h-32 rounded" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Position Type</label>
                    <select
                      name="positionType"
                      className="w-full bg-black text-white border-white/10 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Select position type</option>
                      <option value="Internship" className="bg-black text-white">Internship</option>
                      <option value="Part-time" className="bg-black text-white">Part-time</option>
                      <option value="Full-time" className="bg-black text-white">Full-time</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Position Role</label>
                    <Input
                      name="positionRole"
                      placeholder="e.g. Software Engineer"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Apply Link</label>
                    <Input
                      name="applyLink"
                      placeholder="https://yourcompany.com/careers"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Type</label>
                    <select
                      name="industry"
                      className="w-full bg-black text-white border-white/10 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Select company type</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry} className="bg-black text-white">
                          {industry}
                        </option>
                      ))}
                    </select>
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

        {/* Edit Modal */}
        {editModalOpen && editStartup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Edit Startup</h2>
                <Button variant="ghost" size="sm" onClick={() => setEditModalOpen(false)}>
                  <X size={20} />
                </Button>
              </div>
              {editSuccess && <div className="text-green-500 mb-2">{editSuccess}</div>}
              {editError && <div className="text-red-500 mb-2">{editError}</div>}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setEditError("");
                  setEditSuccess("");
                  // Validation
                  if (!editStartup.name.trim() || !editStartup.description.trim() || !editStartup.founder.trim() || !editStartup.location.trim() || !editStartup.foundedYear || !editStartup.industry) {
                    setEditError("Please fill all required fields.");
                    return;
                  }
                  if (editStartup.createdBy && !/^\S+@\S+\.\S+$/.test(editStartup.createdBy)) {
                    setEditError("Please enter a valid email address.");
                    return;
                  }
                  if (isNaN(Number(editStartup.foundedYear)) || Number(editStartup.foundedYear) < 1800 || Number(editStartup.foundedYear) > new Date().getFullYear() + 1) {
                    setEditError("Please enter a valid year.");
                    return;
                  }
                  if (!editStartup.positions || editStartup.positions.length === 0) {
                    setEditError("Please add at least one open position.");
                    return;
                  }
                  for (const pos of editStartup.positions) {
                    if (!pos.type || !pos.role || !pos.applyLink) {
                      setEditError("Please fill all fields for each position.");
                      return;
                    }
                  }
                  setEditLoading(true);
                  const updated = {
                    ...editStartup,
                    positions: editStartup.positions,
                    logo: editStartup.logo,
                  };
                  try {
                    const res = await fetch(`${API_URL}/${editStartup._id}`, {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(updated),
                    });
                    if (res.ok) {
                      const newStartup = await res.json();
                      setStartups(startups.map(s => s._id === newStartup._id ? newStartup : s));
                      setEditSuccess("Startup updated successfully!");
                      setTimeout(() => {
                        setEditModalOpen(false);
                        setEditStartup(null);
                        setEditSuccess("");
                      }, 1200);
                    } else {
                      setEditError("Failed to update startup.");
                    }
                  } catch {
                    setEditError("Failed to update startup.");
                  } finally {
                    setEditLoading(false);
                  }
                }}
                className="space-y-4"
              >
                <Input
                  value={editStartup.name}
                  onChange={e => setEditStartup({ ...editStartup, name: e.target.value })}
                  placeholder="Startup Name"
                  className="bg-white/5 border-white/10"
                  required
                />
                <Textarea
                  value={editStartup.description}
                  onChange={e => setEditStartup({ ...editStartup, description: e.target.value })}
                  placeholder="Description"
                  className="bg-white/5 border-white/10"
                  rows={3}
                  required
                />
                <Input
                  value={editStartup.founder}
                  onChange={e => setEditStartup({ ...editStartup, founder: e.target.value })}
                  placeholder="Founder Name"
                  className="bg-white/5 border-white/10"
                  required
                />
                <Input
                  value={editStartup.founderLinkedin}
                  onChange={e => setEditStartup({ ...editStartup, founderLinkedin: e.target.value })}
                  placeholder="Founder LinkedIn"
                  className="bg-white/5 border-white/10"
                />
                <Input
                  value={editStartup.location}
                  onChange={e => setEditStartup({ ...editStartup, location: e.target.value })}
                  placeholder="Location"
                  className="bg-white/5 border-white/10"
                  required
                />
                <Input
                  value={editStartup.foundedYear}
                  onChange={e => setEditStartup({ ...editStartup, foundedYear: e.target.value })}
                  placeholder="Founded Year"
                  type="number"
                  className="bg-white/5 border-white/10"
                  required
                />
                <Input
                  value={editStartup.createdBy || ''}
                  onChange={e => setEditStartup({ ...editStartup, createdBy: e.target.value })}
                  placeholder="Contact Email (optional)"
                  className="bg-white/5 border-white/10"
                />
                <select
                  value={editStartup.industry}
                  onChange={e => setEditStartup({ ...editStartup, industry: e.target.value })}
                  className="w-full bg-black text-white border-white/10 rounded-md px-3 py-2"
                  required
                >
                  <option value="">Select company type</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry} className="bg-black text-white">
                      {industry}
                    </option>
                  ))}
                </select>
                {/* Logo upload (URL or drag-and-drop) */}
                <div
                  className="border border-dashed border-white/20 rounded-md p-8 text-center hover:bg-white/5 cursor-pointer transition-colors"
                  onDrop={e => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file && file.type.startsWith("image/")) {
                      const reader = new FileReader();
                      reader.onload = ev => setEditStartup({ ...editStartup, logo: ev.target?.result as string });
                      reader.readAsDataURL(file);
                    }
                  }}
                  onDragOver={e => e.preventDefault()}
                >
                  <Plus size={24} className="mx-auto mb-2 text-white/50" />
                  <p className="text-sm text-white/70">
                    Click or drag and drop an image (JPG, PNG, WEBP)
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file && file.type.startsWith("image/")) {
                        const reader = new FileReader();
                        reader.onload = ev => setEditStartup({ ...editStartup, logo: ev.target?.result as string });
                        reader.readAsDataURL(file);
                      }
                    }}
                    id="edit-startup-logo-upload"
                  />
                  <label htmlFor="edit-startup-logo-upload" className="cursor-pointer text-brand-purple underline block mt-2">Browse</label>
                  {editStartup.logo && (
                    <img src={editStartup.logo} alt="Logo Preview" className="mx-auto mt-4 max-h-32 rounded" />
                  )}
                </div>
                {/* Positions editing */}
                <div>
                  <label className="block text-sm font-medium mb-2">Open Positions</label>
                  {editStartup.positions && editStartup.positions.map((pos: any, idx: number) => (
                    <div key={idx} className="flex gap-2 mb-2 items-center">
                      <select
                        value={pos.type}
                        onChange={e => {
                          const updated = [...editStartup.positions];
                          updated[idx].type = e.target.value;
                          setEditStartup({ ...editStartup, positions: updated });
                        }}
                        className="bg-black text-white border-white/10 rounded-md px-2 py-1"
                        required
                      >
                        <option value="">Type</option>
                        <option value="Internship" className="bg-black text-white">Internship</option>
                        <option value="Part-time" className="bg-black text-white">Part-time</option>
                        <option value="Full-time" className="bg-black text-white">Full-time</option>
                      </select>
                      <Input
                        value={pos.role}
                        onChange={e => {
                          const updated = [...editStartup.positions];
                          updated[idx].role = e.target.value;
                          setEditStartup({ ...editStartup, positions: updated });
                        }}
                        placeholder="Role"
                        className="bg-white/5 border-white/10"
                        required
                      />
                      <Input
                        value={pos.applyLink}
                        onChange={e => {
                          const updated = [...editStartup.positions];
                          updated[idx].applyLink = e.target.value;
                          setEditStartup({ ...editStartup, positions: updated });
                        }}
                        placeholder="Apply Link"
                        className="bg-white/5 border-white/10"
                        required
                      />
                      <Button
                        type="button"
                        size="sm"
                        className="bg-red-500 text-white"
                        onClick={() => {
                          const updated = editStartup.positions.filter((_: any, i: number) => i !== idx);
                          setEditStartup({ ...editStartup, positions: updated });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    className="bg-green-600 text-white mt-2"
                    onClick={() => setEditStartup({ ...editStartup, positions: [...(editStartup.positions || []), { type: '', role: '', applyLink: '' }] })}
                  >
                    Add Position
                  </Button>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-pink mt-4"
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Startups;
