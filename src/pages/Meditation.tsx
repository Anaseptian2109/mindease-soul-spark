
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Play, Pause, SkipBack, Volume2 } from "lucide-react";

const meditations = [
  {
    title: "Mindful Breathing",
    duration: "5 min",
    description: "Focus on your breath to create calmness and clarity"
  },
  {
    title: "Body Scan",
    duration: "10 min",
    description: "Progressively relax your body from head to toe"
  },
  {
    title: "Loving Kindness",
    duration: "15 min",
    description: "Develop compassion for yourself and others"
  },
  {
    title: "Sleep Meditation",
    duration: "20 min",
    description: "Gentle guidance to help you fall asleep naturally"
  }
];

const Meditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedMeditation, setSelectedMeditation] = useState<number | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetMeditation = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Moon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Guided Meditation</h1>
            <p className="text-muted-foreground">Find peace with guided meditation sessions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {meditations.map((meditation, index) => (
              <motion.div
                key={meditation.title}
                whileHover={{ y: -2 }}
                className={`p-6 rounded-lg cursor-pointer ${
                  selectedMeditation === index ? 'bg-primary text-primary-foreground' : 'bg-card'
                }`}
                onClick={() => setSelectedMeditation(index)}
              >
                <h3 className="text-xl font-semibold mb-2">{meditation.title}</h3>
                <div className="flex justify-between items-center text-sm">
                  <span>{meditation.duration}</span>
                </div>
                <p className="mt-2 text-sm">{meditation.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-card rounded-lg p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">
                {selectedMeditation !== null 
                  ? meditations[selectedMeditation].title 
                  : "Select a Meditation"}
              </h2>
              {selectedMeditation !== null && (
                <p className="text-muted-foreground">
                  {meditations[selectedMeditation].description}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center gap-4 mb-8">
              <Button
                size="icon"
                variant="outline"
                onClick={resetMeditation}
                disabled={!selectedMeditation}
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                size="icon"
                className="h-16 w-16"
                onClick={togglePlay}
                disabled={!selectedMeditation}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>

              <Button
                size="icon"
                variant="outline"
                disabled={!selectedMeditation}
              >
                <Volume2 className="h-6 w-6" />
              </Button>
            </div>

            <div className="w-full bg-secondary rounded-full h-2 mb-4">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(currentTime / 300) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Meditation;
