
import { motion } from "framer-motion";
import { Shield, Lock, UserCheck } from "lucide-react";
import { SecurityFeature } from "./SecurityFeature";

export const SecuritySection = () => {
  return (
    <section className="container px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Your Privacy & Security Matter</h2>
        <p className="text-lg text-muted-foreground mb-8">
          We use industry-standard encryption and security measures to protect your data. 
          Your health information is private and secure with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <SecurityFeature 
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="End-to-End Encryption"
            description="Your data is encrypted at rest and in transit"
          />
          <SecurityFeature 
            icon={<Lock className="h-8 w-8 text-primary" />}
            title="HIPAA Compliant"
            description="Meeting healthcare privacy standards"
          />
          <SecurityFeature 
            icon={<UserCheck className="h-8 w-8 text-primary" />}
            title="User Control"
            description="Full control over your data sharing preferences"
          />
        </div>
      </motion.div>
    </section>
  );
};
