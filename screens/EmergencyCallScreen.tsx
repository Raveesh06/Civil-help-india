
import React, { useEffect, useState } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { PhoneOff, Phone, MicOff, Volume2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmergencyCallScreen: React.FC = () => {
  const { setScreen } = useApp();
  const [status, setStatus] = useState<'dialing' | 'ringing' | 'connected'>('dialing');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const dTimer = setTimeout(() => setStatus('ringing'), 2000);
    const cTimer = setTimeout(() => setStatus('connected'), 5000);
    return () => {
      clearTimeout(dTimer);
      clearTimeout(cTimer);
    };
  }, []);

  useEffect(() => {
    let interval: any;
    if (status === 'connected') {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-rose-600 z-[300] flex flex-col items-center justify-between p-12 text-white">
      <div className="flex flex-col items-center gap-6 mt-12 text-center">
        <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }}
           className="bg-white/20 px-6 py-2 rounded-full flex items-center gap-2 border border-white/30"
        >
          <ShieldAlert size={16} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Priority Emergency Channel</span>
        </motion.div>
        
        <div className="relative py-12">
          <AnimatePresence>
            {status === 'ringing' && (
              <motion.div 
                key="pulse"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 bg-white/40 rounded-full"
              />
            )}
          </AnimatePresence>
          <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center text-rose-600 shadow-2xl relative z-10">
            <Phone size={80} fill="currentColor" />
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tighter">Dialing 112</h2>
          <p className="text-rose-100 font-bold uppercase tracking-widest text-sm h-6">
            {status === 'dialing' ? 'Connecting to node...' : 
             status === 'ringing' ? 'Ringing Control Center...' : 
             `Call Connected: ${formatTime(timer)}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 w-full max-w-xs">
        <div className="flex flex-col items-center gap-2">
          <button className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all border border-white/20">
            <MicOff />
          </button>
          <span className="text-[10px] font-bold uppercase">Mute</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all border border-white/20">
            <Volume2 />
          </button>
          <span className="text-[10px] font-bold uppercase">Speaker</span>
        </div>
      </div>

      <button 
        onClick={() => setScreen(Screen.DASHBOARD)}
        className="w-24 h-24 bg-white text-rose-600 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all hover:bg-rose-50"
      >
        <PhoneOff size={40} />
      </button>

      <div className="text-center opacity-60">
        <p className="text-[9px] font-bold uppercase tracking-widest">Your location is being shared with emergency services</p>
      </div>
    </div>
  );
};

export default EmergencyCallScreen;
