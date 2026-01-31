
import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { Screen, Complaint } from '../types';
import { ChevronRight, Clock, AlertCircle, CheckCircle2, History, MapPin } from 'lucide-react';

const TrackRequests: React.FC = () => {
  const { currentScreen, setScreen, setSelectedComplaint, complaints, t } = useApp();

  if (currentScreen === Screen.TRACK_DETAIL) return <TrackDetail />;

  const getStatusTranslation = (status: string) => {
    switch (status) {
      case 'Submitted': return t('submitted');
      case 'Resolved': return t('resolved');
      case 'Escalated': return t('escalated');
      default: return status;
    }
  };

  return (
    <Layout title={t('trackRequests')} showBack>
      <div className="space-y-4">
        {complaints.length > 0 ? complaints.map((c) => (
          <button 
            key={c.id} 
            onClick={() => { setSelectedComplaint(c); setScreen(Screen.TRACK_DETAIL); }}
            className="w-full bg-white dark:bg-slate-800 border border-sky-50 dark:border-slate-700 p-6 rounded-[2rem] text-left flex items-center justify-between hover:shadow-xl transition-all active:scale-[0.98] group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest ${
                  c.status === 'Submitted' ? 'bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400' :
                  c.status === 'Escalated' ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-500 dark:text-rose-400' :
                  'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
                }`}>
                  {getStatusTranslation(c.status)}
                </span>
                <span className="text-[10px] text-sky-200 dark:text-sky-800 font-bold">{c.id}</span>
              </div>
              <h3 className="font-extrabold text-sky-900 dark:text-white group-hover:text-sky-500 transition-colors">{c.title}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1 font-bold italic">
                <Clock size={12} /> {c.date}
              </p>
            </div>
            <ChevronRight className="text-sky-200" />
          </button>
        )) : (
          <div className="text-center py-20">
             <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
               <History size={32} />
             </div>
             <p className="text-slate-400 font-bold">{t('trackRequestsDesc')}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

const TrackDetail = () => {
  const { selectedComplaint, t, language } = useApp();
  if (!selectedComplaint) return null;

  const timeline = [
    { label: t('submitted'), date: selectedComplaint.date, active: true, icon: <CheckCircle2 size={20} /> },
    { label: language === 'English' ? 'Assigned' : 'नियुक्त किया गया', date: language === 'English' ? 'Processing' : 'प्रक्रिया में', active: selectedComplaint.status !== 'Submitted', icon: <History size={20} /> },
    { label: language === 'English' ? 'Action Taken' : 'कार्रवाई की गई', date: '--', active: selectedComplaint.status === 'Resolved', icon: <AlertCircle size={20} /> },
    { label: t('resolved'), date: '--', active: selectedComplaint.status === 'Resolved', icon: <CheckCircle2 size={20} /> }
  ];

  return (
    <Layout title={language === 'English' ? "Issue Detail" : "मुद्दा विवरण"} showBack>
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800 border border-sky-50 dark:border-slate-700 p-8 rounded-[2.5rem] shadow-sm">
          <h2 className="text-2xl font-extrabold text-sky-900 dark:text-white mb-3">{selectedComplaint.title}</h2>
          <p className="text-slate-400 dark:text-slate-400 font-medium mb-6 leading-relaxed">{selectedComplaint.description}</p>
          {selectedComplaint.address && (
            <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-center gap-3">
              <MapPin size={18} className="text-rose-400 shrink-0" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{selectedComplaint.address}</p>
            </div>
          )}
          <div className="flex justify-between items-center pt-6 border-t border-sky-50 dark:border-slate-700">
            <span className="text-[10px] text-sky-200 dark:text-sky-600 font-bold uppercase tracking-widest">Ref: {selectedComplaint.id}</span>
            <span className="text-[10px] font-bold px-3 py-1 bg-sky-50 dark:bg-sky-900/30 text-sky-500 rounded-full uppercase">{selectedComplaint.category}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-sky-50 dark:border-slate-700 p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="font-extrabold text-sky-900 dark:text-white mb-8 uppercase tracking-widest text-xs">{language === 'English' ? 'Progress' : 'प्रगति'}</h3>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center z-10 shadow-sm transition-all ${item.active ? 'bg-sky-400 text-white' : 'bg-sky-50 dark:bg-slate-700 text-sky-200'}`}>
                    {item.icon}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className={`w-1 h-12 ${item.active && timeline[i+1].active ? 'bg-sky-400' : 'bg-sky-50 dark:bg-slate-700'} rounded-full`} />
                  )}
                </div>
                <div className="pt-2">
                  <h4 className={`font-extrabold ${item.active ? 'text-sky-900 dark:text-sky-100' : 'text-sky-200 dark:text-slate-600'}`}>{item.label}</h4>
                  <p className="text-[10px] text-slate-300 dark:text-slate-500 font-bold uppercase mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrackRequests;
