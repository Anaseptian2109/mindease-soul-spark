
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Sparkles, 
  Send, 
  User, 
  Bot, 
  X, 
  ChevronDown, 
  Heart, 
  Brain, 
  Wind, 
  ShieldCheck, 
  Pill
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  category?: string;
}

interface AIVirtualDoctorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIVirtualDoctor = ({ isOpen, onClose }: AIVirtualDoctorProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello, I'm your AI Medical Assistant. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 400 } }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      generateAIResponse(input);
      setIsProcessing(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const userInputLower = userInput.toLowerCase();
    let category = "general";
    let response = "I understand your concern. Based on my analysis, this could be related to several factors. Would you like me to provide more specific information?";

    // Detect message category and provide appropriate response
    if (userInputLower.includes("head") || userInputLower.includes("brain") || userInputLower.includes("memory") || userInputLower.includes("focus")) {
      category = "neurology";
      response = "Based on your description, this might be related to neural activity patterns. I notice your recent brain activity metrics show some fluctuations in the frontal lobe region. I recommend some mindfulness exercises and ensuring adequate rest. Would you like me to suggest specific cognitive enhancement techniques?";
    } else if (userInputLower.includes("heart") || userInputLower.includes("chest") || userInputLower.includes("blood pressure") || userInputLower.includes("pulse")) {
      category = "cardiology";
      response = "Your cardiovascular indicators suggest mild stress on your system. Your heart rate variability has decreased slightly in the past 48 hours. I recommend some deep breathing exercises and moderate aerobic activity. Would you like me to analyze your recent ECG patterns in more detail?";
    } else if (userInputLower.includes("breath") || userInputLower.includes("lung") || userInputLower.includes("cough") || userInputLower.includes("oxygen")) {
      category = "pulmonology";
      response = "I've analyzed your respiratory patterns and oxygen saturation levels. There's a slight irregularity in your breathing rhythm during sleep. This could benefit from some targeted breathing exercises. Would you like me to recommend a personalized breathing protocol?";
    } else if (userInputLower.includes("immune") || userInputLower.includes("sick") || userInputLower.includes("cold") || userInputLower.includes("flu")) {
      category = "immunology";
      response = "Your immune system metrics show some increased activity, which might indicate your body is fighting off a minor infection. I recommend increasing your vitamin C and zinc intake, ensuring adequate hydration, and getting extra rest over the next 48 hours. Would you like me to monitor your immune response patterns?";
    }

    const aiMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      category
    };

    setMessages(prev => [...prev, aiMessage]);
    
    toast({
      title: "Health Analysis Complete",
      description: "AI medical assessment has been generated",
    });
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "neurology":
        return <Brain className="h-4 w-4 text-indigo-400" />;
      case "cardiology":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "pulmonology":
        return <Wind className="h-4 w-4 text-blue-400" />;
      case "immunology":
        return <ShieldCheck className="h-4 w-4 text-green-500" />;
      case "pharmacology":
        return <Pill className="h-4 w-4 text-purple-500" />;
      default:
        return <Bot className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="w-full max-w-3xl h-[80vh] glass-panel backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">AI Medical Consultation</h2>
                  <p className="text-xs text-muted-foreground">Virtual Doctor AI System</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(message => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`
                      max-w-[80%] glass-card rounded-lg p-3 
                      ${message.role === "user" 
                        ? "bg-primary/20 border border-primary/30" 
                        : "bg-white/5 border border-white/10"}
                    `}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        message.role === "user" 
                          ? "bg-primary/30" 
                          : "bg-white/10"
                      }`}>
                        {message.role === "user" 
                          ? <User className="h-4 w-4" /> 
                          : getCategoryIcon(message.category)
                        }
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm">{message.content}</div>
                        <div className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[80%] glass-card bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex space-x-1">
                        <motion.div 
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="flex-1 glass-card bg-white/5 border border-white/10 rounded-lg">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Describe your symptoms or health concerns..."
                    className="w-full p-3 bg-transparent outline-none"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !input.trim()}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </Button>
              </div>
              <div className="mt-2">
                <div className="text-xs text-muted-foreground flex items-center justify-center">
                  <Sparkles className="h-3 w-3 mr-1 text-primary" />
                  AI-powered medical consultation for informational purposes only
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
