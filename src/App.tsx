import { useState } from 'react';
import { StudentRegistrationForm } from './components/StudentRegistrationForm';
import { ViewStudents } from './components/ViewStudents';
import { UpdateStudent } from './components/UpdateStudent';
import { Button } from './components/ui/button';
import { UserPlus, Users, RefreshCw } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'register' | 'view' | 'update'>('register');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F6A500 0%, #FF8C42 50%, #FF6B35 100%)' }}>
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-200/10 rounded-full blur-3xl"></div>
      
      {/* Navigation Toggle */}
      <div className="mb-6 flex gap-3 relative z-10 flex-wrap justify-center">
        <Button
          onClick={() => setCurrentView('register')}
          className={`${
            currentView === 'register'
              ? 'bg-white text-orange-600 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          } rounded-xl transition-all duration-300 backdrop-blur-sm border-2 border-white/30`}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Register Student
        </Button>
        <Button
          onClick={() => setCurrentView('view')}
          className={`${
            currentView === 'view'
              ? 'bg-white text-orange-600 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          } rounded-xl transition-all duration-300 backdrop-blur-sm border-2 border-white/30`}
        >
          <Users className="w-4 h-4 mr-2" />
          View Students
        </Button>
        <Button
          onClick={() => setCurrentView('update')}
          className={`${
            currentView === 'update'
              ? 'bg-white text-orange-600 shadow-lg'
              : 'bg-white/20 text-white hover:bg-white/30'
          } rounded-xl transition-all duration-300 backdrop-blur-sm border-2 border-white/30`}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Update Email
        </Button>
      </div>

      {/* Content */}
      {currentView === 'register' && <StudentRegistrationForm />}
      {currentView === 'view' && <ViewStudents />}
      {currentView === 'update' && <UpdateStudent />}
    </div>
  );
}