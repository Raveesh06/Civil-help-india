import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentResult {
  urgency: 'high' | 'medium' | 'low';
  assessment: string;
  suggestions: string[];
  legalNote?: string;
  issues: string[];
}

export const assessTicketUrgency = (
  category: string,
  selections: string[],
  description: string,
  language: string = 'English'
): AssessmentResult => {
  const text = `${category} ${selections.join(' ')} ${description}`.toLowerCase();

  // Define high-urgency keywords
  const highUrgencyKeywords = [
    'violence', 'threat', 'sexual', 'harassment', 'child', 'abuse', 'rape',
    'death', 'fatal', 'critical', 'emergency', 'danger', 'serious harm',
    'assault', 'attack', 'stabbing', 'shooting', 'fire', 'poisoning'
  ];

  // Define medium-urgency keywords
  const mediumUrgencyKeywords = [
    'corruption', 'harassment', 'repeated', 'nuisance', 'workplace',
    'unfair', 'discrimination', 'delayed', 'pension', 'delay',
    'office', 'service', 'official', 'bribery'
  ];

  // Urgency classification
  let urgency: 'high' | 'medium' | 'low' = 'low';
  let assessment = language === 'English'
    ? 'This is a general civic concern.'
    : 'यह एक सामान्य नागरिक चिंता है।';
  let suggestions: string[] = [];
  let legalNote = '';
  let issues: string[] = [];

  // Check for high urgency
  if (highUrgencyKeywords.some(keyword => text.includes(keyword))) {
    urgency = 'high';
    assessment = language === 'English'
      ? 'This complaint describes a serious safety concern that may require immediate attention.'
      : 'यह शिकायत एक गंभीर सुरक्षा चिंता का वर्णन करती है जिसमें तत्काल ध्यान देने की आवश्यकता हो सकती है।';
    
    suggestions = language === 'English'
      ? [
          '• Exact date and time of the incident',
          '• Precise location of the incident',
          '• Names and contact details of people involved',
          '• Photos, videos, or documents as proof',
          '• Witness details if available'
        ]
      : [
          '• घटना की सटीक तारीख और समय',
          '• घटना की सटीक जगह',
          '• शामिल लोगों के नाम और संपर्क विवरण',
          '• प्रमाण के रूप में फोटो, वीडियो या दस्तावेज़',
          '• उपलब्ध हो तो गवाह विवरण'
        ];

    legalNote = language === 'English'
      ? 'Issues of this nature may fall under punishable offences as per Indian law, and detailed evidence can help authorities act faster.'
      : 'इस प्रकार की समस्याएं भारतीय कानून के तहत दंडनीय अपराधों के अंतर्गत आ सकती हैं, और विस्तृत साक्ष्य अधिकारियों को तेजी से कार्य करने में मदद कर सकते हैं।';

    issues = language === 'English'
      ? ['Serious/Urgent Safety Issue', 'Requires Immediate Action']
      : ['गंभीर/तत्काल सुरक्षा समस्या', 'तत्काल कार्रवाई की आवश्यकता'];
  }
  // Check for medium urgency
  else if (mediumUrgencyKeywords.some(keyword => text.includes(keyword))) {
    urgency = 'medium';
    assessment = language === 'English'
      ? 'This complaint needs more details to be processed effectively.'
      : 'इस शिकायत को प्रभावी ढंग से संसाधित करने के लिए अधिक विवरण की आवश्यकता है।';

    suggestions = language === 'English'
      ? [
          '• Exact date when the issue started',
          '• Specific location or office details',
          '• Names of officials or people involved',
          '• Any supporting documents or evidence',
          '• Previous complaints or reference numbers'
        ]
      : [
          '• समस्या कब शुरू हुई इसकी सटीक तारीख',
          '• विशिष्ट स्थान या कार्यालय विवरण',
          '• शामिल अधिकारियों या लोगों के नाम',
          '• कोई समर्थन दस्तावेज़ या साक्ष्य',
          '• पिछली शिकायतें या संदर्भ संख्याएं'
        ];

    legalNote = language === 'English'
      ? 'This type of issue may fall under Indian law provisions, and providing complete details can help authorities take appropriate action.'
      : 'इस प्रकार की समस्या भारतीय कानून के प्रावधानों के अंतर्गत आ सकती है, और पूर्ण विवरण प्रदान करने से अधिकारियों को उचित कार्रवाई करने में मदद मिल सकती है।';

    issues = language === 'English'
      ? ['Needs More Details', 'Moderate Priority']
      : ['अधिक विवरण की जरूरत है', 'मध्यम प्राथमिकता'];
  }
  // Low urgency
  else {
    urgency = 'low';
    assessment = language === 'English'
      ? 'This is a general civic concern about municipal or local services.'
      : 'यह नगरपालिका या स्थानीय सेवाओं के बारे में एक सामान्य नागरिक चिंता है।';

    suggestions = language === 'English'
      ? [
          '• Location of the issue',
          '• When you noticed the problem',
          '• Any photos showing the issue',
          '• Impact on residents or services'
        ]
      : [
          '• समस्या का स्थान',
          '• आपने समस्या को कब नोटिस किया',
          '• समस्या दिखाने वाली कोई फोटो',
          '• निवासियों या सेवाओं पर प्रभाव'
        ];

    issues = language === 'English'
      ? ['General Civic Issue', 'Standard Processing']
      : ['सामान्य नागरिक मुद्दा', 'मानक प्रसंस्करण'];
  }

  return {
    urgency,
    assessment,
    suggestions,
    legalNote,
    issues
  };
};

