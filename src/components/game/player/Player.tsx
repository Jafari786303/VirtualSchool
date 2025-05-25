import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '../../../hooks/useKeyboardControls';
import { UserData } from '../../../types/types';
import { useGameStore } from '../../../stores/gameStore';
import AvatarModel from './AvatarModel';
import { Vector3, Group } from 'three';

interface PlayerProps {
  userData: UserData;
}

const Player: React.FC<PlayerProps> = ({ userData }) => {
  const playerRef = useRef<Group>(null);
  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight, jump } = useKeyboardControls();
  const { updatePlayerPosition, players } = useGameStore();
  
  const velocity = useRef(new Vector3());
  const position = useRef(new Vector3(0, 0, 10)); // Start position
  const rotation = useRef(new Vector3());
  const speed = 0.1;
  const currentPlayerId = players[0]?.id;
  
  // Set up camera to follow player
  useEffect(() => {
    if (playerRef.current) {
      camera.position.set(0, 2, 5); // Position behind player
      camera.lookAt(0, 1, 0); // Look at player
    }
  }, [camera]);
  
  useFrame(() => {
    if (!playerRef.current || !currentPlayerId) return;
    
    // Calculate movement direction
    velocity.current.set(0, 0, 0);
    
    if (moveForward) velocity.current.z -= speed;
    if (moveBackward) velocity.current.z += speed;
    if (moveLeft) velocity.current.x -= speed;
    if (moveRight) velocity.current.x += speed;
    if (jump) velocity.current.y += speed * 2;
    
    // Apply gravity
    velocity.current.y -= 0.01;
    
    // Update position
    position.current.add(velocity.current);
    
    // Simple ground collision
    if (position.current.y < 0) {
      position.current.y = 0;
      velocity.current.y = 0;
    }
    
    // Apply position to player
    playerRef.current.position.copy(position.current);
    
    // Calculate forward direction for rotation
    if (velocity.current.x !== 0 || velocity.current.z !== 0) {
      rotation.current.y = Math.atan2(velocity.current.x, velocity.current.z);
      playerRef.current.rotation.y = rotation.current.y;
    }
    
    // Update camera to follow player
    camera.position.x = position.current.x;
    camera.position.z = position.current.z + 5;
    camera.lookAt(position.current.x, position.current.y + 1, position.current.z);
    
    // Update player state in store
    updatePlayerPosition(
      currentPlayerId,
      { 
        x: position.current.x, 
        y: position.current.y, 
        z: position.current.z 
      },
      { 
        x: 0, 
        y: rotation.current.y, 
        z: 0 
      }
    );
  });
  
  return (
    <group ref={playerRef}>
      <AvatarModel 
        customization={userData.avatarCustomization} 
        role={userData.role} 
      />
    </group>
  );
};

export default Player;