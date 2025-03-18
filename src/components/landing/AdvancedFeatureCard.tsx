
import { motion } from "framer-motion";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface AdvancedFeatureCardProps { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  comingSoon?: boolean;
  accentColor?: string;
}

export const AdvancedFeatureCard = ({ 
  icon, 
  title, 
  description, 
  comingSoon = false,
  accentColor = "from-primary to-accent"
}: AdvancedFeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <Card className="backdrop-blur-md bg-black/10 border-white/10 overflow-hidden h-full group-hover:border-white/20 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className={`w-16 h-16 rounded-xl mb-4 bg-gradient-to-r ${accentColor} bg-opacity-10 flex items-center justify-center `}>
            {icon}
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="text-md">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            className="h-1 w-full bg-gradient-to-r opacity-70"
            style={{ backgroundImage: `linear-gradient(to right, var(--${accentColor.split(" ")[0].substring(5)}), var(--${accentColor.split(" ")[2].substring(3)}))` }}
            initial={{ width: 0 }}
            whileInView={{ width: comingSoon ? "40%" : "95%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full ${comingSoon ? 'bg-yellow-500' : 'bg-green-500'} pulse-glow mr-2`}></div>
              <span className="text-xs text-muted-foreground">{comingSoon ? 'Coming Soon' : 'Active'}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {comingSoon ? 'Development: 40%' : 'Confidence: 95%'}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {comingSoon && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 px-4 py-2 rounded-full text-sm font-medium">
            Coming Soon
          </div>
        </div>
      )}
    </motion.div>
  );
};
