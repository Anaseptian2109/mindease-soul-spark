
import { motion } from "framer-motion";
import React from "react";

interface HealthFeatureCardProps { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}

export const HealthFeatureCard = ({ 
  icon, 
  title, 
  description 
}: HealthFeatureCardProps) => {
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
