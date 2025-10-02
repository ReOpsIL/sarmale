import { Button } from './ui/button';
import { Play, Mic, Volume2, ArrowDown, ChevronRight, MicIcon } from 'lucide-react';

interface AudioControlsProps {
  onPlay: () => void;
  onPlaySlow: () => void;
  onRecord: () => void;
  onSimplify: () => void;
  onNext: () => void;
  isPlaying: boolean;
  isRecording: boolean;
  canSimplify: boolean;
}

export function AudioControls({
  onPlay,
  onPlaySlow,
  onRecord,
  onSimplify,
  onNext,
  isPlaying,
  isRecording,
  canSimplify
}: AudioControlsProps) {
  return (
    <div className="bg-white border-t border-gray-200 p-4 space-y-3">
      {/* Primary record button */}
      <div className="flex items-center justify-center">
        <Button
          onClick={onRecord}
          disabled={isRecording || isPlaying}
          className={`w-20 h-20 rounded-full ${
            isRecording 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white shadow-lg`}
        >
          {isRecording ? (
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-white rounded-sm animate-pulse"></div>
              <span className="text-xs mt-1">Recording...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Mic className="h-8 w-8" />
              <span className="text-xs mt-1">Tap to speak</span>
            </div>
          )}
        </Button>
      </div>

      {/* Secondary controls */}
      <div className="flex items-center justify-between">
        {/* Playback controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPlay}
            disabled={isPlaying || isRecording}
            className="flex items-center space-x-1"
          >
            <Play className="h-4 w-4" />
            <span>{isPlaying ? 'Playing...' : 'Play'}</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onPlaySlow}
            disabled={isPlaying || isRecording}
            className="flex items-center space-x-1"
          >
            <Volume2 className="h-4 w-4" />
            <span>Slow</span>
          </Button>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center space-x-2">
          {canSimplify && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSimplify}
              className="flex items-center space-x-1 text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              <ArrowDown className="h-4 w-4" />
              <span>Too hard?</span>
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            className="flex items-center space-x-1"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Helper text */}
      <div className="text-xs text-gray-500 text-center">
        {isRecording ? (
          <span className="text-red-600">🎙️ Listening... Speak clearly and repeat the sentence</span>
        ) : isPlaying ? (
          <span className="text-blue-600">🔊 Playing audio...</span>
        ) : (
          <span>Listen to the sentence, then tap the microphone to repeat it</span>
        )}
      </div>
    </div>
  );
}