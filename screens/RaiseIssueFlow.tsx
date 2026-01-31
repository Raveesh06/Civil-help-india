
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../AppContext';
import { Screen, Category, Complaint } from '../types';
import { FileText, Mic, Users, CheckCircle, ChevronRight, AlertCircle, Loader2, MapPin } from 'lucide-react';
import FilingAnimation from '../components/FilingAnimation';
import TicketAssessment from '../components/TicketAssessment';

const RaiseIssueFlow: React.FC = () => {
  const { currentScreen, t } = useApp();
  
  const [category, setCategory] = useState<Category | ''>('');
  const [selections, setSelections] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [freeTextInput, setFreeTextInput] = useState('');
  
  const resetFlow = () => {
    setCategory('');
    setSelections([]);
    setAddress('');
    setDescription('');
    setFreeTextInput('');
  };

  if (currentScreen === Screen.RAISE_ISSUE_OPTIONS) return <OptionSelection reset={resetFlow} />;
  if (currentScreen === Screen.FILE_ONLINE) return <FileOnlineForm 
      category={category} setCategory={setCategory} 
      selections={selections} setSelections={setSelections}
      address={address} setAddress={setAddress}
      setFreeTextInput={setFreeTextInput}
    />;
  if (currentScreen === Screen.SPEAK_AND_FILE) return <SpeakAndFile 
      address={address} setAddress={setAddress}
      setDescription={setDescription}
    />;
  if (currentScreen === Screen.ASSISTED_HELP) return <AssistedHelpForm 
      address={address} setAddress={setAddress}
    />;
  if (currentScreen === Screen.AI_REVIEW) return <AIReviewScreen 
      category={category} selections={selections} 
      address={address} description={description}
      freeTextInput={freeTextInput}
    />;
  if (currentScreen === Screen.SUBMISSION_ANIMATION) return <SubmissionAnimationScreen 
      category={category} selections={selections}
      address={address} description={description}
      freeTextInput={freeTextInput}
    />;
  
  return null;
};

const OptionSelection = ({ reset }: { reset: () => void }) => {
  const { setScreen, t, language } = useApp();
  React.useEffect(reset, []);
  
  return (
    <Layout title={t('raiseIssue')} showBack>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">{t('chooseMethod')}</h2>
        <div className="grid grid-cols-1 gap-4">
          <SelectionCard 
            icon={<FileText className="text-blue-600" size={32} />}
            title={t('fileOnline')}
            desc={t('fileOnlineDesc')}
            onClick={() => setScreen(Screen.FILE_ONLINE)}
          />
          <SelectionCard 
            icon={<AlertCircle className="text-purple-600" size={32} />}
            title={language === 'English' ? 'Describe Your Issue' : 'अपनी समस्या बताएं'}
            desc={language === 'English' ? 'Tell us about your problem in your own words' : 'अपनी समस्या के बारे में अपने शब्दों में बताएं'}
            onClick={() => setScreen(Screen.FILE_ONLINE)}
          />
          <SelectionCard 
            icon={<Mic className="text-emerald-600" size={32} />}
            title={t('speakAndFile')}
            desc={t('speakAndFileDesc')}
            onClick={() => setScreen(Screen.SPEAK_AND_FILE)}
          />
          <SelectionCard 
            icon={<Users className="text-amber-600" size={32} />}
            title={t('assistedHelp')}
            desc={t('assistedHelpDesc')}
            onClick={() => setScreen(Screen.ASSISTED_HELP)}
          />
        </div>
      </div>
    </Layout>
  );
};

