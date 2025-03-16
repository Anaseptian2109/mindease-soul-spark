
import { motion } from "framer-motion";

interface HealthStatusProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  description: string;
}

export const HealthStatus = ({ title, score, icon, description }: HealthStatusProps) => {
  // Determine color based on score
  let scoreColor = "text-red-500";
  if (score >= 90) {
    scoreColor = "text-green-500";
  } else if (score >= 70) {
    scoreColor = "text-yellow-500";
  } else if (score >= 50) {
    scoreColor = "text-orange-500";
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-4"
    >
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
    </motion.div>
  );
};
