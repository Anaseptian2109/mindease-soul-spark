
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Moon, Book, Users, Settings, Activity, Shield, BarChart3, Cpu, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HealthStatus } from "@/components/HealthStatus";
import { cn } from "@/lib/utils";

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  accentColor,
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  accentColor?: string;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "glass-card relative backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-xl cursor-pointer overflow-hidden shadow-lg",
        isHovered ? "shadow-xl" : ""
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 rounded-full transform translate-x-16 -translate-y-8 pointer-events-none"></div>
      
      <div className={`mb-4 p-3 rounded-full bg-white/10 inline-block ${isHovered ? 'floating-icon' : ''}`}>
        <Icon className={`h-7 w-7 ${accentColor || 'text-primary'}`} />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 gradient-text">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const StatusIndicator = ({ active = false }: { active?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 pulse-glow' : 'bg-gray-500'}`}></div>
    <span className="text-xs text-muted-foreground">{active ? 'Active' : 'Inactive'}</span>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [quickStats] = useState({
    mentalHealth: 85,
    physicalHealth: 72,
    sleepQuality: 68,
    focusLevel: 90
  });

  const features = [
    {
      title: "Health Monitoring",
      description: "Track your physical and mental health metrics with advanced biometric analysis",
      icon: Activity,
      accentColor: "text-blue-500",
      path: "/health-monitoring"
    },
    {
      title: "AI Emotional Support",
      description: "Connect with our advanced AI for emotional guidance and personalized support",
      icon: Brain,
      accentColor: "text-purple-500",
      path: "/chatbot"
    },
    {
      title: "Mood Tracking",
      description: "Visualize your emotional patterns with predictive mood algorithms",
      icon: Heart,
      accentColor: "text-pink-500",
      path: "/mood-tracker"
    },
    {
      title: "Guided Meditation",
      description: "Experience neural-optimized meditation with adaptive biofeedback",
      icon: Moon,
      accentColor: "text-indigo-500",
      path: "/meditation"
    },
    {
      title: "Digital Journal",
      description: "Record thoughts with AI-powered sentiment analysis and insights",
      icon: Book,
      accentColor: "text-teal-500",
      path: "/journal"
    },
    {
      title: "Community Hub",
      description: "Connect with others through our secure neural-encrypted platform",
      icon: Users,
      accentColor: "text-green-500",
      path: "/community"
    },
    {
      title: "Biosecurity",
      description: "Military-grade protection for your neurological and health data",
      icon: Shield,
      accentColor: "text-amber-500",
      path: "/settings"
    },
    {
      title: "Neural Interface",
      description: "Customize and optimize your neural pathways and system preferences",
      icon: Cpu,
      accentColor: "text-rose-500",
      path: "/settings"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Neural Interface Hub</h1>
              <p className="text-md text-muted-foreground flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Neural synchronization active • Last scan: Today, 09:45 AM
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Metrics
              </Button>
              <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent">
                <Zap className="h-4 w-4" />
                Quick Scan
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          >
            <HealthStatus 
              title="Mental Wellness" 
              score={quickStats.mentalHealth} 
              icon={<Brain className="h-4 w-4 text-purple-400" />} 
              description="Neural pathways operating at optimal levels"
            />
            <HealthStatus 
              title="Physical Health" 
              score={quickStats.physicalHealth} 
              icon={<Activity className="h-4 w-4 text-blue-400" />} 
              description="Biomarkers indicate good system performance"
            />
            <HealthStatus 
              title="Sleep Quality" 
              score={quickStats.sleepQuality} 
              icon={<Moon className="h-4 w-4 text-indigo-400" />} 
              description="Deep sleep cycles require optimization"
            />
            <HealthStatus 
              title="Focus Level" 
              score={quickStats.focusLevel} 
              icon={<Zap className="h-4 w-4 text-amber-400" />} 
              description="Neural concentration matrix at peak efficiency"
            />
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              accentColor={feature.accentColor}
              onClick={() => navigate(feature.path)}
            />
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute -z-10 top-1/3 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
