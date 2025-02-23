
import { motion } from "framer-motion";
import { ChevronRight, Heart, Brain, Smile, Moon, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <section className="container px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="px-3 py-1 mb-6 inline-block bg-primary/10 text-primary rounded-full text-sm font-medium">
            Your AI Mental Health Companion
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Take Control of Your Mental Wellbeing
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            MindEase combines AI technology with proven mental health practices to help you manage stress, anxiety, and improve your overall wellbeing.
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate("/signup")}
              className="slide-up px-8 py-6 text-lg bg-primary hover:bg-primary/90"
            >
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => navigate("/signin")}
              variant="outline"
              className="slide-up px-8 py-6 text-lg"
            >
              Sign In
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
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

      {/* New Health Monitoring Section */}
      <section className="container px-4 py-20 bg-card rounded-lg my-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Comprehensive Health Tracking</h2>
            <p className="text-lg text-muted-foreground">
              Monitor your physical and mental health with our advanced tracking features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-panel p-6 rounded-lg"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

const HealthFeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-background p-6 rounded-lg shadow-lg"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default Index;
