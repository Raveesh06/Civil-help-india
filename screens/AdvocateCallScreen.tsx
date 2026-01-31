
import React, { useEffect, useState } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { PhoneOff, MicOff, Volume2, User, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const AdvocateCallScreen: React.FC = () => {
  const { selectedAdvocate, setScreen } = useApp();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-sky-900 z-[200] flex flex-col items-center justify-between p-12 text-white">
      <div className="flex flex-col items-center gap-6 mt-12 text-center">
        <p className="text-sky-300 font-bold uppercase tracking-[0.3em] text-xs">Secure Calling</p>
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center text-white/50 border-2 border-white/20"
        >
          <User size={64} />
        </motion.div>
        <div>
          <h2 className="text-3xl font-extrabold">{selectedAdvocate?.name || 'Advocate'}</h2>
          <p className="text-sky-300 mt-2 font-bold tracking-widest">{formatTime(timer)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-12">
        <CallAction icon={<MicOff />} label="Mute" />
        <CallAction icon={<Volume2 />} label="Speaker" />
        <CallAction icon={<MoreHorizontal />} label="More" />
      </div>

      <button 
        onClick={() => setScreen(Screen.HIRE_ADVOCATE)}
        className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all"
      >
        <PhoneOff size={32} />
      </button>
    </div>
  );
};

const CallAction = ({ icon, label }: any) => (
  <div className="flex flex-col items-center gap-2">
    <button className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all">
      {icon}
    </button>
    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">{label}</span>
  </div>
);

export default AdvocateCallScreen;
