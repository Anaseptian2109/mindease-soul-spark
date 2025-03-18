
import { motion } from "framer-motion";
import { Sparkles, Dna, Microscope, Rocket } from "lucide-react";

// Karena kita tidak bisa memodifikasi AdvancedFeatureCard, kita buat versi sederhana
// untuk menggantikan sementara

const SimpleAdvancedFeatureCard = ({ 
  icon, 
  title, 
  description, 
  comingSoon = false,
  accentColor 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-panel p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accentColor} opacity-5`}></div>
      
      <div className="mb-5 w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center relative">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-3 relative">{title}</h3>
      <p className="text-muted-foreground relative z-10">{description}</p>
      
      {comingSoon && (
        <div className="mt-4 px-3 py-1 bg-primary/20 text-primary text-xs font-medium inline-block rounded-full">
          Coming Soon
        </div>
      )}
    </motion.div>
  );
};

export const AdvancedTechnologiesSection = () => {
  return (
    <section className="container px-4 py-20 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="px-4 py-2 mb-6 inline-block bg-accent/10 text-accent rounded-full text-sm font-medium backdrop-blur-sm border border-accent/20"
        >
          <Sparkles className="h-4 w-4 inline-block mr-2" />
          Next-Gen Health Technology
        </motion.div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Advanced Health Technologies</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cutting-edge biomedical technologies powered by AI for comprehensive health analysis
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SimpleAdvancedFeatureCard
          icon={<Dna className="h-10 w-10 text-emerald-500" />}
          title="Genetic Analysis"
          description="Advanced DNA sequencing and personalized genetic health insights"
          comingSoon={false}
          accentColor="from-green-500 to-emerald-500"
        />
        <SimpleAdvancedFeatureCard
          icon={<Microscope className="h-10 w-10 text-cyan-500" />}
          title="Cellular Optimization"
          description="Microscopic health assessment and cellular rejuvenation protocols"
          comingSoon={true}
          accentColor="from-blue-500 to-cyan-500"
        />
        <SimpleAdvancedFeatureCard
          icon={<Rocket className="h-10 w-10 text-fuchsia-500" />}
          title="Quantum Health Matrix"
          description="Experimental quantum computing analysis for health prediction"
          comingSoon={true}
          accentColor="from-purple-500 to-fuchsia-500"
        />
      </div>
    </section>
  );
};
