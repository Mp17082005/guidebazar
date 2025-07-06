
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface NetworkFiltersProps {
  onSearchChange: (search: string) => void;
  onInterestChange: (interest: string) => void;
  searchValue: string;
  selectedInterest: string;
}

const allInterests = [
  "All Interests",
  "Web Development",
  "AI/ML", 
  "Startups",
  "Data Science",
  "Finance",
  "Photography",
  "Blockchain",
  "Entrepreneurship",
  "Gaming",
  "UX Design",
  "Marketing",
  "Travel",
  "Mobile Development",
  "IoT",
  "Music",
  "Content Writing",
  "Social Media",
  "Fitness"
];

const NetworkFilters = ({ onSearchChange, onInterestChange, searchValue, selectedInterest }: NetworkFiltersProps) => {
  return (
    <div className="space-y-6 md:space-y-8 w-full overflow-x-hidden mb-8">
      {/* Search Bar - Prominent */}
      <div className="relative max-w-2xl mx-auto px-4 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl md:rounded-2xl blur-xl"></div>
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-1 shadow-lg border border-purple-500/30 w-full">
          <div className="relative w-full">
            <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 text-base md:text-lg bg-transparent border-0 focus:ring-0 placeholder:text-gray-400 w-full text-white focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-700/50 mx-4 w-[calc(100%-2rem)] max-w-none">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Filter className="h-4 w-4 md:h-5 md:w-5 text-purple-400 flex-shrink-0" />
          <span className="font-semibold text-white text-sm md:text-base">Filter by Interest</span>
        </div>
        
        <Select value={selectedInterest} onValueChange={onInterestChange}>
          <SelectTrigger className="w-full rounded-lg md:rounded-xl border-gray-600 hover:border-purple-400 transition-colors min-h-[44px] bg-gray-800/50 text-gray-300 focus:border-purple-500">
            <SelectValue placeholder="Filter by interest" />
          </SelectTrigger>
          <SelectContent className="rounded-lg md:rounded-xl border-gray-600 bg-gray-800 text-gray-300 z-50">
            {allInterests.map((interest) => (
              <SelectItem 
                key={interest} 
                value={interest}
                className="text-white hover:bg-white/10 focus:bg-white/10"
              >
                {interest}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default NetworkFilters;
