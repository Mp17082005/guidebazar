import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  GraduationCap, 
  TrendingUp, 
  Settings, 
  Plus,
  Edit,
  Eye,
  Percent
} from "lucide-react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  capacity: number;
  price: number;
  organizer: string;
  image?: string;
  tags: string[];
  isOnline: boolean;
  isFeatured: boolean;
}

interface Scholarship {
  id: number;
  title: string;
  provider: string;
  amount: string;
  type: string;
  deadline: string;
  eligibility: string;
  description: string;
  applicationUrl: string;
  country: string;
  flag: string;
  category: string;
  tags: string[];
  isFullyFunded: boolean;
  applicationFee: number;
}

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

const AdminIndex = () => {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalScholarships: 0,
    totalDiscounts: 0,
    activeEvents: 0,
    internationalScholarships: 0,
    verifiedDiscounts: 0
  });

  useEffect(() => {
    setMounted(true);
    
    // Load stats from localStorage
    const loadStats = () => {
      const savedEvents = localStorage.getItem('adminEvents');
      const savedScholarships = localStorage.getItem('adminScholarships');
      const savedDiscounts = localStorage.getItem('adminStudentDiscounts');
      
      let events: Event[] = [];
      let scholarships: Scholarship[] = [];
      let discounts: StudentDiscount[] = [];
      
      if (savedEvents) {
        events = JSON.parse(savedEvents);
      }
      if (savedScholarships) {
        scholarships = JSON.parse(savedScholarships);
      }
      if (savedDiscounts) {
        discounts = JSON.parse(savedDiscounts);
      }
      
      const today = new Date();
      const activeEvents = events.filter((event: Event) => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
      }).length;
      
      const internationalScholarships = scholarships.filter((scholarship: Scholarship) => 
        scholarship.type === 'International'
      ).length;
      
      const verifiedDiscounts = discounts.filter((discount: StudentDiscount) => 
        discount.isVerified === true
      ).length;
      
      setStats({
        totalEvents: events.length,
        totalScholarships: scholarships.length,
        totalDiscounts: discounts.length,
        activeEvents,
        internationalScholarships,
        verifiedDiscounts
      });
    };
    
    loadStats();
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Admin Dashboard
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Manage events, scholarships, and content for your platform
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-6 w-6 text-brand-purple" />
              Events Management
            </CardTitle>
            <CardDescription className="text-white/60">
              Total: {stats.totalEvents} | Active: {stats.activeEvents}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Link to="/admin/events" className="flex-1">
                <Button className="w-full bg-brand-purple hover:bg-brand-purple/90">
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Events
                </Button>
              </Link>
              <Link to="/events" className="flex-1">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-brand-pink" />
              Scholarships Management
            </CardTitle>
            <CardDescription className="text-white/60">
              Total: {stats.totalScholarships} | International: {stats.internationalScholarships}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Link to="/admin/scholarships" className="flex-1">
                <Button className="w-full bg-brand-pink hover:bg-brand-pink/90">
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Scholarships
                </Button>
              </Link>
              <Link to="/scholarships" className="flex-1">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Percent className="h-6 w-6 text-brand-cyan" />
              Student Discounts
            </CardTitle>
            <CardDescription className="text-white/60">
              Total: {stats.totalDiscounts} | Verified: {stats.verifiedDiscounts}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Link to="/admin/student-discounts" className="flex-1">
                <Button className="w-full bg-brand-cyan hover:bg-brand-cyan/90">
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Discounts
                </Button>
              </Link>
              <Link to="/student-discounts" className="flex-1">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <Card className="bg-gradient-to-br from-brand-purple/20 to-brand-purple/10 border-brand-purple/20">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-brand-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.totalEvents}</div>
            <div className="text-sm text-white/60">Total Events</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-brand-pink/20 to-brand-pink/10 border-brand-pink/20">
          <CardContent className="p-6 text-center">
            <GraduationCap className="h-8 w-8 text-brand-pink mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.totalScholarships}</div>
            <div className="text-sm text-white/60">Scholarships</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/10 border-brand-cyan/20">
          <CardContent className="p-6 text-center">
            <Percent className="h-8 w-8 text-brand-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.totalDiscounts}</div>
            <div className="text-sm text-white/60">Student Discounts</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/20 to-green-500/10 border-green-500/20">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.activeEvents}</div>
            <div className="text-sm text-white/60">Active Events</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="h-6 w-6 text-brand-purple" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-white/60">
            Manage your platform content and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/resources-hub">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Eye className="h-4 w-4 mr-2" />
                View Resources Hub
              </Button>
            </Link>
            <Link to="/admin/events">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Plus className="h-4 w-4 mr-2" />
                Add New Event
              </Button>
            </Link>
            <Link to="/admin/scholarships">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Plus className="h-4 w-4 mr-2" />
                Add New Scholarship
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminIndex;
