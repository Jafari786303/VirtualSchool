import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useGameStore } from '../../stores/gameStore';

interface VoiceChatProps {
  isConnected: boolean;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ isConnected }) => {
  const [isMuted, setIsMuted] = useState(true);
  const { players, setPlayerSpeaking } = useGameStore();
  const currentPlayerId = players[0]?.id;
  
  const toggleMute = () => {
    if (!isConnected || !currentPlayerId) return;
    
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    // Update player speaking state
    setPlayerSpeaking(currentPlayerId, !newMuteState);
  };
  
  return (
    <div className="fixed bottom-6 right-6">
      <button 
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
          isMuted 
            ? 'bg-gray-700 hover:bg-gray-800' 
            : 'bg-green-600 hover:bg-green-700 animate-pulse'
        }`}
        onClick={toggleMute}
        disabled={!isConnected}
      >
        {isMuted ? (
          <MicOff size={24} className="text-white" />
        ) : (
          <Mic size={24} className="text-white" />
        )}
      </button>
      
      <div className="mt-2 text-center text-xs font-medium">
        {isMuted ? 'Click to Speak' : 'Speaking...'}
      </div>
    </div>
  );
};

export default VoiceChat;