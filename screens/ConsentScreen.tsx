
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { Bell, Camera, Mic, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ConsentScreen: React.FC = () => {
  const { setScreen, isElderlyMode } = useApp();
  
  const [permissions, setPermissions] = useState({
    notifications: true,
    camera: true,
    microphone: true,
    location: true
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    setScreen(Screen.DASHBOARD);
  };

  const permissionItems = [
    { 
      key: 'notifications', 
      label: 'Enable Notifications', 
      desc: 'Get real-time updates on your filed complaints.', 
      icon: <Bell className="text-sky-500" /> 
    },
    { 
      key: 'camera', 
      label: 'Allow Camera Access', 
      desc: 'Take photos of documents to upload to your vault.', 
      icon: <Camera className="text-emerald-500" /> 
    },
    { 
      key: 'microphone', 
      label: 'Allow Microphone', 
      desc: 'Record voice complaints with Speak & File feature.', 
      icon: <Mic className="text-amber-500" /> 
    },
    { 
      key: 'location', 
      label: 'Access Location', 
      desc: 'Find nearby assistance centers and tag your issues.', 
      icon: <MapPin className="text-rose-500" /> 
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-[#F0F7FF] max-w-md mx-auto ${isElderlyMode ? 'elderly-mode' : ''}`}>
      <div className="flex-1 flex flex-col pt-10">
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center text-sky-500 mb-6 shadow-sm border border-sky-50">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-sky-900 mb-2">Permissions</h1>
          <p className="text-slate-500 font-medium">Allow access to help us serve you better</p>
        </div>

        <div className="space-y-4 mb-10">
          {permissionItems.map((item) => (
            <button
              key={item.key}
              onClick={() => togglePermission(item.key as any)}
              className={`w-full flex items-center gap-4 p-5 rounded-[2rem] border transition-all text-left ${
                permissions[item.key as keyof typeof permissions] 
                  ? 'bg-white border-sky-100 shadow-sm' 
                  : 'bg-slate-50 border-slate-100 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                permissions[item.key as keyof typeof permissions] ? 'bg-sky-50' : 'bg-white'
              }`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sky-900 text-sm">{item.label}</h4>
                <p className="text-[10px] text-slate-400 font-medium leading-tight mt-1">{item.desc}</p>
              </div>
              <div className={`w-12 h-6 rounded-full relative transition-colors ${
                permissions[item.key as keyof typeof permissions] ? 'bg-sky-500' : 'bg-slate-300'
              }`}>
                <motion.div 
                  className="absolute top-1 w-4 h-4 bg-white rounded-full"
                  animate={{ left: permissions[item.key as keyof typeof permissions] ? '1.75rem' : '0.25rem' }}
                />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest px-4">
            You can change these later in your profile settings.
          </p>
          <button 
            onClick={handleContinue}
            className="w-full bg-sky-500 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-sky-600 transition-all flex items-center justify-center gap-2"
          >
            Continue to Dashboard <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentScreen;
