import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Heart, 
  Moon, 
  Book, 
  Users, 
  Settings, 
  Activity, 
  Shield, 
  BarChart3, 
  Cpu, 
  Zap, 
  BrainCircuit,
  ScanFace,
  Sparkles,
  Gauge,
  Dna,
  Microscope,
  Rocket
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { HealthStatus } from "@/components/HealthStatus";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { AISuperDoctor } from "@/components/AISuperDoctor";

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  accentColor,
  onClick,
  disabled = false
}: { 
  title: string; 
  description: string; 
  icon: React.ElementType; 
  accentColor?: string;
  onClick: () => void;
  disabled?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={!disabled ? { y: -8, scale: 1.02, transition: { duration: 0.2 } } : {}}
      className={cn(
        "glass-card relative backdrop-blur-lg bg-white/5 border border-white/10 p-6 rounded-xl overflow-hidden shadow-lg",
        isHovered ? "shadow-xl" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={disabled ? undefined : onClick}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 rounded-full transform translate-x-16 -translate-y-8 pointer-events-none"></div>
      
      <div className={`mb-4 p-3 rounded-full bg-white/10 inline-block ${isHovered && !disabled ? 'floating-icon' : ''}`}>
        <Icon className={`h-7 w-7 ${accentColor || 'text-primary'}`} />
      </div>
      
      <h3 className="text-xl font-semibold mb-2 gradient-text">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      
      {!disabled && (
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl">
          <span className="px-3 py-1 bg-black/60 rounded-full text-xs font-medium">Coming Soon</span>
        </div>
      )}
    </motion.div>
  );
};

const StatusIndicator = ({ active = false, text = "" }: { active?: boolean, text?: string }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2 h-2 rounded-full ${active ? 'bg-green-500 pulse-glow' : 'bg-gray-500'}`}></div>
    <span className="text-xs text-muted-foreground">{text || (active ? 'Active' : 'Inactive')}</span>
  </div>
);

const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.3
          }}
          animate={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ 
            width: Math.random() * 3 + 1 + 'px', 
            height: Math.random() * 3 + 1 + 'px' 
          }}
        />
      ))}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [showAIChat, setShowAIChat] = useState(false);
  const [quickStats, setQuickStats] = useState({
    mentalHealth: 85,
    physicalHealth: 72,
    sleepQuality: 68,
    focusLevel: 90
  });

  const [neuralStatus, setNeuralStatus] = useState({
    mainSystem: true,
    biometrics: true,
    analyticsEngine: true,
    aiAssistant: true,
    quantumLink: false
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Neural Interface Online",
        description: "Welcome to your personal health matrix dashboard",
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuickStats(prev => ({
        mentalHealth: Math.max(70, Math.min(99, prev.mentalHealth + (Math.random() > 0.5 ? 1 : -1))),
        physicalHealth: Math.max(65, Math.min(90, prev.physicalHealth + (Math.random() > 0.6 ? 1 : -1))),
        sleepQuality: Math.max(60, Math.min(85, prev.sleepQuality + (Math.random() > 0.5 ? 2 : -2))),
        focusLevel: Math.max(75, Math.min(100, prev.focusLevel + (Math.random() > 0.7 ? 1 : -1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Health Monitoring",
      description: "Track your physical and mental health metrics with advanced biometric analysis",
      icon: Activity,
      accentColor: "text-blue-500",
      path: "/health-monitoring",
      disabled: false
    },
    {
      title: "AI Emotional Support",
      description: "Connect with our advanced AI for emotional guidance and personalized support",
      icon: BrainCircuit,
      accentColor: "text-purple-500",
      path: "/chatbot",
      disabled: false
    },
    {
      title: "Mood Tracking",
      description: "Visualize your emotional patterns with predictive mood algorithms",
      icon: Gauge,
      accentColor: "text-pink-500",
      path: "/mood-tracker",
      disabled: false
    },
    {
      title: "Guided Meditation",
      description: "Experience neural-optimized meditation with adaptive biofeedback",
      icon: Moon,
      accentColor: "text-indigo-500",
      path: "/meditation",
      disabled: false
    },
    {
      title: "Digital Journal",
      description: "Record thoughts with AI-powered sentiment analysis and insights",
      icon: Book,
      accentColor: "text-teal-500",
      path: "/journal",
      disabled: false
    },
    {
      title: "Community Hub",
      description: "Connect with others through our secure neural-encrypted platform",
      icon: Users,
      accentColor: "text-green-500",
      path: "/community",
      disabled: false
    },
    {
      title: "Neural Security",
      description: "Military-grade protection for your neurological and health data",
      icon: Shield,
      accentColor: "text-amber-500",
      path: "/settings",
      disabled: false
    },
    {
      title: "Neural Interface",
      description: "Customize and optimize your neural pathways and system preferences",
      icon: Cpu,
      accentColor: "text-rose-500",
      path: "/settings",
      disabled: false
    },
    {
      title: "Genetic Analysis",
      description: "Advanced DNA sequencing and personalized genetic health insights",
      icon: Dna,
      accentColor: "text-emerald-500",
      path: "/genetic-analysis",
      disabled: true
    },
    {
      title: "Cellular Optimization",
      description: "Microscopic health assessment and cellular rejuvenation protocols",
      icon: Microscope,
      accentColor: "text-cyan-500",
      path: "/cellular-optimization",
      disabled: true
    },
    {
      title: "Quantum Health Matrix",
      description: "Experimental quantum computing analysis for health prediction",
      icon: Rocket,
      accentColor: "text-fuchsia-500", 
      path: "/quantum-health",
      disabled: true
    },
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

  const handleQuickScan = () => {
    toast({
      title: "Neural Scan Initiated",
      description: "Comprehensive biometric analysis in progress...",
    });

    setTimeout(() => {
      toast({
        title: "Neural Scan Complete",
        description: "All systems functioning within optimal parameters",
      });
    }, 2500);
  };

  const handleOpenChat = () => {
    setShowAIChat(true);
    toast({
      title: "AI Medical Consultant Activated",
      description: "Your virtual doctor is ready to assist you",
    });
    navigate("/chatbot");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center glass-panel p-12 rounded-3xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 rounded-full border-t-2 border-primary"></div>
            <div className="absolute inset-0 rounded-full border-r-2 border-accent opacity-75 rotate-45"></div>
            <div className="absolute inset-0 rounded-full border-b-2 border-primary/50 opacity-50 rotate-90"></div>
            <Brain className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
          </motion.div>
          <h2 className="text-xl font-bold mb-2 gradient-text">Initializing Neural Interface</h2>
          <p className="text-muted-foreground">Syncing biometric data with system core...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-4 md:p-8 relative overflow-hidden"
    >
      <ParticleEffect />
      
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
              <div className="text-md text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Neural synchronization active
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="text-sm">Last scan: Today, {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="gap-2 glass-card backdrop-blur-sm">
                <BarChart3 className="h-4 w-4" />
                Metrics
              </Button>
              <Button 
                size="sm" 
                className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300"
                onClick={handleQuickScan}
              >
                <Zap className="h-4 w-4" />
                Quick Scan
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="glass-panel p-5 rounded-xl mb-8 border border-white/10 backdrop-blur-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                System Status
              </h2>
              <div className="text-sm text-muted-foreground">
                Quantum Core v4.2.1
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Main System</span>
                  <StatusIndicator active={neuralStatus.mainSystem} />
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500" 
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Biometrics</span>
                  <StatusIndicator active={neuralStatus.biometrics} />
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" 
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 1, delay: 0.1 }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Analytics</span>
                  <StatusIndicator active={neuralStatus.analyticsEngine} />
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500" 
                    initial={{ width: 0 }}
                    animate={{ width: '93%' }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">AI Assistant</span>
                  <StatusIndicator active={neuralStatus.aiAssistant} />
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500" 
                    initial={{ width: 0 }}
                    animate={{ width: '97%' }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Quantum Link</span>
                  <StatusIndicator active={neuralStatus.quantumLink} text="Standby" />
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-gray-500 to-gray-400" 
                    initial={{ width: 0 }}
                    animate={{ width: '45%' }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>
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

        <AISuperDoctor onOpenChat={handleOpenChat} />

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
              disabled={feature.disabled}
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
