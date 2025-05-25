import React from 'react';
import AvatarModel from './AvatarModel';
import { PlayerState } from '../../../types/types';

interface OtherPlayersProps {
  players: PlayerState[];
  currentPlayerId: string;
}

const OtherPlayers: React.FC<OtherPlayersProps> = ({ players, currentPlayerId }) => {
  // Filter out current player
  const otherPlayers = players.filter(player => player.id !== currentPlayerId);
  
  return (
    <group>
      {otherPlayers.map(player => (
        <group 
          key={player.id} 
          position={[player.position.x, player.position.y, player.position.z]}
          rotation={[player.rotation.x, player.rotation.y, player.rotation.z]}
        >
          <AvatarModel 
            customization={player.avatarCustomization}
            role={player.role}
            isSpeaking={player.isSpeaking}
          />
          
          {/* Player nametag */}
          <mesh position={[0, 2.5, 0]}>
            <textGeometry args={[player.name, { size: 0.2, height: 0.05 }]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default OtherPlayers;