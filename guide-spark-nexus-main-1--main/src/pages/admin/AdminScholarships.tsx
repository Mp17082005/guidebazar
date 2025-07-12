import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Save, X, Globe, DollarSign, Calendar, Users } from "lucide-react";

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
    description: "Prestigious scholarship for international educational exchange between the US and other countries."
  },
  {
    id: 2,
    title: "DAAD Scholarships",
    type: "International",
    country: "Germany",
    amount: "€850/month",
    deadline: "2024-12-31",
    eligibility: "Master's and PhD students",
    description: "German Academic Exchange Service scholarships for international students."
  },
  {
    id: 3,
    title: "INSPIRE Fellowship",
    type: "National",
    country: "India",
    amount: "₹80,000/year",
    deadline: "2024-11-30",
    eligibility: "Science students in India",
    description: "Department of Science and Technology fellowship for pursuing research in basic sciences."
  }
];

const AdminScholarships = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [isAddingScholarship, setIsAddingScholarship] = useState(false);
  const [editingScholarshipId, setEditingScholarshipId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Scholarship>>({
    title: "",
    type: "National",
    country: "",
    amount: "",
    deadline: "",
    eligibility: "",
    description: ""
  });

  // Load scholarships from localStorage on component mount
  useEffect(() => {
    const savedScholarships = localStorage.getItem('adminScholarships');
    if (savedScholarships) {
      setScholarships(JSON.parse(savedScholarships));
    } else {
      setScholarships(defaultScholarships);
      localStorage.setItem('adminScholarships', JSON.stringify(defaultScholarships));
    }
  }, []);

  // Save scholarships to localStorage whenever scholarships change
  useEffect(() => {
    if (scholarships.length > 0) {
      localStorage.setItem('adminScholarships', JSON.stringify(scholarships));
    }
  }, [scholarships]);

  const handleInputChange = (field: keyof Scholarship, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddScholarship = () => {
    if (!formData.title || !formData.country || !formData.amount || !formData.deadline) return;

    const newScholarship: Scholarship = {
      id: Date.now(),
      title: formData.title!,
      type: formData.type || "National",
      country: formData.country!,
      amount: formData.amount!,
      deadline: formData.deadline!,
      eligibility: formData.eligibility || "",
      description: formData.description || ""
    };

    setScholarships(prev => [...prev, newScholarship]);
    setFormData({
      title: "",
      type: "National",
      country: "",
      amount: "",
      deadline: "",
      eligibility: "",
      description: ""
    });
    setIsAddingScholarship(false);
  };

  const handleEditScholarship = (scholarshipId: number) => {
    const scholarship = scholarships.find(s => s.id === scholarshipId);
    if (scholarship) {
      setFormData(scholarship);
      setEditingScholarshipId(scholarshipId);
    }
  };

  const handleUpdateScholarship = () => {
    if (!formData.title || !formData.country || !formData.amount || !formData.deadline || editingScholarshipId === null) return;

    setScholarships(prev => prev.map(scholarship => 
      scholarship.id === editingScholarshipId 
        ? { ...scholarship, ...formData } as Scholarship
        : scholarship
    ));
    
    setEditingScholarshipId(null);
    setFormData({
      title: "",
      type: "National",
      country: "",
      amount: "",
      deadline: "",
      eligibility: "",
      description: ""
    });
  };

  const handleDeleteScholarship = (scholarshipId: number) => {
    if (confirm("Are you sure you want to delete this scholarship?")) {
      setScholarships(prev => prev.filter(scholarship => scholarship.id !== scholarshipId));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      type: "National",
      country: "",
      amount: "",
      deadline: "",
      eligibility: "",
      description: ""
    });
    setIsAddingScholarship(false);
    setEditingScholarshipId(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4"
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Admin - Scholarships Management
        </h1>
        <p className="text-xl text-white/80">
          Add, edit, and manage scholarships for your platform
        </p>
      </div>

      {/* Add New Scholarship Button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={() => setIsAddingScholarship(true)}
          className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90"
          disabled={isAddingScholarship || editingScholarshipId !== null}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Scholarship
        </Button>
      </div>

      {/* Add/Edit Scholarship Form */}
      {(isAddingScholarship || editingScholarshipId !== null) && (
        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white">
              {editingScholarshipId ? "Edit Scholarship" : "Add New Scholarship"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Scholarship Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter scholarship title"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20 text-white">
                    <SelectItem value="National">National</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter scholarship description"
                className="bg-white/10 border-white/20 text-white"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Country *</label>
                <Input
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="e.g., USA, India, Germany"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Amount *</label>
                <Input
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="e.g., $30,000, ₹80,000/year"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Deadline *</label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Eligibility</label>
                <Input
                  value={formData.eligibility}
                  onChange={(e) => handleInputChange('eligibility', e.target.value)}
                  placeholder="e.g., Graduate students, Science students"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={editingScholarshipId ? handleUpdateScholarship : handleAddScholarship}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingScholarshipId ? "Update Scholarship" : "Save Scholarship"}
              </Button>
              <Button
                onClick={resetForm}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scholarships List */}
      <div className="grid md:grid-cols-2 gap-6">
        {scholarships.map((scholarship) => (
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
              <div className="space-y-3 mb-4">
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
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEditScholarship(scholarship.id)}
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                  disabled={isAddingScholarship || editingScholarshipId !== null}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteScholarship(scholarship.id)}
                  className="bg-red-600 hover:bg-red-700 flex-1"
                  disabled={isAddingScholarship || editingScholarshipId !== null}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {scholarships.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No scholarships found. Add your first scholarship!</p>
        </div>
      )}
    </motion.div>
  );
};

export default AdminScholarships;
