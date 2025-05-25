import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Palette, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import AvatarPreview from '../game/avatar/AvatarPreview';
import { UserData } from '../../types/types';

interface CharacterCustomizationProps {
  role: 'student' | 'teacher';
  onComplete: (name: string, avatarCustomization: UserData['avatarCustomization']) => void;
}

const CharacterCustomization: React.FC<CharacterCustomizationProps> = ({ role, onComplete }) => {
  const [name, setName] = useState('');
  const [customization, setCustomization] = useState<UserData['avatarCustomization']>({
    hairStyle: 0,
    hairColor: '#000000',
    skinColor: '#f5d0c5',
    topColor: role === 'teacher' ? '#2563eb' : '#3b82f6',
    bottomColor: role === 'teacher' ? '#1e40af' : '#1d4ed8',
  });
  
  const [hairStyles] = useState(['Short', 'Medium', 'Long', 'Curly', 'Bald']);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleColorChange = (property: keyof UserData['avatarCustomization'], value: string) => {
    setCustomization(prev => ({ ...prev, [property]: value }));
  };

  const handleHairStyleChange = (direction: 'prev' | 'next') => {
    setCustomization(prev => {
      const totalStyles = hairStyles.length;
      let newStyle = prev.hairStyle;
      
      if (direction === 'next') {
        newStyle = (newStyle + 1) % totalStyles;
      } else {
        newStyle = (newStyle - 1 + totalStyles) % totalStyles;
      }
      
      return { ...prev, hairStyle: newStyle };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name, customization);
    }
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row">
      {/* Avatar Preview */}
      <div className="h-1/2 md:h-full md:w-1/2 bg-gradient-to-b from-indigo-500 to-blue-600 relative">
        <Canvas className="h-full w-full">
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AvatarPreview customization={customization} role={role} />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/4} maxPolarAngle={Math.PI/2} />
        </Canvas>
      </div>
      
      {/* Customization Form */}
      <div className="h-1/2 md:h-full md:w-1/2 bg-white p-6 md:p-12 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6">Customize Your Character</h2>
          <p className="text-gray-600 mb-8">You are a <span className="font-semibold text-indigo-600">{role}</span>. Customize your avatar and provide your name.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={handleNameChange} 
                className="input-field" 
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Hair Style</label>
              <div className="flex items-center">
                <button 
                  type="button" 
                  className="p-2 bg-gray-200 rounded-l-lg hover:bg-gray-300"
                  onClick={() => handleHairStyleChange('prev')}
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex-1 text-center py-2 bg-gray-100">
                  {hairStyles[customization.hairStyle]}
                </div>
                <button 
                  type="button" 
                  className="p-2 bg-gray-200 rounded-r-lg hover:bg-gray-300"
                  onClick={() => handleHairStyleChange('next')}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hair Color</label>
                <div className="flex items-center">
                  <Palette size={20} className="mr-2 text-gray-500" />
                  <input 
                    type="color" 
                    value={customization.hairColor} 
                    onChange={(e) => handleColorChange('hairColor', e.target.value)} 
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skin Tone</label>
                <div className="flex items-center">
                  <Palette size={20} className="mr-2 text-gray-500" />
                  <input 
                    type="color" 
                    value={customization.skinColor} 
                    onChange={(e) => handleColorChange('skinColor', e.target.value)} 
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Top Color</label>
                <div className="flex items-center">
                  <Palette size={20} className="mr-2 text-gray-500" />
                  <input 
                    type="color" 
                    value={customization.topColor} 
                    onChange={(e) => handleColorChange('topColor', e.target.value)} 
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bottom Color</label>
                <div className="flex items-center">
                  <Palette size={20} className="mr-2 text-gray-500" />
                  <input 
                    type="color" 
                    value={customization.bottomColor} 
                    onChange={(e) => handleColorChange('bottomColor', e.target.value)} 
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <button type="submit" className="w-full btn btn-primary flex items-center justify-center">
              <Save size={20} className="mr-2" />
              Enter Virtual School
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CharacterCustomization;