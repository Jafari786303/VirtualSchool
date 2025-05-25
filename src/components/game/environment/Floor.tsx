import React from 'react';
import Room from './Room';
import { RoomData } from '../../../types/types';

interface FloorProps {
  floorNumber: number;
  rooms: RoomData[];
  position: [number, number, number];
}

const Floor: React.FC<FloorProps> = ({ floorNumber, rooms, position }) => {
  // Get floor color based on floor number
  const getFloorColor = () => {
    switch (floorNumber) {
      case 0: return '#E8E8E8'; // Ground floor - light gray
      case 1: return '#D0E8FF'; // First floor - light blue
      case 2: return '#D0FFD0'; // Second floor - light green
      case 3: return '#FFE8D0'; // Third floor - light orange
      default: return '#FFFFFF';
    }
  };
  
  return (
    <group position={position}>
      {/* Floor base */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[100, 0.2, 100]} />
        <meshStandardMaterial color={getFloorColor()} />
      </mesh>
      
      {/* Floor number indicator */}
      <mesh position={[-45, 0.5, -45]} rotation={[-Math.PI / 2, 0, 0]}>
        <textGeometry args={[`Floor ${floorNumber}`, { size: 2, height: 0.1 }]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Render each room */}
      {rooms.map(room => (
        <Room key={room.id} room={room} />
      ))}
      
      {/* Corridors/hallways */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 100]} />
        <meshStandardMaterial color="#CCCCCC" />
      </mesh>
      
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[100, 0.1, 10]} />
        <meshStandardMaterial color="#CCCCCC" />
      </mesh>
    </group>
  );
};

export default Floor;