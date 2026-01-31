
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { Shield, Fingerprint, Lock, Key, EyeOff, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SecurityScreen: React.FC = () => {
  const { isElderlyMode } = useApp();
  
  const [toggles, setToggles] = useState({
    biometrics: true,
    twoFactor: false,
    appLock: true,
    incognito: false
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const securityItems = [
    { key: 'biometrics', label: 'Biometric Access', icon: <Fingerprint />, desc: 'Use fingerprint or face to open the app.', color: 'bg-sky-50', iconColor: 'text-sky-500' },
    { key: 'twoFactor', label: 'Two-Factor Auth', icon: <Key />, desc: 'Additional OTP for sensitive actions.', color: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { key: 'appLock', label: 'Auto App Lock', icon: <Lock />, desc: 'Lock app after 5 minutes of inactivity.', color: 'bg-amber-50', iconColor: 'text-amber-500' },
    { key: 'incognito', label: 'Privacy Mode', icon: <EyeOff />, desc: 'Hide sensitive values in dashboard.', color: 'bg-violet-50', iconColor: 'text-violet-500' }
  ];

  return (
    <Layout title="Security & Privacy" showBack>
      <div className="space-y-8">
        <div className="bg-sky-900 p-8 rounded-[2.5rem] text-white flex items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl -mr-6 -mt-6" />
          <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md">
            <ShieldCheck size={40} className="text-sky-300" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold">Security Level: High</h2>
            <p className="text-sky-200 text-xs font-bold uppercase tracking-widest mt-1">Verified with Aadhaar</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {securityItems.map((item) => (
            <motion.div 
              key={item.key}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(item.key as any)}
              className="bg-white border border-sky-50 p-6 rounded-[2rem] flex items-center justify-between shadow-sm cursor-pointer hover:border-sky-200 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className={`${item.color} ${item.iconColor} p-4 rounded-2xl shadow-inner`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sky-900">{item.label}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-1">{item.desc}</p>
                </div>
              </div>
              <div className={`w-14 h-7 rounded-full relative transition-colors p-1 ${toggles[item.key as keyof typeof toggles] ? 'bg-sky-500' : 'bg-slate-200'}`}>
                <motion.div 
                  className="w-5 h-5 bg-white rounded-full shadow-sm"
                  animate={{ x: toggles[item.key as keyof typeof toggles] ? 28 : 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white border border-sky-50 p-8 rounded-[2.5rem] space-y-4">
          <h3 className="font-extrabold text-sky-900 text-sm uppercase tracking-widest">Account Activities</h3>
          <div className="space-y-4">
            <ActivityItem label="Login detected" date="Today, 10:20 AM" location="Mumbai, MH" />
            <ActivityItem label="Password changed" date="14 Jan 2024" location="Web Portal" />
          </div>
        </div>

        <button className="w-full py-5 rounded-2xl font-bold text-rose-500 bg-rose-50 hover:bg-rose-100 transition-all active:scale-95">
          Request Data Export
        </button>
      </div>
    </Layout>
  );
};

const ActivityItem = ({ label, date, location }: any) => (
  <div className="flex items-center justify-between py-2 border-b border-sky-50 last:border-0">
    <div>
      <p className="font-bold text-sky-900 text-sm">{label}</p>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{location}</p>
    </div>
    <p className="text-[10px] text-sky-300 font-bold uppercase">{date}</p>
  </div>
);

export default SecurityScreen;
