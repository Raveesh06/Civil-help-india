
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { Home, ClipboardList, Shield, User, ChevronLeft, PhoneCall, LogOut, Sun, Moon, Menu, Bell, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  hideNav?: boolean;
}

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} bg-sky-200 rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden p-1`}>
    <img 
      src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=128&h=128&q=80" 
      alt="Gavel Logo"
      className="w-full h-full object-cover rounded-lg mix-blend-multiply opacity-95"
    />
    <div className="absolute inset-0 bg-sky-400/10 pointer-events-none" />
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children, title, showBack, hideNav }) => {
  const { isElderlyMode, setScreen, currentScreen, userName, userAvatar, theme, setTheme, t, setNotificationOpen, language, setLanguage } = useApp();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleBack = () => {
    if (currentScreen === Screen.RAISE_ISSUE_OPTIONS) setScreen(Screen.DASHBOARD);
    else if (currentScreen === Screen.FILE_ONLINE) setScreen(Screen.RAISE_ISSUE_OPTIONS);
    else if (currentScreen === Screen.SPEAK_AND_FILE) setScreen(Screen.RAISE_ISSUE_OPTIONS);
    else if (currentScreen === Screen.ASSISTED_HELP) setScreen(Screen.RAISE_ISSUE_OPTIONS);
    else if (currentScreen === Screen.AI_REVIEW) setScreen(Screen.FILE_ONLINE);
    else if (currentScreen === Screen.TRACK_DETAIL) setScreen(Screen.TRACK_REQUESTS);
    else if (currentScreen === Screen.HIRE_ADVOCATE) setScreen(Screen.DASHBOARD);
    else if (currentScreen === Screen.SECURITY_SETTINGS) setScreen(Screen.PROFILE);
    else if (currentScreen === Screen.EDIT_PROFILE) setScreen(Screen.PROFILE);
    else if (currentScreen === Screen.ADVOCATE_CALL) setScreen(Screen.HIRE_ADVOCATE);
    else if (currentScreen === Screen.ADVOCATE_CHAT) setScreen(Screen.HIRE_ADVOCATE);
    else if (currentScreen === Screen.CIVIC_HIGHLIGHTS) setScreen(Screen.DASHBOARD);
    else setScreen(Screen.DASHBOARD);
  };

  const navItems = [
    { id: Screen.DASHBOARD, label: t('home'), icon: Home },
    { id: Screen.TRACK_REQUESTS, label: t('track'), icon: ClipboardList },
    { id: Screen.DOCUMENT_VAULT, label: t('vault'), icon: Shield },
    { id: Screen.PROFILE, label: t('profile'), icon: User },
  ];

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const handleLanguageToggle = () => {
    setLanguage(language === 'English' ? 'Hindi' : 'English');
  };

  return (
    <div className={`min-h-screen flex flex-col ${isElderlyMode ? 'elderly-mode' : ''} font-inter overflow-hidden`}>
      
      {/* Navigation Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-800 border-r border-sky-100 dark:border-slate-700 z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-sky-50 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Logo />
                  <span className="font-extrabold text-xl text-sky-900 dark:text-sky-100 tracking-tight">{t('appTitle')}</span>
                </div>
                <button onClick={closeDrawer} className="p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setScreen(item.id); closeDrawer(); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        isActive 
                        ? 'bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' 
                        : 'text-slate-400 hover:bg-sky-50/50 dark:hover:bg-slate-700 hover:text-sky-500'
                      }`}
                    >
                      <Icon size={20} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-sky-50 dark:border-slate-700 space-y-2">
                <button 
                  onClick={handleLanguageToggle}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sky-600 dark:text-sky-400 font-bold hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-xl transition-all"
                >
                  <Languages size={20} />
                  {t('switchLanguage')} ({language === 'English' ? 'English' : 'हिंदी'})
                </button>
                <div className="bg-sky-50/50 dark:bg-slate-700/50 p-4 rounded-2xl flex items-center gap-3 mb-4">
                  {userAvatar ? (
                    <img src={userAvatar} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center text-sky-600 font-bold text-xs uppercase">
                      {userName ? userName.charAt(0) : 'S'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-sky-900 dark:text-white truncate">{userName || t('citizen')}</p>
                    <p className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">Sahayak User</p>
                  </div>
                </div>
                <button 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-300 font-bold hover:bg-sky-50 dark:hover:bg-slate-700 rounded-xl transition-all mb-2"
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  {theme === 'light' ? t('darkMode') : t('lightMode')}
                </button>
                <button onClick={() => { setScreen(Screen.LOGIN); closeDrawer(); }} className="w-full flex items-center gap-3 px-4 py-3 text-rose-400 font-bold hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all">
                  <LogOut size={20} />
                  {t('logout')}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-800/80 border-b border-sky-100 dark:border-slate-700 px-6 py-4 sticky top-0 z-30 flex items-center justify-between shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-4">
            {!hideNav && !showBack && (
               <button onClick={toggleDrawer} className="p-2 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-sky-500">
                 <Menu size={24} />
               </button>
            )}
            {showBack && (
              <button onClick={handleBack} className="p-2 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-full transition-colors text-sky-400">
                <ChevronLeft size={isElderlyMode ? 28 : 24} />
              </button>
            )}
            <h1 className={`${isElderlyMode ? 'text-2xl' : 'text-xl'} font-extrabold text-sky-900 dark:text-white tracking-tight`}>
              {title || t('appTitle')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             {!hideNav && (
               <button 
                onClick={() => setNotificationOpen(true)}
                className="p-2 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-xl text-sky-400 transition-colors relative"
               >
                 <Bell size={24} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800" />
               </button>
             )}
             <button 
              onClick={() => setScreen(Screen.EMERGENCY_RINGING)}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2"
            >
              <PhoneCall size={16} /> {t('emergency')}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8 p-4 md:p-8 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>

        {/* Mobile Bottom Nav */}
        {!hideNav && (
          <nav className="md:hidden bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg border-t border-sky-100 dark:border-slate-700 fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => setScreen(item.id)}
                  className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-sky-500 dark:text-sky-400 font-bold' : 'text-slate-300 dark:text-slate-500'}`}
                >
                  <Icon size={isElderlyMode ? 26 : 22} />
                  <span className={isElderlyMode ? 'text-sm' : 'text-[10px]'}>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};

export default Layout;
