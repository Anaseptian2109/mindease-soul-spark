
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
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
  );
};
