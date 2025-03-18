
import { motion } from "framer-motion";
import { BrainCircuit, Gauge, Moon, HeartPulse } from "lucide-react";
import { FuturisticFeatureCard } from "./FuturisticFeatureCard";

export const FeaturesSection = () => {
  return (
    <section className="container px-4 py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Next-Gen Health Features</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cutting-edge technologies powered by advanced AI algorithms
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        <FuturisticFeatureCard
          icon={<BrainCircuit className="h-8 w-8 text-purple-500" />}
          title="AI Emotional Support"
          description="Neural-algorithmic companion providing personalized emotional optimization and real-time mental analysis"
          gradient="from-purple-500 to-pink-500"
        />
        <FuturisticFeatureCard
          icon={<Gauge className="h-8 w-8 text-pink-500" />}
          title="Mood Tracking"
          description="Quantum-enhanced emotional pattern recognition with predictive mood trajectory visualization"
          gradient="from-pink-500 to-rose-500"
        />
        <FuturisticFeatureCard
          icon={<Moon className="h-8 w-8 text-indigo-500" />}
          title="Guided Meditation"
          description="Neuro-adaptive meditation protocols with real-time brainwave synchronization feedback"
          gradient="from-indigo-500 to-blue-500"
        />
        <FuturisticFeatureCard
          icon={<HeartPulse className="h-8 w-8 text-cyan-500" />}
          title="Health Monitoring"
          description="Continuous biometric surveillance with molecular-level health anomaly detection"
          gradient="from-cyan-500 to-teal-500"
        />
      </motion.div>
    </section>
  );
};
