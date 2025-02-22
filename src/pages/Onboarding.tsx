
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";

const OnboardingStep = ({ title, description, isActive }: { title: string; description: string; isActive: boolean }) => (
  <div className={`p-4 rounded-lg ${isActive ? 'bg-primary/10 border-2 border-primary' : 'bg-secondary/50'}`}>
    <div className="flex items-center gap-3 mb-2">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? 'bg-primary text-white' : 'bg-muted'}`}>
        <Check className="w-4 h-4" />
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
    <p className="text-muted-foreground text-sm pl-9">{description}</p>
  </div>
);

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const handleGoalSelection = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const goals = [
    "Manage Stress & Anxiety",
    "Improve Sleep Quality",
    "Boost Mood & Energy",
    "Build Better Habits",
    "Increase Self-awareness",
    "Enhance Focus"
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4 mb-8">
          <OnboardingStep
            title="Welcome"
            description="Start your journey to better mental wellbeing"
            isActive={step === 1}
          />
          <OnboardingStep
            title="Set Your Goals"
            description="Choose what you'd like to focus on"
            isActive={step === 2}
          />
          <OnboardingStep
            title="Personalization"
            description="Get your customized plan"
            isActive={step === 3}
          />
        </div>

        <div className="mt-12">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-6">Welcome to MindEase</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your journey to better mental wellbeing starts here. We'll help you create
                a personalized plan based on your goals and preferences.
              </p>
              <Button onClick={handleNext} size="lg">
                Get Started <ChevronRight className="ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-6">What would you like to focus on?</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {goals.map((goal) => (
                  <Button
                    key={goal}
                    variant={selectedGoals.includes(goal) ? "default" : "outline"}
                    className="h-auto py-4 px-6 text-left justify-start"
                    onClick={() => handleGoalSelection(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
              <Button 
                onClick={handleNext}
                disabled={selectedGoals.length === 0}
                size="lg"
              >
                Continue <ChevronRight className="ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl font-semibold mb-6">Your plan is ready!</h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've created a personalized plan based on your goals. Let's start your journey
                to better mental wellbeing together.
              </p>
              <Button onClick={handleNext} size="lg">
                Go to Dashboard <ChevronRight className="ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Onboarding;
