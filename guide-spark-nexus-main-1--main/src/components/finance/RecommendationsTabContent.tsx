
import { motion } from "framer-motion";
import { PiggyBank, TrendingUp, ChartBar } from "lucide-react";
import RecommendationCard from "@/components/RecommendationCard";

interface RecommendationsTabContentProps {
  selectedCategory: string;
}

const RecommendationsTabContent = ({ selectedCategory }: RecommendationsTabContentProps) => {
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
      }
    })
  };

  const recommendationCards = [
    {
      title: "Student-Friendly SIPs",
      items: [
        "UTI Nifty Index Fund - Low cost",
        "Parag Parikh Flexi Cap Fund - Diversified",
        "SBI Small Cap Fund - Higher growth",
        "Axis Bluechip Fund - Stable returns",
        "Mirae Asset Emerging Bluechip - Mid-cap focus"
      ],
      icon: <PiggyBank />,
      category: "investing"
    },
    {
      title: "Best Insurance Plans",
      items: [
        "HDFC Life Click 2 Protect - Term Plan",
        "Max Life Critical Illness - Health Coverage",
        "Bajaj Allianz Student Travel - For Exchange",
        "SBI Smart Scholar - Education Plan",
        "LIC Tech Term - Digital Term Plan"
      ],
      icon: <TrendingUp />,
      category: "insurance"
    },
    {
      title: "Top Investing Apps",
      items: [
        "Groww - Simple interface for beginners",
        "Zerodha - Low brokerage trading",
        "Upstox - Easy mutual fund investing",
        "Coin by Zerodha - Zero commission funds",
        "ET Money - Financial tracking"
      ],
      icon: <ChartBar />,
      category: "investing"
    }
  ];

  const filteredCards = recommendationCards.filter(card => 
    selectedCategory === "all" || card.category === selectedCategory
  );

  return (
    <motion.div
      key="recommendations"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="mt-0"
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {filteredCards.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={fadeInUp}
          >
            <RecommendationCard 
              title={item.title} 
              items={item.items}
              icon={item.icon}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecommendationsTabContent;
