
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { PlusCircle, ListTodo, FolderLock, PhoneOutgoing, X, Sparkles, ChevronRight, Scale, Phone, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      icon: <PlusCircle className="text-sky-500" size={isElderlyMode ? 40 : 32} />,
      bg: 'bg-sky-100/50 dark:bg-sky-900/20',
      action: () => setScreen(Screen.RAISE_ISSUE_OPTIONS)
    },
    {
      id: 'track',
      title: t('trackRequests'),
      desc: t('trackRequestsDesc'),
      icon: <ListTodo className="text-emerald-500" size={isElderlyMode ? 40 : 32} />,
      bg: 'bg-emerald-100/50 dark:bg-emerald-900/20',
      action: () => setScreen(Screen.TRACK_REQUESTS)
    },
    {
      id: 'advocate',
      title: t('hireAdvocate'),
      desc: t('hireAdvocateDesc'),
      icon: <Scale className="text-violet-500" size={isElderlyMode ? 40 : 32} />,
      bg: 'bg-violet-100/50 dark:bg-violet-900/20',
      action: () => setScreen(Screen.HIRE_ADVOCATE)
    },
    {
      id: 'vault',
      title: t('myDocuments'),
      desc: t('myDocumentsDesc'),
      icon: <FolderLock className="text-amber-500" size={isElderlyMode ? 40 : 32} />,
      bg: 'bg-amber-100/50 dark:bg-amber-900/20',
      action: () => setScreen(Screen.DOCUMENT_VAULT)
    },
    {
      id: 'help',
      title: t('callHelpline'),
      desc: t('callHelplineDesc'),
      icon: <PhoneOutgoing className="text-rose-500" size={isElderlyMode ? 40 : 32} />,
      bg: 'bg-rose-100/50 dark:bg-rose-900/20',
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
          className="bg-sky-900 dark:bg-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className={`font-extrabold tracking-tight ${isElderlyMode ? 'text-4xl' : 'text-3xl'}`}>{greeting}</h2>
                <p className="text-sky-300 font-bold text-sm uppercase tracking-widest mt-1">{t('tagline')}</p>
              </div>
            </div>
            
            <div className="bg-white/10 p-6 rounded-3xl border border-white/5 max-w-sm backdrop-blur-sm">
              <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest text-sky-200">
                <span>{t('readiness')}</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-sky-400 rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Civic Spotlight */}
        <div className="bg-white dark:bg-slate-800 border border-sky-50 dark:border-slate-700 rounded-[2rem] p-5 flex items-center gap-5 shadow-sm">
          <div className="bg-sky-50 dark:bg-slate-700 p-3 rounded-2xl shrink-0">
            {spotlights[activeSpotlight].icon}
          </div>
          <div className="flex-1 overflow-hidden h-6 relative">
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeSpotlight}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-base font-bold text-slate-600 dark:text-slate-300 absolute inset-0 truncate"
              >
                {spotlights[activeSpotlight].text}
              </motion.p>
            </AnimatePresence>
          </div>
          <button 
            onClick={() => setScreen(Screen.CIVIC_HIGHLIGHTS)}
            className="p-2 hover:bg-sky-50 dark:hover:bg-slate-700 rounded-full text-sky-200 hover:text-sky-500 transition-all"
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
              className={`flex items-center gap-6 p-8 ${card.bg} border border-transparent hover:border-white dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-700 rounded-[2.5rem] text-left active:scale-[0.98] transition-all shadow-sm hover:shadow-xl group`}
            >
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0">
                {card.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-extrabold ${isElderlyMode ? 'text-2xl' : 'text-xl'} text-sky-900 dark:text-white mb-1`}>{card.title}</h3>
                <p className={`text-slate-400 font-medium ${isElderlyMode ? 'text-lg' : 'text-sm'}`}>{card.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Helpline Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <div className="fixed inset-0 bg-sky-900/20 z-[100] flex items-center justify-center p-6 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-rose-300" />
              <button 
                onClick={() => setShowHelpModal(false)}
                className="absolute right-8 top-8 text-slate-300 hover:text-slate-500"
              >
                <X size={28} />
              </button>

              <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-3xl flex items-center justify-center text-rose-400 mb-8 mx-auto shadow-sm">
                <PhoneOutgoing size={40} />
              </div>

              <h2 className="text-3xl font-extrabold text-center text-sky-900 dark:text-white mb-3 tracking-tight">{t('callHelpline')}</h2>
              <p className="text-slate-400 text-center mb-10 font-medium px-4">
                {language === 'English' ? 'Our agents are here to help you in your regional language.' : 'हमारे एजेंट आपकी क्षेत्रीय भाषा में आपकी सहायता के लिए यहां हैं।'}
              </p>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setScreen(Screen.EMERGENCY_RINGING)} 
                  className="w-full bg-rose-500 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg hover:bg-rose-600"
                >
                  <PhoneOutgoing size={20} /> {t('emergency')}
                </button>
                <button onClick={() => { setShowHelpModal(false); setShowCallbackModal(true); }} className="w-full bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-sky-100">
                  {language === 'English' ? 'Request Immediate Callback' : 'तत्काल कॉल बैक का अनुरोध करें'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showCallbackModal && (
          <div className="fixed inset-0 bg-sky-900/20 z-[110] flex items-center justify-center p-6 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative"
            >
              <button 
                onClick={() => setShowCallbackModal(false)}
                className="absolute right-8 top-8 text-slate-300 hover:text-slate-500"
              >
                <X size={28} />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-sky-50 dark:bg-sky-900/30 rounded-2xl flex items-center justify-center text-sky-500 mx-auto mb-4">
                  <Phone size={32} />
                </div>
                <h3 className="text-2xl font-extrabold text-sky-900 dark:text-white">{language === 'English' ? 'Callback Service' : 'कॉल बैक सेवा'}</h3>
              </div>

              {!isCountingDown ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-extrabold text-sky-300 mb-2 uppercase tracking-widest">{t('phoneNum')}</label>
                    <input 
                      type="tel" 
                      value={callbackNumber}
                      onChange={(e) => setCallbackNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder={language === 'English' ? "Enter 10 digit mobile" : "10 अंकों का मोबाइल दर्ज करें"}
                      className="w-full bg-sky-50 dark:bg-slate-700 border border-sky-100 dark:border-slate-600 rounded-xl p-4 text-lg font-bold text-sky-900 dark:text-white outline-none"
                    />
                  </div>
                  <button 
                    onClick={startCallback}
                    disabled={callbackNumber.length < 10}
                    className="w-full bg-sky-500 text-white py-5 rounded-2xl font-bold text-lg shadow-lg active:scale-95 disabled:bg-slate-200"
                  >
                    {language === 'English' ? 'Confirm My Request' : 'मेरे अनुरोध की पुष्टि करें'}
                  </button>
                </div>
              ) : (
                <div className="text-center animate-fade-in">
                  <div className="flex flex-col items-center py-6">
                     <span className="text-4xl font-black text-sky-500 mb-2">{formatTime(countdown)}</span>
                     <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{language === 'English' ? 'Estimated Wait Time' : 'अनुमानित प्रतीक्षा समय'}</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800 mb-6">
                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold mb-2">
                      <CheckCircle size={18} /> {language === 'English' ? 'Agent Assigned' : 'एजेंट नियुक्त किया गया'}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                      {language === 'English' 
                        ? `We'll call you in ${formatTime(countdown)} on +91 ${callbackNumber}. Please keep your phone reachable.` 
                        : `हम आपको +91 ${callbackNumber} पर ${formatTime(countdown)} में कॉल करेंगे। कृपया अपना फोन उपलब्ध रखें।`}
                    </p>
                  </div>
                  <button 
                    onClick={() => { setIsCountingDown(false); setShowCallbackModal(false); }}
                    className="text-rose-500 font-bold text-sm uppercase tracking-widest"
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
