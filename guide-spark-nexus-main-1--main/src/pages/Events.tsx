import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// REMOVED: import Navbar from "@/components/Navbar";
// REMOVED: import Footer from "@/components/Footer";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FilterIcon,
  Sparkles,
  Plus,
  X,
  Trash2,
} from "lucide-react";
import EventCalendar from "@/components/EventCalendar";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  maxAttendees: number;
  daysLeft: number;
  description: string;
  image?: string;
  link?: string;
}

interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  link?: string;
}

// Default events data
const defaultEvents: Event[] = [
  {
    id: 1,
    title: "Tech Startup Summit 2025",
    date: "2025-06-15",
    time: "10:00 AM - 4:00 PM",
    location: "Mumbai",
    type: "startup",
    attendees: 350,
    maxAttendees: 500,
    daysLeft: 12,
    description:
      "Connect with tech founders and investors from across India.",
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552",
    link: "https://example.com/register/startup-summit-2025"
  },
    {
      id: 2,
      title: "Financial Planning Workshop",
      date: "2025-06-03",
      time: "2:00 PM - 5:00 PM",
      location: "Online",
      type: "finance",
      attendees: 120,
      maxAttendees: 200,
      daysLeft: 5,
      description:
        "Learn essential financial skills for students and early professionals.",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb",
      link: "https://zoom.us/meeting/finance-workshop-2025"
    },
    {
      id: 3,
      title: "Code Wars: National Hackathon",
      date: "2025-07-08",
      time: "48 hours",
      location: "Bangalore",
      type: "hackathon",
      attendees: 500,
      maxAttendees: 800,
      daysLeft: 25,
      description:
        "Build innovative solutions and compete for prizes worth ₹5 Lakhs.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      link: "https://example.com/hackathon/codewars2025"
    },
    {
      id: 4,
      title: "Future of AI: Career Paths",
      date: "2025-06-20",
      time: "6:00 PM - 8:00 PM",
      location: "Delhi",
      type: "webinar",
      attendees: 250,
      maxAttendees: 300,
      daysLeft: 15,
      description:
        "Discover how AI is transforming industries and creating new opportunities.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      link: "https://example.com/webinar/ai-career-paths"
    },
  ];

