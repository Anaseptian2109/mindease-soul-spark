
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Moon, Book, Users, Settings, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-panel p-6 rounded-lg cursor-pointer"
    onClick={onClick}
  >
    <div className="mb-4">
      <Icon className="h-8 w-8 text-primary" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Health Monitoring",
      description: "Track your physical and mental health metrics",
      icon: Activity,
      path: "/health-monitoring"
    },
    {
      title: "AI Emotional Support",
      description: "Chat with our AI for emotional guidance and support",
      icon: Brain,
      path: "/chatbot"
    },
    {
      title: "Mood Tracking",
      description: "Track and understand your emotional patterns",
      icon: Heart,
      path: "/mood-tracker"
    },
    {
      title: "Guided Meditation",
      description: "Find peace with personalized meditation sessions",
      icon: Moon,
      path: "/meditation"
    },
    {
      title: "Digital Journal",
      description: "Record your thoughts and get AI insights",
      icon: Book,
      path: "/journal"
    },
    {
      title: "Community",
      description: "Connect with others on similar journeys",
      icon: Users,
      path: "/community"
    },
    {
      title: "Settings",
      description: "Customize your MindEase experience",
      icon: Settings,
      path: "/settings"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-lg text-muted-foreground">
            Your daily companion for mental wellbeing. What would you like to focus on today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <DashboardCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              onClick={() => navigate(feature.path)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
