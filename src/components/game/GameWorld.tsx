import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Stars } from '@react-three/drei';
import School from './environment/School';
import Player from './player/Player';
import OtherPlayers from './player/OtherPlayers';
import NetworkManager from '../../utils/NetworkManager';
import GameHUD from '../ui/GameHUD';
import VoiceChat from '../ui/VoiceChat';
import { UserData, PlayerState } from '../../types/types';
import { useGameStore } from '../../stores/gameStore';

interface GameWorldProps {
  userData: UserData;
}

const GameWorld: React.FC<GameWorldProps> = ({ userData }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const { currentFloor, players, setPlayers, addPlayer, removePlayer, updatePlayerPosition } = useGameStore();
  
  useEffect(() => {
    // Connect to network
    const networkManager = new NetworkManager();
    
    networkManager.connect().then(() => {
      setIsConnected(true);
      
      // Create player object
      const newPlayer: PlayerState = {
        id: networkManager.getClientId(),
        name: userData.name,
        role: userData.role,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        avatarCustomization: userData.avatarCustomization,
        isSpeaking: false
      };
      
      // Add self to players list
      addPlayer(newPlayer);
      
      // Announce player joining
      networkManager.announcePlayerJoin(newPlayer);
      
      // Set up network listeners
      networkManager.onPlayerJoin((player) => {
        addPlayer(player);
      });
      
      networkManager.onPlayerLeave((playerId) => {
        removePlayer(playerId);
      });
      
      networkManager.onPlayerUpdate((player) => {
        updatePlayerPosition(player.id, player.position, player.rotation);
      });
    });
    
    // Day/night cycle (simplified for demo)
    const timer = setInterval(() => {
      setIsNight(prev => !prev);
    }, 300000); // Switch every 5 minutes
    
    return () => {
      networkManager.disconnect();
      clearInterval(timer);
    };
  }, [userData, addPlayer, removePlayer, updatePlayerPosition]);
  
  return (
    <div className="h-full w-full relative">
      <Canvas className="canvas-container" shadows>
        {/* Environment lighting */}
        <ambientLight intensity={isNight ? 0.2 : 0.5} />
        <pointLight position={[10, 20, 10]} intensity={isNight ? 0.5 : 1} castShadow />
        
        {/* Sky and environment */}
        {isNight ? (
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        ) : (
          <Sky sunPosition={[100, 100, 20]} />
        )}
        
        {/* School building */}
        <School currentFloor={currentFloor} />
        
        {/* Main player */}
        <Player userData={userData} />
        
        {/* Other players */}
        <OtherPlayers players={players} currentPlayerId={isConnected ? players[0]?.id : ''} />
      </Canvas>
      
      {/* UI overlay */}
      <div className="ui-container">
        <GameHUD userData={userData} />
        <VoiceChat isConnected={isConnected} />
      </div>
    </div>
  );
};

export default GameWorld;