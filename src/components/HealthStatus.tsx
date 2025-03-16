
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HealthStatusProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: string;
  accentColor?: string;
}

export const HealthStatus = ({ 
  title, 
  score, 
  icon, 
  description, 
  accentColor 
}: HealthStatusProps) => {
  // Determine color based on score
  let scoreColor = "text-red-500";
  let bgGradient = "from-red-500/20 to-red-700/5";
  
  if (score >= 90) {
    scoreColor = "text-green-500";
    bgGradient = "from-green-500/20 to-green-700/5";
  } else if (score >= 70) {
    scoreColor = "text-yellow-500";
    bgGradient = "from-yellow-500/20 to-yellow-700/5";
  } else if (score >= 50) {
    scoreColor = "text-orange-500";
    bgGradient = "from-orange-500/20 to-orange-700/5";
  }

  // Use custom accent color if provided
  if (accentColor) {
    scoreColor = accentColor;
    bgGradient = `from-${accentColor.replace('text-', '')}/20 to-${accentColor.replace('text-', '')}/5`;
  }

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "backdrop-blur-lg bg-gradient-to-br border border-white/10 rounded-lg p-4 relative overflow-hidden shadow-lg",
        bgGradient
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-white/0 rounded-full transform translate-x-16 -translate-y-8 pointer-events-none"></div>
      
      <div className="flex items-center gap-2 mb-2">
        <div className="rounded-full bg-white/10 p-2">
          {icon}
        </div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      
      <div className={`text-3xl font-bold ${scoreColor} mb-1`}>
        {score}%
      </div>
      
      <div className="text-xs text-muted-foreground">{description}</div>
      
      <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-yellow-500' : score >= 50 ? 'bg-orange-500' : 'bg-red-500'}`}
        />
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  );
};
