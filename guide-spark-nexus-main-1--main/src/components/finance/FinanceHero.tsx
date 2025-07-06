
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DollarSign, TrendingUp, ChevronDown, Sparkles, ArrowRight } from "lucide-react";

interface FinanceHeroProps {
  showAdvanced: boolean;
  setShowAdvanced: (value: boolean) => void;
}

const FinanceHero = ({ showAdvanced, setShowAdvanced }: FinanceHeroProps) => {
  const [showAdvancedDropdown, setShowAdvancedDropdown] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mb-12 md:mb-16 overflow-hidden rounded-2xl md:rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl border border-gray-700"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-72 h-72 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -left-1/2 w-64 h-64 md:w-80 md:h-80 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>
      
      <div className="relative z-10 p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="max-w-4xl">
          {/* Header with Icon */}
          <motion.div 
            className="flex items-center mb-4 md:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="relative mr-3 md:mr-4"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-900" />
              </motion.div>
            </motion.div>
            <div>
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Master Your Money
              </motion.h1>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 text-white/90 font-medium max-w-3xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Smart finance tips, tools, and plans – built just for students.
          </motion.p>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 text-white/70 max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            From SIPs to stocks, everything you need to grow your financial skills.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }} 
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-50 shadow-xl text-base md:text-lg font-semibold px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl border-0 transition-all duration-300 hover:shadow-2xl w-full sm:w-auto"
              >
                <TrendingUp className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" /> 
                Start Now – Pick Your Plan
                <ArrowRight className="ml-2 md:ml-3 h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-xl md:rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            </motion.div>
            
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-medium transition-all duration-300 w-full sm:w-auto"
                  onClick={() => setShowAdvancedDropdown(!showAdvancedDropdown)}
                >
                  Try Advanced Mode
                  <ChevronDown className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </motion.div>
              
              {showAdvancedDropdown && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full mt-4 left-0 right-0 sm:left-0 sm:right-auto bg-gray-800 rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 min-w-72 md:min-w-80 z-20 border border-gray-600"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Switch
                      id="advanced-mode"
                      checked={showAdvanced}
                      onCheckedChange={setShowAdvanced}
                      className="data-[state=checked]:bg-purple-600"
                    />
                    <label htmlFor="advanced-mode" className="text-sm font-semibold text-white">
                      Enable Advanced Features
                    </label>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Access advanced calculators, portfolio tracking, and detailed analytics for experienced users
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Stats or Features */}
          <motion.div 
            className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {[
              { number: "10K+", label: "Students Learning" },
              { number: "₹50L+", label: "Invested Safely" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceHero;
