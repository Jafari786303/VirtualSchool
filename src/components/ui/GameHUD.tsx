import React from 'react';
import { ChevronUp, ChevronDown, Map, Mic, MicOff, User, Users } from 'lucide-react';
import { UserData } from '../../types/types';
import { useGameStore } from '../../stores/gameStore';

interface GameHUDProps {
  userData: UserData;
}

const GameHUD: React.FC<GameHUDProps> = ({ userData }) => {
  const { currentFloor, setCurrentFloor, players } = useGameStore();
  
  const handleFloorChange = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentFloor < 3) {
      setCurrentFloor(currentFloor + 1);
    } else if (direction === 'down' && currentFloor > 0) {
      setCurrentFloor(currentFloor - 1);
    }
  };
  
  return (
    <div className="fixed bottom-6 left-6 flex flex-col space-y-4">
      {/* Player info */}
      <div className="card bg-white/90 backdrop-blur-sm p-3 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
          <User size={20} className="text-white" />
        </div>
        <div>
          <p className="font-semibold">{userData.name}</p>
          <p className="text-xs text-gray-600 capitalize">{userData.role}</p>
        </div>
      </div>
      
      {/* Floor controls */}
      <div className="card bg-white/90 backdrop-blur-sm p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold">Current Floor</span>
          <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-semibold">
            {currentFloor}
          </span>
        </div>
        <div className="flex space-x-2">
          <button 
            className="w-12 h-8 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300"
            onClick={() => handleFloorChange('down')}
            disabled={currentFloor === 0}
          >
            <ChevronDown size={18} className={currentFloor === 0 ? "text-gray-400" : "text-gray-700"} />
          </button>
          <button 
            className="w-12 h-8 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300"
            onClick={() => handleFloorChange('up')}
            disabled={currentFloor === 3}
          >
            <ChevronUp size={18} className={currentFloor === 3 ? "text-gray-400" : "text-gray-700"} />
          </button>
        </div>
      </div>
      
      {/* Online players */}
      <div className="card bg-white/90 backdrop-blur-sm p-3">
        <div className="flex items-center space-x-2 mb-2">
          <Users size={16} className="text-indigo-600" />
          <span className="text-sm font-semibold">Online</span>
          <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
            {players.length}
          </span>
        </div>
        <div className="max-h-32 overflow-y-auto">
          {players.map(player => (
            <div key={player.id} className="flex items-center space-x-2 py-1 text-xs">
              <div className={`w-2 h-2 rounded-full ${player.isSpeaking ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="font-medium">{player.name}</span>
              <span className="text-gray-500 capitalize">({player.role})</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mini-map button */}
      <button className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-700 shadow-lg">
        <Map size={20} className="text-white" />
      </button>
    </div>
  );
};

export default GameHUD;