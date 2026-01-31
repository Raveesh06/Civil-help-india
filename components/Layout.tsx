
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { Home, ClipboardList, Shield, User, ChevronLeft, PhoneCall, LogOut, Sun, Moon, Menu, Bell, X, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME, THEME_CLASSES } from '../theme';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  hideNav?: boolean;
}

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden p-1`} style={{ backgroundColor: THEME.primary.lighter }}>
    <img 
      src="/scales-of-justice-logo.svg" 
      alt="Scales of Justice Logo"
      className="w-full h-full object-contain rounded-lg opacity-95"
    />
    <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: `${THEME.primary.light}1a` }} />
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
              className="fixed left-0 top-0 bottom-0 w-72 border-r z-[101] shadow-2xl flex flex-col"
              style={{ 
                backgroundColor: THEME_CLASSES.bgLight.includes('dark') ? THEME.dark.bg.primary : 'white',
                borderColor: THEME.primary.lighter
              }}
            >
              <div className="p-6 flex items-center justify-between border-b"
                style={{ borderColor: THEME.primary.lighter }}>
                <div className="flex items-center gap-3">
                  <Logo />
                  <span className="font-extrabold text-xl tracking-tight" style={{ color: THEME.primary.darker }}>
                    {t('appTitle')}
                  </span>
                </div>
                <button onClick={closeDrawer} className="p-2 rounded-full transition-colors"
                  style={{ color: THEME.neutral.text.light }}>
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
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all`}
                      style={{
                        backgroundColor: isActive ? THEME.primary.lighter : 'transparent',
                        color: isActive ? THEME.primary.dark : THEME.neutral.text.light,
                      }}
                    >
                      <Icon size={20} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t space-y-2" style={{ borderColor: THEME.primary.lighter }}>
                <button 
                  onClick={handleLanguageToggle}
                  className="w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl transition-all"
                  style={{ color: THEME.primary.darker }}
                >
                  <Languages size={20} />
                  {t('switchLanguage')} ({language === 'English' ? 'English' : 'हिंदी'})
                </button>
                <div className="p-4 rounded-2xl flex items-center gap-3 mb-4"
                  style={{ backgroundColor: THEME.primary.lighter }}>
                  {userAvatar ? (
                    <img src={userAvatar} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase"
                      style={{ backgroundColor: THEME.primary.light, color: 'white' }}>
                      {userName ? userName.charAt(0) : 'S'}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate" style={{ color: THEME.primary.darker }}>
                      {userName || t('citizen')}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: THEME.primary.dark }}>
                      Sahayak User
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                  className="w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl transition-all mb-2"
                  style={{ color: THEME.neutral.text.primary }}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  {theme === 'light' ? t('darkMode') : t('lightMode')}
                </button>
                <button onClick={() => { setScreen(Screen.LOGIN); closeDrawer(); }} className="w-full flex items-center gap-3 px-4 py-3 font-bold rounded-xl transition-all"
                  style={{ color: THEME.danger.light }}>
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
        <header className="border-b px-6 py-4 sticky top-0 z-30 flex items-center justify-between shadow-sm backdrop-blur-md"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderColor: THEME.primary.lighter
          }}>
          <div className="flex items-center gap-4">
            {!hideNav && !showBack && (
               <button onClick={toggleDrawer} className="p-2 rounded-xl transition-colors"
                 style={{ color: THEME.primary.light }}>
                 <Menu size={24} />
               </button>
            )}
            {showBack && (
              <button onClick={handleBack} className="p-2 rounded-full transition-colors"
                style={{ color: THEME.primary.light }}>
                <ChevronLeft size={isElderlyMode ? 28 : 24} />
              </button>
            )}
            <h1 className={`${isElderlyMode ? 'text-2xl' : 'text-xl'} font-extrabold tracking-tight`}
              style={{ color: THEME.primary.darker }}>
              {title || t('appTitle')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
             {!hideNav && (
               <button 
                onClick={() => setNotificationOpen(true)}
                className="p-2 rounded-xl transition-colors relative"
                style={{ color: THEME.primary.light }}
               >
                 <Bell size={24} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
               </button>
             )}
             <button 
              onClick={() => setScreen(Screen.EMERGENCY_RINGING)}
              className="text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center gap-2"
              style={{ backgroundColor: THEME.danger.light }}
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
          <nav className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] border-t"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderColor: THEME.primary.lighter
            }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => setScreen(item.id)}
                  className={`flex flex-col items-center gap-1 transition-colors`}
                  style={{ 
                    color: isActive ? THEME.primary.light : THEME.neutral.text.light,
                    fontWeight: isActive ? 'bold' : 'normal'
                  }}
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
