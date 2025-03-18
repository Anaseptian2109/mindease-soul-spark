
import { motion } from "framer-motion";
import { ChevronRight, Heart, Brain, Moon, Activity, Loader2, Shield, Lock, UserCheck, Sparkles, ArrowRight, Dna, Microscope, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    try {
      navigate("/signup");
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to proceed. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading amazing features...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <section className="container px-4 pt-32 pb-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-4 py-2 mb-6 inline-block bg-primary/10 text-primary rounded-full text-sm font-medium backdrop-blur-sm border border-primary/20"
          >
            <Sparkles className="h-4 w-4 inline-block mr-2" />
            Your AI Mental Health Companion
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Take Control of Your Mental Wellbeing
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            MindEase combines AI technology with proven mental health practices to help you manage stress, anxiety, and improve your overall wellbeing.
          </p>
          <div className="space-x-4">
            <Button 
              onClick={handleGetStarted}
              className="slide-up px-8 py-6 text-lg bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate("/signin")}
              variant="outline"
              className="slide-up px-8 py-6 text-lg backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Sign In
            </Button>
          </div>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-accent/10 rounded-full filter blur-3xl opacity-50"></div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to improve your mental wellbeing in one place
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <FeatureCard
            icon={<Brain className="h-8 w-8 text-primary" />}
            title="AI Emotional Support"
            description="24/7 chat support powered by advanced AI for emotional guidance"
          />
          <FeatureCard
            icon={<Heart className="h-8 w-8 text-primary" />}
            title="Mood Tracking"
            description="Track and visualize your emotional wellbeing over time"
          />
          <FeatureCard
            icon={<Moon className="h-8 w-8 text-primary" />}
            title="Guided Meditation"
            description="AI-powered meditation sessions tailored to your needs"
          />
          <FeatureCard
            icon={<Activity className="h-8 w-8 text-primary" />}
            title="Health Monitoring"
            description="Track vital signs and physical health metrics"
          />
        </motion.div>
      </section>

      {/* Advanced Health Technologies Section */}
      <section className="container px-4 py-20 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="px-4 py-2 mb-6 inline-block bg-accent/10 text-accent rounded-full text-sm font-medium backdrop-blur-sm border border-accent/20"
          >
            <Sparkles className="h-4 w-4 inline-block mr-2" />
            Next-Gen Health Technology
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Advanced Health Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge biomedical technologies powered by AI for comprehensive health analysis
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AdvancedFeatureCard
            icon={<Dna className="h-10 w-10 text-emerald-500" />}
            title="Genetic Analysis"
            description="Advanced DNA sequencing and personalized genetic health insights"
            comingSoon={false}
            accentColor="from-green-500 to-emerald-500"
          />
          <AdvancedFeatureCard
            icon={<Microscope className="h-10 w-10 text-cyan-500" />}
            title="Cellular Optimization"
            description="Microscopic health assessment and cellular rejuvenation protocols"
            comingSoon={true}
            accentColor="from-blue-500 to-cyan-500"
          />
          <AdvancedFeatureCard
            icon={<Rocket className="h-10 w-10 text-fuchsia-500" />}
            title="Quantum Health Matrix"
            description="Experimental quantum computing analysis for health prediction"
            comingSoon={true}
            accentColor="from-purple-500 to-fuchsia-500"
          />
        </div>
      </section>

      {/* Health Monitoring Section */}
      <section className="container px-4 py-20 my-12">
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-10 backdrop-blur-md relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12 relative z-10"
          >
            <h2 className="text-3xl font-bold mb-4">Comprehensive Health Tracking</h2>
            <p className="text-lg text-muted-foreground">
              Monitor your physical and mental health with our advanced tracking features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            <HealthFeatureCard
              icon={<Heart className="h-6 w-6 text-red-500" />}
              title="Heart Health"
              description="Track heart rate, HRV, and cardiac health metrics"
            />
            <HealthFeatureCard
              icon={<Moon className="h-6 w-6 text-indigo-500" />}
              title="Sleep Analysis"
              description="Monitor sleep patterns and quality"
            />
            <HealthFeatureCard
              icon={<Activity className="h-6 w-6 text-green-500" />}
              title="Physical Activity"
              description="Track steps, calories, and daily movement"
            />
          </div>
          
          {/* Background gradient elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-60 z-0"></div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
        </div>
      </section>

      {/* Trust and Security Section */}
      <section className="container px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Privacy & Security Matter</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We use industry-standard encryption and security measures to protect your data. 
            Your health information is private and secure with us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <SecurityFeature 
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="End-to-End Encryption"
              description="Your data is encrypted at rest and in transit"
            />
            <SecurityFeature 
              icon={<Lock className="h-8 w-8 text-primary" />}
              title="HIPAA Compliant"
              description="Meeting healthcare privacy standards"
            />
            <SecurityFeature 
              icon={<UserCheck className="h-8 w-8 text-primary" />}
              title="User Control"
              description="Full control over your data sharing preferences"
            />
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-md rounded-2xl p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          <h2 className="text-3xl font-bold mb-4">Start Your Wellness Journey Today</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands of users who have transformed their mental wellbeing with MindEase
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full filter blur-3xl"></div>
        </motion.div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      className="glass-panel p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="mb-4 bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const AdvancedFeatureCard = ({ 
  icon, 
  title, 
  description, 
  comingSoon = false,
  accentColor = "from-primary to-accent"
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  comingSoon?: boolean;
  accentColor?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <Card className="backdrop-blur-md bg-black/10 border-white/10 overflow-hidden h-full group-hover:border-white/20 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className={`w-16 h-16 rounded-xl mb-4 bg-gradient-to-r ${accentColor} bg-opacity-10 flex items-center justify-center `}>
            {icon}
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-md">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            className="h-1 w-full bg-gradient-to-r opacity-70"
            style={{ backgroundImage: `linear-gradient(to right, var(--${accentColor.split(" ")[0].substring(5)}), var(--${accentColor.split(" ")[2].substring(3)}))` }}
            initial={{ width: 0 }}
            whileInView={{ width: comingSoon ? "40%" : "95%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${comingSoon ? 'bg-yellow-500' : 'bg-green-500'} pulse-glow mr-2`}></div>
              <span className="text-xs text-muted-foreground">{comingSoon ? 'Coming Soon' : 'Active'}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {comingSoon ? 'Development: 40%' : 'Confidence: 95%'}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {comingSoon && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 px-4 py-2 rounded-full text-sm font-medium">
            Coming Soon
          </div>
        </div>
      )}
    </motion.div>
  );
};

const HealthFeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-background/80 p-6 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm transition-all duration-300"
    >
      <div className="mb-4 bg-white/10 w-12 h-12 rounded-full flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const SecurityFeature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md"
      >
        {icon}
      </motion.div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default Index;
