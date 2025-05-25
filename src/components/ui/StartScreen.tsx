import React from 'react';
import { School, User, UserCog } from 'lucide-react';

interface StartScreenProps {
  onRoleSelect: (role: 'student' | 'teacher') => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onRoleSelect }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-indigo-500 to-blue-600 p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Virtual School 3D</h1>
        <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
          Explore a virtual school environment, interact with other users, and experience learning in a new dimension.
        </p>
      </div>

      <div className="card bg-white/90 backdrop-blur-sm max-w-4xl w-full p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-8">Choose Your Role</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button 
            className="flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-indigo-300"
            onClick={() => onRoleSelect('student')}
          >
            <div className="w-24 h-24 flex items-center justify-center bg-indigo-100 rounded-full mb-4">
              <User size={48} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-800">Student</h3>
            <p className="text-center text-gray-600 mt-4">
              Attend classes, participate in labs, and interact with teachers and other students.
            </p>
          </button>

          <button 
            className="flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-indigo-300"
            onClick={() => onRoleSelect('teacher')}
          >
            <div className="w-24 h-24 flex items-center justify-center bg-indigo-100 rounded-full mb-4">
              <UserCog size={48} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-800">Teacher</h3>
            <p className="text-center text-gray-600 mt-4">
              Conduct classes, guide students through labs, and create an interactive learning experience.
            </p>
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-white/80 flex items-center text-sm">
        <School size={16} className="mr-2" />
        <span>Virtual School 3D v0.1.0</span>
      </div>
    </div>
  );
};

export default StartScreen;