
import { motion } from "framer-motion";

const Journal = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <h1 className="text-4xl font-bold mb-4">Digital Journal</h1>
      <p className="text-muted-foreground">Journal features coming soon...</p>
    </motion.div>
  );
};

export default Journal;
