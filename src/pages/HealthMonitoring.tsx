
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Moon, 
  Activity, 
  BarChart2, 
  Watch, 
  Droplet,
  Wind,
  Footprints,
  Flame,
  Dumbbell,
  Brain,
  Share2,
  Loader2,
  ArrowUpRight,
  Sparkles,
  BrainCircuit,
  Zap,
  Microchip,
  ScanFace,
  Rocket,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import { HealthStatus } from "@/components/HealthStatus";
import { HealthChart } from "@/components/HealthChart";
import { Calendar } from "@/components/ui/calendar";
import { AISuperDoctor } from "@/components/AISuperDoctor";
import { AIVirtualDoctor } from "@/components/AIVirtualDoctor";

interface HealthData {
  heartRate: number;
  hrv: number;
  sleepHours: number;
  sleepQuality: string;
  bloodPressure: string;
  spO2: number;
  steps: number;
  caloriesBurned: number;
  stressLevel: string;
  lastUpdated: Date;
  bodyTemperature: number;
  immuneSystemScore: number;
  hydrationLevel: number;
  brainActivity: number;
  cellularHealth: number;
}

const HealthMonitoring = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showVirtualDoctor, setShowVirtualDoctor] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [healthData, setHealthData] = useState<HealthData>({
    heartRate: 75,
    hrv: 65,
    sleepHours: 7.5,
    sleepQuality: "Good",
    bloodPressure: "120/80",
    spO2: 98,
    steps: 8542,
    caloriesBurned: 1850,
    stressLevel: "Normal",
    lastUpdated: new Date(),
    bodyTemperature: 36.7,
    immuneSystemScore: 92,
    hydrationLevel: 78,
    brainActivity: 85,
    cellularHealth: 88
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Health Matrix Synced",
        description: "Biometric data successfully synchronized",
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData(prev => ({
        ...prev,
        heartRate: Math.floor(70 + Math.random() * 20),
        steps: prev.steps + Math.floor(Math.random() * 100),
        caloriesBurned: prev.caloriesBurned + Math.floor(Math.random() * 50),
        immuneSystemScore: Math.min(100, prev.immuneSystemScore + (Math.random() > 0.5 ? 1 : -1)),
        brainActivity: Math.min(100, Math.max(70, prev.brainActivity + (Math.random() > 0.5 ? 2 : -2))),
        lastUpdated: new Date()
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleExportData = () => {
    try {
      const dataStr = JSON.stringify(healthData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `health-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Data Extraction Complete",
        description: "Health matrix successfully exported to local storage",
      });
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "Unable to export biodata. Please retry.",
        variant: "destructive",
      });
    }
  };

  const renderMetricCard = (
    icon: React.ReactNode,
    title: string,
    value: string | number,
    unit?: string,
    trend?: "up" | "down" | "stable"
  ) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-xl p-6 relative overflow-hidden backdrop-blur-lg"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold text-sm">{title}</h3>
        {trend && (
          <span className={`ml-auto ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-blue-500'}`}>
            {trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : 
             trend === 'down' ? <ArrowUpRight className="h-4 w-4 transform rotate-90" /> : 
             <ArrowUpRight className="h-4 w-4 transform rotate-45" />}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold mb-2 flex items-end">
        {value}
        {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setShowCalendar(false);
      toast({
        title: "Timeline Shifted",
        description: `Health data from ${date.toLocaleDateString()} loaded`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center glass-panel p-12 rounded-3xl"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 rounded-full border-t-2 border-primary"></div>
            <div className="absolute inset-0 rounded-full border-r-2 border-accent opacity-75 rotate-45"></div>
            <div className="absolute inset-0 rounded-full border-b-2 border-primary/50 opacity-50 rotate-90"></div>
            <Microchip className="h-8 w-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
          </motion.div>
          <h2 className="text-xl font-bold mb-2 gradient-text">Initializing Health Matrix</h2>
          <p className="text-lg text-muted-foreground">Syncing biometric data...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-background to-secondary/30 p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8 glass-panel p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Neural Health Matrix</h1>
              <p className="text-muted-foreground">Advanced biometric monitoring system</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={calendarRef}>
              <Button 
                variant="outline" 
                onClick={() => setShowCalendar(!showCalendar)}
                className="glass-panel backdrop-blur-md border-white/10"
              >
                {date.toLocaleDateString()} <Zap className="ml-2 h-4 w-4 text-primary" />
              </Button>
              {showCalendar && (
                <div className="absolute z-50 mt-2 right-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="rounded-xl border shadow-xl"
                  />
                </div>
              )}
            </div>
            <div className="text-sm text-muted-foreground py-2 px-4 rounded-full glass-panel backdrop-blur-md border border-white/10">
              <span className="flex items-center">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Last scan: {healthData.lastUpdated.toLocaleTimeString()}
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowVirtualDoctor(true)}
              className="glass-panel backdrop-blur-md border-white/10 gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              Medical AI
            </Button>
          </div>
        </motion.div>

        {/* AI Super Doctor Section */}
        <AISuperDoctor onOpenChat={() => setShowVirtualDoctor(true)} />

        <section className="mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-6 rounded-2xl mb-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <HealthStatus 
                title="Overall Health" 
                score={95} 
                icon={<Heart className="h-6 w-6 text-red-500" />} 
                description="Excellent condition" 
              />
              <HealthStatus 
                title="Neural Activity" 
                score={healthData.brainActivity} 
                icon={<BrainCircuit className="h-6 w-6 text-blue-500" />} 
                description="Optimal cognitive function" 
              />
              <HealthStatus 
                title="Immune System" 
                score={healthData.immuneSystemScore} 
                icon={<ShieldCheck className="h-6 w-6 text-green-500" />} 
                description="Strong resistance" 
              />
              <HealthStatus 
                title="Cellular Health" 
                score={healthData.cellularHealth} 
                icon={<Rocket className="h-6 w-6 text-purple-500" />} 
                description="Regenerative state" 
              />
            </div>
          </motion.div>
        </section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 glass-panel p-6 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BarChart2 className="h-6 w-6 text-primary mr-2" />
            Biometric Patterns
          </h2>
          <div className="h-64">
            <HealthChart />
          </div>
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <BrainCircuit className="h-6 w-6 text-primary mr-2" />
            Neural Network
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Brain className="h-6 w-6 text-indigo-500" />,
              "Brain Activity",
              healthData.brainActivity,
              "%",
              "up"
            )}
            {renderMetricCard(
              <ScanFace className="h-6 w-6 text-blue-500" />,
              "Cognitive Function",
              "Optimal",
              undefined,
              "stable"
            )}
            {renderMetricCard(
              <Activity className="h-6 w-6 text-purple-500" />,
              "Stress Level",
              healthData.stressLevel,
              undefined,
              "stable"
            )}
          </div>
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Heart className="h-6 w-6 text-primary mr-2" />
            Cardiovascular Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Heart className="h-6 w-6 text-red-500" />,
              "Heart Rate",
              healthData.heartRate,
              "bpm",
              "stable"
            )}
            {renderMetricCard(
              <Activity className="h-6 w-6 text-blue-500" />,
              "Heart Rate Variability",
              healthData.hrv,
              "ms",
              "up"
            )}
            {renderMetricCard(
              <Droplet className="h-6 w-6 text-red-500" />,
              "Blood Pressure",
              healthData.bloodPressure,
              "mmHg",
              "stable"
            )}
          </div>
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Activity className="h-6 w-6 text-primary mr-2" />
            Physical Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Footprints className="h-6 w-6 text-green-500" />,
              "Steps Today",
              healthData.steps,
              "",
              "up"
            )}
            {renderMetricCard(
              <Flame className="h-6 w-6 text-orange-500" />,
              "Calories Burned",
              healthData.caloriesBurned,
              "kcal",
              "up"
            )}
            {renderMetricCard(
              <Wind className="h-6 w-6 text-blue-500" />,
              "Oxygen Saturation",
              healthData.spO2,
              "%",
              "stable"
            )}
          </div>
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Microchip className="h-6 w-6 text-primary mr-2" />
            Advanced Biometrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Zap className="h-6 w-6 text-yellow-500" />,
              "Immune System",
              healthData.immuneSystemScore,
              "%",
              "up"
            )}
            {renderMetricCard(
              <Droplet className="h-6 w-6 text-blue-500" />,
              "Hydration Level",
              healthData.hydrationLevel,
              "%",
              "stable"
            )}
            {renderMetricCard(
              <Rocket className="h-6 w-6 text-purple-500" />,
              "Cellular Health",
              healthData.cellularHealth,
              "%",
              "up"
            )}
          </div>
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Moon className="h-6 w-6 text-primary mr-2" />
            Sleep Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Moon className="h-6 w-6 text-indigo-500" />,
              "Sleep Duration",
              healthData.sleepHours,
              "hours",
              "stable"
            )}
            {renderMetricCard(
              <Activity className="h-6 w-6 text-purple-500" />,
              "Sleep Quality",
              healthData.sleepQuality,
              undefined,
              "up"
            )}
            {renderMetricCard(
              <Brain className="h-6 w-6 text-blue-500" />,
              "REM Cycles",
              "4 complete",
              undefined,
              "up"
            )}
          </div>
        </motion.section>

        <motion.section 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-8"
        >
          <div className="glass-panel rounded-2xl p-6 backdrop-blur-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Watch className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Connected Biosensors</h2>
              </div>
              <Button 
                variant="outline" 
                className="gap-2 glass-panel backdrop-blur-md border-white/10"
                onClick={handleExportData}
              >
                <Share2 className="h-4 w-4" />
                Export Matrix
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-lg glass-card hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Watch className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Neural Wristband</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Active Connection
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg glass-card hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Microchip className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Bio Implant</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Synchronized
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg glass-card hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center opacity-50">
                  <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Neural Interface</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    Standby Mode
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      
      <AIVirtualDoctor 
        isOpen={showVirtualDoctor} 
        onClose={() => setShowVirtualDoctor(false)} 
      />
    </motion.div>
  );
};

export default HealthMonitoring;
