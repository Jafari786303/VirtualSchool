import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { UserData } from '../../../types/types';
import { Group } from 'three';

interface AvatarPreviewProps {
  customization: UserData['avatarCustomization'];
  role: string;
}

const AvatarPreview: React.FC<AvatarPreviewProps> = ({ customization, role }) => {
  const groupRef = useRef<Group>(null);
  
  // Gentle rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Avatar model */}
      <group>
        {/* Head */}
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={customization.skinColor} />
        </mesh>
        
        {/* Hair */}
        {customization.hairStyle !== 4 && (
          <mesh position={[0, 1.75, 0]}>
            {customization.hairStyle === 0 && <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.3]} />}
            {customization.hairStyle === 1 && <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />}
            {customization.hairStyle === 2 && <sphereGeometry args={[0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />}
            {customization.hairStyle === 3 && (
              <group>
                {Array.from({ length: 8 }).map((_, i) => (
                  <mesh key={i} position={[
                    Math.sin(i * Math.PI / 4) * 0.3,
                    Math.random() * 0.1,
                    Math.cos(i * Math.PI / 4) * 0.3
                  ]}>
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial color={customization.hairColor} />
                  </mesh>
                ))}
              </group>
            )}
            <meshStandardMaterial color={customization.hairColor} />
          </mesh>
        )}
        
        {/* Body */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 1, 32]} />
          <meshStandardMaterial color={customization.topColor} />
        </mesh>
        
        {/* Teacher-specific details */}
        {role === 'teacher' && (
          <group>
            {/* Glasses */}
            <mesh position={[0, 1.5, 0.3]}>
              <boxGeometry args={[0.6, 0.1, 0.05]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            
            {/* Tie or accessory */}
            <mesh position={[0, 0.7, 0.4]}>
              <boxGeometry args={[0.1, 0.4, 0.05]} />
              <meshStandardMaterial color="#990000" />
            </mesh>
          </group>
        )}
        
        {/* Legs */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.4, 0.3, 1, 32]} />
          <meshStandardMaterial color={customization.bottomColor} />
        </mesh>
        
        {/* Left arm */}
        <mesh position={[-0.6, 0.5, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
          <meshStandardMaterial color={customization.topColor} />
        </mesh>
        
        {/* Right arm */}
        <mesh position={[0.6, 0.5, 0]} rotation={[0, 0, Math.PI * 0.1]}>
          <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
          <meshStandardMaterial color={customization.topColor} />
        </mesh>
      </group>
    </group>
  );
};

export default AvatarPreview;