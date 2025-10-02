import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Play, Volume2, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  translation?: string;
  score?: number;
  feedback?: string;
  level?: number;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  showDiacritics?: boolean;
}

export function ChatMessage({ message, showDiacritics = true }: ChatMessageProps) {
  const isBot = message.type === 'bot';
  
  // Function to remove diacritics if setting is disabled
  const processRomanianText = (text: string) => {
    if (!showDiacritics) {
      return text
        .replace(/ă/g, 'a')
        .replace(/Ă/g, 'A')
        .replace(/â/g, 'a')
        .replace(/Â/g, 'A')
        .replace(/î/g, 'i')
        .replace(/Î/g, 'I')
        .replace(/ș/g, 's')
        .replace(/Ș/g, 'S')
        .replace(/ț/g, 't')
        .replace(/Ț/g, 'T');
    }
    return text;
  };
  
  if (isBot) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-md p-4 shadow-sm border">
          {/* Romanian text with flag */}
          <div className="flex items-start space-x-2 mb-2">
            <span className="text-base">{processRomanianText(message.content)}</span>
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700">
              🇷🇴
            </Badge>
            {!showDiacritics && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5 text-gray-600">
                No diacritics
              </Badge>
            )}
          </div>
          
          {/* Translation */}
          {message.translation && (
            <div className="text-sm text-gray-600 mb-3 italic">
              {message.translation}
            </div>
          )}

          {/* Audio controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 text-xs h-8"
            >
              <Play className="h-3 w-3" />
              <span>Play</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 text-xs h-8"
            >
              <Volume2 className="h-3 w-3" />
              <span>Slow</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-1 text-xs h-8"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Replace</span>
            </Button>
          </div>

          {/* Level indicator */}
          {message.level !== undefined && (
            <div className="text-xs text-gray-500 mt-2">
              Level {message.level}
            </div>
          )}
          
          {/* Timestamp */}
          <div className="text-xs text-gray-400 mt-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  }

  // User message
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] bg-blue-500 text-white rounded-2xl rounded-tr-md p-4 shadow-sm">
        {/* User's transcript */}
        <div className="mb-2">"{message.content}"</div>
        
        {/* Score */}
        {message.score !== undefined && (
          <div className="flex items-center justify-between mb-2">
            <Badge 
              variant="secondary" 
              className={`text-xs px-2 py-1 ${
                message.score >= 80 ? 'bg-green-100 text-green-800' :
                message.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {message.score}/100
            </Badge>
            
            {/* Performance indicator */}
            <div className="text-xs">
              {message.score >= 80 ? '🎉 Excellent!' :
               message.score >= 70 ? '👍 Good!' :
               message.score >= 50 ? '👌 Not bad' :
               '💪 Keep trying!'}
            </div>
          </div>
        )}
        
        {/* Feedback */}
        {message.feedback && (
          <div className="text-xs bg-blue-600 rounded-lg p-2 mb-2">
            💡 {message.feedback}
          </div>
        )}
        
        {/* Timestamp */}
        <div className="text-xs text-blue-200">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}