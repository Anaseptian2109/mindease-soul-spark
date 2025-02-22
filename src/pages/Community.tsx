
import { motion } from "framer-motion";

const Community = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <h1 className="text-4xl font-bold mb-4">Community</h1>
      <p className="text-muted-foreground">Community features coming soon...</p>
    </motion.div>
  );
};

export default Community;