const SelectionCard = ({ icon, title, desc, onClick }: any) => {
  const { isElderlyMode } = useApp();
  return (
    <button onClick={onClick} className="flex items-center gap-5 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl text-left active:scale-[0.98] transition-all hover:border-blue-300 dark:hover:border-blue-700 group">
      <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className={`font-bold ${isElderlyMode ? 'text-xl' : 'text-lg'} text-slate-900 dark:text-white`}>{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{desc}</p>
      </div>
      <ChevronRight className="text-slate-300" />
    </button>
  );
};

const FileOnlineForm = ({ category, setCategory, selections, setSelections, address, setAddress, setFreeTextInput }: any) => {
  const { setScreen, isElderlyMode, t, language } = useApp();
  const [useFreeText, setUseFreeText] = useState(false);
  const [freeText, setFreeText] = useState('');

  const categoryMapping: {label: Category, tKey: any}[] = [
    {label: 'Electricity & Utilities', tKey: 'catElectricity'},
    {label: 'Property & Documents', tKey: 'catProperty'},
    {label: 'Safety & Security', tKey: 'catSafety'},
    {label: 'Office Service Issue', tKey: 'catOffice'},
    {label: 'Elderly Support', tKey: 'catElderly'},
    {label: 'Others', tKey: 'catOthers'},
  ];

  const subOptions: Record<string, string[]> = {
    'Electricity & Utilities': language === 'English' ? ['Billing error', 'Connection delay', 'Power outage', 'Faulty meter'] : ['बिलिंग त्रुटि', 'कनेक्शन में देरी', 'बिजली कटौती', 'दोषपूर्ण मीटर'],
    'Property & Documents': language === 'English' ? ['Property tax issue', 'Inheritance paper help', 'Encroachment report', 'Zoning query'] : ['संपत्ति कर मुद्दा', 'विरासत पत्र सहायता', 'अतिक्रमण रिपोर्ट', 'ज़ोनिंग प्रश्न'],
    'Safety & Security': language === 'English' ? ['Street lighting', 'Neighborhood watch', 'Speeding complaint', 'Reporting suspicious activity'] : ['स्ट्रीट लाइटिंग', 'नेबरहुड वॉच', 'तेज रफ्तार की शिकायत', 'संदिग्ध गतिविधि की रिपोर्टिंग'],
    'Office Service Issue': language === 'English' ? ['Staff behavior', 'Service delay', 'Corruption reporting', 'Process confusion'] : ['कर्मचारी व्यवहार', 'सेवा में देरी', 'भ्रष्टाचार की रिपोर्टिंग', 'प्रक्रिया भ्रम'],
    'Elderly Support': language === 'English' ? ['Pension delay', 'Home visit request', 'Health screening', 'Social aid'] : ['पेंशन में देरी', 'होम विजिट अनुरोध', 'स्वास्थ्य जांच', 'सामाजिक सहायता'],
    'Others': language === 'English' ? ['General Grievance', 'Public Nuisance', 'Local Infrastructure', 'Uncategorized Help'] : ['सामान्य शिकायत', 'सार्वजनिक उपद्रव', 'स्थानीय बुनियादी ढांचा', 'अवर्गीकृत सहायता']
  };

  const handleToggle = (opt: string) => {
    setSelections((prev: string[]) => prev.includes(opt) ? prev.filter(i => i !== opt) : [...prev, opt]);
  };

  const handleFreeTextSubmit = () => {
    if (freeText.trim() && address.trim()) {
      setFreeTextInput(freeText);
      setCategory('Free Text');
      setScreen(Screen.AI_REVIEW);
    }
  };

  return (
    <Layout title={t('fileOnline')} showBack>
      <div className="space-y-6">
        {/* Toggle between categories and free text */}
        <div className="flex gap-3 bg-white dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setUseFreeText(false)}
            className={`flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all ${!useFreeText ? 'bg-blue-700 text-white' : 'text-slate-600 dark:text-slate-400'}`}
          >
            {language === 'English' ? 'Select Category' : 'श्रेणी चुनें'}
          </button>
          <button 
            onClick={() => setUseFreeText(true)}
            className={`flex-1 py-3 px-4 rounded-full font-bold text-sm transition-all ${useFreeText ? 'bg-purple-700 text-white' : 'text-slate-600 dark:text-slate-400'}`}
          >
            {language === 'English' ? 'Describe Your Issue' : 'समस्या बताएं'}
          </button>
        </div>

        {!useFreeText ? (
          <>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">{t('step1Cat')}</label>
              <div className="flex flex-wrap gap-2">
                {categoryMapping.map(cat => (
                  <button 
                    key={cat.label} 
                    onClick={() => { setCategory(cat.label); setSelections([]); }}
                    className={`px-4 py-3 rounded-2xl text-sm font-bold border transition-all ${category === cat.label ? 'bg-blue-700 text-white border-blue-800 shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
                  >
                    {t(cat.tKey)}
                  </button>
                ))}
              </div>
            </div>

            {category && (
              <div className="animate-fade-in">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">{t('step2Issue')}</label>
                <div className="space-y-2">
                  {subOptions[category].map(opt => (
                    <label key={opt} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${selections.includes(opt) ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}>
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
                        checked={selections.includes(opt)}
                        onChange={() => handleToggle(opt)}
                      />
                      <span className={`font-semibold ${isElderlyMode ? 'text-lg' : 'text-base'} dark:text-white`}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                 <MapPin size={16} /> {t('locationAddress')}
               </label>
               <textarea 
                 placeholder={t('locationPlaceholder')}
                 className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-200 dark:text-white min-h-[100px]"
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
               />
            </div>

            <button 
              onClick={() => setScreen(Screen.AI_REVIEW)}
              disabled={!category || selections.length === 0 || !address.trim()}
              className={`w-full py-5 rounded-2xl font-bold text-lg mt-4 shadow-lg transition-all active:scale-95 ${category && selections.length > 0 && address.trim() ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}`}
            >
              {t('reviewApp')}
            </button>
          </>
        ) : (
          <>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-6 rounded-3xl">
              <h3 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-2">
                {language === 'English' ? 'Describe Your Problem' : 'अपनी समस्या का वर्णन करें'}
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-200 mb-4">
                {language === 'English' 
                  ? 'Tell us about your issue in your own words. Include details like when it happened, where, and who was involved.'
                  : 'अपनी समस्या के बारे में अपने शब्दों में बताएं। यह कब हुआ, कहाँ, और कौन शामिल था, इसके विवरण दें।'}
              </p>
              <textarea 
                placeholder={language === 'English' 
                  ? 'Example: My electricity bill has tripled without any explanation...'
                  : 'उदाहरण: मेरा बिजली बिल बिना किसी कारण के तीन गुना हो गया है...'}
                className="w-full bg-white dark:bg-slate-800 border border-purple-100 dark:border-purple-700 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-purple-300 dark:text-white min-h-[150px] resize-none"
                value={freeText}
                onChange={(e) => setFreeText(e.target.value)}
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
               <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                 <MapPin size={16} /> {t('locationAddress')}
               </label>
               <textarea 
                 placeholder={t('locationPlaceholder')}
                 className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-200 dark:text-white min-h-[100px]"
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
               />
            </div>

            <button 
              onClick={handleFreeTextSubmit}
              disabled={!freeText.trim() || !address.trim()}
              className={`w-full py-5 rounded-2xl font-bold text-lg mt-4 shadow-lg transition-all active:scale-95 ${freeText.trim() && address.trim() ? 'bg-purple-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}`}
            >
              {language === 'English' ? 'Analyze & Review' : 'विश्लेषण और समीक्षा'}
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

const SpeakAndFile = ({ address, setAddress, setDescription }: any) => {
  const { setScreen, t, language } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setShowForm(true);
      const sampleText = language === 'English' 
        ? "My electricity bill for the month of January is triple the normal amount, even though I was away for two weeks. I suspect a faulty meter." 
        : "जनवरी के महीने के लिए मेरा बिजली बिल सामान्य राशि से तीन गुना है, भले ही मैं दो सप्ताह के लिए बाहर था। मुझे दोषपूर्ण मीटर का संदेह है।";
      setDescription(sampleText);
    }, 3000);
  };

  return (
    <Layout title={t('speakAndFile')} showBack>
      <div className="flex flex-col items-center justify-center py-6">
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">{t('speakIssue')}</h2>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8 max-w-xs text-sm">{t('speakDesc')}</p>
        
        <div className="relative mb-8">
          {isRecording && (
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping" />
          )}
          <button 
            onClick={startRecording}
            className={`w-32 h-32 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 ${isRecording ? 'bg-emerald-600 scale-110' : 'bg-white dark:bg-slate-800 border-2 border-emerald-500 text-emerald-600'}`}
          >
            <Mic size={48} className={isRecording ? 'text-white' : ''} />
          </button>
        </div>

        <p className={`font-bold transition-all mb-8 ${isRecording ? 'text-emerald-600' : 'text-slate-400'}`}>
          {isRecording ? t('listening') : t('tapMic')}
        </p>

        {showForm && (
          <div className="w-full animate-slide-up space-y-4">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-sm uppercase text-slate-400 mb-3 tracking-widest">{t('capturedText')}</h3>
              <p className="italic text-slate-700 dark:text-slate-300 text-sm">"{(language === 'English' ? "My electricity bill..." : "मेरा बिजली बिल...")}"</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                <MapPin size={16} /> {t('locationAddress')}
              </label>
              <textarea 
                placeholder={t('locationPlaceholder')}
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-200 dark:text-white min-h-[80px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button 
              onClick={() => setScreen(Screen.AI_REVIEW)} 
              disabled={!address.trim()}
              className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${address.trim() ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}
            >
              {t('continue')}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

const AssistedHelpForm = ({ address, setAddress }: any) => {
  const { setScreen, t, language } = useApp();
  const [reason, setReason] = useState('');

  const reasons = language === 'English' 
    ? ['Elderly', 'Disability', 'Cannot visit office alone', 'First-time user'] 
    : ['बुजुर्ग', 'विकलांगता', 'अकेले कार्यालय नहीं जा सकते', 'पहली बार उपयोगकर्ता'];

  return (
    <Layout title={t('assistedHelp')} showBack>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">{language === 'English' ? 'Select Assistance Type' : 'सहायता का प्रकार चुनें'}</label>
          <div className="grid grid-cols-1 gap-3">
            {reasons.map(r => (
              <button 
                key={r}
                onClick={() => setReason(r)}
                className={`p-5 rounded-2xl text-left font-bold border transition-all ${reason === r ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-900 dark:text-amber-200' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
              >
                {r} {language === 'English' ? 'Assistance' : 'सहायता'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
           <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
             <MapPin size={16} /> {language === 'English' ? 'Home Address for Support' : 'सहायता के लिए घर का पता'}
           </label>
           <textarea 
             placeholder={t('locationPlaceholder')}
             className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-200 dark:text-white min-h-[80px]"
             value={address}
             onChange={(e) => setAddress(e.target.value)}
           />
        </div>

        <button 
          onClick={() => setScreen(Screen.SUBMISSION_ANIMATION)}
          disabled={!reason || !address.trim()}
          className={`w-full py-5 rounded-2xl font-bold text-lg mt-4 shadow-lg transition-all active:scale-95 ${reason && address.trim() ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}
        >
          {language === 'English' ? 'Confirm Assistance' : 'सहायता की पुष्टि करें'}
        </button>
      </div>
    </Layout>
  );
};

const AIReviewScreen = ({ category, selections, address, description, freeTextInput }: any) => {
  const { setScreen, t, language } = useApp();

  // Use free text input if available, otherwise use structured input
  const finalDescription = freeTextInput || description || (selections.length > 0 ? selections.join(', ') : '');

  return (
    <Layout title={language === 'English' ? "Review & Submit" : "समीक्षा और सबमिट करें"} showBack>
      <div className="space-y-6">
        {/* Ticket Assessment Component */}
        <TicketAssessment
          category={freeTextInput ? 'Free Text' : category}
          selections={freeTextInput ? [] : selections}
          description={finalDescription}
          language={language}
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-blue-800 dark:text-blue-200 uppercase">Summary</div>
          <h3 className="font-bold text-lg mb-4 dark:text-white">{language === 'English' ? 'Complaint Details' : 'शिकायत विवरण'}</h3>
          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
            {!freeTextInput && (
              <div className="pb-3 border-b border-blue-100/50 dark:border-slate-700">
                <span className="text-[10px] uppercase text-blue-400 block mb-1">{language === 'English' ? 'Subject' : 'विषय'}</span>
                <p>{language === 'English' ? 'Grievance' : 'शिकायत'}: {category} - {selections.join(', ')}</p>
              </div>
            )}
            <div className="pb-3 border-b border-blue-100/50 dark:border-slate-700">
              <span className="text-[10px] uppercase text-blue-400 block mb-1">{language === 'English' ? 'Description' : 'विवरण'}</span>
              <p>{finalDescription || (language === 'English' ? 'Requesting verification.' : 'सत्यापन का अनुरोध।')}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase text-blue-400 block mb-1">{language === 'English' ? 'Location' : 'स्थान'}</span>
              <p className="flex items-center gap-2"><MapPin size={14} className="text-rose-400" /> {address}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setScreen(Screen.SUBMISSION_ANIMATION)}
          className="w-full bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all"
        >
          {t('finalSubmit')}
        </button>
      </div>
    </Layout>
  );
};

const SubmissionAnimationScreen = ({ category, selections, address, description, freeTextInput }: any) => {
  const { setScreen, addComplaint, language, t } = useApp();
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const newId = `#SAH-${Math.floor(Math.random() * 900000 + 100000)}`;
      const finalTitle = freeTextInput 
        ? (freeTextInput.split('\n')[0].substring(0, 50) + '...')
        : (selections.length > 0 ? selections[0] : (category || 'Civic Issue'));
      const finalDescription = freeTextInput || description || 'No additional details provided.';
      
      const newComplaint: Complaint = {
        id: newId,
        title: finalTitle,
        category: freeTextInput ? 'Others' : ((category as Category) || 'Others'),
        status: 'Submitted',
        date: language === 'English' ? 'Today, Just now' : 'आज, अभी',
        description: finalDescription,
        address: address
      };
      addComplaint(newComplaint);
      setDone(true);
    }, 4500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout hideNav>
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center max-w-2xl mx-auto">
        {!done ? (
          <div className="space-y-8 w-full">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">{language === 'English' ? 'Processing Application' : 'आवेदन पर कार्रवाई जारी'}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">{language === 'English' ? 'Your Sahayak is connecting to the central grievance portal.' : 'आपका सहायक केंद्रीय शिकायत पोर्टल से जुड़ रहा है।'}</p>
            </div>
            <FilingAnimation />
            <div className="flex items-center justify-center gap-3 text-blue-600">
              <Loader2 className="animate-spin" size={20} />
              <span className="font-bold text-xs uppercase tracking-widest">{language === 'English' ? 'Analyzing & Registering' : 'विश्लेषण और पंजीकरण जारी'}</span>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col items-center">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-8 shadow-inner">
              <CheckCircle size={56} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">{language === 'English' ? 'Issue Filed Successfully!' : 'मुद्दा सफलतापूर्वक दर्ज किया गया!'}</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg font-medium">{language === 'English' ? 'Your request is now visible in the Track section.' : 'आपका अनुरोध अब ट्रैक अनुभाग में दिखाई दे रहा है।'}</p>
            
            <div className="w-full space-y-3">
              <button 
                onClick={() => setScreen(Screen.TRACK_REQUESTS)}
                className="w-full bg-blue-700 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-800 transition-all active:scale-95"
              >
                {t('trackRequests')}
              </button>
              <button 
                onClick={() => setScreen(Screen.DASHBOARD)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
              >
                {language === 'English' ? 'Return Home' : 'घर वापस जाएं'}
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RaiseIssueFlow;
