import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AssessmentResult {
  urgency: 'high' | 'medium' | 'low';
  assessment: string;
  suggestions: string[];
  legalNote?: string;
  issues: string[];
  isVague: boolean;
  vagueReasons: string[];
}

// Check if complaint is vague (lacks specific details)
const isComplaintVague = (text: string, language: string): { vague: boolean; reasons: string[] } => {
  const lowerText = text.toLowerCase();
  const vagueReasons: string[] = [];

  // Check for missing date/time
  const dateKeywords = ['today', 'yesterday', 'date', 'time', 'morning', 'afternoon', 'evening', 'night', 
    'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december',
    'आज', 'कल', 'तारीख', 'समय', 'सुबह', 'दोपहर', 'शाम', 'रात'];
  const hasDate = dateKeywords.some(keyword => lowerText.includes(keyword));
  if (!hasDate) {
    vagueReasons.push(language === 'English' ? 'No specific date/time mentioned' : 'कोई विशिष्ट तारीख/समय नहीं है');
  }

  // Check for missing location
  const locationKeywords = ['location', 'address', 'area', 'place', 'street', 'road', 'zone', 'ward',
    'स्थान', 'पता', 'जिला', 'तहसील', 'सड़क', 'मोहल्ला', 'वार्ड'];
  const hasLocation = locationKeywords.some(keyword => lowerText.includes(keyword)) || lowerText.length > 50;
  if (!hasLocation) {
    vagueReasons.push(language === 'English' ? 'No specific location mentioned' : 'कोई विशिष्ट स्थान नहीं है');
  }

  // Check for missing people involved
  const peopleKeywords = ['person', 'people', 'officer', 'official', 'staff', 'employee', 'name',
    'व्यक्ति', 'लोग', 'अधिकारी', 'कर्मचारी', 'नाम'];
  const hasPeople = peopleKeywords.some(keyword => lowerText.includes(keyword));
  if (!hasPeople && text.split(' ').length < 20) {
    vagueReasons.push(language === 'English' ? 'No people involved mentioned' : 'शामिल व्यक्तियों के बारे में कोई जानकारी नहीं');
  }

  // Check for evidence
  const evidenceKeywords = ['photo', 'video', 'document', 'evidence', 'proof', 'screenshot',
    'फोटो', 'वीडियो', 'दस्तावेज़', 'साक्ष्य', 'प्रमाण'];
  const hasEvidence = evidenceKeywords.some(keyword => lowerText.includes(keyword));
  if (!hasEvidence && text.split(' ').length < 15) {
    vagueReasons.push(language === 'English' ? 'No supporting evidence/documents mentioned' : 'समर्थन साक्ष्य/दस्तावेज़ नहीं है');
  }

  // Check overall detail level (word count)
  const wordCount = text.split(/\s+/).length;
  const isDetailedEnough = wordCount > 15;

  return {
    vague: vagueReasons.length > 0 && !isDetailedEnough,
    reasons: vagueReasons
  };
};

