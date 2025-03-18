
import { motion } from "framer-motion";
import { Heart, Moon, Activity } from "lucide-react";
import { HealthFeatureCard } from "./HealthFeatureCard";

export const HealthTrackingSection = () => {
  return (
    <section className="container px-4 py-20 my-12">
      <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-10 backdrop-blur-md relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12 relative z-10"
        >
          <h2 className="text-3xl font-bold mb-4">Comprehensive Health Tracking</h2>
          <p className="text-lg text-muted-foreground">
            Monitor your physical and mental health with our advanced tracking features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          <HealthFeatureCard
            icon={<Heart className="h-6 w-6 text-red-500" />}
            title="Heart Health"
            description="Track heart rate, HRV, and cardiac health metrics"
          />
          <HealthFeatureCard
            icon={<Moon className="h-6 w-6 text-indigo-500" />}
            title="Sleep Analysis"
            description="Monitor sleep patterns and quality"
          />
          <HealthFeatureCard
            icon={<Activity className="h-6 w-6 text-green-500" />}
            title="Physical Activity"
            description="Track steps, calories, and daily movement"
          />
        </div>
        
        {/* Background gradient elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-60 z-0"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
      </div>
    </section>
  );
};
