
import { motion } from "framer-motion";
import { ChevronRight, Heart, Brain, Smile, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
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
          <Button className="slide-up px-8 py-6 text-lg bg-primary hover:bg-primary/90">
            Get Started <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
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
            icon={<Smile className="h-8 w-8 text-primary" />}
            title="Community Support"
            description="Connect with others on their mental health journey"
          />
        </motion.div>
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

export default Index;
