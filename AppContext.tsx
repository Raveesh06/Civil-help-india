
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Screen, Language, AppState, Complaint, Advocate, Theme } from './types';
import { translations } from './translations';

interface AppContextType extends AppState {
  t: (key: keyof typeof translations.English) => string;
  isNotificationOpen: boolean;
  setNotificationOpen: (val: boolean) => void;
  setElderlyMode: (val: boolean) => void;
  setLanguage: (lang: Language) => void;
  setTheme: (t: Theme) => void;
  setScreen: (screen: Screen) => void;
  setUserPhone: (phone: string) => void;
  setUserName: (name: string) => void;
  setUserEmail: (email: string) => void;
  setUserAvatar: (avatar: string) => void;
  addComplaint: (c: Complaint) => void;
  setSelectedComplaint: (c?: Complaint) => void;
  setSelectedAdvocate: (a?: Advocate) => void;
}

const DEFAULT_COMPLAINTS: Complaint[] = [
  {
    id: '#CA-981542',
    title: 'Pension Grant Help',
    category: 'Elderly Support',
    status: 'Escalated',
    date: '12 Jan 2024',
    description: 'Assisted request for tracking delayed pension funds.'
  },
  {
    id: '#CA-970122',
    title: 'Property Title Verification',
    category: 'Property & Documents',
    status: 'Resolved',
    date: '05 Jan 2024',
    description: 'Verification of inheritance papers for ancestral property.'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isElderlyMode, setElderlyMode] = useState(false);
  const [language, setLanguage] = useState<Language>('English');
  const [theme, setTheme] = useState<Theme>('light');
  const [currentScreen, setScreen] = useState<Screen>(Screen.LOGIN);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('citizen@sahayak.gov.in');
  const [userAvatar, setUserAvatar] = useState('');
  const [complaints, setComplaints] = useState<Complaint[]>(DEFAULT_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | undefined>();
  const [selectedAdvocate, setSelectedAdvocate] = useState<Advocate | undefined>();
  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const addComplaint = (c: Complaint) => {
    setComplaints(prev => [c, ...prev]);
  };

  const t = (key: keyof typeof translations.English): string => {
    return translations[language][key] || translations['English'][key] || key;
  };

  return (
    <AppContext.Provider value={{
      isElderlyMode,
      language,
      theme,
      currentScreen,
      userPhone,
      userName,
      userEmail,
      userAvatar,
      complaints,
      selectedComplaint,
      selectedAdvocate,
      isNotificationOpen,
      setNotificationOpen,
      t,
      setElderlyMode,
      setLanguage,
      setTheme,
      setScreen,
      setUserPhone,
      setUserName,
      setUserEmail,
      setUserAvatar,
      addComplaint,
      setSelectedComplaint,
      setSelectedAdvocate
    }}>
      <div className={theme === 'dark' ? 'dark bg-slate-900 min-h-screen text-white transition-colors duration-300' : 'light bg-[#F0F7FF] min-h-screen transition-colors duration-300'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
