import React from 'react';
import { RoomData } from '../../../types/types';

interface RoomProps {
  room: RoomData;
}

const Room: React.FC<RoomProps> = ({ room }) => {
  // Determine room color based on type
  const getRoomColor = () => {
    switch (room.type) {
      case 'classroom': return '#B3E5FC'; // Light blue for classrooms
      case 'lab': return '#C8E6C9'; // Light green for labs
      case 'canteen': return '#FFECB3'; // Light yellow for canteen
      default: return '#E1BEE7'; // Light purple for other rooms
    }
  };
  
  // Determine floor height based on floor number
  const floorHeight = room.floor * 4; // 4 units per floor
  
  return (
    <group position={[room.position.x, 0.5, room.position.z]}>
      {/* Room floor */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[room.size.width, 0.1, room.size.length]} />
        <meshStandardMaterial color={getRoomColor()} />
      </mesh>
      
      {/* Room walls */}
      {/* Front wall with door */}
      <mesh position={[0, 2, room.size.length / 2]} castShadow>
        <boxGeometry args={[room.size.width, 4, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, 1, room.size.length / 2 + 0.1]} castShadow>
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
      
      {/* Back wall */}
      <mesh position={[0, 2, -room.size.length / 2]} castShadow>
        <boxGeometry args={[room.size.width, 4, 0.2]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Left wall */}
      <mesh position={[-room.size.width / 2, 2, 0]} castShadow>
        <boxGeometry args={[0.2, 4, room.size.length]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Right wall */}
      <mesh position={[room.size.width / 2, 2, 0]} castShadow>
        <boxGeometry args={[0.2, 4, room.size.length]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Room name */}
      <mesh position={[0, 4.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <textGeometry args={[room.name, { size: 1, height: 0.1 }]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Room-specific furniture/objects */}
      {room.type === 'classroom' && (
        <group>
          {/* Teacher's desk */}
          <mesh position={[0, 0.5, -room.size.length / 2 + 2]} castShadow>
            <boxGeometry args={[3, 1, 1.5]} />
            <meshStandardMaterial color="#795548" />
          </mesh>
          
          {/* Student desks - rows */}
          {Array.from({ length: 3 }).map((_, rowIndex) => (
            <group key={`row-${rowIndex}`} position={[0, 0, -room.size.length / 4 + rowIndex * 4]}>
              {/* Student desks - columns */}
              {Array.from({ length: 2 }).map((_, colIndex) => (
                <mesh 
                  key={`desk-${rowIndex}-${colIndex}`} 
                  position={[(colIndex === 0 ? -3 : 3), 0.4, 0]} 
                  castShadow
                >
                  <boxGeometry args={[2, 0.8, 1.5]} />
                  <meshStandardMaterial color="#A1887F" />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      )}
      
      {room.type === 'lab' && (
        <group>
          {/* Lab equipment */}
          {Array.from({ length: 4 }).map((_, index) => (
            <mesh 
              key={`equipment-${index}`} 
              position={[
                (index % 2 === 0 ? -room.size.width / 4 : room.size.width / 4), 
                0.5, 
                (index < 2 ? -room.size.length / 4 : room.size.length / 4)
              ]} 
              castShadow
            >
              <boxGeometry args={[room.size.width / 3, 1, room.size.length / 3]} />
              <meshStandardMaterial color="#90A4AE" />
            </mesh>
          ))}
        </group>
      )}
      
      {room.type === 'canteen' && (
        <group>
          {/* Tables */}
          {Array.from({ length: 6 }).map((_, index) => (
            <mesh 
              key={`table-${index}`} 
              position={[
                ((index % 3) - 1) * room.size.width / 3, 
                0.5, 
                (index < 3 ? -room.size.length / 4 : room.size.length / 4)
              ]} 
              castShadow
            >
              <cylinderGeometry args={[2, 2, 1, 16]} />
              <meshStandardMaterial color="#D7CCC8" />
            </mesh>
          ))}
          
          {/* Food counter */}
          <mesh 
            position={[0, 0.5, -room.size.length / 2 + 3]} 
            castShadow
          >
            <boxGeometry args={[room.size.width - 4, 1, 2]} />
            <meshStandardMaterial color="#BCAAA4" />
          </mesh>
        </group>
      )}
    </group>
  );
};

export default Room;