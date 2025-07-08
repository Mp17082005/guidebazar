import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// REMOVED: import Navbar from "@/components/Navbar";
// REMOVED: import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Filter,
  MapPin,
  ShoppingCart,
  ZoomIn,
  Star,
  Tag,
  Clock,
  X,
  MessageCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/marketplace";

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showListingForm, setShowListingForm] = useState(false);
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchListings();
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewedMarketplace");
    if (stored) setRecentlyViewed(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("recentlyViewedMarketplace", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setListings(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateListing = async (formData: any) => {
    const payload = {
      ...formData,
      type: formData.type || 'sale',
      owner: formData.owner || prompt('Enter your email (for demo):') || 'anonymous',
      price: Number(formData.price),
      images: imagePreview ? [imagePreview] : [],
    };
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit listing");
      const newListing = await res.json();
      setListings([newListing, ...listings]);
      setShowListingForm(false);
      setError(null);
    } catch (err) {
      setError("Failed to submit listing");
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    setEditForm({ ...item });
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
        body: JSON.stringify({ ...editForm, price: Number(editForm.price) }),
      });
      if (!res.ok) throw new Error('Failed to update listing');
      const updated = await res.json();
      setListings(listings.map(l => l._id === editingId ? updated : l));
      setEditingId(null);
      setEditForm(null);
      setError(null);
    } catch {
      setError('Failed to update listing');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this listing?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      setListings(listings.filter(l => l._id !== id));
    } catch {
      setError('Failed to delete listing');
    }
  };

  const categories = [
    "All Categories",
    "Books",
    "Notes",
    "Electronics",
    "Coupons",
    "Event Tickets",
    "Services",
    "Others",
  ];

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];

  const filteredListings = (selectedCategory === "All Categories"
      ? listings
    : listings.filter((listing) => listing.category === selectedCategory)
  ).filter((listing) => {
    const price = Number(listing.price);
    const min = minPrice ? Number(minPrice) : -Infinity;
    const max = maxPrice ? Number(maxPrice) : Infinity;
    return price >= min && price <= max;
  });

  const handleViewListing = (listing: any) => {
    setActiveItem(activeItem === listing.id ? null : listing.id);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((item) => item.id !== listing.id);
      const updated = [listing, ...filtered].slice(0, 3); // keep max 3
      return updated;
    });
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
            Student Marketplace
          </h1>
          <p className="text-xl text-white/80 mb-10">
            Buy, sell, and save on student essentials in our digital bazaar.
          </p>
        </motion.div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Create Listing Modal */}
        <AnimatePresence>
          {showListingForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowListingForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Create New Listing</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowListingForm(false)}
                  >
                    <X size={20} />
                  </Button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    handleCreateListing(Object.fromEntries(formData));
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Item Title
                    </label>
                    <Input
                      name="title"
                      placeholder="What are you selling?"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        className="w-full rounded-md bg-white/5 border-white/10 p-2 text-sm"
                        required
                      >
                        {categories
                          .filter((cat) => cat !== "All Categories")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Condition
                      </label>
                      <select
                        name="condition"
                        className="w-full rounded-md bg-white/5 border-white/10 p-2 text-sm"
                        required
                      >
                        {conditions.map((condition) => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Price (₹)
                      </label>
                      <Input
                        name="price"
                        type="number"
                        placeholder="e.g. 500"
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
                        placeholder="e.g. Campus, Online"
                        className="bg-white/5 border-white/10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      placeholder="Describe your item in detail"
                      className="bg-white/5 border-white/10"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      name="ownerName"
                      placeholder="Your full name"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Contact Email
                    </label>
                    <Input
                      name="ownerContact"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-white/5 border-white/10"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Images
                    </label>
                    <div
                      className="border border-dashed border-white/20 rounded-md p-8 text-center hover:bg-white/5 cursor-pointer transition-colors"
                      onDrop={e => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                        if (file && file.type.startsWith("image/")) {
                          const reader = new FileReader();
                          reader.onload = ev => setImagePreview(ev.target?.result as string);
                          reader.readAsDataURL(file);
                          setImageFile(file);
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
                            reader.onload = ev => setImagePreview(ev.target?.result as string);
                            reader.readAsDataURL(file);
                            setImageFile(file);
                          }
                        }}
                        id="marketplace-image-upload"
                      />
                      <label htmlFor="marketplace-image-upload" className="cursor-pointer text-brand-purple underline block mt-2">Browse</label>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="bg-white/5 border-white/10 mt-2 w-full"
                        onBlur={e => setImagePreview(e.target.value)}
                      />
                      {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mx-auto mt-4 max-h-32 rounded" />
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-pink"
                  >
                    Create Listing
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            className="w-full md:w-64 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="sticky top-24 space-y-6">
              {/* Create Listing Button */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={() => setShowListingForm(true)}
                  className="w-full gap-2 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity py-6 relative overflow-hidden group"
                >
                  <Plus
                    size={18}
                    className="absolute left-4 group-hover:translate-x-1 transition-transform"
                  />
                  <span className="ml-4">Post New Listing</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </motion.div>

              {/* Categories Filter */}
              <motion.div
                className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 hover:border-brand-purple/30 transition-all duration-300"
                whileHover={{ boxShadow: "0 0 20px rgba(142, 68, 173, 0.2)" }}
              >
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Filter size={18} className="text-brand-purple" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                        category === selectedCategory
                          ? "bg-gradient-to-r from-brand-purple/90 to-brand-pink/90 text-white"
                          : "hover:bg-white/10 text-white/70 hover:text-white"
                      }`}
                      whileHover={{ x: 3 }}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Price Filter */}
              <motion.div
                className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 hover:border-brand-purple/30 transition-all duration-300"
                whileHover={{ boxShadow: "0 0 20px rgba(142, 68, 173, 0.2)" }}
              >
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Tag size={18} className="text-brand-purple" />
                  Price Range
                </h3>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Min"
                    className="w-full bg-white/5 border-white/10 focus:border-brand-purple/50 transition-colors"
                    type="number"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    placeholder="Max"
                    className="w-full bg-white/5 border-white/10 focus:border-brand-purple/50 transition-colors"
                    type="number"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full mt-3 bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => {}} // No-op, filter is live
                >
                  Apply
                </Button>
              </motion.div>

              {/* Recently Viewed */}
              <motion.div
                className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 hover:border-brand-purple/30 transition-all duration-300 hidden lg:block"
                whileHover={{ boxShadow: "0 0 20px rgba(142, 68, 173, 0.2)" }}
              >
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Clock size={18} className="text-brand-purple" />
                  Recently Viewed
                </h3>
                <div className="space-y-3">
                  {recentlyViewed.length === 0 ? (
                    <div className="text-sm text-white/50">No recently viewed items.</div>
                  ) : (
                    recentlyViewed.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                    <div className="w-8 h-8 rounded flex items-center justify-center bg-white/10 text-lg">
                          {item.images && item.images.length > 0 ? (
                            <img src={item.images[0]} alt={item.title} className="w-8 h-8 object-cover rounded" />
                          ) : (
                            <span>📦</span>
                          )}
                    </div>
                        <div className="text-sm truncate">{item.title}</div>
                  </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Search Bar */}
            <motion.div
              className="relative mb-8 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/50 group-hover:text-brand-purple transition-colors duration-300" />
              </div>
              <Input
                placeholder="Search for books, electronics, tickets..."
                className="pl-10 py-6 bg-white/5 border-white/10 hover:border-brand-purple/50 focus:border-brand-purple/50 transition-all duration-300"
              />
              <div className="absolute inset-0 -z-10 blur-md bg-gradient-to-r from-brand-purple/5 to-brand-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>

            {/* Listings */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {filteredListings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 32px 0 rgba(240,98,146,0.18)",
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 card-hover relative overflow-hidden group p-5 hover:border-brand-pink/60 hover:shadow-brand-pink/30 transition-all duration-500"
                  onClick={() => handleViewListing(listing)}
                >
                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-full bg-gradient-to-br from-brand-pink/30 via-brand-purple/20 to-brand-pink/10 animate-float blur-2xl"></div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    {/* Image Display */}
                    <div className="relative flex-shrink-0 w-24 h-24 group cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/40 to-brand-pink/40 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative w-24 h-24 rounded-lg bg-white/10 flex items-center justify-center text-3xl overflow-hidden group">
                        {listing.images && listing.images.length > 0 ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-4xl">📦</span>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium line-clamp-1">
                            {listing.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <Badge className="bg-brand-purple/20 text-brand-purple hover:bg-brand-purple/30">
                              {listing.category}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="bg-white/10 text-white hover:bg-white/20"
                            >
                              {listing.condition}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-white/60">
                            <MapPin
                              size={14}
                              className="mr-1 text-brand-pink"
                            />
                            {listing.location}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
                            {listing.price}
                          </p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {activeItem === listing.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 overflow-hidden"
                          >
                            <p className="text-sm text-white/80 mb-3">
                              {listing.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-white/60 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {listing.listedOn} by {listing.ownerName}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `mailto:${listing.ownerContact}`;
                            }}
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Contact Seller
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredListings.length === 0 && (
                <motion.div
                  className="col-span-2 text-center py-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">
                    No listings found
                  </h3>
                  <p className="text-white/60">
                    Try adjusting your filters or search criteria
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Marketplace;
