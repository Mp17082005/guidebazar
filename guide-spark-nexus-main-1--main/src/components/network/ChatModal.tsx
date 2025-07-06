
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, X, User } from "lucide-react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    profilePicture: string;
    isOnline: boolean;
  } | null;
}

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
  timestamp: Date;
}

const ChatModal = ({ isOpen, onClose, user }: ChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && user) {
      // Simulate initial conversation
      setMessages([
        {
          id: 1,
          text: "Hi there! Thanks for connecting!",
          sender: "other",
          timestamp: new Date(Date.now() - 10000),
        },
        {
          id: 2,
          text: "Hello! Nice to meet you. I saw your profile and found your interests really interesting.",
          sender: "me",
          timestamp: new Date(Date.now() - 5000),
        },
      ]);
    } else {
      setMessages([]);
    }
  }, [isOpen, user]);

  const handleSendMessage = () => {
    if (newMessage.trim() && user) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "me",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage("");

      // Simulate response after a delay
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: "That's great! I'd love to learn more about your projects.",
          sender: "other",
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 backdrop-blur-xl border-white/20 shadow-2xl max-w-lg w-full mx-3 sm:mx-auto h-[80vh] max-h-[600px] flex flex-col p-0">
        {/* Header */}
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-r from-brand-purple to-brand-pink text-white">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
                  user.isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>
            <div>
              <DialogTitle className="text-white text-lg">{user.name}</DialogTitle>
              <p className="text-sm text-white/60">
                {user.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${
                  message.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    message.sender === "me"
                      ? "bg-gradient-to-r from-brand-purple to-brand-pink text-white"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-white/20">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-brand-purple/50"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
