
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldCheck, AlertCircle, X, Info } from 'lucide-react';
import { useApp } from '../AppContext';

const NotificationManager: React.FC = () => {
  const { isNotificationOpen, setNotificationOpen, t, currentScreen } = useApp();

  // Don't show notifications center on login or splash screens
  if (currentScreen === 'LOGIN' || currentScreen === 'OTP') return null;

  const notifications = [
    { id: 1, title: "Verification Pending", msg: "Please verify your Aadhaar to speed up your request #CA-981542.", type: 'warning' as const, time: '2m ago' },
    { id: 2, title: "Status Update", msg: "A volunteer has been assigned to your assisted request.", type: 'success' as const, time: '1h ago' },
    { id: 3, title: "Vault Reminder", msg: "Encryption keys have been rotated successfully.", type: 'info' as const, time: 'Yesterday' }
  ];

  return (
    <AnimatePresence>
      {isNotificationOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setNotificationOpen(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[450]"
          />
          
          {/* Notification Center */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-20 right-4 left-4 sm:left-auto sm:w-96 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] z-[451] flex flex-col overflow-hidden max-h-[80vh]"
          >
            <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-sky-500" />
                <h2 className="font-extrabold text-sky-900 dark:text-white">{t('notifications')}</h2>
              </div>
              <button 
                onClick={() => setNotificationOpen(false)}
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((note) => (
                <div 
                  key={note.id}
                  className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-3xl border border-transparent hover:border-sky-100 dark:hover:border-sky-900 transition-all cursor-pointer group"
                >
                  <div className="flex gap-4">
                    <div className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center ${
                      note.type === 'success' ? 'bg-emerald-100 text-emerald-600' :
                      note.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'
                    }`}>
                      {note.type === 'success' ? <ShieldCheck size={20} /> :
                       note.type === 'warning' ? <AlertCircle size={20} /> : <Info size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest truncate">{note.title}</h4>
                        <span className="text-[10px] font-bold text-slate-300 whitespace-nowrap">{note.time}</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-tight">{note.msg}</p>
                    </div>
                  </div>
                </div>
              ))}

              {notifications.length === 0 && (
                <div className="text-center py-12">
                   <Bell size={48} className="text-slate-100 mx-auto mb-4" />
                   <p className="text-slate-400 font-bold">{t('noNotifications')}</p>
                </div>
              )}
            </div>

            <button 
              className="p-4 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 text-xs font-black uppercase tracking-[0.2em] border-t border-sky-100 dark:border-sky-900/50"
              onClick={() => setNotificationOpen(false)}
            >
              {t('close')}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationManager;