interface TicketAssessmentProps {
  category: string;
  selections: string[];
  description: string;
  language: string;
}

const TicketAssessment: React.FC<TicketAssessmentProps> = ({
  category,
  selections,
  description,
  language
}) => {
  const result = assessTicketUrgency(category, selections, description, language);

  const urgencyIcon = {
    high: <AlertCircle className="text-rose-500" size={32} />,
    medium: <Clock className="text-amber-500" size={32} />,
    low: <CheckCircle className="text-emerald-500" size={32} />
  };

  const urgencyColor = {
    high: 'bg-rose-50 dark:bg-rose-900/20 border-rose-100 dark:border-rose-800',
    medium: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800',
    low: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800'
  };

  const urgencyText = {
    high: language === 'English' ? '🔴 High' : '🔴 उच्च',
    medium: language === 'English' ? '🟡 Medium' : '🟡 मध्यम',
    low: language === 'English' ? '🟢 Low' : '🟢 कम'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${urgencyColor[result.urgency]} border p-6 rounded-3xl space-y-4`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">{urgencyIcon[result.urgency]}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg dark:text-white">{language === 'English' ? 'Urgency Assessment' : 'आवश्यकता मूल्यांकन'}</h3>
            <span className="font-bold text-sm">{urgencyText[result.urgency]}</span>
          </div>
          <p className="text-sm font-medium dark:text-slate-300 mb-4">{result.assessment}</p>

          {result.issues.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
                {language === 'English' ? 'Classification' : 'वर्गीकरण'}
              </p>
              <div className="flex gap-2 flex-wrap">
                {result.issues.map((issue, idx) => (
                  <span key={idx} className={`text-[10px] font-bold px-3 py-1 rounded-full ${
                    result.urgency === 'high' ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300' :
                    result.urgency === 'medium' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
                    'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                  }`}>
                    {issue}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-2">
              {language === 'English' ? 'To Strengthen This Complaint' : 'इस शिकायत को मजबूत करने के लिए'}
            </p>
            <div className="space-y-1 text-sm dark:text-slate-300">
              {result.suggestions.map((suggestion, idx) => (
                <p key={idx} className="font-medium">{suggestion}</p>
              ))}
            </div>
          </div>

          {result.legalNote && (
            <div className={`mt-4 p-3 rounded-lg ${
              result.urgency === 'high' ? 'bg-rose-100/50 dark:bg-rose-900/30' :
              result.urgency === 'medium' ? 'bg-amber-100/50 dark:bg-amber-900/30' :
              'bg-emerald-100/50 dark:bg-emerald-900/30'
            }`}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1">
                {language === 'English' ? 'Legal Information' : 'कानूनी जानकारी'}
              </p>
              <p className="text-sm font-medium dark:text-slate-300">{result.legalNote}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TicketAssessment;
