import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './components/ui/sheet';
import { Toaster, toast } from 'sonner';
import { ChatMessage } from './components/chat-message';
import { AudioControls } from './components/audio-controls';
import { ScenarioSelector } from './components/scenario-selector';
import { ProgressHeader } from './components/progress-header';
import { Settings } from './components/settings';
import { useChat } from './hooks/useChat';
import { calculateScore } from './lib/utils';
import { AuthDialog } from './components/auth/AuthDialog';

// Mock data - Scenarios and Levels will remain static for now
const scenarios = [
  { id: 'identification', name: 'Identification', icon: '🆔' },
  { id: 'appointments', name: 'Appointments', icon: '📅' },
  { id: 'forms', name: 'Forms & Documents', icon: '📋' },
  { id: 'transport', name: 'Transport & Directions', icon: '🚌' },
  { id: 'post', name: 'Post Office', icon: '📮' },
  { id: 'bank', name: 'Bank Basics', icon: '🏦' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'shopping', name: 'Shopping', icon: '🛒' },
  { id: 'health', name: 'Health Basics', icon: '🏥' }
];

const difficultyLevels = [
  { level: 0, label: 'A0-A1', color: 'bg-green-500' },
  { level: 1, label: 'A1', color: 'bg-blue-500' },
  { level: 2, label: 'A2', color: 'bg-yellow-500' },
  { level: 3, label: 'B1', color: 'bg-orange-500' },
  { level: 4, label: 'B2', color: 'bg-red-500' },
  { level: 5, label: 'C1', color: 'bg-purple-500' }
];

export default function App() {
  const [currentScenario, setCurrentScenario] = useState('identification');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [skillScore, setSkillScore] = useState(45);
  const [streak, setStreak] = useState(3);
  const [dailyGoal, setDailyGoal] = useState({ current: 0, target: 15 });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const { messages, currentSentence, isBotTyping, generateNextSentence, processUserMessage, setMessages } = useChat(
    currentScenario,
    currentLevel,
    setCurrentLevel,
    currentLanguage,
    skillScore,
    setSkillScore,
    setStreak,
    setDailyGoal
  );

  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScenarios, setShowScenarios] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [sessionCost, setSessionCost] = useState(0.0);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);

  const [appSettings, setAppSettings] = useState({
    showDiacritics: true,
    autoPlay: false,
    slowByDefault: false,
    hapticFeedback: true,
    notifications: true,
    offlineMode: false
  });

  // Web Speech API instances
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'ro-RO';
      
      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const score = calculateScore(transcript, currentSentence?.romanian || '');
        processUserMessage(transcript, score);
        setSessionCost(prev => prev + 0.0015); // Simulate cost update
      };

      speechRecognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        toast.error("Speech recognition error. Please try again.");
      };
      
      speechRecognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(speechRecognition);
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, [currentSentence, processUserMessage]);

  const playAudio = (slow = false) => {
    const messageToPlay = messages.find(m => m.id === selectedMessageId) || currentSentence;

    if (!messageToPlay || !('speechSynthesis' in window)) {
      toast.error("Text-to-speech not supported in this browser.");
      return;
    }
    
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(messageToPlay.content);
    utterance.lang = 'ro-RO';
    utterance.rate = slow ? 0.4 : 0.8;
    utterance.onend = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
    setSessionCost(prev => prev + 0.0005); // Simulate cost update
  };

  const handleRecord = () => {
    if (isRecording) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsRecording(!isRecording);
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    // The useChat hook will handle regenerating the sentence with the new translation
  };

  const handleSettingsChange = (key: string, value: boolean) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleDailyGoalChange = (target: number) => {
    setDailyGoal(prev => ({ ...prev, target }));
  };

  const currentScenarioName = scenarios.find(s => s.id === currentScenario)?.name || 'Identification';
  const currentLevelInfo = difficultyLevels[currentLevel];

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto">
      <Toaster position="top-center" richColors />
      <ProgressHeader 
        scenarioName={currentScenarioName}
        level={currentLevelInfo}
        streak={streak}
        dailyGoal={dailyGoal}
        onMenuClick={() => setShowScenarios(true)}
        onSettingsClick={() => setShowSettings(true)}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            showDiacritics={appSettings.showDiacritics}
            isSelected={selectedMessageId === message.id}
            onClick={() => {
              if (message.type === 'bot') {
                setSelectedMessageId(prevId => prevId === message.id ? null : message.id);
              }
            }}
          />
        ))}
        {isBotTyping && (
          <div className="text-center text-gray-500">
            <p>Bot is typing...</p>
          </div>
        )}
      </div>

      {currentSentence && (
        <AudioControls
          onPlay={() => playAudio(false)}
          onPlaySlow={() => playAudio(true)}
          onRecord={handleRecord}
          onSimplify={() => {
            if (currentLevel > 0) setCurrentLevel(currentLevel - 1);
          }}
          onNext={generateNextSentence}
          isPlaying={isPlaying}
          isRecording={isRecording}
          canSimplify={currentLevel > 0}
        />
      )}

      <Sheet open={showScenarios} onOpenChange={setShowScenarios}>
        <SheetContent side="left" className="w-80">
          <SheetHeader>
            <SheetTitle>Practice Scenarios</SheetTitle>
          </SheetHeader>
          <ScenarioSelector
            scenarios={scenarios}
            currentScenario={currentScenario}
            onScenarioChange={(scenarioId) => {
              setCurrentScenario(scenarioId);
              setShowScenarios(false);
              setMessages([]);
            }}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle>Settings</SheetTitle>
          </SheetHeader>
          <Settings
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            dailyGoalTarget={dailyGoal.target}
            onDailyGoalChange={handleDailyGoalChange}
            settings={appSettings}
            onSettingsChange={handleSettingsChange}
            onLoginClick={() => setShowAuth(true)}
            sessionCost={sessionCost}
          />
        </SheetContent>
      </Sheet>
      
      <AuthDialog open={showAuth} onOpenChange={setShowAuth} />
    </div>
  );
}