const Events = () => {
  const [city, setCity] = useState<string>("all");
  const [eventType, setEventType] = useState<string>("all");
  const [showHostForm, setShowHostForm] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  
  // Form state for new event
  const [formEventType, setFormEventType] = useState<string>("tech");

  useEffect(() => {
    // Load events from backend API
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/events');
        const data = await response.json();
        
        if (data.success) {
          // Calculate days left for each event
          const eventsWithDaysLeft = data.events.map((event: Event) => ({
            ...event,
            daysLeft: Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          }));
          setUpcomingEvents(eventsWithDaysLeft);
        } else {
          console.error('Failed to fetch events:', data.message);
          // Fallback to default events if API fails
          setUpcomingEvents(defaultEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to default events if API fails
        setUpcomingEvents(defaultEvents);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = upcomingEvents.filter((event) => {
    return (
      (city === "all" ||
        event.location === city ||
        (city === "online" && event.location === "Online")) &&
      (eventType === "all" || event.type === eventType)
    );
  });

  const handleHostEvent = async (formData: EventFormData) => {
    console.log("New event submitted:", formData);
    
    try {
      const response = await fetch('http://localhost:5001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        // Add the new event to the existing events list
        const newEventWithDaysLeft = {
          ...data.event,
          daysLeft: Math.ceil((new Date(data.event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        };
        setUpcomingEvents([...upcomingEvents, newEventWithDaysLeft]);
        
        // Reset form and close
        setFormEventType("tech");
        setShowHostForm(false);
        
        console.log("Event created successfully:", data.event);
      } else {
        console.error('Failed to create event:', data.message);
        // You could show an error message to the user here
      }
    } catch (error) {
      console.error('Error creating event:', error);
      // You could show an error message to the user here
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/api/events/${eventId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setUpcomingEvents(prev => prev.filter(event => event.id !== eventId));
        console.log("Event deleted successfully");
      } else {
        console.error('Failed to delete event:', data.message);
        alert('Failed to delete event. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  return (
    // Removed outermost div with min-h-screen and direct bg/text colors.
    // UserLayout will provide these.
    // The pt-24 pb-16 are also handled by UserLayout.
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-4 relative" // Keep container and horizontal padding
    >
      {/* Animated background elements (if they were inside the main div, they should be moved to App.tsx UserLayout or kept fixed) */}
      {/* If these are meant to be *behind* the content and not scroll with it, they should be in App.tsx's UserLayout */}
      {/* If they are meant to scroll with the content, ensure their positioning doesn't conflict with the layout */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
                Next-Gen Events
              </h1>
              <p className="text-lg md:text-xl mb-8 text-foreground/80 max-w-2xl">
                Discover cutting-edge hackathons, workshops, and learning
                opportunities across the digital frontier.
              </p>
            </div>
            <Button
              onClick={() => setShowHostForm(true)}
              className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-opacity gap-2"
            >
              <Plus size={18} />
              Host Event
            </Button>
          </div>
        </motion.div>

        {/* Host Event Form Modal */}
        <AnimatePresence>
          {showHostForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowHostForm(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-background border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Host New Event</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFormEventType("tech");
                      setShowHostForm(false);
                    }}
                  >
                    <X size={20} />
                  </Button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    const eventData: EventFormData = {
                      title: formData.get('title') as string,
                      description: formData.get('description') as string,
                      date: formData.get('date') as string,
                      time: formData.get('time') as string,
                      location: formData.get('location') as string,
                      type: formEventType,
                      link: formData.get('link') as string
                    };
                    handleHostEvent(eventData);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Event Title
                    </label>
                    <Input
                      name="title"
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Date
                      </label>
                      <Input name="date" type="date" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Time
                      </label>
                      <Input name="time" type="time" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <Input
                      name="location"
                      placeholder="City or 'Online'"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Event Type
                    </label>
                    <Select value={formEventType} onValueChange={setFormEventType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Tech</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="hackathon">Hackathon</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      placeholder="Describe your event"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Event Link (Registration/Join URL)
                    </label>
                    <Input
                      name="link"
                      type="url"
                      placeholder="https://example.com/event-registration"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-brand-purple to-brand-pink"
                  >
                    Create Event
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="backdrop-blur-lg bg-background/30 border border-white/10 rounded-xl p-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-foreground/70">
              <FilterIcon size={18} className="text-brand-purple" />
              <span className="text-sm">Filter events:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent className="bg-background/80 backdrop-blur-md border-white/10">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                </SelectContent>
              </Select>

              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger className="w-[160px] bg-background/50 border-white/10">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-background/80 backdrop-blur-md border-white/10">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="webinar">Webinar</SelectItem>
                  <SelectItem value="hackathon">Hackathon</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* View Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Tabs defaultValue="list" className="mb-8">
            <TabsList className="bg-background/30 backdrop-blur-sm border border-white/10">
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white"
              >
                List View
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-brand-purple/90 data-[state=active]:to-brand-pink/90 data-[state=active]:text-white"
              >
                Calendar View
              </TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-6">
              <motion.div
                className="space-y-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                    className="rounded-xl overflow-hidden bg-background/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div
                        className="md:w-1/4 h-40 md:h-auto bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${event.image})` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex flex-wrap justify-between gap-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <div className="mr-2 px-3 py-1 bg-brand-purple/20 text-brand-purple text-xs font-medium rounded-full uppercase tracking-wider flex items-center">
                                <Sparkles size={12} className="mr-1" />
                                {event.type}
                              </div>
                              <div className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                                {event.daysLeft} days left
                              </div>
                            </div>

                            <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-brand-purple transition-colors">
                              {event.title}
                            </h3>

                            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-foreground/70 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar
                                  size={14}
                                  className="text-brand-purple"
                                />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock
                                  size={14}
                                  className="text-brand-purple"
                                />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin
                                  size={14}
                                  className="text-brand-purple"
                                />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users
                                  size={14}
                                  className="text-brand-purple"
                                />
                                <span>{event.attendees} attending</span>
                              </div>
                            </div>

                            <p className="text-foreground/80">
                              {event.description}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Button
                              size="sm"
                              className="relative overflow-hidden group bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 transition-all"
                              onClick={() => {
                                if (event.link) {
                                  window.open(event.link, '_blank');
                                } else {
                                  alert('No registration link available for this event');
                                }
                              }}
                            >
                              <span className="relative z-10">Join Event</span>
                              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="w-full"
                              onClick={() => handleDeleteEvent(event.id)}
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {filteredEvents.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">
                      No events found
                    </h3>
                    <p className="text-foreground/70">
                      Try adjusting your filters
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <EventCalendar events={upcomingEvents} />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Events;
