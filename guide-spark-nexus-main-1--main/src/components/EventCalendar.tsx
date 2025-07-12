import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  link?: string;
}

interface EventCalendarProps {
  events: Event[];
}

const EventCalendar = ({ events }: EventCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-white/10" />
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <motion.div
          key={day}
          className={`h-20 border border-white/10 p-1 cursor-pointer transition-colors ${
            isToday ? 'bg-brand-purple/20 border-brand-purple/40' : ''
          } ${
            isSelected ? 'bg-brand-pink/20 border-brand-pink/40' : ''
          } hover:bg-white/5`}
          onClick={() => setSelectedDate(date)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-sm text-white font-medium">{day}</div>
          {dayEvents.length > 0 && (
            <div className="mt-1">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={`text-xs p-1 mb-1 rounded truncate ${
                    event.type === 'startup' ? 'bg-brand-purple/30 text-brand-purple' :
                    event.type === 'finance' ? 'bg-green-500/30 text-green-400' :
                    event.type === 'hackathon' ? 'bg-orange-500/30 text-orange-400' :
                    'bg-brand-pink/30 text-brand-pink'
                  }`}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-white/60">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          )}
        </motion.div>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar Grid */}
      <div className="lg:col-span-2">
        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('prev')}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth('next')}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {weekDays.map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-white/60 border border-white/10">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0">
              {renderCalendarDays()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Date Events */}
      <div>
        <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">
              {selectedDate ? (
                `Events for ${selectedDate.toLocaleDateString()}`
              ) : (
                'Select a date to view events'
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h4 className="font-medium text-white mb-2">{event.title}</h4>
                    <div className="space-y-1 text-sm text-white/70">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    </div>
                    <p className="text-sm text-white/60 mt-2">{event.description}</p>
                    {event.link && (
                      <Button
                        size="sm"
                        className="mt-3 bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90"
                        onClick={() => window.open(event.link, '_blank')}
                      >
                        Join Event
                      </Button>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : selectedDate ? (
              <p className="text-white/60 text-center py-8">
                No events scheduled for this date.
              </p>
            ) : (
              <p className="text-white/60 text-center py-8">
                Click on a date to view events.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCalendar;
