
import { motion } from "framer-motion";

const SignUp = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
      <p className="text-muted-foreground">Sign up page coming soon...</p>
    </motion.div>
  );
};

export default SignUp;
