import { create } from 'zustand';
import { PlayerState, PlayerPosition, PlayerRotation } from '../types/types';

interface GameState {
  // School environment
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  
  // Players
  players: PlayerState[];
  addPlayer: (player: PlayerState) => void;
  removePlayer: (playerId: string) => void;
  updatePlayerPosition: (playerId: string, position: PlayerPosition, rotation: PlayerRotation) => void;
  setPlayerSpeaking: (playerId: string, isSpeaking: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  // School environment
  currentFloor: 0,
  setCurrentFloor: (floor) => set({ currentFloor: floor }),
  
  // Players
  players: [],
  addPlayer: (player) => set((state) => ({
    players: [...state.players, player]
  })),
  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(player => player.id !== playerId)
  })),
  updatePlayerPosition: (playerId, position, rotation) => set((state) => ({
    players: state.players.map(player => 
      player.id === playerId 
        ? { ...player, position, rotation } 
        : player
    )
  })),
  setPlayerSpeaking: (playerId, isSpeaking) => set((state) => ({
    players: state.players.map(player =>
      player.id === playerId
        ? { ...player, isSpeaking }
        : player
    )
  }))
}));