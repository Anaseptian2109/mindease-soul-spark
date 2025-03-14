
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Play, Pause, SkipBack, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const meditations = [
  {
    id: 1,
    title: "Mindful Breathing",
    duration: 300, // 5 min in seconds
    description: "Focus on your breath to create calmness and clarity",
    audioUrl: "https://soundbible.com/mp3/rain_background-mike-koenig.mp3" // placeholder audio
  },
  {
    id: 2,
    title: "Body Scan",
    duration: 600, // 10 min
    description: "Progressively relax your body from head to toe",
    audioUrl: "https://soundbible.com/mp3/meadow-ambient-birds-nature.mp3" // placeholder audio
  },
  {
    id: 3,
    title: "Loving Kindness",
    duration: 900, // 15 min
    description: "Develop compassion for yourself and others",
    audioUrl: "https://soundbible.com/mp3/ocean_waves-Mike_Koenig-980635527.mp3" // placeholder audio
  },
  {
    id: 4,
    title: "Sleep Meditation",
    duration: 1200, // 20 min
    description: "Gentle guidance to help you fall asleep naturally",
    audioUrl: "https://soundbible.com/mp3/Campfire_Crackling-Mike_Koenig-1030891369.mp3" // placeholder audio
  }
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const Meditation = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedMeditation, setSelectedMeditation] = useState<number | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Initialize audio when meditation is selected
  useEffect(() => {
    if (selectedMeditation !== null) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const meditation = meditations[selectedMeditation];
      audioRef.current = new Audio(meditation.audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
      setCurrentTime(0);
      setIsPlaying(false);
      
      toast({
        title: "Meditation Selected",
        description: `${meditation.title} is ready to play`,
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [selectedMeditation, toast]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        intervalRef.current = window.setInterval(() => {
          setCurrentTime((prevTime) => {
            const meditation = meditations[selectedMeditation as number];
            if (prevTime >= meditation.duration) {
              clearInterval(intervalRef.current as number);
              setIsPlaying(false);
              setCurrentTime(0);
              audioRef.current?.pause();
              toast({
                title: "Meditation Complete",
                description: "Your session has ended. How do you feel?",
              });
              return 0;
            }
            return prevTime + 1;
          });
        }, 1000);
      } else {
        audioRef.current.pause();
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, selectedMeditation, toast]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetMeditation = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
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
                key={meditation.id}
                whileHover={{ y: -2 }}
                className={`p-6 rounded-lg cursor-pointer ${
                  selectedMeditation === index ? 'bg-primary text-primary-foreground' : 'bg-card'
                }`}
                onClick={() => setSelectedMeditation(index)}
              >
                <h3 className="text-xl font-semibold mb-2">{meditation.title}</h3>
                <div className="flex justify-between items-center text-sm">
                  <span>{formatTime(meditation.duration)}</span>
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

            {selectedMeditation !== null && (
              <div className="mb-8 text-center">
                <p className="text-3xl font-mono">
                  {formatTime(currentTime)} / {formatTime(meditations[selectedMeditation].duration)}
                </p>
              </div>
            )}

            <div className="flex justify-center items-center gap-4 mb-8">
              <Button
                size="icon"
                variant="outline"
                onClick={resetMeditation}
                disabled={selectedMeditation === null}
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                size="icon"
                className="h-16 w-16"
                onClick={togglePlay}
                disabled={selectedMeditation === null}
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
                onClick={toggleMute}
                disabled={selectedMeditation === null}
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
            </div>

            {selectedMeditation !== null && (
              <div className="space-y-4">
                <Progress 
                  value={(currentTime / meditations[selectedMeditation].duration) * 100} 
                  className="h-2"
                />
                
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Meditation;
