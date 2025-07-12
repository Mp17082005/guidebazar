import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, AlertTriangle, Clock, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface VerificationProps {
  discount: {
    id: number;
    brand: string;
    title: string;
    verification: string;
    verified: string;
    upvotes: number;
    link: string;
  };
}

const VerificationGuide = ({ discount }: VerificationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const verificationSteps = {
    ".edu Email": [
      {
        title: "Check Eligibility",
        description: "Ensure you have an active .edu email address from your educational institution",
        icon: CheckCircle,
        color: "text-green-400"
      },
      {
        title: "Visit Platform",
        description: `Go to ${discount.brand}'s student portal or education page`,
        icon: ExternalLink,
        color: "text-blue-400"
      },
      {
        title: "Enter Email",
        description: "Sign up or log in using your .edu email address",
        icon: Shield,
        color: "text-purple-400"
      },
      {
        title: "Verify Status",
        description: "Check your email for verification link and confirm your student status",
        icon: CheckCircle,
        color: "text-green-400"
      }
    ],
    "GitHub Student Pack": [
      {
        title: "Apply for Pack",
        description: "Visit GitHub Student Developer Pack and apply with your student details",
        icon: ExternalLink,
        color: "text-blue-400"
      },
      {
        title: "Upload Documents",
        description: "Provide proof of enrollment (student ID, transcript, or enrollment letter)",
        icon: Shield,
        color: "text-purple-400"
      },
      {
        title: "Wait for Approval",
        description: "GitHub will review your application (usually takes 1-7 days)",
        icon: Clock,
        color: "text-yellow-400"
      },
      {
        title: "Access Benefits",
        description: `Once approved, claim your ${discount.brand} benefit from the pack dashboard`,
        icon: CheckCircle,
        color: "text-green-400"
      }
    ],
    "UNiDAYS": [
      {
        title: "Create Account",
        description: "Sign up for UNiDAYS with your personal email address",
        icon: ExternalLink,
        color: "text-blue-400"
      },
      {
        title: "Verify Student Status",
        description: "Upload your student ID or enrollment documents for verification",
        icon: Shield,
        color: "text-purple-400"
      },
      {
        title: "Get Verified",
        description: "Wait for UNiDAYS to verify your student status (instant to 24 hours)",
        icon: Clock,
        color: "text-yellow-400"
      },
      {
        title: "Redeem Offer",
        description: `Search for ${discount.brand} on UNiDAYS and redeem your student discount`,
        icon: CheckCircle,
        color: "text-green-400"
      }
    ],
    "StudentBeans": [
      {
        title: "Register Account",
        description: "Create your StudentBeans account with basic details",
        icon: ExternalLink,
        color: "text-blue-400"
      },
      {
        title: "Student Verification",
        description: "Complete their student verification process with your institution details",
        icon: Shield,
        color: "text-purple-400"
      },
      {
        title: "Browse Offers",
        description: `Find ${discount.brand} in their student discount marketplace`,
        icon: CheckCircle,
        color: "text-green-400"
      }
    ],
    "Student ID": [
      {
        title: "Prepare Documents",
        description: "Have your current student ID or enrollment letter ready",
        icon: Shield,
        color: "text-purple-400"
      },
      {
        title: "Visit Platform",
        description: `Go to ${discount.brand}'s student verification page`,
        icon: ExternalLink,
        color: "text-blue-400"
      },
      {
        title: "Upload Proof",
        description: "Upload clear photos of your student ID or official documents",
        icon: CheckCircle,
        color: "text-green-400"
      }
    ]
  };

  const steps = verificationSteps[discount.verification as keyof typeof verificationSteps] || [];
  const trustScore = Math.floor((discount.upvotes / 50) * 100);
  const verificationDate = new Date(discount.verified);
  const daysSinceVerified = Math.floor((Date.now() - verificationDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Trust Score Card */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-400/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Verification Trust Score
            </CardTitle>
            <Badge className="bg-green-500/20 text-green-400 border-green-400/30">
              {trustScore}% Reliable
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Community Trust:</span>
            <span className="text-green-400 font-semibold">{discount.upvotes} students verified</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Last Verified:</span>
            <span className="text-blue-400">{daysSinceVerified} days ago</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(trustScore, 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">
            How to Verify with {discount.verification}
          </CardTitle>
          <CardDescription className="text-white/70">
            Follow these steps to successfully claim your discount
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                  isActive ? 'bg-brand-purple/20 border border-brand-purple/30' : 'bg-white/5 hover:bg-white/10'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`p-2 rounded-full ${isCompleted ? 'bg-green-500/20' : isActive ? 'bg-brand-purple/20' : 'bg-white/10'}`}>
                  <StepIcon className={`w-4 h-4 ${isCompleted ? 'text-green-400' : isActive ? 'text-brand-purple' : step.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${isActive ? 'text-brand-purple' : 'text-white'}`}>
                    Step {index + 1}: {step.title}
                  </h4>
                  <p className="text-white/70 text-sm mt-1">{step.description}</p>
                </div>
                {isCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      {/* Warning Alert for Common Issues */}
      <Alert className="border-yellow-400/30 bg-yellow-400/10">
        <AlertTriangle className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-100">
          <strong>Common Issues:</strong> Make sure your student email is active, documents are clear and recent, 
          and you're accessing the official {discount.brand} student portal to avoid scams.
        </AlertDescription>
      </Alert>

      {/* Action Button */}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={() => window.open(discount.link, "_blank")}
          className="w-full bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 shadow-lg"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Start Verification Process
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default VerificationGuide;
