import React, { useState } from 'react';
import StartScreen from './components/ui/StartScreen';
import CharacterCustomization from './components/ui/CharacterCustomization';
import GameWorld from './components/game/GameWorld';
import { UserData } from './types/types';

function App() {
  const [gameState, setGameState] = useState<'start' | 'customization' | 'game'>('start');
  const [userData, setUserData] = useState<UserData>({
    role: '',
    name: '',
    avatarCustomization: {
      hairStyle: 0,
      hairColor: '#000000',
      skinColor: '#f5d0c5',
      topColor: '#3b82f6',
      bottomColor: '#1e40af',
    }
  });

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setUserData(prev => ({ ...prev, role }));
    setGameState('customization');
  };

  const handleCustomizationComplete = (name: string, avatarCustomization: UserData['avatarCustomization']) => {
    setUserData(prev => ({ ...prev, name, avatarCustomization }));
    setGameState('game');
  };

  return (
    <div className="h-full w-full overflow-hidden">
      {gameState === 'start' && (
        <StartScreen onRoleSelect={handleRoleSelect} />
      )}
      
      {gameState === 'customization' && (
        <CharacterCustomization 
          role={userData.role as 'student' | 'teacher'} 
          onComplete={handleCustomizationComplete} 
        />
      )}
      
      {gameState === 'game' && (
        <GameWorld userData={userData} />
      )}
    </div>
  );
}

export default App;