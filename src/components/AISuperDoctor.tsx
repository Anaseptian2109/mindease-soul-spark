
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Heart, 
  Activity, 
  ShieldCheck, 
  Pill, 
  Apple, 
  Bone, 
  Baby, 
  TestTube, 
  UserRound, 
  Wind, 
  Rocket, 
  Dumbbell,
  ArrowRight,
  MessageSquare,
  Stethoscope,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HealthStatus } from "@/components/HealthStatus";
import { AISystemDetails } from "@/components/AISystemDetails";

interface AISuperDoctorProps {
  onOpenChat: () => void;
}

export const AISuperDoctor = ({ onOpenChat }: AISuperDoctorProps) => {
  const [activeSystem, setActiveSystem] = useState<string | null>(null);
  
  const aiMedicalSystems = [
    {
      id: "neurology",
      title: "AI Neurology System",
      icon: <Brain className="h-5 w-5 text-indigo-400" />,
      score: 96,
      description: "Neural activity & cognitive health",
      accentColor: "text-indigo-400",
      details: {
        title: "AI Neurology System",
        description: "Advanced neural monitoring and cognitive health analysis",
        capabilities: [
          "EEG Brainwave Analysis",
          "Stress & Sleep Pattern Detection", 
          "Neurofeedback for Focus Improvement",
          "Stroke & Alzheimer's Prevention",
          "Cognitive Enhancement Training"
        ],
        metricName: "Neural Activity Score",
        metricValue: 96,
        recommendations: [
          "Meditation for 15 minutes daily",
          "Binaural beats during sleep",
          "Memory exercises to strengthen neural pathways"
        ]
      }
    },
    {
      id: "cardiology",
      title: "AI Cardiology System",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      score: 92,
      description: "Heart health & circulation",
      accentColor: "text-red-500",
      details: {
        title: "AI Cardiology System",
        description: "Comprehensive heart health monitoring and optimization",
        capabilities: [
          "Real-time ECG Analysis",
          "Heart Rate Variability Tracking",
          "Cardiovascular Risk Assessment",
          "Blood Pressure Monitoring",
          "Personalized Exercise Recommendations"
        ],
        metricName: "Cardiovascular Health",
        metricValue: 92,
        recommendations: [
          "30-minute cardio exercise 3x weekly",
          "Reduce sodium intake by 20%",
          "Practice deep breathing for 5 minutes daily"
        ]
      }
    },
    {
      id: "pulmonology",
      title: "AI Pulmonology System",
      icon: <Wind className="h-5 w-5 text-blue-400" />,
      score: 89,
      description: "Respiratory & lung function",
      accentColor: "text-blue-400",
      details: {
        title: "AI Pulmonology System",
        description: "Advanced respiratory health monitoring and optimization",
        capabilities: [
          "Breathing Pattern Analysis",
          "Oxygen Saturation Monitoring",
          "Asthma & Pneumonia Risk Detection",
          "Lung Capacity Measurement",
          "Personalized Breathing Exercises"
        ],
        metricName: "Respiratory Efficiency",
        metricValue: 89,
        recommendations: [
          "Diaphragmatic breathing exercises daily",
          "Maintain optimal humidity in living spaces",
          "Air purification in frequently used rooms"
        ]
      }
    },
    {
      id: "immunology",
      title: "AI Immunology System",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      score: 94,
      description: "Immune system & infection defense",
      accentColor: "text-green-500",
      details: {
        title: "AI Immunology System",
        description: "Comprehensive immune system monitoring and optimization",
        capabilities: [
          "Immune Response Modeling",
          "Early Infection Detection",
          "Immunodeficiency Risk Assessment",
          "Allergy & Inflammation Tracking",
          "Personalized Immune Boosting Protocols"
        ],
        metricName: "Immune System Strength",
        metricValue: 94,
        recommendations: [
          "Increase zinc and vitamin D intake",
          "Ensure 7-8 hours of quality sleep",
          "Regular exposure to beneficial microbes"
        ]
      }
    },
    {
      id: "pharmacology",
      title: "AI Pharmacology System",
      icon: <Pill className="h-5 w-5 text-purple-500" />,
      score: 98,
      description: "Medication management & optimization",
      accentColor: "text-purple-500",
      details: {
        title: "AI Pharmacology System",
        description: "Smart medication management and optimization",
        capabilities: [
          "Drug Interaction Analysis",
          "Personalized Dosage Recommendation",
          "Medication Effectiveness Tracking",
          "Side Effect Risk Assessment",
          "Automated Medication Reminders"
        ],
        metricName: "Medication Optimization",
        metricValue: 98,
        recommendations: [
          "Take supplements with meals for optimal absorption",
          "Space out medications to prevent interactions",
          "Monitor for potential side effects when starting new medications"
        ]
      }
    },
    {
      id: "nutrition",
      title: "AI Nutrition System",
      icon: <Apple className="h-5 w-5 text-green-400" />,
      score: 87,
      description: "Dietary needs & nutritional balance",
      accentColor: "text-green-400",
      details: {
        title: "AI Nutrition & Dietetics System",
        description: "Personalized nutrition planning and optimization",
        capabilities: [
          "Metabolic Rate Analysis",
          "Nutrient Deficiency Detection",
          "Personalized Meal Planning",
          "Dietary Impact Prediction",
          "Gut Microbiome Optimization"
        ],
        metricName: "Nutritional Balance",
        metricValue: 87,
        recommendations: [
          "Increase protein intake by 15%",
          "Add more omega-3 rich foods to diet",
          "Implement intermittent fasting 2 days per week"
        ]
      }
    },
    {
      id: "orthopedics",
      title: "AI Orthopedics System",
      icon: <Bone className="h-5 w-5 text-amber-500" />,
      score: 90,
      description: "Bone & joint health",
      accentColor: "text-amber-500",
      details: {
        title: "AI Orthopedics System",
        description: "Comprehensive bone and joint health monitoring",
        capabilities: [
          "Posture Analysis",
          "Bone Density Estimation",
          "Joint Stress Monitoring",
          "Injury Risk Assessment",
          "Personalized Physical Therapy"
        ],
        metricName: "Musculoskeletal Health",
        metricValue: 90,
        recommendations: [
          "Implement proper ergonomics at workstation",
          "Increase vitamin D and calcium intake",
          "Daily weight-bearing exercises for bone strength"
        ]
      }
    },
    {
      id: "pediatrics",
      title: "AI Pediatrics System",
      icon: <Baby className="h-5 w-5 text-pink-400" />,
      score: 97,
      description: "Child growth & development",
      accentColor: "text-pink-400",
      details: {
        title: "AI Pediatrics System",
        description: "Advanced monitoring of child growth and development",
        capabilities: [
          "Growth Pattern Analysis",
          "Developmental Milestone Tracking",
          "Nutritional Requirement Calculation",
          "Vaccination Scheduling",
          "Early Intervention Recommendations"
        ],
        metricName: "Developmental Progress",
        metricValue: 97,
        recommendations: [
          "Age-appropriate cognitive stimulation activities",
          "Balanced diet with adequate micronutrients",
          "Regular physical activity for proper development"
        ]
      }
    },
    {
      id: "pathology",
      title: "AI Pathology System",
      icon: <TestTube className="h-5 w-5 text-blue-500" />,
      score: 93,
      description: "Disease detection & analysis",
      accentColor: "text-blue-500",
      details: {
        title: "AI Pathology System",
        description: "Advanced disease detection and analysis",
        capabilities: [
          "Biomarker Analysis",
          "Early Disease Detection",
          "Health Risk Stratification",
          "Genetic Predisposition Mapping",
          "Personalized Prevention Plans"
        ],
        metricName: "Pathological Prevention",
        metricValue: 93,
        recommendations: [
          "Regular health screenings based on risk profile",
          "Targeted preventive measures for high-risk conditions",
          "Lifestyle modifications to reduce disease risk"
        ]
      }
    },
    {
      id: "virtual-doctor",
      title: "AI Virtual Doctor",
      icon: <UserRound className="h-5 w-5 text-cyan-400" />,
      score: 95,
      description: "Medical consultation & diagnosis",
      accentColor: "text-cyan-400",
      details: {
        title: "AI Virtual Doctor",
        description: "Advanced medical consultation and diagnosis system",
        capabilities: [
          "Symptom Analysis",
          "Medical History Integration",
          "Diagnostic Suggestion",
          "Treatment Recommendation",
          "Specialist Referral"
        ],
        metricName: "Diagnostic Accuracy",
        metricValue: 95,
        recommendations: [
          "Consult AI for initial symptom assessment",
          "Track symptom progression for better diagnosis",
          "Share detailed health data for accurate recommendations"
        ]
      }
    }
  ];

  const closeDetails = () => setActiveSystem(null);

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel backdrop-blur-md p-6 rounded-2xl mb-6 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold gradient-text">AI Super Doctor</h2>
            <p className="text-muted-foreground text-sm">All-in-One Medical AI System</p>
          </div>
          <div className="ml-auto">
            <Button
              onClick={onOpenChat}
              className="gap-2 group"
              variant="outline"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Medical Consultation</span>
              <Zap className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {aiMedicalSystems.slice(0, 5).map(system => (
            <motion.div 
              key={system.id}
              whileHover={{ y: -5, scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => setActiveSystem(system.id)}
            >
              <HealthStatus 
                title={system.title} 
                score={system.score} 
                icon={system.icon} 
                description={system.description}
                accentColor={system.accentColor}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {aiMedicalSystems.slice(5).map(system => (
          <motion.div 
            key={system.id}
            whileHover={{ y: -5, scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => setActiveSystem(system.id)}
          >
            <HealthStatus 
              title={system.title} 
              score={system.score} 
              icon={system.icon} 
              description={system.description}
              accentColor={system.accentColor}
            />
          </motion.div>
        ))}
      </motion.div>

      {activeSystem && (
        <AISystemDetails 
          system={aiMedicalSystems.find(s => s.id === activeSystem)?.details!}
          onClose={closeDetails}
        />
      )}
    </div>
  );
};
