
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Calendar, FileText } from 'lucide-react';

const InternshipTracker = () => {
  const applications = [
    {
      id: 1,
      company: 'Google',
      position: 'Software Engineering Intern',
      location: 'Mountain View, CA',
      status: 'In Review',
      appliedDate: '2024-01-15',
      statusColor: 'from-yellow-500 to-orange-500'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Frontend Developer Intern',
      location: 'Seattle, WA',
      status: 'Accepted',
      appliedDate: '2024-01-10',
      statusColor: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      company: 'Meta',
      position: 'Full Stack Intern',
      location: 'Menlo Park, CA',
      status: 'Rejected',
      appliedDate: '2024-01-08',
      statusColor: 'from-red-500 to-pink-500'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-pink">
          Internship Tracker
        </h2>
        <Button className="bg-gradient-to-r from-brand-purple to-brand-pink">
          Find Internships
        </Button>
      </motion.div>

      <div className="grid gap-4">
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card border-none">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-5 h-5 text-white/70" />
                      <h3 className="text-xl font-bold text-white">{app.company}</h3>
                      <Badge className={`bg-gradient-to-r ${app.statusColor} text-white border-none`}>
                        {app.status}
                      </Badge>
                    </div>
                    <p className="text-lg text-white/80 mb-2">{app.position}</p>
                    <div className="flex items-center gap-4 text-white/60">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {app.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Applied: {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                      <FileText className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InternshipTracker;
