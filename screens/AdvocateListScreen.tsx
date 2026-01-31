
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { Screen, Advocate } from '../types';
import { Phone, MessageSquare, Star, MapPin, Briefcase, Search, AlertCircle, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AdvocateListScreen: React.FC = () => {
  const { isElderlyMode, setSelectedAdvocate, setScreen } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const advocates: Advocate[] = [
    {
      id: 'adv-1',
      name: 'Adv. Rajesh Kumar',
      specialty: 'Civil & Property Law',
      experience: '12+ Years',
      rating: 4.8,
      location: 'New Delhi, DL',
      languages: ['English', 'Hindi'],
    },
    {
      id: 'adv-2',
      name: 'Adv. Priya Sharma',
      specialty: 'Family Law',
      experience: '8 Years',
      rating: 4.9,
      location: 'Mumbai, MH',
      languages: ['English', 'Marathi'],
    },
    {
      id: 'adv-3',
      name: 'Adv. Anjali Menon',
      specialty: 'Labor Law',
      experience: '15 Years',
      rating: 4.7,
      location: 'Bengaluru, KA',
      languages: ['English', 'Kannada'],
    }
  ];

  const handleCall = (adv: Advocate) => {
    setSelectedAdvocate(adv);
    setScreen(Screen.ADVOCATE_CALL);
  };

  const handleMessage = (adv: Advocate) => {
    setSelectedAdvocate(adv);
    setScreen(Screen.ADVOCATE_CHAT);
  };

  const filteredAdvocates = advocates.filter(adv => 
    adv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    adv.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout title="Hire an Advocate" showBack>
      <div className="space-y-6">
        {/* Search */}
        <div className="bg-white border border-sky-100 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm focus-within:ring-2 focus-within:ring-sky-100 transition-all">
          <Search size={22} className="text-sky-200" />
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none w-full text-base font-bold text-sky-900 placeholder:text-sky-100" 
          />
        </div>

        {/* Disclaimer Block */}
        <div className="bg-sky-50 border border-sky-100 p-6 rounded-[2rem] flex items-start gap-4">
          <AlertCircle className="text-sky-400 shrink-0" size={20} />
          <p className="text-sky-800 text-xs font-medium leading-relaxed">
            Fees and terms are negotiated directly between you and the advocate. Civic Assist only provides a verified directory.
          </p>
        </div>

        {/* Pastel Advocate Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAdvocates.map((adv, index) => (
            <motion.div 
              key={adv.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-sky-50 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-300 shrink-0 group-hover:bg-sky-100 transition-colors">
                  <Briefcase size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-sky-900 text-lg">{adv.name}</h3>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star size={14} className="fill-current" />
                      {adv.rating}
                    </div>
                  </div>
                  <p className="text-sky-400 font-bold text-xs uppercase tracking-widest mt-1">{adv.specialty}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-8 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                <span className="flex items-center gap-2"><MapPin size={12} /> {adv.location}</span>
                <span className="flex items-center gap-2"><Star size={12} /> {adv.experience} experience</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleCall(adv)}
                  className="bg-sky-400 text-white py-4 rounded-xl font-bold shadow-md hover:bg-sky-500 transition-all text-sm"
                >
                  Call Now
                </button>
                <button 
                  onClick={() => handleMessage(adv)}
                  className="bg-sky-50 text-sky-700 py-4 rounded-xl font-bold hover:bg-sky-100 transition-all text-sm"
                >
                  Message
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdvocateListScreen;
