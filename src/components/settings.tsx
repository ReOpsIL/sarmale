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
  onSettingsChange,
  onLoginClick,
  sessionCost
}: SettingsProps) {
    return (
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <Label>Translation Language</Label>
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="he">Hebrew</SelectItem>
              {/* Add other languages as needed */}
            </SelectContent>
          </Select>
        </div>
  
        <div className="space-y-2">
          <Label>Daily Goal (Sentences)</Label>
          <Slider
            value={[dailyGoalTarget]}
            onValueChange={(value) => onDailyGoalChange(value[0])}
            min={5}
            max={50}
            step={5}
          />
          <div className="text-center text-sm text-gray-500">{dailyGoalTarget} sentences</div>
        </div>
  
        <div className="space-y-4">
           <div className="flex items-center justify-between">
            <Label htmlFor="show-diacritics">Show Diacritics</Label>
            <Switch 
              id="show-diacritics" 
              checked={settings.showDiacritics} 
              onCheckedChange={(checked) => onSettingsChange('showDiacritics', checked)}
            />
          </div>
          {/* Add other settings toggles here */}
        </div>
        
        <div className="space-y-2">
          <Label>Usage</Label>
          <div className="text-sm text-gray-500">
            Current session cost: ${sessionCost.toFixed(4)}
          </div>
        </div>
  
        <Button onClick={onLoginClick} className="w-full">Login / Sign Up</Button>
      </div>
    );
  };