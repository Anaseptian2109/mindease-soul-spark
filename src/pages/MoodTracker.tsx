
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Smile, Meh, Frown, Activity } from "lucide-react";

const emotions = [
  { icon: Smile, label: "Happy", value: "happy", color: "text-green-500" },
  { icon: Meh, label: "Neutral", value: "neutral", color: "text-yellow-500" },
  { icon: Frown, label: "Sad", value: "sad", color: "text-blue-500" },
];

const MoodTracker = () => {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the mood data
    console.log({ date, selectedEmotion, notes });
    setSelectedEmotion("");
    setNotes("");
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
          <Activity className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Mood Tracker</h1>
            <p className="text-muted-foreground">Track your daily emotional wellbeing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
              <div className="grid grid-cols-3 gap-4">
                {emotions.map(({ icon: Icon, label, value, color }) => (
                  <Button
                    key={value}
                    variant={selectedEmotion === value ? "default" : "outline"}
                    className="h-24 flex-col gap-2"
                    onClick={() => setSelectedEmotion(value)}
                  >
                    <Icon className={`h-8 w-8 ${color}`} />
                    <span>{label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Add Notes</h2>
              <textarea
                className="w-full h-32 p-3 rounded-md border bg-background"
                placeholder="Write about your day..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button 
                className="w-full mt-4" 
                onClick={handleSubmit}
                disabled={!selectedEmotion}
              >
                Save Entry
              </Button>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="rounded-md border"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MoodTracker;
