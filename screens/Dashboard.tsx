
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { PlusCircle, ListTodo, FolderLock, PhoneOutgoing, X, Sparkles, ChevronRight, Scale, Phone, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME, THEME_CLASSES } from '../theme';

const Dashboard: React.FC = () => {
  const { setScreen, isElderlyMode, userName, language, userPhone, t } = useApp();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackNumber, setCallbackNumber] = useState(userPhone || '');
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [activeSpotlight, setActiveSpotlight] = useState(0);

  const spotlights = [
    { text: language === 'English' ? "Street light not working? Report under Safety." : "स्ट्रीट लाइट काम नहीं कर रही? सुरक्षा के तहत रिपोर्ट करें।", icon: <Sparkles className="text-amber-300" /> },
    { text: language === 'English' ? "Upload your Aadhaar today to speed up verification." : "सत्यापन में तेजी लाने के लिए आज ही अपना आधार अपलोड करें।", icon: <FolderLock className="text-sky-400" /> },
    { text: language === 'English' ? "Sahayak helpdesk hours expanded: Now 24/7 support." : "सहायक हेल्पडेस्क के समय में विस्तार: अब 24/7 सहायता उपलब्ध है।", icon: <PhoneOutgoing className="text-emerald-300" /> }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSpotlight((prev) => (prev + 1) % spotlights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isCountingDown && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCountingDown(false);
    }
    return () => clearInterval(interval);
  }, [isCountingDown, countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const minText = language === 'English' ? 'mins' : 'मिनट';
    const secText = language === 'English' ? 'sec' : 'सेकंड';
    return `${mins} ${minText} ${secs.toString().padStart(2, '0')} ${secText}`;
  };

  const startCallback = () => {
    if (callbackNumber.length === 10) {
      setIsCountingDown(true);
    }
  };

  const cards = [
    {
      id: 'raise',
      title: t('raiseIssue'),
      desc: t('raiseIssueDesc'),
      icon: <PlusCircle size={isElderlyMode ? 40 : 32} />,
      bg: THEME.primary.lighter,
      iconColor: THEME.primary.light,
      action: () => setScreen(Screen.RAISE_ISSUE_OPTIONS)
    },
    {
      id: 'track',
      title: t('trackRequests'),
      desc: t('trackRequestsDesc'),
      icon: <ListTodo size={isElderlyMode ? 40 : 32} />,
      bg: THEME.success.lighter,
      iconColor: THEME.success.light,
      action: () => setScreen(Screen.TRACK_REQUESTS)
    },
    {
      id: 'advocate',
      title: t('hireAdvocate'),
      desc: t('hireAdvocateDesc'),
      icon: <Scale size={isElderlyMode ? 40 : 32} />,
      bg: '#EDE9FE',
      iconColor: '#A78BFA',
      action: () => setScreen(Screen.HIRE_ADVOCATE)
    },
    {
      id: 'vault',
      title: t('myDocuments'),
      desc: t('myDocumentsDesc'),
      icon: <FolderLock size={isElderlyMode ? 40 : 32} />,
      bg: THEME.warning.lighter,
      iconColor: THEME.warning.light,
      action: () => setScreen(Screen.DOCUMENT_VAULT)
    },
    {
      id: 'help',
      title: t('callHelpline'),
      desc: t('callHelplineDesc'),
      icon: <PhoneOutgoing size={isElderlyMode ? 40 : 32} />,
      bg: THEME.danger.lighter,
      iconColor: THEME.danger.light,
      action: () => setShowHelpModal(true)
    }
  ];

  const firstName = userName ? userName.split(' ')[0] : t('citizen');
  const greeting = `${t('namaste')}, ${firstName}!`;

  return (
    <Layout title={t('home')}>
      <div className="flex flex-col gap-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white"
          style={{ backgroundColor: THEME.primary.dark }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10" 
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
          
          <div className="relative z-10 max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className={`font-extrabold tracking-tight ${isElderlyMode ? 'text-4xl' : 'text-3xl'}`}>{greeting}</h2>
                <p className="font-bold text-sm uppercase tracking-widest mt-1" style={{ color: THEME.primary.light }}>
                  {t('tagline')}
                </p>
              </div>
            </div>
            
            <div className="p-6 rounded-3xl border max-w-sm backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
              }}>
              <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest"
                style={{ color: THEME.primary.lighter }}>
                <span>{t('readiness')}</span>
                <span>65%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: THEME.primary.lighter }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Civic Spotlight */}
        <div className="rounded-[2rem] p-5 flex items-center gap-5 shadow-sm border"
          style={{ 
            backgroundColor: 'white',
            borderColor: THEME.primary.lighter
          }}>
          <div className="p-3 rounded-2xl shrink-0"
            style={{ backgroundColor: THEME.primary.lighter }}>
            {spotlights[activeSpotlight].icon}
          </div>
          <div className="flex-1 overflow-hidden h-6 relative">
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeSpotlight}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-base font-bold absolute inset-0 truncate"
                style={{ color: THEME.neutral.text.secondary }}
              >
                {spotlights[activeSpotlight].text}
              </motion.p>
            </AnimatePresence>
          </div>
          <button 
            onClick={() => setScreen(Screen.CIVIC_HIGHLIGHTS)}
            className="p-2 rounded-full transition-all"
            style={{ 
              color: THEME.primary.lighter,
              backgroundColor: 'transparent'
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pastel Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={card.id}
              onClick={card.action}
              className={`flex items-center gap-6 p-8 border hover:border-white rounded-[2.5rem] text-left active:scale-[0.98] transition-all shadow-sm hover:shadow-xl group`}
              style={{ 
                backgroundColor: card.bg,
                borderColor: 'transparent'
              }}
            >
              <div className="p-5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0"
                style={{ 
                  backgroundColor: 'white',
                  color: card.iconColor
                }}>
                {card.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-extrabold ${isElderlyMode ? 'text-2xl' : 'text-xl'} mb-1`}
                  style={{ color: THEME.primary.darker }}>
                  {card.title}
                </h3>
                <p className={`font-medium ${isElderlyMode ? 'text-lg' : 'text-sm'}`}
                  style={{ color: THEME.neutral.text.light }}>
                  {card.desc}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Helpline Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm"
            style={{ backgroundColor: `${THEME.primary.darker}33` }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
              style={{ backgroundColor: 'white' }}
            >
              <div className="absolute top-0 left-0 w-full h-3" style={{ backgroundColor: THEME.danger.light }} />
              <button 
                onClick={() => setShowHelpModal(false)}
                className="absolute right-8 top-8"
                style={{ color: THEME.neutral.text.light }}
              >
                <X size={28} />
              </button>

              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 mx-auto shadow-sm"
                style={{ 
                  backgroundColor: THEME.danger.lighter,
                  color: THEME.danger.light
                }}>
                <PhoneOutgoing size={40} />
              </div>

              <h2 className="text-3xl font-extrabold text-center mb-3 tracking-tight"
                style={{ color: THEME.primary.darker }}>
                {t('callHelpline')}
              </h2>
              <p className="text-center mb-10 font-medium px-4"
                style={{ color: THEME.neutral.text.secondary }}>
                {language === 'English' ? 'Our agents are here to help you in your regional language.' : 'हमारे एजेंट आपकी क्षेत्रीय भाषा में आपकी सहायता के लिए यहां हैं।'}
              </p>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setScreen(Screen.EMERGENCY_RINGING)} 
                  className="w-full text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg"
                  style={{ 
                    backgroundColor: THEME.danger.light
                  }}
                >
                  <PhoneOutgoing size={20} /> {t('emergency')}
                </button>
                <button onClick={() => { setShowHelpModal(false); setShowCallbackModal(true); }} className="w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all"
                  style={{ 
                    backgroundColor: THEME.primary.lighter,
                    color: THEME.primary.dark
                  }}>
                  {language === 'English' ? 'Request Immediate Callback' : 'तत्काल कॉल बैक का अनुरोध करें'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showCallbackModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-sm"
            style={{ backgroundColor: `${THEME.primary.darker}33` }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative"
              style={{ backgroundColor: 'white' }}
            >
              <button 
                onClick={() => setShowCallbackModal(false)}
                className="absolute right-8 top-8"
                style={{ color: THEME.neutral.text.light }}
              >
                <X size={28} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ 
                    backgroundColor: THEME.primary.lighter,
                    color: THEME.primary.light
                  }}>
                  <Phone size={32} />
                </div>
                <h3 className="text-2xl font-extrabold"
                  style={{ color: THEME.primary.darker }}>
                  {language === 'English' ? 'Callback Service' : 'कॉल बैक सेवा'}
                </h3>
              </div>

              {!isCountingDown ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-extrabold mb-2 uppercase tracking-widest"
                      style={{ color: THEME.primary.light }}>
                      {t('phoneNum')}
                    </label>
                    <input 
                      type="tel" 
                      value={callbackNumber}
                      onChange={(e) => setCallbackNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder={language === 'English' ? "Enter 10 digit mobile" : "10 अंकों का मोबाइल दर्ज करें"}
                      className="w-full border rounded-xl p-4 text-lg font-bold outline-none"
                      style={{ 
                        backgroundColor: THEME.primary.lighter,
                        borderColor: THEME.primary.light,
                        color: THEME.primary.darker
                      }}
                    />
                  </div>
                  <button 
                    onClick={startCallback}
                    disabled={callbackNumber.length < 10}
                    className="w-full py-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all"
                    style={{ 
                      backgroundColor: callbackNumber.length >= 10 ? THEME.primary.light : THEME.neutral.bg.medium,
                      color: callbackNumber.length >= 10 ? 'white' : THEME.neutral.text.light,
                      cursor: callbackNumber.length >= 10 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {language === 'English' ? 'Confirm My Request' : 'मेरे अनुरोध की पुष्टि करें'}
                  </button>
                </div>
              ) : (
                <div className="text-center animate-fade-in">
                  <div className="flex flex-col items-center py-6">
                     <span className="text-4xl font-black mb-2"
                       style={{ color: THEME.primary.light }}>
                       {formatTime(countdown)}
                     </span>
                     <p className="font-bold uppercase tracking-widest text-[10px]"
                       style={{ color: THEME.neutral.text.secondary }}>
                       {language === 'English' ? 'Estimated Wait Time' : 'अनुमानित प्रतीक्षा समय'}
                     </p>
                  </div>
                  <div className="p-6 rounded-3xl border mb-6"
                    style={{ 
                      backgroundColor: THEME.success.lighter,
                      borderColor: THEME.success.light
                    }}>
                    <div className="flex items-center gap-3 font-bold mb-2"
                      style={{ color: THEME.success.dark }}>
                      <CheckCircle size={18} /> {language === 'English' ? 'Agent Assigned' : 'एजेंट नियुक्त किया गया'}
                    </div>
                    <p className="text-sm"
                      style={{ color: THEME.neutral.text.secondary }}>
                      {language === 'English' 
                        ? `We'll call you in ${formatTime(countdown)} on +91 ${callbackNumber}. Please keep your phone reachable.` 
                        : `हम आपको +91 ${callbackNumber} पर ${formatTime(countdown)} में कॉल करेंगे। कृपया अपना फोन उपलब्ध रखें।`}
                    </p>
                  </div>
                  <button 
                    onClick={() => { setIsCountingDown(false); setShowCallbackModal(false); }}
                    className="font-bold text-sm uppercase tracking-widest"
                    style={{ color: THEME.danger.light }}
                  >
                    {language === 'English' ? 'Cancel Request' : 'अनुरोध रद्द करें'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Dashboard;
