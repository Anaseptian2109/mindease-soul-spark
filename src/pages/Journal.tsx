
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Calendar, Tag } from "lucide-react";

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
  mood: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString(),
      mood: "neutral"
    };
    setEntries([newEntry, ...entries]);
    setTitle("");
    setContent("");
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
              <textarea
                className="w-full h-48 p-3 rounded-md border bg-background mb-4"
                placeholder="Write your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Save Entry
              </Button>
            </form>
          </div>

          <div className="bg-card rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
            <div className="space-y-4">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-lg bg-background cursor-pointer"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{entry.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {entry.content}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      <Tag className="h-3 w-3 inline mr-1" />
                      {entry.mood}
                    </span>
                  </div>
                </motion.div>
              ))}
              {entries.length === 0 && (
                <p className="text-center text-muted-foreground">
                  No entries yet. Start writing!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Journal;
