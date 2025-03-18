
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState("Loading amazing features...");
  const loadingPhrases = [
    "Loading amazing features...",
    "Initializing neural pathways...",
    "Calibrating quantum processors...",
    "Connecting to wellness network...",
    "Optimizing your experience..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">{loadingText}</p>
        <motion.div 
          className="w-48 h-1 mt-4 mx-auto bg-black/10 dark:bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              transition: { repeat: Infinity, duration: 2, ease: "linear" }
            }}
            className="h-full bg-gradient-to-r from-primary via-purple-500 to-primary"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
