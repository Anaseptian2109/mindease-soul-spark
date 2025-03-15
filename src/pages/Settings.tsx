
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Bell,
  Brush,
  Lock,
  LogOut,
  Moon,
  Settings as SettingsIcon,
  Shield,
  Sun,
  User,
  Languages,
  X,
  Smartphone,
  KeySquare,
  Cloud,
  Download,
  History
} from "lucide-react";

type ThemeOption = "light" | "dark" | "system";
type LanguageOption = "en" | "id" | "es" | "fr" | "de";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
  marketing: boolean;
}

interface AppSettings {
  theme: ThemeOption;
  language: LanguageOption;
  autoSaveJournal: boolean;
  compactView: boolean;
}

interface PrivacySettings {
  showOnlineStatus: boolean;
  shareProgress: boolean;
  allowDataAnalysis: boolean;
  twoFactorAuth: boolean;
}

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Initial data states
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "I'm focusing on improving my mental well-being and tracking my daily progress.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  });
  
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    inApp: true,
    marketing: false
  });
  
  const [appSettings, setAppSettings] = useState<AppSettings>({
    theme: "system",
    language: "en",
    autoSaveJournal: true,
    compactView: false
  });
  
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    showOnlineStatus: true,
    shareProgress: false,
    allowDataAnalysis: true,
    twoFactorAuth: false
  });

  const [activeSessions] = useState([
    { device: "iPhone 14 Pro", location: "Jakarta, Indonesia", lastActive: "2 minutes ago", current: true },
    { device: "MacBook Pro", location: "Jakarta, Indonesia", lastActive: "Yesterday, 18:23" },
    { device: "iPad Air", location: "Bandung, Indonesia", lastActive: "3 days ago" }
  ]);

  // Form handlers
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      // Simulate saving settings
      setTimeout(() => {
        toast({
          title: "Settings saved",
          description: `Notification preferences updated.`,
        });
      }, 500);
      return newSettings;
    });
  };

  const handleThemeChange = (theme: ThemeOption) => {
    setAppSettings(prev => ({ ...prev, theme }));
    // Simulate applying theme
    document.documentElement.classList.remove('light', 'dark');
    if (theme !== 'system') {
      document.documentElement.classList.add(theme);
    }
    toast({
      title: "Theme updated",
      description: `Theme set to ${theme} mode.`,
    });
  };

  const handleLanguageChange = (language: LanguageOption) => {
    setAppSettings(prev => ({ ...prev, language }));
    toast({
      title: "Language updated",
      description: `Language set to ${getLanguageName(language)}.`,
    });
  };

  const handlePrivacyChange = (key: keyof PrivacySettings) => {
    setPrivacySettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      // Simulate saving settings
      setTimeout(() => {
        toast({
          title: "Privacy settings updated",
          description: `Your privacy preferences have been saved.`,
        });
      }, 500);
      return newSettings;
    });
  };

  const handleAppSettingChange = (key: keyof Omit<AppSettings, 'theme' | 'language'>) => {
    setAppSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      toast({
        title: "Settings saved",
        description: `App settings have been updated.`,
      });
      return newSettings;
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // Navigate to login page
    window.location.href = "/signin";
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for account deletion
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted. Redirecting to homepage...",
      });
      // Redirect to homepage after delay
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem deleting your account. Please try again.",
        variant: "destructive",
      });
      console.error("Account deletion error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionTerminate = (index: number) => {
    toast({
      title: "Session terminated",
      description: `The session on ${activeSessions[index].device} has been terminated.`,
    });
    // In a real app you would update the sessions list here
  };

  const handleDataExport = () => {
    setIsLoading(true);
    // Simulate data export process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Data exported",
        description: "Your data has been exported. Check your email for the download link.",
      });
    }, 1500);
  };

  const getLanguageName = (code: LanguageOption): string => {
    const languages = {
      en: "English",
      id: "Bahasa Indonesia",
      es: "Español",
      fr: "Français",
      de: "Deutsch"
    };
    return languages[code];
  };

  const generateRandomAvatar = () => {
    const seeds = ["Felix", "Aneka", "Sasha", "Jasper", "Lorelei", "Zephyr", "Maya", "Leo"];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
    setProfile(prev => ({ ...prev, avatar: newAvatar }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container max-w-6xl px-4 py-8 mx-auto"
    >
      <h1 className="mb-8 text-4xl font-bold text-center md:text-left">Settings</h1>
      
      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        {/* Sidebar */}
        <div className="hidden md:block">
          <div className="p-4 space-y-1 border rounded-lg">
            <Button 
              variant={activeTab === "profile" ? "default" : "ghost"} 
              className="justify-start w-full"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2" /> Profile
            </Button>
            <Button 
              variant={activeTab === "notifications" ? "default" : "ghost"} 
              className="justify-start w-full"
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="mr-2" /> Notifications
            </Button>
            <Button 
              variant={activeTab === "appearance" ? "default" : "ghost"} 
              className="justify-start w-full"
              onClick={() => setActiveTab("appearance")}
            >
              <Brush className="mr-2" /> Appearance
            </Button>
            <Button 
              variant={activeTab === "privacy" ? "default" : "ghost"} 
              className="justify-start w-full"
              onClick={() => setActiveTab("privacy")}
            >
              <Lock className="mr-2" /> Privacy
            </Button>
            <Button 
              variant={activeTab === "security" ? "default" : "ghost"} 
              className="justify-start w-full"
              onClick={() => setActiveTab("security")}
            >
              <Shield className="mr-2" /> Security
            </Button>
            <Button 
              variant={activeTab === "advanced" ? "default" : "ghost"} 
              className="justify-start w-full"
              onClick={() => setActiveTab("advanced")}
            >
              <SettingsIcon className="mr-2" /> Advanced
            </Button>
          </div>
        </div>
        
        {/* Mobile Tabs */}
        <div className="md:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full h-auto p-1 mb-6 grid grid-cols-3 gap-1">
              <TabsTrigger value="profile" className="py-2">
                <User className="w-4 h-4 mr-2" /> Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="py-2">
                <Bell className="w-4 h-4 mr-2" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="py-2">
                <Brush className="w-4 h-4 mr-2" /> Appearance
              </TabsTrigger>
              <TabsTrigger value="privacy" className="py-2">
                <Lock className="w-4 h-4 mr-2" /> Privacy
              </TabsTrigger>
              <TabsTrigger value="security" className="py-2">
                <Shield className="w-4 h-4 mr-2" /> Security
              </TabsTrigger>
              <TabsTrigger value="advanced" className="py-2">
                <SettingsIcon className="w-4 h-4 mr-2" /> Advanced
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Settings Content */}
        <div className="p-6 border rounded-lg shadow-sm">
          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Profile Settings</h2>
              <div className="flex flex-col items-center gap-4 p-4 mb-6 border rounded-lg sm:flex-row sm:items-start">
                <div className="relative">
                  <img 
                    src={profile.avatar} 
                    alt="Profile" 
                    className="object-cover w-24 h-24 rounded-full ring-2 ring-primary/20"
                  />
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full" 
                    onClick={generateRandomAvatar}
                  >
                    <Brush className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="text-xl font-medium">{profile.fullName}</h3>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Button variant="outline" size="sm" onClick={generateRandomAvatar}>
                      Change Avatar
                    </Button>
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({...profile, bio: e.target.value})}
                      rows={4}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Notification Channels</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                      <Switch 
                        checked={notifications.email}
                        onCheckedChange={() => handleNotificationChange('email')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Notifications on your device</p>
                      </div>
                      <Switch 
                        checked={notifications.push}
                        onCheckedChange={() => handleNotificationChange('push')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Get text notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.sms}
                        onCheckedChange={() => handleNotificationChange('sms')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">In-app Notifications</p>
                        <p className="text-sm text-muted-foreground">Notification within the app</p>
                      </div>
                      <Switch 
                        checked={notifications.inApp}
                        onCheckedChange={() => handleNotificationChange('inApp')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Notification Types</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing & Newsletters</p>
                        <p className="text-sm text-muted-foreground">Tips, updates and promotions</p>
                      </div>
                      <Switch 
                        checked={notifications.marketing}
                        onCheckedChange={() => handleNotificationChange('marketing')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Activity Reminders</p>
                        <p className="text-sm text-muted-foreground">Daily and weekly reminders</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Achievement Alerts</p>
                        <p className="text-sm text-muted-foreground">Progress and milestones</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Appearance Settings</h2>
              
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Theme</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        appSettings.theme === "light" ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => handleThemeChange("light")}
                    >
                      <div className="flex items-center justify-center p-3 mb-2 rounded-lg bg-neutral-100">
                        <Sun className="w-6 h-6 text-amber-500" />
                      </div>
                      <p className="font-medium text-center">Light</p>
                    </div>
                    
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        appSettings.theme === "dark" ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => handleThemeChange("dark")}
                    >
                      <div className="flex items-center justify-center p-3 mb-2 rounded-lg bg-slate-800">
                        <Moon className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="font-medium text-center">Dark</p>
                    </div>
                    
                    <div
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        appSettings.theme === "system" ? "border-primary ring-2 ring-primary/20" : ""
                      }`}
                      onClick={() => handleThemeChange("system")}
                    >
                      <div className="flex items-center justify-center p-3 mb-2 bg-gradient-to-r from-neutral-100 to-slate-800 rounded-lg">
                        <div className="w-6 h-6 bg-gradient-to-r from-amber-500 to-slate-400 rounded-full" />
                      </div>
                      <p className="font-medium text-center">System</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Language</h3>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                    {(["en", "id", "es", "fr", "de"] as LanguageOption[]).map((lang) => (
                      <div
                        key={lang}
                        className={`p-2 border rounded-lg cursor-pointer transition-all ${
                          appSettings.language === lang ? "border-primary ring-2 ring-primary/20" : ""
                        }`}
                        onClick={() => handleLanguageChange(lang)}
                      >
                        <div className="flex items-center justify-center mb-1">
                          <Languages className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium text-center">{getLanguageName(lang)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Interface</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Compact View</p>
                        <p className="text-sm text-muted-foreground">Reduce spacing in the interface</p>
                      </div>
                      <Switch 
                        checked={appSettings.compactView}
                        onCheckedChange={() => handleAppSettingChange('compactView')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-save Journal</p>
                        <p className="text-sm text-muted-foreground">Automatically save journal entries</p>
                      </div>
                      <Switch 
                        checked={appSettings.autoSaveJournal}
                        onCheckedChange={() => handleAppSettingChange('autoSaveJournal')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Privacy Settings</h2>
              
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Visibility</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Online Status</p>
                        <p className="text-sm text-muted-foreground">Allow others to see when you're active</p>
                      </div>
                      <Switch 
                        checked={privacySettings.showOnlineStatus}
                        onCheckedChange={() => handlePrivacyChange('showOnlineStatus')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Share Progress</p>
                        <p className="text-sm text-muted-foreground">Share your progress with community</p>
                      </div>
                      <Switch 
                        checked={privacySettings.shareProgress}
                        onCheckedChange={() => handlePrivacyChange('shareProgress')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Data Usage</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Data Analysis</p>
                        <p className="text-sm text-muted-foreground">Help improve the app with anonymous data</p>
                      </div>
                      <Switch 
                        checked={privacySettings.allowDataAnalysis}
                        onCheckedChange={() => handlePrivacyChange('allowDataAnalysis')}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Data Export</h3>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleDataExport}
                    disabled={isLoading}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isLoading ? "Processing..." : "Export All My Data"}
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Export all your personal data, settings, journal entries, and logs.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === "security" && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Authentication</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <Switch 
                        checked={privacySettings.twoFactorAuth}
                        onCheckedChange={() => handlePrivacyChange('twoFactorAuth')}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline">
                        <KeySquare className="w-4 h-4 mr-2" />
                        Change Password
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Active Sessions</h3>
                  
                  <div className="space-y-3">
                    {activeSessions.map((session, index) => (
                      <div key={index} className="flex items-start justify-between p-3 border rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            <Smartphone className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{session.device}</p>
                              {session.current && (
                                <span className="px-2 py-0.5 ml-2 text-xs text-green-700 bg-green-100 rounded-full">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{session.location}</p>
                            <p className="text-xs text-muted-foreground">Last active: {session.lastActive}</p>
                          </div>
                        </div>
                        {!session.current && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleSessionTerminate(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Account Control</h3>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove all your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} disabled={isLoading}>
                            {isLoading ? "Deleting..." : "Delete Account"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Advanced Settings */}
          {activeTab === "advanced" && (
            <div>
              <h2 className="mb-6 text-2xl font-semibold">Advanced Settings</h2>
              
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Data Sync</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Background Sync</p>
                        <p className="text-sm text-muted-foreground">Sync data while app is in background</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button variant="outline">
                        <Cloud className="w-4 h-4 mr-2" />
                        Sync Now
                      </Button>
                      <p className="text-sm text-muted-foreground">Last synced: 5 minutes ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Activity Logs</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <History className="w-4 h-4 mr-2" />
                        View Activity Logs
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      View a detailed history of your account activity for security purposes.
                    </p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Developer Options</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Debug Mode</p>
                        <p className="text-sm text-muted-foreground">Enable advanced logging</p>
                      </div>
                      <Switch checked={false} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">API Access</p>
                        <p className="text-sm text-muted-foreground">Allow third-party API access</p>
                      </div>
                      <Switch checked={false} />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="mb-4 text-lg font-medium">Application Info</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm">Version</p>
                      <p className="text-sm font-medium">2.4.1</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Build</p>
                      <p className="text-sm font-medium">2023.06.15.123</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Platform</p>
                      <p className="text-sm font-medium">Web</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
