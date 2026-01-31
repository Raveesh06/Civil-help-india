
import React, { useRef, useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { User, Bell, Shield, LogOut, Accessibility, ChevronRight, Camera, Mail, Edit3, Check, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileScreen: React.FC = () => {
  const { currentScreen, t } = useApp();

  if (currentScreen === Screen.EDIT_PROFILE) return <EditProfile />;

  const { userPhone, isElderlyMode, setElderlyMode, setScreen, userName, userAvatar, userEmail } = useApp();

  const settings = [
    { label: t('elderlyMode'), sub: isElderlyMode ? t('active') : t('disabled'), icon: <Accessibility size={20} />, toggle: true, checked: isElderlyMode, action: () => setElderlyMode(!isElderlyMode) },
    { label: t('notifSettings'), sub: 'Enabled', icon: <Bell size={20} />, action: () => {} },
    { label: t('securityPrivacy'), sub: 'High protection', icon: <Shield size={20} />, action: () => setScreen(Screen.SECURITY_SETTINGS) }
  ];

  return (
    <Layout title={t('profile')}>
      <div className="space-y-6">
        {/* User Card */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-[2.5rem] text-center shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-sky-50 dark:bg-sky-900/10" />
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white dark:bg-slate-700 rounded-full mx-auto flex items-center justify-center text-slate-400 mb-4 border-4 border-white dark:border-slate-800 shadow-md overflow-hidden bg-slate-50">
              {userAvatar ? (
                <img src={userAvatar} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-sky-100 text-sky-600 font-black text-2xl uppercase">
                   {userName ? userName.charAt(0) : <User size={48} />}
                </div>
              )}
            </div>
            <h2 className="text-2xl font-black text-sky-900 dark:text-white">{userName || t('citizen')}</h2>
            <p className="text-slate-400 font-bold text-sm">+91 {userPhone}</p>
            <p className="text-sky-500 font-bold text-[10px] uppercase tracking-widest mt-1">{userEmail}</p>
            
            <button 
              onClick={() => setScreen(Screen.EDIT_PROFILE)}
              className="mt-6 flex items-center gap-2 mx-auto px-6 py-2 bg-sky-500 text-white rounded-full text-xs font-bold hover:bg-sky-600 transition-colors uppercase tracking-widest shadow-lg shadow-sky-500/20"
            >
              <Edit3 size={14} /> {t('editProfile')}
            </button>
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-2">
          {settings.map((s, i) => (
            <button 
              key={i} 
              onClick={s.action}
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-3xl flex items-center justify-between active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-400">
                  {s.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 dark:text-white">{s.label}</h4>
                  <p className="text-xs text-slate-400 font-medium">{s.sub}</p>
                </div>
              </div>
              {s.toggle ? (
                <div className={`w-12 h-6 rounded-full relative transition-colors ${s.checked ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-600'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${s.checked ? 'left-7' : 'left-1'}`} />
                </div>
              ) : (
                <div className="text-slate-300">
                  <ChevronRight size={20} />
                </div>
              )}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setScreen(Screen.LOGIN)}
          className="w-full flex items-center justify-center gap-2 p-5 text-rose-600 font-bold bg-rose-50 dark:bg-rose-900/20 rounded-3xl active:scale-95 transition-all"
        >
          <LogOut size={20} /> {t('logout')}
        </button>
      </div>
    </Layout>
  );
};

const EditProfile = () => {
  const { setScreen, userName, setUserName, userEmail, setUserEmail, userAvatar, setUserAvatar, t } = useApp();
  const [name, setNameInput] = useState(userName);
  const [email, setEmailInput] = useState(userEmail);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setUserName(name);
    setUserEmail(email);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setScreen(Screen.PROFILE);
    }, 1500);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const deletePhoto = () => {
    setUserAvatar('');
    setShowDeleteConfirm(false);
  };

  return (
    <Layout title={t('editProfile')} showBack>
      <div className="space-y-8">
        <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
        
        <div className="relative w-32 h-32 mx-auto">
          <div className="w-32 h-32 bg-slate-100 dark:bg-slate-700 rounded-full border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden flex items-center justify-center">
            {userAvatar ? (
               <img src={userAvatar} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center bg-sky-50 text-sky-400">
                 {name ? <span className="text-3xl font-black uppercase">{name.charAt(0)}</span> : <User size={64} />}
               </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 flex gap-2">
            {userAvatar && (
               <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 bg-rose-500 text-white rounded-full border-4 border-white dark:border-slate-800 shadow-lg active:scale-90 transition-all"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-sky-500 text-white rounded-full border-4 border-white dark:border-slate-800 shadow-lg active:scale-90 transition-all"
            >
              <Camera size={20} />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Overlay */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[500] flex items-center justify-center p-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] max-w-sm w-full shadow-2xl text-center"
              >
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Trash2 size={32} />
                </div>
                <h3 className="text-xl font-black text-sky-900 dark:text-white mb-2">{t('removePhoto')}?</h3>
                <p className="text-slate-500 font-medium mb-8">This action will permanently delete your profile picture.</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-4 bg-slate-100 dark:bg-slate-700 text-slate-500 font-bold rounded-2xl"
                  >
                    {t('close')}
                  </button>
                  <button 
                    onClick={deletePhoto}
                    className="flex-1 py-4 bg-rose-500 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/20"
                  >
                    {t('deletePhoto')}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] space-y-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <label className="block text-[10px] font-extrabold text-sky-300 mb-2 uppercase tracking-widest">{t('fullName')}</label>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700 p-4 rounded-2xl">
              <User size={18} className="text-slate-400" />
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setNameInput(e.target.value)}
                placeholder={t('enterName')}
                className="flex-1 bg-transparent border-none outline-none font-bold text-sky-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold text-sky-300 mb-2 uppercase tracking-widest">Email Address</label>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700 p-4 rounded-2xl">
              <Mail size={18} className="text-slate-400" />
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="email@example.com"
                className="flex-1 bg-transparent border-none outline-none font-bold text-sky-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaved}
          className={`w-full py-5 rounded-2xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${isSaved ? 'bg-emerald-500 text-white' : 'bg-sky-500 text-white hover:bg-sky-600'}`}
        >
          {isSaved ? (
            <><Check /> {t('profileUpdated')}</>
          ) : (
            t('saveChanges')
          )}
        </button>
      </div>
    </Layout>
  );
};

export default ProfileScreen;
