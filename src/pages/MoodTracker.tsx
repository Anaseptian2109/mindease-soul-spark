
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Smile, Meh, Frown, Activity, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Emotion = {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
};

const emotions: Emotion[] = [
  { icon: Smile, label: "Happy", value: "happy", color: "text-green-500" },
  { icon: Meh, label: "Neutral", value: "neutral", color: "text-yellow-500" },
  { icon: Frown, label: "Sad", value: "sad", color: "text-blue-500" },
];

type MoodEntry = {
  date: string; // ISO string
  emotion: string;
  notes: string;
  id: string;
};

const MoodTracker = () => {
  const { toast } = useToast();
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState("");
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [viewingDate, setViewingDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'stats'>('calendar');
  const [currentEntry, setCurrentEntry] = useState<MoodEntry | null>(null);

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  // Update current entry when date changes
  useEffect(() => {
    const dateStr = date.toISOString().split('T')[0];
    const entry = moodEntries.find(entry => entry.date.split('T')[0] === dateStr);
    if (entry) {
      setCurrentEntry(entry);
      setSelectedEmotion(entry.emotion);
      setNotes(entry.notes);
    } else {
      setCurrentEntry(null);
      setSelectedEmotion("");
      setNotes("");
    }
  }, [date, moodEntries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmotion) {
      toast({
        title: "Mood Required",
        description: "Please select a mood before saving",
        variant: "destructive"
      });
      return;
    }
    
    const dateStr = date.toISOString();
    const existingEntryIndex = moodEntries.findIndex(entry => 
      entry.date.split('T')[0] === dateStr.split('T')[0]
    );
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...moodEntries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        emotion: selectedEmotion,
        notes: notes
      };
      setMoodEntries(updatedEntries);
      toast({
        title: "Entry Updated",
        description: `Your mood for ${date.toLocaleDateString()} has been updated.`
      });
    } else {
      // Create new entry
      const newEntry: MoodEntry = {
        id: Date.now().toString(),
        date: dateStr,
        emotion: selectedEmotion,
        notes: notes
      };
      setMoodEntries([...moodEntries, newEntry]);
      toast({
        title: "Entry Saved",
        description: `Your mood for ${date.toLocaleDateString()} has been recorded.`
      });
    }
  };

  const handleDeleteEntry = () => {
    if (!currentEntry) return;
    
    const updatedEntries = moodEntries.filter(entry => 
      entry.date.split('T')[0] !== date.toISOString().split('T')[0]
    );
    
    setMoodEntries(updatedEntries);
    setSelectedEmotion("");
    setNotes("");
    setCurrentEntry(null);
    
    toast({
      title: "Entry Deleted",
      description: `Your mood entry for ${date.toLocaleDateString()} has been removed.`
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewingDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setViewingDate(newDate);
  };

  // Calculate mood stats
  const moodStats = emotions.map(emotion => {
    const count = moodEntries.filter(entry => entry.emotion === emotion.value).length;
    const percentage = moodEntries.length > 0 
      ? Math.round((count / moodEntries.length) * 100) 
      : 0;
    
    return {
      ...emotion,
      count,
      percentage
    };
  });

  // Get month entries
  const currentMonthEntries = moodEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === viewingDate.getMonth() && 
           entryDate.getFullYear() === viewingDate.getFullYear();
  });

  // Calculate current month's mood trend
  const calculateTrend = () => {
    if (currentMonthEntries.length < 2) return 'neutral';
    
    const lastWeekEntries = currentMonthEntries
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7);
    
    // Simple trend calculation: more happy than sad = improving, more sad than happy = declining
    const happyCount = lastWeekEntries.filter(e => e.emotion === 'happy').length;
    const sadCount = lastWeekEntries.filter(e => e.emotion === 'sad').length;
    
    if (happyCount > sadCount) return 'improving';
    if (sadCount > happyCount) return 'declining';
    return 'neutral';
  };

  const moodTrend = calculateTrend();

  // Function to render the date cell with mood indicators
  const renderDay = (day: Date | undefined) => {
    if (!day) return null;
    
    const dateStr = day.toISOString().split('T')[0];
    const entry = moodEntries.find(entry => entry.date.split('T')[0] === dateStr);
    
    if (!entry) return null;
    
    const emotion = emotions.find(e => e.value === entry.emotion);
    if (!emotion) return null;
    
    const EmotionIcon = emotion.icon;
    return <EmotionIcon className={`h-4 w-4 ${emotion.color}`} />;
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

        <div className="flex justify-center mb-6">
          <div className="bg-card rounded-lg p-2 inline-flex">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'outline'}
              onClick={() => setViewMode('calendar')}
              className="rounded-r-none"
            >
              Calendar
            </Button>
            <Button
              variant={viewMode === 'stats' ? 'default' : 'outline'}
              onClick={() => setViewMode('stats')}
              className="rounded-l-none"
            >
              Statistics
            </Button>
          </div>
        </div>

        {viewMode === 'calendar' ? (
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
                <div className="flex gap-4 mt-4">
                  <Button 
                    className="flex-1" 
                    onClick={handleSubmit}
                    disabled={!selectedEmotion}
                  >
                    {currentEntry ? "Update Entry" : "Save Entry"}
                  </Button>
                  
                  {currentEntry && (
                    <Button 
                      variant="destructive"
                      onClick={handleDeleteEntry}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
                components={{
                  Day: ({ day }) => (
                    <div className="relative flex h-9 w-9 items-center justify-center">
                      <div className="absolute">
                        {day.date.toDateString() === date.toDateString() && (
                          <div className="absolute inset-0 rounded-full border-2 border-primary" />
                        )}
                      </div>
                      <div>{day.day}</div>
                      <div className="absolute bottom-1">
                        {renderDay(day.date)}
                      </div>
                    </div>
                  ),
                }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {viewingDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Your Mood Distribution</h3>
                <div className="space-y-4">
                  {moodStats.map(emotion => (
                    <div key={emotion.value} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <emotion.icon className={`h-5 w-5 ${emotion.color}`} />
                        <span>{emotion.label}</span>
                        <span className="ml-auto">{emotion.count} days ({emotion.percentage}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            emotion.value === 'happy' ? 'bg-green-500' : 
                            emotion.value === 'neutral' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${emotion.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Monthly Summary</h3>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">This Month's Entries:</span>
                      <span className="ml-auto">{currentMonthEntries.length}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Most Frequent Mood:</span>
                      <span className="ml-auto">
                        {moodStats.sort((a, b) => b.count - a.count)[0]?.label || "N/A"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Current Trend:</span>
                      <span className="ml-auto flex items-center">
                        {moodTrend === 'improving' ? (
                          <>Improving <ArrowUp className="h-4 w-4 text-green-500 ml-1" /></>
                        ) : moodTrend === 'declining' ? (
                          <>Declining <ArrowDown className="h-4 w-4 text-red-500 ml-1" /></>
                        ) : (
                          <>Stable <Meh className="h-4 w-4 text-yellow-500 ml-1" /></>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Recent Patterns</h4>
                    <p className="text-sm text-muted-foreground">
                      {moodEntries.length < 5 ? (
                        "Track your mood for at least 5 days to see patterns."
                      ) : moodTrend === 'improving' ? (
                        "Your mood appears to be improving recently. Keep up the good work!"
                      ) : moodTrend === 'declining' ? (
                        "Your mood seems to be declining. Consider trying meditation or speaking with a professional."
                      ) : (
                        "Your mood has been relatively stable. Regular self-care helps maintain emotional balance."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MoodTracker;
