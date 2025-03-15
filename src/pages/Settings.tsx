
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Shield, 
  User, 
  LogOut, 
  Save, 
  Clock, 
  Download,
  Laptop,
  Globe,
  Pencil,
  CheckCircle,
  Languages,
  Lock,
  Eye,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserSettings {
  name: string;
  email: string;
  bio: string;
  notifications: boolean;
  dailyReminders: boolean;
  weeklyReports: boolean;
  darkMode: boolean;
  dataSharing: boolean;
  language: string;
  timezone: string;
  privacyLevel: string;
  sessionDuration: number;
  avatarUrl: string;
}

const languages = [
  { value: "en", label: "English" },
  { value: "id", label: "Bahasa Indonesia" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
];

const timezones = [
  { value: "UTC+0", label: "UTC+0 (London, Lisbon)" },
  { value: "UTC+1", label: "UTC+1 (Berlin, Paris, Rome)" },
  { value: "UTC+2", label: "UTC+2 (Athens, Cairo)" },
  { value: "UTC+3", label: "UTC+3 (Moscow, Istanbul)" },
  { value: "UTC+7", label: "UTC+7 (Jakarta, Bangkok)" },
  { value: "UTC+8", label: "UTC+8 (Singapore, Beijing)" },
  { value: "UTC+9", label: "UTC+9 (Tokyo, Seoul)" },
  { value: "UTC-5", label: "UTC-5 (New York, Toronto)" },
  { value: "UTC-8", label: "UTC-8 (Los Angeles, Vancouver)" },
];

const privacyLevels = [
  { value: "public", label: "Public" },
  { value: "friends", label: "Friends Only" },
  { value: "private", label: "Private" },
];

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'privacy' | 'sessions' | 'advanced'>('profile');
  const [settings, setSettings] = useState<UserSettings>(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return {
      name: "John Doe",
      email: "john@example.com",
      bio: "I'm focused on improving my mental wellbeing through mindfulness and meditation.",
      notifications: true,
      dailyReminders: false,
      weeklyReports: true,
      darkMode: false,
      dataSharing: true,
      language: "en",
      timezone: "UTC+7",
      privacyLevel: "friends",
      sessionDuration: 20,
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    };
  });

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

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

  // Apply dark mode changes if needed
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.darkMode]);

  const handleChange = (field: keyof UserSettings, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setIsFormChanged(false);
    
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

  const handleDeleteAccountRequest = () => {
    setIsDeletingAccount(true);
  };

  const confirmDeleteAccount = () => {
    // In a real app you would call an API to delete the user's account
    localStorage.clear();
    
    toast({
      title: "Account Deleted",
      description: "Your account and all associated data have been deleted"
    });
    
    setIsDeletingAccount(false);
    // In a real app, you'd redirect to a landing page
  };

  const cancelDeleteAccount = () => {
    setIsDeletingAccount(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                  <img 
                    src={settings.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${settings.name}`} 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Pencil className="h-4 w-4 mr-2" />
                  Change Avatar
                </Button>
              </div>
              
              <div className="md:w-2/3 space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="mt-1"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={settings.language} 
                    onValueChange={(value) => handleChange('language', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select 
                    value={settings.timezone} 
                    onValueChange={(value) => handleChange('timezone', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((timezone) => (
                        <SelectItem key={timezone.value} value={timezone.value}>
                          {timezone.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Enable notifications</h3>
                <p className="text-sm text-muted-foreground">Receive notifications about updates and activities</p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => handleChange('notifications', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Daily meditation reminders</h3>
                <p className="text-sm text-muted-foreground">Get reminded to meditate each day</p>
              </div>
              <Switch
                checked={settings.dailyReminders}
                onCheckedChange={(checked) => handleChange('dailyReminders', checked)}
                disabled={!settings.notifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Weekly progress reports</h3>
                <p className="text-sm text-muted-foreground">Receive a summary of your weekly wellbeing progress</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => handleChange('weeklyReports', checked)}
                disabled={!settings.notifications}
              />
            </div>
          </div>
        );
      
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Dark mode</h3>
                <p className="text-sm text-muted-foreground">Use dark theme for a more comfortable experience</p>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) => handleChange('darkMode', checked)}
              />
            </div>
            
            <div className="mt-6">
              <h3 className="text-base font-medium mb-4">Theme Colors</h3>
              <div className="grid grid-cols-4 gap-2">
                {['#9b87f5', '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#EC4899'].map((color) => (
                  <button
                    key={color}
                    className="w-12 h-12 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      // In a real app, this would update theme colors
                      toast({
                        title: "Theme Updated",
                        description: "This feature is coming soon!"
                      });
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'privacy':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="privacyLevel">Profile Privacy</Label>
              <Select 
                value={settings.privacyLevel} 
                onValueChange={(value) => handleChange('privacyLevel', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select privacy level" />
                </SelectTrigger>
                <SelectContent>
                  {privacyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-2">
                Control who can see your profile and activity
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Allow anonymous data sharing</h3>
                <p className="text-sm text-muted-foreground">Help improve MindEase by sharing anonymized usage data</p>
              </div>
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={(checked) => handleChange('dataSharing', checked)}
              />
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
        );
      
      case 'sessions':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="sessionDuration">Default meditation duration (minutes)</Label>
              <Input
                id="sessionDuration"
                type="number"
                min="1"
                max="60"
                value={settings.sessionDuration}
                onChange={(e) => handleChange('sessionDuration', parseInt(e.target.value) || 5)}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Set your preferred meditation session length
              </p>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg space-y-4">
              <h3 className="font-medium">Recent Sessions</h3>
              
              <div className="space-y-3">
                {[
                  { date: "Today, 10:30 AM", duration: "15 min", type: "Mindfulness" },
                  { date: "Yesterday, 5:45 PM", duration: "20 min", type: "Sleep" },
                  { date: "May 10, 2023, 7:15 AM", duration: "10 min", type: "Focus" }
                ].map((session, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-background rounded border border-border">
                    <div>
                      <p className="font-medium">{session.type}</p>
                      <p className="text-sm text-muted-foreground">{session.date}</p>
                    </div>
                    <span className="text-sm bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                      {session.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'advanced':
        return (
          <div className="space-y-6">
            <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
              <h3 className="text-lg font-medium text-destructive mb-2">Danger Zone</h3>
              <p className="text-sm mb-4">
                These actions are permanent and cannot be undone.
              </p>
              
              {isDeletingAccount ? (
                <div className="space-y-4">
                  <p className="text-sm font-medium">Are you sure you want to delete your account? All your data will be permanently removed.</p>
                  <div className="flex gap-3">
                    <Button 
                      variant="destructive" 
                      onClick={confirmDeleteAccount}
                    >
                      Yes, Delete My Account
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={cancelDeleteAccount}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccountRequest}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background p-4 md:p-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-primary/10 p-3 rounded-full">
            <SettingsIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Customize your MindEase experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Navigation Sidebar */}
          <div className="bg-card rounded-lg p-4 h-fit shadow-sm">
            <nav className="space-y-1">
              <Button 
                variant={activeTab === 'profile' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('profile')}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              
              <Button 
                variant={activeTab === 'notifications' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('notifications')}
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              
              <Button 
                variant={activeTab === 'appearance' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('appearance')}
              >
                <Moon className="h-4 w-4 mr-2" />
                Appearance
              </Button>
              
              <Button 
                variant={activeTab === 'privacy' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('privacy')}
              >
                <Shield className="h-4 w-4 mr-2" />
                Privacy
              </Button>
              
              <Button 
                variant={activeTab === 'sessions' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('sessions')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Sessions
              </Button>
              
              <Button 
                variant={activeTab === 'advanced' ? 'default' : 'ghost'} 
                className="w-full justify-start" 
                onClick={() => setActiveTab('advanced')}
              >
                <Laptop className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </nav>
            
            <div className="pt-4 mt-4 border-t">
              <Button 
                variant="outline" 
                className="w-full justify-start text-destructive" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="bg-card rounded-lg p-6 shadow-sm">
            {renderTabContent()}
            
            {isFormChanged && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center justify-end gap-4 border-t pt-6"
              >
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                >
                  Cancel
                </Button>
                
                <Button 
                  onClick={handleSave}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
