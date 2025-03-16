
import { motion } from "framer-motion";
import { X, Zap, CheckCircle, Rocket, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AISystemDetailsProps {
  system: {
    title: string;
    description: string;
    capabilities: string[];
    metricName: string;
    metricValue: number;
    recommendations: string[];
  };
  onClose: () => void;
}

export const AISystemDetails = ({ system, onClose }: AISystemDetailsProps) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 500 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={overlayVariants}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        className="w-full max-w-4xl glass-panel backdrop-blur-md border border-white/10 rounded-xl p-6 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/30 to-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 filter blur-3xl pointer-events-none"></div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold gradient-text">{system.title}</h2>
              <p className="text-muted-foreground">{system.description}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 glass-card bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              System Capabilities
            </h3>
            <ul className="space-y-2">
              {system.capabilities.map((capability, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-2"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                  <span className="text-sm">{capability}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 glass-card bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              {system.metricName}
            </h3>
            
            <div className="flex flex-col items-center justify-center h-[calc(100%-3rem)]">
              <div className="relative w-36 h-36 mb-4">
                <motion.div 
                  className="w-full h-full rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div 
                    className="w-[90%] h-[90%] rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <motion.div 
                      className="w-[80%] h-[80%] rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <motion.span 
                        className="text-4xl font-bold gradient-text"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {system.metricValue}%
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full rounded-full"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2"></div>
                </motion.div>
              </div>
              
              <div className="w-full">
                <div className="text-xs text-muted-foreground mb-1 flex justify-between">
                  <span>Low</span>
                  <span>Optimal</span>
                </div>
                <Progress value={system.metricValue} className="h-2" />
              </div>
            </div>
          </div>

          <div className="col-span-1 glass-card bg-white/5 rounded-xl p-5 border border-white/10">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              AI Recommendations
            </h3>
            <ul className="space-y-4">
              {system.recommendations.map((recommendation, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass-card p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{recommendation}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="outline" className="mr-2">Close</Button>
          <Button>Apply Recommendations</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
