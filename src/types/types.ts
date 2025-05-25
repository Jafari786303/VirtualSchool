// User Data Types
export interface UserData {
  role: string;
  name: string;
  avatarCustomization: {
    hairStyle: number;
    hairColor: string;
    skinColor: string;
    topColor: string;
    bottomColor: string;
  };
}

// Player Data Types
export interface PlayerPosition {
  x: number;
  y: number;
  z: number;
}

export interface PlayerRotation {
  x: number;
  y: number;
  z: number;
}

export interface PlayerState {
  id: string;
  name: string;
  role: string;
  position: PlayerPosition;
  rotation: PlayerRotation;
  avatarCustomization: UserData['avatarCustomization'];
  isSpeaking: boolean;
}

// Game Environment Types
export interface RoomData {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'canteen' | 'other';
  floor: number;
  position: {
    x: number;
    z: number;
  };
  size: {
    width: number;
    length: number;
  };
}

// Networking Types
export interface NetworkMessage {
  type: 'playerJoin' | 'playerLeave' | 'playerUpdate' | 'voiceStart' | 'voiceEnd';
  data: any;
}