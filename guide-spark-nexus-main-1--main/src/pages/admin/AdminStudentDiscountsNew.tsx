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
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, Tag, ExternalLink, Star } from "lucide-react";

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
  verificationUrl: string;
  link: string;
  rating: number;
  usersUsed: number;
  savings: string;
  isPopular: boolean;
  isVerified: boolean;
}

const defaultDiscounts: StudentDiscount[] = [
  {
    id: 1,
    brand: "Canva",
    title: "Canva Pro Free for 12 Months",
    description: "Access premium templates, remove backgrounds, and collaborate with your team",
    category: "Creative Tools",
    verification: "GitHub Student Pack",
    discount: "100% OFF",
    originalPrice: "$119.99/year",
    eligibility: "Requires GitHub Student Developer Pack verification",
    instructions: "Sign up for GitHub Student Developer Pack, then access Canva Pro through the pack benefits",
    verificationUrl: "https://education.github.com/pack",
    link: "https://canva.com/education/",
    rating: 4.9,
    usersUsed: 12500,
    savings: "₹9,600",
    isPopular: true,
    isVerified: true
  },
  {
    id: 2,
    brand: "Adobe",
    title: "Adobe Creative Cloud Student Discount",
    description: "Complete creative suite including Photoshop, Illustrator, Premiere Pro, and more",
    category: "Creative Tools",
    verification: "Student Email Verification",
    discount: "60% OFF",
    originalPrice: "$52.99/month",
    eligibility: "Currently enrolled students with valid .edu email",
    instructions: "Visit Adobe Education Store, verify your student status with SheerID",
    verificationUrl: "https://www.adobe.com/education-discount.html",
    link: "https://www.adobe.com/education-discount.html",
    rating: 4.8,
    usersUsed: 8900,
    savings: "₹1,584/month",
    isPopular: true,
    isVerified: true
  },
  {
    id: 3,
    brand: "Spotify",
    title: "Spotify Premium Student",
    description: "Ad-free music streaming with offline downloads and unlimited skips",
    category: "Entertainment",
    verification: "Student Email Verification",
    discount: "50% OFF",
    originalPrice: "$9.99/month",
    eligibility: "Currently enrolled at an accredited college or university",
    instructions: "Sign up with student email and verify through SheerID",
    verificationUrl: "https://www.spotify.com/student/",
    link: "https://www.spotify.com/student/",
    rating: 4.7,
    usersUsed: 15600,
    savings: "₹420/month",
    isPopular: true,
    isVerified: true
  }
];

