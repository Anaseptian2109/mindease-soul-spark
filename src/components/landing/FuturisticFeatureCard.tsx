
import { motion } from "framer-motion";
import React from "react";

interface FuturisticFeatureCardProps { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  gradient: string;
}

export const FuturisticFeatureCard = ({ 
  icon, 
  title, 
  description, 
  gradient 
}: FuturisticFeatureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-panel p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      <div className="mb-4 bg-white/10 w-14 h-14 rounded-full flex items-center justify-center relative">
        {icon}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r opacity-30"></div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      
      <motion.div 
        className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} opacity-70`}
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 rounded-full transform translate-x-16 -translate-y-8"></div>
    </motion.div>
  );
};
