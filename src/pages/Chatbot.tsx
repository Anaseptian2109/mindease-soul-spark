
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, User, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  type: "user" | "bot";
  content: string;
  timestamp: string;
}

// Predefined therapeutic responses
const therapeuticResponses = {
  anxiety: [
    "I understand anxiety can be challenging. Let's explore what's causing these feelings.",
    "You're not alone in dealing with anxiety. Would you like to try a quick breathing exercise?",
    "It's brave of you to share this. Can you tell me more about when these feelings are strongest?"
  ],
  depression: [
    "I hear you, and your feelings are valid. Depression can be really tough.",
    "Would you like to explore some coping strategies together?",
    "You're showing strength by reaching out. What kind of support would be most helpful right now?"
  ],
  stress: [
    "It sounds like you're under a lot of pressure. Let's break this down together.",
    "Stress can be overwhelming. Would you like to try a quick mindfulness exercise?",
    "You're handling a lot right now. What's the most pressing concern we can address?"
  ],
  general: [
    "I'm here to support you. How can I help make things easier?",
    "Your feelings are important. Would you like to explore them together?",
    "Thank you for sharing that with me. What would be most helpful right now?"
  ]
};

const Chatbot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your AI emotional support companion. How are you feeling today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedMood, setSelectedMood] = useState<string>("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeMessage = (message: string): string => {
    message = message.toLowerCase();
    if (message.includes("anxious") || message.includes("worry") || message.includes("nervous")) {
      return "anxiety";
    } else if (message.includes("sad") || message.includes("depressed") || message.includes("hopeless")) {
      return "depression";
    } else if (message.includes("stressed") || message.includes("overwhelmed") || message.includes("pressure")) {
      return "stress";
    }
    return "general";
  };

  const generateResponse = (messageType: string): string => {
    const responses = therapeuticResponses[messageType as keyof typeof therapeuticResponses];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Analyze message and generate response
    const messageType = analyzeMessage(input);
    const response = generateResponse(messageType);

    // Simulate AI processing time
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        content: response,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      toast({
        title: "New Message",
        description: "AI companion has responded to your message",
      });
    }, 1500);
  };

  const moodOptions = ["Happy", "Anxious", "Sad", "Stressed", "Neutral"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Brain className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">AI Emotional Support</h1>
            <p className="text-muted-foreground">Chat with our AI for guidance and support</p>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">How are you feeling right now?</h2>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => (
                <Button
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  onClick={() => {
                    setSelectedMood(mood);
                    const moodMessage: Message = {
                      id: Date.now(),
                      type: "user",
                      content: `I'm feeling ${mood.toLowerCase()} today.`,
                      timestamp: new Date().toLocaleTimeString()
                    };
                    setMessages(prev => [...prev, moodMessage]);
                  }}
                  className="px-4 py-2"
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          <div className="h-[500px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.type === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="mb-1">{message.content}</p>
                    <span className="text-xs opacity-70">{message.timestamp}</span>
                  </motion.div>
                  {message.type === "user" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  AI is typing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button type="submit" size="icon" disabled={isTyping || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Chatbot;
