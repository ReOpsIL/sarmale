import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Menu, Flame, Target, Settings } from 'lucide-react';

interface ProgressHeaderProps {
  scenarioName: string;
  level: { level: number; label: string; color: string };
  streak: number;
  dailyGoal: { current: number; target: number };
  onMenuClick: () => void;
  onSettingsClick: () => void;
}

export function ProgressHeader({ 
  scenarioName, 
  level, 
  streak, 
  dailyGoal, 
  onMenuClick,
  onSettingsClick 
}: ProgressHeaderProps) {
  const progressPercentage = (dailyGoal.current / dailyGoal.target) * 100;

  return (
    <div className="bg-white border-b border-gray-200 p-4 space-y-3">
      {/* Top row with menu and scenario */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold text-gray-900">{scenarioName}</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettingsClick}
            className="p-2"
          >
            <Settings className="h-5 w-5" />
          </Button>
          
          <Badge 
            className={`${level.color} text-white px-3 py-1`}
          >
            {level.label}
          </Badge>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between text-sm">
        {/* Streak */}
        <div className="flex items-center space-x-1 text-orange-600">
          <Flame className="h-4 w-4" />
          <span className="font-medium">{streak}</span>
          <span className="text-gray-600">day streak</span>
        </div>

        {/* Daily Goal */}
        <div className="flex items-center space-x-2 text-blue-600">
          <Target className="h-4 w-4" />
          <span className="font-medium">{dailyGoal.current}/{dailyGoal.target}</span>
          <span className="text-gray-600">today</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <Progress value={progressPercentage} className="h-2" />
        <div className="text-xs text-gray-500 text-center">
          {dailyGoal.target - dailyGoal.current > 0 
            ? `${dailyGoal.target - dailyGoal.current} more to reach daily goal`
            : "Daily goal completed! 🎉"
          }
        </div>
      </div>
    </div>
  );
}