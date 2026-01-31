
import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { ChevronLeft } from 'lucide-react';

const OTPScreen: React.FC = () => {
  const { setScreen, userPhone, isElderlyMode, t } = useApp();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(45);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto focus next
      if (value && index < 3) {
        (document.getElementById(`otp-${index + 1}`) as HTMLInputElement)?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (otp.every(v => v !== '')) {
      setScreen(Screen.CONSENT);
    }
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      setResendTimer(45);
      // Logic for actual OTP resend API call would go here
    }
  };

  return (
    <div className={`min-h-screen flex flex-col p-6 bg-white max-w-md mx-auto ${isElderlyMode ? 'elderly-mode' : ''}`}>
      <button onClick={() => setScreen(Screen.LOGIN)} className="mb-8 p-2 -ml-2 hover:bg-slate-100 rounded-full w-fit text-sky-400">
        <ChevronLeft size={28} />
      </button>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2 text-sky-900">{t('verifyPhone')}</h1>
        <p className="text-slate-500 mb-10">{t('verifyCodeSent')} <span className="font-bold text-slate-800">+91 {userPhone}</span></p>

        <div className="flex justify-between gap-4 mb-10">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className={`w-full h-16 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-sky-900 ${isElderlyMode ? 'text-3xl' : 'text-2xl'}`}
            />
          ))}
        </div>

        <button 
          onClick={handleVerify}
          className="w-full bg-sky-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all"
        >
          {t('verifyContinue')}
        </button>

        <button 
          onClick={handleResend}
          disabled={resendTimer > 0}
          className={`w-full text-center mt-6 font-bold transition-all ${resendTimer > 0 ? 'text-slate-300' : 'text-sky-500 hover:text-sky-600'}`}
        >
          {resendTimer > 0 ? `${t('resendIn')} 0:${resendTimer.toString().padStart(2, '0')}` : t('resendNow')}
        </button>
      </div>
    </div>
  );
};

export default OTPScreen;
