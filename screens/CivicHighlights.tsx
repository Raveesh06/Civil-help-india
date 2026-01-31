
import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { Sparkles, FolderLock, PhoneOutgoing, Info, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

const CivicHighlights: React.FC = () => {
  const { t, language } = useApp();

  const highlights = [
    { 
      title: language === 'English' ? "Street Light Reporting" : "स्ट्रीट लाइट रिपोर्टिंग",
      text: language === 'English' ? "Major updates to the street light maintenance portal. Report outages under 'Safety' for 24h resolution." : "स्ट्रीट लाइट रखरखाव पोर्टल पर बड़े अपडेट। 24 घंटे में समाधान के लिए 'सुरक्षा' के तहत रिपोर्ट करें।",
      icon: <Sparkles className="text-amber-400" />,
      tag: "Utility"
    },
    { 
      title: language === 'English' ? "Aadhaar Sync Update" : "आधार सिंक अपडेट",
      text: language === 'English' ? "Verifying your Aadhaar once speeds up every civic request. Use the Vault to manage your credentials safely." : "एक बार अपने आधार को सत्यापित करने से प्रत्येक नागरिक अनुरोध में तेजी आती है। सुरक्षित रूप से प्रबंधित करने के लिए वॉल्ट का उपयोग करें।",
      icon: <FolderLock className="text-sky-400" />,
      tag: "Verification"
    },
    { 
      title: language === 'English' ? "Expanded Support Hours" : "विस्तारित सहायता समय",
      text: language === 'English' ? "Our Sahayak helpdesk is now operating 24/7 to assist elderly and specially-abled citizens." : "हमारा सहायक हेल्पडेस्क अब बुजुर्गों और विशेष रूप से सक्षम नागरिकों की सहायता के लिए 24/7 काम कर रहा है।",
      icon: <PhoneOutgoing className="text-emerald-400" />,
      tag: "Helpdesk"
    },
    { 
      title: language === 'English' ? "Clean City Drive" : "स्वच्छ शहर अभियान",
      text: language === 'English' ? "The municipal corporation is starting a new waste segregation drive in Zone 4. Download the guide in Vault." : "नगर निगम जोन 4 में एक नया कचरा पृथक्करण अभियान शुरू कर रहा है। वॉल्ट में गाइड डाउनलोड करें।",
      icon: <Megaphone className="text-rose-400" />,
      tag: "Campaign"
    },
    { 
      title: language === 'English' ? "Pension Grant Status" : "पेंशन अनुदान स्थिति",
      text: language === 'English' ? "Monthly pension grants for Jan 2024 are now being processed. Track your status in the 'Track' section." : "जनवरी 2024 के लिए मासिक पेंशन अनुदान अब संसाधित किए जा रहे हैं। 'ट्रैक' अनुभाग में अपनी स्थिति ट्रैक करें।",
      icon: <Info className="text-violet-400" />,
      tag: "Finance"
    }
  ];

  return (
    <Layout title={t('civicHighlights')} showBack>
      <div className="space-y-6">
        <div className="bg-sky-50 dark:bg-sky-900/20 p-6 rounded-[2.5rem] border border-sky-100 dark:border-sky-800">
           <h2 className="text-sky-900 dark:text-sky-100 font-extrabold text-lg mb-2">{t('allUpdates')}</h2>
           <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{language === 'English' ? "Stay informed about the latest civic changes and sahaya help services." : "नवीनतम नागरिक परिवर्तनों और सहायता सेवाओं के बारे में सूचित रहें।"}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700 flex gap-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="bg-slate-50 dark:bg-slate-700 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                {h.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-extrabold text-sky-900 dark:text-white">{h.title}</h3>
                  <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-400">{h.tag}</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{h.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CivicHighlights;
