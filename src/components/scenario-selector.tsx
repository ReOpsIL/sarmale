import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { CheckCircle, Circle, Star } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  icon: string;
}

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  currentScenario: string;
  onScenarioChange: (scenarioId: string) => void;
}

// Mock progress data for scenarios
const mockProgress = {
  identification: { completed: 15, total: 20, level: 2 },
  appointments: { completed: 8, total: 15, level: 1 },
  forms: { completed: 3, total: 18, level: 1 },
  transport: { completed: 0, total: 12, level: 0 },
  post: { completed: 0, total: 10, level: 0 },
  bank: { completed: 0, total: 14, level: 0 },
  family: { completed: 0, total: 16, level: 0 },
  shopping: { completed: 0, total: 11, level: 0 },
  health: { completed: 0, total: 13, level: 0 }
};

export function ScenarioSelector({ 
  scenarios, 
  currentScenario, 
  onScenarioChange 
}: ScenarioSelectorProps) {
  return (
    <ScrollArea className="h-[calc(100vh-80px)] pr-4">
      <div className="space-y-4 mt-6">
      {/* Passport Path Banner */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">🛂</div>
          <div>
            <h3 className="font-semibold text-blue-900">Passport Path</h3>
            <p className="text-sm text-blue-700">Essential scenarios for citizenship applications</p>
          </div>
        </div>
      </Card>

      {/* Scenario List */}
      <div className="space-y-3">
        {scenarios.map((scenario) => {
          const progress = mockProgress[scenario.id as keyof typeof mockProgress];
          const isActive = scenario.id === currentScenario;
          const isCompleted = progress.completed === progress.total;
          const progressPercentage = (progress.completed / progress.total) * 100;
          
          return (
            <Card
              key={scenario.id}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => onScenarioChange(scenario.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{scenario.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{scenario.name}</h3>
                      {isActive && (
                        <Badge variant="secondary" className="text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                    
                    {/* Progress info */}
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-600">
                        {progress.completed}/{progress.total} lessons
                      </span>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        Level {progress.level}
                      </Badge>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Status indicator */}
                <div className="flex items-center">
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : progress.completed > 0 ? (
                    <Circle className="h-6 w-6 text-blue-500 fill-current" />
                  ) : (
                    <Circle className="h-6 w-6 text-gray-300" />
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Pro Tip</p>
            <p>Start with "Identification" and work your way through each scenario. The app will automatically adjust difficulty based on your performance.</p>
          </div>
        </div>
      </div>
      </div>
    </ScrollArea>
  );
}