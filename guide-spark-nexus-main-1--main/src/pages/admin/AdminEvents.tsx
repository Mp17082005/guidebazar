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
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  attendees: number;
  maxAttendees: number;
  daysLeft: number;
  image?: string;
  link?: string;
}

const defaultEvents: Event[] = [
  {
    id: 1,
    title: "Startup Pitch Competition",
    description: "Present your startup idea to investors and industry experts.",
    date: "2025-08-15",
    time: "10:00 AM",
    location: "TechHub Bangalore",
    type: "startup",
    attendees: 45,
    maxAttendees: 100,
    daysLeft: 35,
    image: "/api/placeholder/400/250",
    link: "https://example.com/register/startup-pitch"
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    description: "Hands-on workshop on latest AI trends and implementations.",
    date: "2025-08-22",
    time: "2:00 PM",
    location: "Virtual Event",
    type: "workshop",
    attendees: 120,
    maxAttendees: 150,
    daysLeft: 42,
    image: "/api/placeholder/400/250",
    link: "https://zoom.us/meeting/ai-ml-workshop"
  }
];

const AdminEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "startup",
    attendees: 0,
    maxAttendees: 100,
    daysLeft: 0,
    image: "",
    link: ""
  });

  // Load events from backend API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/events');
        const data = await response.json();
        
        if (data.success) {
          // Calculate days left for each event
          const eventsWithDaysLeft = data.events.map((event: Event) => ({
            ...event,
            daysLeft: calculateDaysLeft(event.date)
          }));
          setEvents(eventsWithDaysLeft);
        } else {
          console.error('Failed to fetch events:', data.message);
          // Fallback to default events if API fails
          setEvents(defaultEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to default events if API fails
        setEvents(defaultEvents);
      }
    };

    fetchEvents();
  }, []);

  // Remove the localStorage save effect since we're using backend API
  // useEffect(() => {
  //   if (events.length > 0) {
  //     localStorage.setItem('adminEvents', JSON.stringify(events));
  //   }
  // }, [events]);

  const calculateDaysLeft = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleInputChange = (field: keyof Event, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'date' && { daysLeft: calculateDaysLeft(value as string) })
    }));
  };

  const handleAddEvent = async () => {
    if (!formData.title || !formData.date) return;

    const eventData = {
      title: formData.title!,
      description: formData.description || "",
      date: formData.date!,
      time: formData.time || "10:00 AM",
      location: formData.location || "TBA",
      type: formData.type || "startup",
      maxAttendees: formData.maxAttendees || 100,
      link: formData.link || ""
    };

    try {
      const response = await fetch('http://localhost:5001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      
      if (data.success) {
        const newEventWithDaysLeft = {
          ...data.event,
          daysLeft: calculateDaysLeft(data.event.date)
        };
        setEvents(prev => [...prev, newEventWithDaysLeft]);
        
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          type: "startup",
          attendees: 0,
          maxAttendees: 100,
          daysLeft: 0,
          image: "",
          link: ""
        });
        setIsAddingEvent(false);
      } else {
        console.error('Failed to create event:', data.message);
        // You could show an error message to the user here
      }
    } catch (error) {
      console.error('Error creating event:', error);
      // You could show an error message to the user here
    }
  };

  const handleEditEvent = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setFormData(event);
      setEditingEventId(eventId);
    }
  };

  const handleUpdateEvent = async () => {
    if (!formData.title || !formData.date || editingEventId === null) return;

    const updateData = {
      title: formData.title!,
      description: formData.description || "",
      date: formData.date!,
      time: formData.time || "10:00 AM",
      location: formData.location || "TBA",
      type: formData.type || "startup",
      attendees: formData.attendees || 0,
      maxAttendees: formData.maxAttendees || 100,
      link: formData.link || ""
    };

    try {
      const response = await fetch(`http://localhost:5001/api/events/${editingEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      
      if (data.success) {
        const updatedEventWithDaysLeft = {
          ...data.event,
          daysLeft: calculateDaysLeft(data.event.date)
        };
        
        setEvents(prev => prev.map(event => 
          event.id === editingEventId ? updatedEventWithDaysLeft : event
        ));
        
        setEditingEventId(null);
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          type: "startup",
          attendees: 0,
          maxAttendees: 100,
          daysLeft: 0,
          image: "",
          link: ""
        });
      } else {
        console.error('Failed to update event:', data.message);
        // You could show an error message to the user here
      }
    } catch (error) {
      console.error('Error updating event:', error);
      // You could show an error message to the user here
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`http://localhost:5001/api/events/${eventId}`, {
          method: 'DELETE',
        });

        const data = await response.json();
        
        if (data.success) {
          setEvents(prev => prev.filter(event => event.id !== eventId));
        } else {
          console.error('Failed to delete event:', data.message);
          // You could show an error message to the user here
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        // You could show an error message to the user here
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "startup",
      attendees: 0,
      maxAttendees: 100,
      daysLeft: 0,
      image: "",
      link: ""
    });
    setIsAddingEvent(false);
    setEditingEventId(null);
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
          Admin - Events Management
        </h1>
        <p className="text-xl text-white/80">
          Add, edit, and manage events for your platform
        </p>
      </div>

      {/* Add New Event Button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={() => setIsAddingEvent(true)}
          className="bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90"
          disabled={isAddingEvent || editingEventId !== null}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Event
        </Button>
      </div>

      {/* Add/Edit Event Form */}
      {(isAddingEvent || editingEventId !== null) && (
        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white">
              {editingEventId ? "Edit Event" : "Add New Event"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Event Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter event title"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Event Type</label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/20 text-white">
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="workshop">Workshop</SelectItem>
                    <SelectItem value="seminar">Seminar</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter event description"
                className="bg-white/10 border-white/20 text-white"
                rows={3}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Date *</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Time</label>
                <Input
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  placeholder="e.g., 10:00 AM"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter location"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Current Attendees</label>
                <Input
                  type="number"
                  value={formData.attendees}
                  onChange={(e) => handleInputChange('attendees', parseInt(e.target.value) || 0)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Max Attendees</label>
                <Input
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => handleInputChange('maxAttendees', parseInt(e.target.value) || 100)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="Enter image URL"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm mb-2 block">Event Link (Registration/Join URL)</label>
              <Input
                type="url"
                value={formData.link}
                onChange={(e) => handleInputChange('link', e.target.value)}
                placeholder="https://example.com/event-registration"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={editingEventId ? handleUpdateEvent : handleAddEvent}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingEventId ? "Update Event" : "Save Event"}
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

      {/* Events List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.id}
            className="bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-brand-purple/40 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-white text-lg">{event.title}</CardTitle>
                <Badge className={`${
                  event.type === 'startup' ? 'bg-brand-purple/20 text-brand-purple' :
                  event.type === 'tech' ? 'bg-blue-500/20 text-blue-400' :
                  event.type === 'workshop' ? 'bg-green-500/20 text-green-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {event.type}
                </Badge>
              </div>
              <CardDescription className="text-white/70 text-sm">
                {event.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-white/80 mb-4">
                <div><strong>Date:</strong> {event.date}</div>
                <div><strong>Time:</strong> {event.time}</div>
                <div><strong>Location:</strong> {event.location}</div>
                <div><strong>Attendees:</strong> {event.attendees}/{event.maxAttendees}</div>
                <div><strong>Days Left:</strong> {event.daysLeft}</div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEditEvent(event.id)}
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                  disabled={isAddingEvent || editingEventId !== null}
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDeleteEvent(event.id)}
                  className="bg-red-600 hover:bg-red-700 flex-1"
                  disabled={isAddingEvent || editingEventId !== null}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No events found. Add your first event!</p>
        </div>
      )}
    </motion.div>
  );
};

export default AdminEvents;
