
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GraduationCap, DollarSign, Target, MessageCircle } from "lucide-react";

const CallToActionSection = () => {
  const ctaButtons = [
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "Free Student Resources",
      description: "Access our complete financial guide",
      variant: "outline" as const,
      className: "border-brand-purple/20 hover:bg-brand-purple/5"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Start Investing Now",
      description: "Begin your investment journey today",
      variant: "outline" as const,
      className: "border-green-500/20 hover:bg-green-500/5"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Get Personalized Plan",
      description: "Custom financial roadmap for you",
      variant: "default" as const,
      className: "bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg hover:opacity-90"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="relative"
    >
      {/* Main CTA Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {ctaButtons.map((button, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="h-full"
          >
            <Button
              variant={button.variant}
              size="lg"
              className={`w-full h-24 flex-col gap-2 text-left p-6 ${button.className}`}
            >
              <div className="flex items-center gap-3 w-full">
                {button.icon}
                <div className="flex-1">
                  <div className="font-semibold text-sm">{button.title}</div>
                  <div className="text-xs opacity-80">{button.description}</div>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Floating Help Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          className="rounded-full w-14 h-14 bg-gradient-to-r from-brand-purple to-brand-pink text-white shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-brand-pink/20 rounded-full blur-3xl"></div>
      </div>
    </motion.div>
  );
};

export default CallToActionSection;
