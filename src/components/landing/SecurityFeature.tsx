
import { motion } from "framer-motion";
import React from "react";

interface SecurityFeatureProps { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}

export const SecurityFeature = ({ 
  icon, 
  title, 
  description 
}: SecurityFeatureProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md"
      >
        {icon}
      </motion.div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};
