
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Moon, 
  Activity, 
  BarChart2, 
  Watch, 
  Droplet,
  Lungs,
  Footprints,
  Flame,
  Dumbbell,
  Brain,
  Share2
} from "lucide-react";

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
}

const HealthMonitoring = () => {
  const [healthData, setHealthData] = useState<HealthData>({
    heartRate: 75,
    hrv: 65,
    sleepHours: 7.5,
    sleepQuality: "Good",
    bloodPressure: "120/80",
    spO2: 98,
    steps: 8542,
    caloriesBurned: 1850,
    stressLevel: "Normal"
  });

  const renderMetricCard = (
    icon: React.ReactNode,
    title: string,
    value: string | number,
    unit?: string
  ) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-card rounded-lg p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="text-3xl font-bold mb-2">
        {value}
        {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
      </div>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Activity className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Health Monitoring</h1>
            <p className="text-muted-foreground">Track your physical and mental wellbeing</p>
          </div>
        </div>

        {/* Heart Rate & HRV Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cardiac Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Heart className="h-6 w-6 text-red-500" />,
              "Heart Rate",
              healthData.heartRate,
              "bpm"
            )}
            {renderMetricCard(
              <Activity className="h-6 w-6 text-blue-500" />,
              "Heart Rate Variability",
              healthData.hrv,
              "ms"
            )}
            {renderMetricCard(
              <BarChart2 className="h-6 w-6 text-green-500" />,
              "Heart Health Score",
              "Good",
            )}
          </div>
        </section>

        {/* Sleep Monitoring Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sleep Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Moon className="h-6 w-6 text-indigo-500" />,
              "Sleep Duration",
              healthData.sleepHours,
              "hours"
            )}
            {renderMetricCard(
              <Activity className="h-6 w-6 text-purple-500" />,
              "Sleep Quality",
              healthData.sleepQuality
            )}
          </div>
        </section>

        {/* Blood Pressure & SpO2 Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Droplet className="h-6 w-6 text-red-500" />,
              "Blood Pressure",
              healthData.bloodPressure,
              "mmHg"
            )}
            {renderMetricCard(
              <Lungs className="h-6 w-6 text-blue-500" />,
              "Oxygen Saturation",
              healthData.spO2,
              "%"
            )}
          </div>
        </section>

        {/* Physical Activity Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Physical Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Footprints className="h-6 w-6 text-green-500" />,
              "Steps Today",
              healthData.steps
            )}
            {renderMetricCard(
              <Flame className="h-6 w-6 text-orange-500" />,
              "Calories Burned",
              healthData.caloriesBurned,
              "kcal"
            )}
            {renderMetricCard(
              <Dumbbell className="h-6 w-6 text-purple-500" />,
              "Active Minutes",
              "45",
              "min"
            )}
          </div>
        </section>

        {/* Stress & Mental Health Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Stress & Mental Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMetricCard(
              <Brain className="h-6 w-6 text-indigo-500" />,
              "Stress Level",
              healthData.stressLevel
            )}
          </div>
        </section>

        {/* Device Integration */}
        <section className="mb-8">
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Watch className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-semibold">Connected Devices</h2>
              </div>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Export Data
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Watch className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Apple Watch</h3>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default HealthMonitoring;
