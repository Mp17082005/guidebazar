
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, Heart, User } from "lucide-react";

interface UserProfileCardProps {
  user: {
    id: number;
    name: string;
    profilePicture: string;
    interests: string[];
    isOnline: boolean;
  };
  onMessageClick: () => void;
}

const UserProfileCard = ({ user, onMessageClick }: UserProfileCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-card h-full border-white/10 bg-white/5 backdrop-blur-lg hover:border-brand-purple/50 transition-all duration-300">
        <CardContent className="p-4 sm:p-6 flex flex-col h-full">
          {/* Profile Picture and Online Status */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 ring-2 ring-white/20">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              {/* Online Status Indicator */}
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black ${
                  user.isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Name */}
          <h3 className="text-lg sm:text-xl font-semibold text-center mb-3 text-white">
            {user.name}
          </h3>

          {/* Interests */}
          <div className="flex-1 mb-4">
            <p className="text-sm text-white/60 mb-2 text-center">Interests:</p>
            <div className="flex flex-wrap gap-1 justify-center">
              {user.interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80 border border-white/20"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLikeClick}
              className={`flex-1 transition-all duration-300 ${
                isLiked
                  ? "text-pink-500 hover:text-pink-400 bg-pink-500/10"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Heart
                className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`}
              />
              Like
            </Button>
            
            <Button
              onClick={onMessageClick}
              className="flex-1 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 text-white font-medium"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfileCard;
