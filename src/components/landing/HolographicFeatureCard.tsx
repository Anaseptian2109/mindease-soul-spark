
import { motion } from "framer-motion";
import React from "react";

interface HolographicFeatureCardProps { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  gradient: string;
  glowColor: string;
}

export const HolographicFeatureCard = ({ 
  icon, 
  title, 
  description, 
  gradient,
  glowColor
}: HolographicFeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-panel p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`}></div>
      
      <div className={`mb-5 w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} bg-opacity-10 flex items-center justify-center relative`}>
        <div className={`absolute inset-0 rounded-2xl ${glowColor}-pulse-glow`}></div>
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 relative">{title}</h3>
      <p className="text-muted-foreground relative z-10">{description}</p>
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-white/0 rounded-full transform translate-x-16 -translate-y-8"></div>
      
      <motion.div 
        className={`mt-5 h-1 w-full bg-gradient-to-r ${gradient} opacity-50 rounded-full`}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 pulse-glow mr-2"></div>
          <span className="text-xs text-muted-foreground">Quantum Secured</span>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-xs text-white px-2 py-1 rounded-full bg-gradient-to-r from-primary/70 to-accent/70 backdrop-blur-sm"
        >
          Explore
        </motion.div>
      </div>
    </motion.div>
  );
};
