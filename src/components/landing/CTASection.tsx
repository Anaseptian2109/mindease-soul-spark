
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const CTASection = () => {
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
  );
};
