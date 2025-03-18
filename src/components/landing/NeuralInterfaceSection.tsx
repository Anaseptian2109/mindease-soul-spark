
import { motion } from "framer-motion";
import { ScanFace, Key, BrainCircuit, Activity, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const NeuralInterfaceSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="container px-4 py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Neural Interface Systems</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Customize and optimize your neural pathways with our advanced interface technology
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10"
      >
        <Card className="backdrop-blur-md bg-black/10 border-white/10 overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <ScanFace className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Neural Interface</CardTitle>
                  <CardDescription className="text-md">Customize and optimize your neural pathways and system preferences</CardDescription>
                </div>
              </div>
              <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 pulse-glow"></span>
                Neural systems online
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-panel p-4 rounded-xl border border-white/10 hover:border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                  <Key className="h-5 w-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">Neural Access</h3>
                <p className="text-sm text-muted-foreground">Quantum-protected biometric authorization protocols</p>
                <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-50 mt-3 rounded-full"></div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-panel p-4 rounded-xl border border-white/10 hover:border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                  <BrainCircuit className="h-5 w-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">Mind-Machine Link</h3>
                <p className="text-sm text-muted-foreground">Advanced neural pathway optimization algorithms</p>
                <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-50 mt-3 rounded-full"></div>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-panel p-4 rounded-xl border border-white/10 hover:border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                  <Activity className="h-5 w-5 text-green-400" />
                </div>
                <h3 className="text-lg font-medium mb-1">Synaptic Dashboard</h3>
                <p className="text-sm text-muted-foreground">Real-time neural performance monitoring system</p>
                <div className="h-1 w-full bg-gradient-to-r from-green-400 to-emerald-500 opacity-50 mt-3 rounded-full"></div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-8 opacity-70"
            />
            
            <div className="flex justify-between items-center mt-4">
              <div className="text-xs text-muted-foreground">Neural Matrix v4.2.7</div>
              <Button 
                onClick={() => navigate("/dashboard")}
                className="slide-up bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300"
              >
                Access Neural Interface <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/5 blur-3xl"></div>
    </section>
  );
};
