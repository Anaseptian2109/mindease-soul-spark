
import { motion } from "framer-motion";
import { MessageSquareCode, GitPullRequest, Shield } from "lucide-react";
import { HolographicFeatureCard } from "./HolographicFeatureCard";

export const DigitalSystemsSection = () => {
  return (
    <section className="container px-4 py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Neural Digital Ecosystem</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Seamlessly integrated digital systems with advanced neural network architecture
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <HolographicFeatureCard
          icon={<MessageSquareCode className="h-8 w-8 text-emerald-500" />}
          title="Digital Journal"
          description="Quantum-encrypted thought repository with AI-powered emotional pattern recognition and sentiment prediction"
          gradient="from-emerald-500 to-green-500"
          glowColor="emerald"
        />
        <HolographicFeatureCard
          icon={<GitPullRequest className="h-8 w-8 text-amber-500" />}
          title="Community Hub"
          description="Secure neural-encrypted social matrix with quantum-resistant communication protocols and emotional resonance matching"
          gradient="from-amber-500 to-orange-500"
          glowColor="amber"
        />
        <HolographicFeatureCard
          icon={<Shield className="h-8 w-8 text-rose-500" />}
          title="Neural Security"
          description="Military-grade neurological data protection with quantum-resistant encryption and biometric authentication layers"
          gradient="from-rose-500 to-red-500"
          glowColor="rose"
        />
      </motion.div>
    </section>
  );
};
