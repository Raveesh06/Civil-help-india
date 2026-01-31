
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { HelpCircle, Accessibility } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME, THEME_CLASSES } from '../theme';

const LoginScreen: React.FC = () => {
  const { setScreen, language, isElderlyMode, setElderlyMode, setUserPhone, setUserName, setUserEmail, t } = useApp();
  const [phone, setPhone] = useState('');
  const [name, setNameInput] = useState('');
  const [email, setEmail] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10 && name.trim().length > 1 && email && validateEmail(email)) {
      setUserPhone(phone);
      setUserName(name);
      setUserEmail(email);
      setScreen(Screen.OTP);
    }
  };

  const isFormValid = phone.length === 10 && name.trim().length > 1 && email && validateEmail(email) && !emailError;

  return (
    <div className={`min-h-screen flex flex-col p-6 max-w-md mx-auto relative overflow-hidden ${isElderlyMode ? 'elderly-mode' : ''}`}
      style={{ backgroundColor: '#F8FBFF' }}>
      {/* Soft Pastel Background Blobs */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-60 pointer-events-none" 
        style={{ backgroundColor: `${THEME.primary.lighter}80` }} />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-60 pointer-events-none" 
        style={{ backgroundColor: `${THEME.success.lighter}4d` }} />
      
      {/* Top Controls */}
      <div className="flex justify-end items-center mb-10 z-10">
        <button 
          onClick={() => setElderlyMode(!isElderlyMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold border transition-all`}
          style={{
            backgroundColor: isElderlyMode ? THEME.primary.light : 'white',
            color: isElderlyMode ? 'white' : THEME.neutral.text.light,
            borderColor: isElderlyMode ? THEME.primary.dark : THEME.primary.lighter
          }}
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
          <div className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-white mb-6 shadow-[0_15px_35px_-5px_rgba(186,230,253,0.5)] relative p-2"
            style={{ backgroundColor: THEME.primary.lighter }}>
             <img 
               src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&h=256&q=80" 
               alt="Gavel Logo" 
               className="w-full h-full object-cover rounded-2xl mix-blend-multiply brightness-110 opacity-95"
             />
             <div className="absolute inset-0 rounded-3xl pointer-events-none" 
               style={{ backgroundColor: `${THEME.primary.light}0f` }} />
          </div>
          <h1 className="text-3xl font-extrabold mb-2"
            style={{ color: THEME.primary.darker }}>
            {t('appTitle')}
          </h1>
          <p className="font-bold uppercase tracking-[0.2em] text-[10px]"
            style={{ color: THEME.primary.light }}>
            {t('tagline')}
          </p>
        </motion.div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="p-6 rounded-[2rem] border shadow-sm space-y-6"
            style={{ 
              backgroundColor: 'white',
              borderColor: THEME.primary.lighter
            }}>
            <div>
              <label className="block text-[10px] font-extrabold mb-2 uppercase tracking-widest"
                style={{ color: THEME.primary.light }}>
                {t('fullName')}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder={t('enterName')}
                  value={name}
                  onChange={(e) => setNameInput(e.target.value)}
                  className={`w-full border rounded-xl py-4 px-4 focus:ring-2 outline-none transition-all font-bold ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}
                  style={{ 
                    backgroundColor: THEME.primary.lighter,
                    borderColor: THEME.primary.light,
                    color: THEME.primary.darker,
                    focusRing: THEME.primary.light
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold mb-2 uppercase tracking-widest"
                style={{ color: THEME.primary.light }}>
                {language === 'English' ? 'Email Address' : 'ईमेल पता'}
              </label>
              <div className="relative">
                <input 
                  type="email"
                  placeholder={language === 'English' ? 'you@example.com' : 'आप@उदाहरण.com'}
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full border rounded-xl py-4 px-4 focus:ring-2 outline-none transition-all font-bold ${isElderlyMode ? 'text-2xl' : 'text-lg'}`}
                  style={{ 
                    backgroundColor: THEME.primary.lighter,
                    borderColor: emailError ? THEME.danger.light : THEME.primary.light,
                    color: THEME.primary.darker
                  }}
                />
              </div>
              {emailError && <p className="text-xs font-bold mt-1"
                style={{ color: THEME.danger.light }}>
                {emailError}
              </p>}
            </div>

            <div>
              <label className="block text-[10px] font-extrabold mb-2 uppercase tracking-widest"
                style={{ color: THEME.primary.light }}>
                {t('phoneNum')}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold"
                  style={{ color: THEME.primary.light }}>
                  +91
                </span>
                <input 
                  type="tel"
                  placeholder="00000 00000"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className={`w-full border rounded-xl py-4 pl-14 pr-4 focus:ring-2 outline-none transition-all font-bold ${isElderlyMode ? 'text-2xl' : 'text-xl'}`}
                  style={{ 
                    backgroundColor: THEME.primary.lighter,
                    borderColor: THEME.primary.light,
                    color: THEME.primary.darker
                  }}
                />
              </div>
            </div>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all`}
            style={{
              backgroundColor: isFormValid ? THEME.primary.light : THEME.primary.lighter,
              color: isFormValid ? 'white' : THEME.primary.light,
              cursor: isFormValid ? 'pointer' : 'not-allowed'
            }}
          >
            {t('loginWithOtp')}
          </motion.button>
        </form>

        <button 
          onClick={() => setShowHelp(true)}
          className="mt-8 flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest"
          style={{ color: THEME.primary.light }}
        >
          <HelpCircle size={18} />
          {t('assistance')}
        </button>
      </div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-end justify-center backdrop-blur-sm"
            style={{ backgroundColor: `${THEME.primary.darker}33` }}>
            <motion.div 
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              className="w-full max-w-md rounded-t-[3rem] p-10 shadow-2xl"
              style={{ backgroundColor: 'white' }}
            >
              <h2 className="text-2xl font-extrabold mb-4"
                style={{ color: THEME.primary.darker }}>
                {language === 'English' ? 'Remote Assistance' : 'रिमोट सहायता'}
              </h2>
              <p className="mb-8 leading-relaxed font-medium"
                style={{ color: THEME.neutral.text.secondary }}>
                {language === 'English' ? "If you're facing trouble, our assistants can help you login over the phone." : "यदि आप परेशानी का सामना कर रहे हैं, तो हमारे सहायक आपको फोन पर लॉगिन करने में मदद कर सकते हैं।"}
              </p>
              <div className="space-y-3">
                <button onClick={() => alert('Dialing Helpline...')} className="w-full p-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-colors"
                  style={{ 
                    backgroundColor: THEME.primary.lighter,
                    color: THEME.primary.dark
                  }}>
                  {language === 'English' ? 'Call Helpdesk' : 'हेल्पडेस्क को कॉल करें'}
                </button>
                <button onClick={() => setShowHelp(false)} className="w-full p-5 rounded-2xl font-bold"
                  style={{ color: THEME.neutral.text.light }}>
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