export const assessTicketUrgency = (
  category: string,
  selections: string[],
  description: string,
  language: string = 'English'
): AssessmentResult => {
  const text = `${category} ${selections.join(' ')} ${description}`.toLowerCase();
  const { vague, reasons: vagueReasons } = isComplaintVague(text, language);

  // Define high-urgency keywords
  const highUrgencyKeywords = [
    'violence', 'threat', 'threaten', 'sexual', 'rape', 'molestation', 'harassment',
    'child', 'abuse', 'death', 'fatal', 'critical', 'emergency', 'danger', 'serious harm',
    'assault', 'attack', 'stabbing', 'shooting', 'fire', 'poisoning', 'extortion',
    'blackmail', 'kidnapping', 'abduction', 'hit', 'beaten', 'injury', 'injury report',
    'हिंसा', 'धमकी', 'यौन', 'बलात्कार', 'छेड़छाड़', 'उत्पीड़न', 'बाल', 'दुर्व्यवहार',
    'मौत', 'घातक', 'आपातकालीन', 'खतरा', 'गंभीर', 'हमला', 'चोट'
  ];

  // Define medium-urgency keywords
  const mediumUrgencyKeywords = [
    'corruption', 'bribery', 'extortion', 'harassment', 'repeated', 'nuisance', 'workplace',
    'unfair', 'discrimination', 'delayed', 'pension', 'delay', 'office', 'service',
    'official', 'payment', 'salary', 'wrongful', 'illegal', 'unauthorized',
    'भ्रष्टाचार', 'रिश्वत', 'उत्पीड़न', 'दोहराया', 'उत्पीड़न', 'कार्यस्थल',
    'असंगत', 'भेदभाव', 'विलंब', 'पेंशन', 'वेतन'
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
      ? 'This issue may fall under punishable offences as per Indian law. Providing complete details and evidence can help authorities take quicker action.'
      : 'यह समस्या भारतीय कानून के तहत दंडनीय अपराधों के अंतर्गत आ सकती है। पूर्ण विवरण और साक्ष्य प्रदान करने से अधिकारियों को तेजी से कार्रवाई करने में मदद मिल सकती है।';

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
      ? 'This issue may fall under Indian law provisions. Providing complete details can help authorities take appropriate action.'
      : 'यह समस्या भारतीय कानून के प्रावधानों के अंतर्गत आ सकती है। पूर्ण विवरण प्रदान करने से अधिकारियों को उचित कार्रवाई करने में मदद मिल सकती है।';

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
    issues,
    isVague: vague,
    vagueReasons
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

  // Color schemes with high contrast - dark text on light backgrounds
  const urgencyStyles = {
    high: {
      container: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
      icon: 'text-red-700 dark:text-red-400',
      text: 'text-red-800 dark:text-red-100',
      badge: 'text-red-700 dark:text-red-200 font-black text-lg',
      button: 'text-red-700 dark:text-red-200 hover:text-red-900 dark:hover:text-red-100'
    },
    medium: {
      container: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800',
      icon: 'text-amber-700 dark:text-amber-400',
      text: 'text-amber-900 dark:text-amber-100',
      badge: 'text-amber-700 dark:text-amber-200 font-black text-lg',
      button: 'text-amber-700 dark:text-amber-200 hover:text-amber-900 dark:hover:text-amber-100'
    },
    low: {
      container: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
      icon: 'text-green-700 dark:text-green-400',
      text: 'text-green-900 dark:text-green-100',
      badge: 'text-green-700 dark:text-green-200 font-black text-lg',
      button: 'text-green-700 dark:text-green-200 hover:text-green-900 dark:hover:text-green-100'
    }
  };

  const style = urgencyStyles[result.urgency];

  const urgencyIcon = {
    high: <AlertCircle className={style.icon} size={40} strokeWidth={1.5} />,
    medium: <Clock className={style.icon} size={40} strokeWidth={1.5} />,
    low: <CheckCircle className={style.icon} size={40} strokeWidth={1.5} />
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
      className={`border-2 ${style.container} p-8 rounded-3xl space-y-5`}
    >
      {/* Header with Urgency Badge */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="pt-1 shrink-0">{urgencyIcon[result.urgency]}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className={`font-black text-2xl ${style.text}`}>
                {language === 'English' ? 'Urgency Assessment' : 'आवश्यकता मूल्यांकन'}
              </h3>
              <span className={style.badge}>{urgencyText[result.urgency]}</span>
            </div>

            {/* Main Assessment */}
            <p className={`${style.text} text-base font-bold leading-relaxed mb-4`}>
              {result.assessment}
            </p>

            {/* Vague Warning */}
            {result.isVague && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-white/50 dark:bg-black/30 border-l-4 border-amber-500 rounded-lg"
              >
                <p className="text-sm font-bold text-amber-900 dark:text-amber-100 mb-2">
                  {language === 'English' ? '⚠️ Your complaint appears incomplete:' : '⚠️ आपकी शिकायत अधूरी लगती है:'}
                </p>
                <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-200 font-semibold">
                  {result.vagueReasons.map((reason, idx) => (
                    <li key={idx}>• {reason}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Classification Badges */}
            {result.issues.length > 0 && (
              <div className="mb-5">
                <p className={`text-xs font-black uppercase tracking-widest ${style.text} opacity-75 mb-2`}>
                  {language === 'English' ? 'Classification' : 'वर्गीकरण'}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {result.issues.map((issue, idx) => {
                    const bgColor = result.urgency === 'high' ? 'bg-red-100 dark:bg-red-900/50' :
                                   result.urgency === 'medium' ? 'bg-amber-100 dark:bg-amber-900/50' :
                                   'bg-green-100 dark:bg-green-900/50';
                    return (
                      <span key={idx} className={`text-xs font-bold px-4 py-2 rounded-full ${bgColor} ${style.text}`}>
                        {issue}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Suggestions */}
            <div className="mb-5">
              <p className={`text-sm font-black uppercase tracking-widest ${style.text} opacity-75 mb-3`}>
                {language === 'English' ? 'To Strengthen This Complaint' : 'इस शिकायत को मजबूत करने के लिए'}
              </p>
              <div className="space-y-2 bg-white/30 dark:bg-black/20 p-4 rounded-2xl">
                {result.suggestions.map((suggestion, idx) => (
                  <p key={idx} className={`${style.text} font-bold text-sm leading-relaxed`}>
                    {suggestion}
                  </p>
                ))}
              </div>
            </div>

            {/* Legal Note */}
            {result.legalNote && (
              <div className={`${result.urgency === 'high' ? 'bg-red-100/60 dark:bg-red-900/40 border-red-300 dark:border-red-700' :
                              result.urgency === 'medium' ? 'bg-amber-100/60 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700' :
                              'bg-green-100/60 dark:bg-green-900/40 border-green-300 dark:border-green-700'} 
                             border-l-4 border p-4 rounded-lg`}>
                <p className={`text-xs font-black uppercase tracking-widest ${style.text} opacity-80 mb-2`}>
                  {language === 'English' ? 'Legal Information' : 'कानूनी जानकारी'}
                </p>
                <p className={`${style.text} text-sm font-bold leading-relaxed`}>
                  {result.legalNote}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketAssessment;
