
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Calendar, Tag, Smile, Meh, Frown, Trash, Edit, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
  mood: string;
}

type MoodOption = {
  value: string;
  label: string;
  icon: React.ElementType;
  color: string;
};

const moodOptions: MoodOption[] = [
  { value: "happy", label: "Happy", icon: Smile, color: "text-green-500" },
  { value: "neutral", label: "Neutral", icon: Meh, color: "text-yellow-500" },
  { value: "sad", label: "Sad", icon: Frown, color: "text-blue-500" }
];

const Journal = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("neutral");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>(entries);

  // Save entries to localStorage when they change
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  // Update filtered entries when entries or search term changes
  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = entries.filter(entry => 
        entry.title.toLowerCase().includes(lowercasedSearch) || 
        entry.content.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries(entries);
    }
  }, [entries, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and content for your journal entry",
        variant: "destructive"
      });
      return;
    }

    if (editMode && selectedEntry) {
      // Update existing entry
      const updatedEntries = entries.map(entry => 
        entry.id === selectedEntry.id 
          ? { ...entry, title, content, mood }
          : entry
      );
      
      setEntries(updatedEntries);
      toast({
        title: "Entry Updated",
        description: "Your journal entry has been updated successfully"
      });
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: Date.now(),
        title,
        content,
        date: new Date().toISOString(),
        mood
      };
      
      setEntries([newEntry, ...entries]);
      toast({
        title: "Entry Created",
        description: "Your new journal entry has been saved"
      });
    }
    
    resetForm();
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
    
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
    
    toast({
      title: "Entry Deleted",
      description: "Your journal entry has been removed"
    });
  };

  const handleEdit = (entry: JournalEntry) => {
    setSelectedEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    setEditMode(true);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMood("neutral");
    setSelectedEntry(null);
    setEditMode(false);
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
          <Book className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Digital Journal</h1>
            <p className="text-muted-foreground">Record your thoughts and reflections</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6">
              <Input
                type="text"
                placeholder="Entry Title"
                className="mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">How are you feeling?</label>
                <div className="grid grid-cols-3 gap-2">
                  {moodOptions.map(option => {
                    const Icon = option.icon;
                    return (
                      <Button
                        key={option.value}
                        type="button"
                        variant={mood === option.value ? "default" : "outline"}
                        className="flex items-center gap-2"
                        onClick={() => setMood(option.value)}
                      >
                        <Icon className={`h-4 w-4 ${option.color}`} />
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
              
              <textarea
                className="w-full h-48 p-3 rounded-md border bg-background mb-4"
                placeholder="Write your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editMode ? "Update Entry" : "Save Entry"}
                </Button>
                
                {editMode && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <h2 className="text-xl font-semibold">Recent Entries</h2>
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search entries..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    whileHover={{ y: -2 }}
                    className="p-4 rounded-lg bg-background cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{entry.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(entry.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                      {entry.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary flex items-center">
                        <Tag className="h-3 w-3 inline mr-1" />
                        {moodOptions.find(m => m.value === entry.mood)?.label || entry.mood}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(entry)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(entry.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {entries.length === 0 
                    ? "No entries yet. Start writing!" 
                    : "No entries match your search."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Journal;
