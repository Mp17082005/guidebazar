import { useState, useMemo } from "react";
import { motion } from "framer-motion";
// Removed: import Navbar from "@/components/Navbar";
// Removed: import Footer from "@/components/Footer";
import UserProfileCard from "@/components/network/UserProfileCard";
import ChatModal from "@/components/network/ChatModal";
import NetworkFilters from "@/components/network/NetworkFilters";

// Mock user data - in a real app, this would come from your backend
const mockUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    interests: ["Web Development", "AI/ML", "Startups"],
    isOnline: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108755-2616b9d14c84?w=150&h=150&fit=crop&crop=face",
    interests: ["Data Science", "Finance", "Photography"],
    isOnline: false,
  },
  {
    id: 3,
    name: "Michael Davis",
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    interests: ["Blockchain", "Entrepreneurship", "Gaming"],
    isOnline: true,
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    profilePicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    interests: ["UX Design", "Marketing", "Travel"],
    isOnline: true,
  },
  {
    id: 5,
    name: "David Kim",
    profilePicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    interests: ["Mobile Development", "IoT", "Music"],
    isOnline: false,
  },
  {
    id: 6,
    name: "Lisa Thompson",
    profilePicture:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    interests: ["Content Writing", "Social Media", "Fitness"],
    isOnline: true,
  },
];

// Renamed the main component from 'Network' to 'AdminNetwork'
const AdminNetwork = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All Interests");

  const handleMessageClick = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  const handleCloseChatModal = () => {
    setIsChatOpen(false);
    setSelectedUser(null);
  };

  // Filter users based on search term and selected interest
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesInterest =
        selectedInterest === "All Interests" ||
        user.interests.some((interest) => interest === selectedInterest);

      return matchesSearch && matchesInterest;
    });
  }, [searchTerm, selectedInterest]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent" />

        {/* Animated glow spots */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-brand-purple/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-brand-pink/20 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Removed: <Navbar /> */}

      <main className="relative z-10 pt-20 sm:pt-24 lg:pt-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">Network</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
              Connect with fellow learners, entrepreneurs, and professionals in
              our community
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <NetworkFilters
              onSearchChange={setSearchTerm}
              onInterestChange={setSelectedInterest}
              searchValue={searchTerm}
              selectedInterest={selectedInterest}
            />
          </motion.div>

          {/* User Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16"
          >
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <UserProfileCard
                    user={user}
                    onMessageClick={() => handleMessageClick(user)}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-white/60 text-lg">
                  No users found matching your criteria.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      {/* Removed: <Footer /> */}

      {/* Chat Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={handleCloseChatModal}
        user={selectedUser}
      />
    </div>
  );
};

// Changed export default from Network to AdminNetwork
export default AdminNetwork;