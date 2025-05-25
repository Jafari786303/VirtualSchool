import React from 'react';
import Floor from './Floor';
import { RoomData } from '../../../types/types';

interface SchoolProps {
  currentFloor: number;
}

// Define rooms for the school
const schoolRooms: RoomData[] = [
  // Ground Floor (Floor 0)
  { id: 'entrance', name: 'Entrance Hall', type: 'other', floor: 0, position: { x: 0, z: 0 }, size: { width: 20, length: 20 } },
  { id: 'canteen', name: 'Canteen', type: 'canteen', floor: 0, position: { x: 25, z: 0 }, size: { width: 30, length: 20 } },
  { id: 'admin', name: 'Administration', type: 'other', floor: 0, position: { x: -25, z: 0 }, size: { width: 20, length: 15 } },
  
  // First Floor (Floor 1)
  { id: 'class1', name: 'Class 1', type: 'classroom', floor: 1, position: { x: -20, z: -15 }, size: { width: 15, length: 12 } },
  { id: 'class2', name: 'Class 2', type: 'classroom', floor: 1, position: { x: 0, z: -15 }, size: { width: 15, length: 12 } },
  { id: 'class3', name: 'Class 3', type: 'classroom', floor: 1, position: { x: 20, z: -15 }, size: { width: 15, length: 12 } },
  { id: 'class4', name: 'Class 4', type: 'classroom', floor: 1, position: { x: -20, z: 15 }, size: { width: 15, length: 12 } },
  { id: 'class5', name: 'Class 5', type: 'classroom', floor: 1, position: { x: 0, z: 15 }, size: { width: 15, length: 12 } },
  { id: 'class6', name: 'Class 6', type: 'classroom', floor: 1, position: { x: 20, z: 15 }, size: { width: 15, length: 12 } },
  
  // Second Floor (Floor 2)
  { id: 'class7', name: 'Class 7', type: 'classroom', floor: 2, position: { x: -20, z: -15 }, size: { width: 15, length: 12 } },
  { id: 'class8', name: 'Class 8', type: 'classroom', floor: 2, position: { x: 0, z: -15 }, size: { width: 15, length: 12 } },
  { id: 'class9', name: 'Class 9', type: 'classroom', floor: 2, position: { x: 20, z: -15 }, size: { width: 15, length: 12 } },
  { id: 'class10', name: 'Class 10', type: 'classroom', floor: 2, position: { x: -20, z: 15 }, size: { width: 15, length: 12 } },
  { id: 'library', name: 'Library', type: 'other', floor: 2, position: { x: 10, z: 15 }, size: { width: 25, length: 20 } },
  
  // Third Floor (Floor 3)
  { id: 'complab', name: 'Computer Lab', type: 'lab', floor: 3, position: { x: -20, z: -15 }, size: { width: 25, length: 20 } },
  { id: 'biolab', name: 'Biology Lab', type: 'lab', floor: 3, position: { x: 20, z: -15 }, size: { width: 25, length: 20 } },
  { id: 'chemlab', name: 'Chemistry Lab', type: 'lab', floor: 3, position: { x: -20, z: 15 }, size: { width: 25, length: 20 } },
  { id: 'physlab', name: 'Physics Lab', type: 'lab', floor: 3, position: { x: 20, z: 15 }, size: { width: 25, length: 20 } },
];

const School: React.FC<SchoolProps> = ({ currentFloor }) => {
  // Filter rooms for current floor
  const floorRooms = schoolRooms.filter(room => room.floor === currentFloor);
  
  return (
    <group>
      {/* Base building structure */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[100, 1, 100]} />
        <meshStandardMaterial color="#8B8682" />
      </mesh>
      
      {/* Current floor */}
      <Floor 
        floorNumber={currentFloor} 
        rooms={floorRooms} 
        position={[0, 0, 0]} 
      />
      
      {/* Stairs/elevators to connect floors */}
      <group position={[0, 0, 0]}>
        {/* Central staircase */}
        <mesh position={[0, 0.5, 40]} castShadow receiveShadow>
          <boxGeometry args={[10, 1, 5]} />
          <meshStandardMaterial color="#A9A9A9" />
        </mesh>
        
        {/* Staircase label */}
        <mesh position={[0, 1, 40]}>
          <textGeometry args={['STAIRS', { size: 0.5, height: 0.1 }]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </group>
  );
};

export default School;