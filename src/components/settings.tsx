import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Slider } from './ui/slider';
import { Globe, Volume2, Mic, Bell, Shield, Trash2 } from 'lucide-react';

interface SettingsProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  dailyGoalTarget: number;
  onDailyGoalChange: (target: number) => void;
  settings: {
    showDiacritics: boolean;
    autoPlay: boolean;
    slowByDefault: boolean;
    hapticFeedback: boolean;
    notifications: boolean;
    offlineMode: boolean;
  };
  onSettingsChange: (key: string, value: boolean) => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'he', name: 'עברית (Hebrew)', flag: '🇮🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' }
];

export function Settings({ 
  currentLanguage, 
  onLanguageChange, 
  dailyGoalTarget,
  onDailyGoalChange,
  settings, 
  onSettingsChange 
}: SettingsProps) {
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="space-y-6 mt-6">
      {/* Language Settings */}
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Globe className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold">Translation Language</h3>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="language-select">Choose your mother language for translations</Label>
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger id="language-select">
              <SelectValue>
                <div className="flex items-center space-x-2">
                  <span>{currentLang?.flag}</span>
                  <span>{currentLang?.name}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.code} value={language.code}>
                  <div className="flex items-center space-x-2">
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="text-sm text-gray-600">
            All Romanian sentences will be translated to your selected language.
          </div>
        </div>
      </Card>

      {/* Learning Settings */}
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Volume2 className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold">Learning Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-diacritics">Show Romanian diacritics</Label>
              <p className="text-sm text-gray-600">Display ă, â, î, ș, ț characters</p>
            </div>
            <Switch
              id="show-diacritics"
              checked={settings.showDiacritics}
              onCheckedChange={(checked) => onSettingsChange('showDiacritics', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-play">Auto-play audio</Label>
              <p className="text-sm text-gray-600">Automatically play new sentences</p>
            </div>
            <Switch
              id="auto-play"
              checked={settings.autoPlay}
              onCheckedChange={(checked) => onSettingsChange('autoPlay', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="slow-default">Use slow speech by default</Label>
              <p className="text-sm text-gray-600">Play audio at slower speed</p>
            </div>
            <Switch
              id="slow-default"
              checked={settings.slowByDefault}
              onCheckedChange={(checked) => onSettingsChange('slowByDefault', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Daily Goal */}
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-xl">🎯</div>
          <h3 className="font-semibold">Daily Goal</h3>
        </div>
        
        <div className="space-y-4">
          <Label>Practice sessions per day: {dailyGoalTarget}</Label>
          <Slider
            value={[dailyGoalTarget]}
            onValueChange={(value) => onDailyGoalChange(value[0])}
            max={50}
            min={5}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>5 sessions</span>
            <span>50 sessions</span>
          </div>
        </div>
      </Card>

      {/* App Settings */}
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Mic className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold">App Preferences</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="haptic">Haptic feedback</Label>
              <p className="text-sm text-gray-600">Vibrate on button presses</p>
            </div>
            <Switch
              id="haptic"
              checked={settings.hapticFeedback}
              onCheckedChange={(checked) => onSettingsChange('hapticFeedback', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications">Daily reminders</Label>
              <p className="text-sm text-gray-600">Get reminded to practice</p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => onSettingsChange('notifications', checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="offline">Offline mode</Label>
              <p className="text-sm text-gray-600">Download lessons for offline use</p>
            </div>
            <Switch
              id="offline"
              checked={settings.offlineMode}
              onCheckedChange={(checked) => onSettingsChange('offlineMode', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Privacy & Data */}
      <Card className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold">Privacy & Data</h3>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Your audio recordings are processed for scoring and stored for 30 days to improve the learning experience.
          </p>
          
          <Button variant="outline" className="w-full flex items-center space-x-2">
            <Trash2 className="h-4 w-4" />
            <span>Delete all my recordings</span>
          </Button>
          
          <div className="text-xs text-gray-500">
            Note: This will reset your pronunciation history but keep your progress.
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-4 bg-gray-50">
        <div className="text-center space-y-2">
          <h3 className="font-semibold">Romanian Citizenship Coach</h3>
          <p className="text-sm text-gray-600">Version 1.0.0</p>
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Support</span>
          </div>
        </div>
      </Card>
    </div>
  );
}