const AdminStudentDiscounts = () => {
  const [discounts, setDiscounts] = useState<StudentDiscount[]>([]);
  const [isAddingDiscount, setIsAddingDiscount] = useState(false);
  const [editingDiscountId, setEditingDiscountId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<StudentDiscount>>({
    brand: "",
    title: "",
    description: "",
    category: "Creative Tools",
    verification: "",
    discount: "",
    originalPrice: "",
    eligibility: "",
    instructions: "",
    verificationUrl: "",
    link: "",
    rating: 4.5,
    usersUsed: 0,
    savings: "",
    isPopular: false,
    isVerified: true
  });

  // Load discounts from localStorage on component mount
  useEffect(() => {
    const savedDiscounts = localStorage.getItem('adminStudentDiscounts');
    if (savedDiscounts) {
      setDiscounts(JSON.parse(savedDiscounts));
    } else {
      setDiscounts(defaultDiscounts);
      localStorage.setItem('adminStudentDiscounts', JSON.stringify(defaultDiscounts));
    }
  }, []);

  // Save discounts to localStorage whenever discounts change
  useEffect(() => {
    if (discounts.length > 0) {
      localStorage.setItem('adminStudentDiscounts', JSON.stringify(discounts));
    }
  }, [discounts]);

  const handleInputChange = (field: keyof StudentDiscount, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddDiscount = () => {
    if (!formData.brand || !formData.title || !formData.description) return;

    const newDiscount: StudentDiscount = {
      id: Date.now(),
      brand: formData.brand!,
      title: formData.title!,
      description: formData.description!,
      category: formData.category || "Creative Tools",
      verification: formData.verification || "",
      discount: formData.discount || "",
      originalPrice: formData.originalPrice || "",
      eligibility: formData.eligibility || "",
      instructions: formData.instructions || "",
      verificationUrl: formData.verificationUrl || "",
      link: formData.link || "",
      rating: formData.rating || 4.5,
      usersUsed: formData.usersUsed || 0,
      savings: formData.savings || "",
      isPopular: formData.isPopular || false,
      isVerified: formData.isVerified || true
    };

    setDiscounts(prev => [...prev, newDiscount]);
    resetForm();
  };

  const handleEditDiscount = (discountId: number) => {
    const discount = discounts.find(d => d.id === discountId);
    if (discount) {
      setFormData(discount);
      setEditingDiscountId(discountId);
    }
  };

  const handleUpdateDiscount = () => {
    if (!formData.brand || !formData.title || !formData.description || editingDiscountId === null) return;

    setDiscounts(prev => prev.map(discount => 
      discount.id === editingDiscountId 
        ? { ...discount, ...formData } as StudentDiscount
        : discount
    ));
    
    resetForm();
  };

  const handleDeleteDiscount = (discountId: number) => {
    if (confirm("Are you sure you want to delete this discount?")) {
      setDiscounts(prev => prev.filter(discount => discount.id !== discountId));
    }
  };

  const resetForm = () => {
    setFormData({
      brand: "",
      title: "",
      description: "",
      category: "Creative Tools",
      verification: "",
      discount: "",
      originalPrice: "",
      eligibility: "",
      instructions: "",
      verificationUrl: "",
      link: "",
      rating: 4.5,
      usersUsed: 0,
      savings: "",
      isPopular: false,
      isVerified: true
    });
    setIsAddingDiscount(false);
    setEditingDiscountId(null);
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
          Admin - Student Discounts Management
        </h1>
        <p className="text-xl text-white/80">
          Add, edit, and manage verified student discounts and deals
        </p>
      </div>

      {/* Add New Discount Button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={() => setIsAddingDiscount(true)}
          className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90"
          disabled={isAddingDiscount || editingDiscountId !== null}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Discount
        </Button>
      </div>

      {/* Add/Edit Discount Form */}
      {(isAddingDiscount || editingDiscountId !== null) && (
        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white">
              {editingDiscountId ? "Edit Student Discount" : "Add New Student Discount"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Brand Name *</label>
                <Input
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="e.g., Canva, Adobe, Spotify"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20 text-white">
                    <SelectItem value="Creative Tools">Creative Tools</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Productivity">Productivity</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Discount Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Canva Pro Free for 12 Months"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Description *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what the discount offers"
                className="bg-white/10 border-white/20 text-white"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Discount Percentage</label>
                <Input
                  value={formData.discount}
                  onChange={(e) => handleInputChange('discount', e.target.value)}
                  placeholder="e.g., 100% OFF, 60% OFF"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Original Price</label>
                <Input
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  placeholder="e.g., $119.99/year"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Savings</label>
                <Input
                  value={formData.savings}
                  onChange={(e) => handleInputChange('savings', e.target.value)}
                  placeholder="e.g., ₹9,600"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Verification Method</label>
                <Input
                  value={formData.verification}
                  onChange={(e) => handleInputChange('verification', e.target.value)}
                  placeholder="e.g., GitHub Student Pack, Student Email"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Verification URL</label>
                <Input
                  value={formData.verificationUrl}
                  onChange={(e) => handleInputChange('verificationUrl', e.target.value)}
                  placeholder="https://education.github.com/pack"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Eligibility Requirements</label>
              <Textarea
                value={formData.eligibility}
                onChange={(e) => handleInputChange('eligibility', e.target.value)}
                placeholder="Who is eligible for this discount?"
                className="bg-white/10 border-white/20 text-white"
                rows={2}
              />
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">How to Get Instructions</label>
              <Textarea
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                placeholder="Step-by-step instructions on how to get this discount"
                className="bg-white/10 border-white/20 text-white"
                rows={2}
              />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Discount Link</label>
                <Input
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  placeholder="https://example.com/student-discount"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Rating (1-5)</label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 4.5)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Users Used</label>
                <Input
                  type="number"
                  value={formData.usersUsed}
                  onChange={(e) => handleInputChange('usersUsed', parseInt(e.target.value) || 0)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-white/80 text-sm block">Options</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => handleInputChange('isPopular', e.target.checked)}
                      className="rounded"
                    />
                    Popular
                  </label>
                  <label className="flex items-center gap-2 text-white/80 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.isVerified}
                      onChange={(e) => handleInputChange('isVerified', e.target.checked)}
                      className="rounded"
                    />
                    Verified
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={editingDiscountId ? handleUpdateDiscount : handleAddDiscount}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingDiscountId ? "Update Discount" : "Save Discount"}
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

      {/* Discounts List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((discount) => (
          <Card
            key={discount.id}
            className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    {discount.brand}
                    {discount.isVerified && <Badge className="bg-green-500/20 text-green-400 text-xs">Verified</Badge>}
                    {discount.isPopular && <Badge className="bg-orange-500/20 text-orange-400 text-xs">Popular</Badge>}
                  </CardTitle>
                  <p className="text-white/60 text-sm">{discount.title}</p>
                </div>
                <Badge className="bg-brand-purple/20 text-brand-purple">
                  {discount.discount}
                </Badge>
              </div>
              <CardDescription className="text-white/70 text-sm">
                {discount.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-white/80 mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-3 w-3" />
                  <span>{discount.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-3 w-3" />
                  <span>{discount.rating}/5 ({discount.usersUsed} users)</span>
                </div>
                <div><strong>Savings:</strong> {discount.savings}</div>
                <div><strong>Verification:</strong> {discount.verification}</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEditDiscount(discount.id)}
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                  disabled={isAddingDiscount || editingDiscountId !== null}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteDiscount(discount.id)}
                  className="bg-red-600 hover:bg-red-700 flex-1"
                  disabled={isAddingDiscount || editingDiscountId !== null}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {discounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No student discounts found. Add your first discount!</p>
        </div>
      )}
    </motion.div>
  );
};

export default AdminStudentDiscounts;
