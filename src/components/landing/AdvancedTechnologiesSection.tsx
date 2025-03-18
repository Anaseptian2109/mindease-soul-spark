
import { motion } from "framer-motion";
import { Sparkles, Dna, Microscope, Rocket } from "lucide-react";
import { AdvancedFeatureCard } from "./AdvancedFeatureCard";

export const AdvancedTechnologiesSection = () => {
  return (
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
  );
};
