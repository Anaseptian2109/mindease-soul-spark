
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, Moon, Shield, User, LogOut, Save, Clock, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserSettings {
  name: string;
  email: string;
  notifications: boolean;
  dailyReminders: boolean;
  darkMode: boolean;
  dataSharing: boolean;
  sessionDuration: number;
}

const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<UserSettings>(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      name: "John Doe",
      email: "john@example.com",
      notifications: true,
      dailyReminders: false,
      darkMode: false,
      dataSharing: true,
      sessionDuration: 20
    };
  });

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  // Check if form has been modified
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const originalSettings = JSON.parse(savedSettings);
      setIsFormChanged(JSON.stringify(originalSettings) !== JSON.stringify(settings));
    }
  }, [settings]);

  const handleChange = (field: keyof UserSettings, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setIsFormChanged(false);
    
    // Apply dark mode changes if needed
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully"
    });
  };

  const handleReset = () => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
      setIsFormChanged(false);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully"
    });
    // In a real app, you'd clear auth tokens and redirect to login
  };

  const handleExportData = () => {
    setIsExporting(true);
    
    // Simulate data preparation
    setTimeout(() => {
      // Prepare data to export
      const appData = {
        userSettings: settings,
        moodEntries: JSON.parse(localStorage.getItem('moodEntries') || '[]'),
        journalEntries: JSON.parse(localStorage.getItem('journalEntries') || '[]'),
        communityPosts: JSON.parse(localStorage.getItem('communityPosts') || '[]')
      };
      
      // Create downloadable file
      const dataStr = JSON.stringify(appData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `mindease-export-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setIsExporting(false);
      
      toast({
        title: "Data Exported",
        description: "Your data has been exported successfully"
      });
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <SettingsIcon className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Customize your MindEase experience</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Profile Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Enable notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={() => handleChange('notifications', !settings.notifications)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Daily meditation reminders</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.dailyReminders}
                    onChange={() => handleChange('dailyReminders', !settings.dailyReminders)}
                    className="sr-only peer"
                    disabled={!settings.notifications}
                  />
                  <div className={`w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary ${!settings.notifications ? 'opacity-50' : ''}`}></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Session Preferences</h2>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sessionDuration">Default meditation duration (minutes)</Label>
                <Input
                  id="sessionDuration"
                  type="number"
                  min="1"
                  max="60"
                  value={settings.sessionDuration}
                  onChange={(e) => handleChange('sessionDuration', parseInt(e.target.value) || 5)}
                />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Moon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
            <div className="flex items-center justify-between">
              <span>Dark mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() => handleChange('darkMode', !settings.darkMode)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Privacy</h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Your data is encrypted and stored securely. We never share your personal information
                with third parties without your consent.
              </p>
              
              <div className="flex items-center justify-between">
                <span>Allow anonymous data sharing for app improvement</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.dataSharing}
                    onChange={() => handleChange('dataSharing', !settings.dataSharing)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={handleExportData}
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                    Preparing data...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Export Your Data
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleSave} 
              className="flex-1"
              disabled={!isFormChanged}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            
            {isFormChanged && (
              <Button 
                variant="outline" 
                onClick={handleReset}
              >
                Cancel
              </Button>
            )}
          </div>
          
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
