
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { HelpCircle, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginScreen: React.FC = () => {
  const { setScreen, language, isElderlyMode, setElderlyMode, setUserPhone, setUserName, t } = useApp();
  const [phone, setPhone] = useState('');
  const [name, setNameInput] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10 && name.trim().length > 1) {
      setUserPhone(phone);
      setUserName(name);
      setScreen(Screen.OTP);
    }
  };

  const isFormValid = phone.length === 10 && name.trim().length > 1;

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-[#F8FBFF] max-w-md mx-auto relative overflow-hidden ${isElderlyMode ? 'elderly-mode' : ''}`}>
      {/* Soft Pastel Background Blobs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
      
      {/* Top Controls */}
      <div className="flex justify-end items-center mb-10 z-10">
        <button 
          onClick={() => setElderlyMode(!isElderlyMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all ${isElderlyMode ? 'bg-sky-500 text-white border-sky-600 shadow-md' : 'bg-white text-slate-400 border-sky-50'}`}
        >
          <Accessibility size={18} />
          {isElderlyMode ? (language === 'English' ? 'Standard' : 'साधारण') : (language === 'English' ? 'Elderly Mode' : 'बुजुर्ग मोड')}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="w-24 h-24 bg-sky-200 rounded-3xl mx-auto flex items-center justify-center text-white mb-6 shadow-[0_15px_35px_-5px_rgba(186,230,253,0.5)] relative p-2">
             <img 
               src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80" 
               alt="Gavel Logo" 
               className="w-full h-full object-cover rounded-2xl mix-blend-multiply brightness-110 opacity-95"
             />
             <div className="absolute inset-0 bg-sky-400/5 rounded-3xl pointer-events-none" />
          </div>
          <h1 className="text-3xl font-extrabold text-sky-900 mb-2">{t('appTitle')}</h1>
          <p className="text-sky-400 font-bold uppercase tracking-[0.2em] text-[10px]">{t('tagline')}</p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="bg-white p-6 rounded-[2rem] border border-sky-50 shadow-sm space-y-6">
            <div>
              <label className="block text-[10px] font-extrabold text-sky-300 mb-2 uppercase tracking-widest">
                {t('fullName')}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder={t('enterName')}
                  value={name}
                  onChange={(e) => setNameInput(e.target.value)}
                  className={`w-full bg-sky-50/50 border border-sky-50 rounded-xl py-4 px-4 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-bold text-sky-900 ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold text-sky-300 mb-2 uppercase tracking-widest">
                {t('phoneNum')}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300 font-bold">+91</span>
                <input 
                  type="tel"
                  placeholder="00000 00000"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className={`w-full bg-sky-50/50 border border-sky-50 rounded-xl py-4 pl-14 pr-4 focus:ring-2 focus:ring-sky-200 outline-none transition-all font-bold text-sky-900 ${isElderlyMode ? 'text-2xl' : 'text-xl'}`}
                />
              </div>
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all ${isFormValid ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-sky-100 text-sky-200 cursor-not-allowed'}`}
          >
            {t('loginWithOtp')}
          </motion.button>
        </form>

        <button 
          onClick={() => setShowHelp(true)}
          className="mt-8 flex items-center justify-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-widest hover:text-sky-600"
        >
          <HelpCircle size={18} />
          {t('assistance')}
        </button>
      </div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 bg-sky-900/20 z-50 flex items-end justify-center backdrop-blur-sm">
            <motion.div 
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="bg-white w-full max-w-md rounded-t-[3rem] p-10 shadow-2xl"
            >
              <h2 className="text-2xl font-extrabold text-sky-900 mb-4">{language === 'English' ? 'Remote Assistance' : 'रिमोट सहायता'}</h2>
              <p className="text-slate-400 mb-8 leading-relaxed font-medium">
                {language === 'English' ? "If you're facing trouble, our assistants can help you login over the phone." : "यदि आप परेशानी का सामना कर रहे हैं, तो हमारे सहायक आपको फोन पर लॉगिन करने में मदद कर सकते हैं।"}
              </p>
              <div className="space-y-3">
                <button onClick={() => alert('Dialing Helpline...')} className="w-full bg-sky-50 text-sky-700 p-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:bg-sky-100 transition-colors">
                  {language === 'English' ? 'Call Helpdesk' : 'हेल्पडेस्क को कॉल करें'}
                </button>
                <button onClick={() => setShowHelp(false)} className="w-full p-5 rounded-2xl font-bold text-slate-300 hover:text-slate-500">
                  {language === 'English' ? 'Dismiss' : 'हटाएं'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginScreen;
