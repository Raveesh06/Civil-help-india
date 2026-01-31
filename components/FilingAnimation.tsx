
import React from 'react';
import { motion } from 'framer-motion';

const FilingAnimation: React.FC = () => {
  return (
    <div className="w-full h-80 flex flex-col items-center justify-center bg-white rounded-[3rem] overflow-hidden relative border border-slate-100 shadow-inner">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl" />
      </div>

      <svg width="400" height="240" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
        {/* Floor Gradient */}
        <defs>
          <linearGradient id="floorGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#E2E8F0" />
            <stop offset="80%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="20" y="190" width="360" height="2" fill="url(#floorGradient)" />
        
        {/* Desk / Counter */}
        <rect x="280" y="160" width="80" height="30" rx="4" fill="#F1F5F9" />
        <rect x="285" y="155" width="70" height="5" rx="2" fill="#CBD5E1" />
        
        {/* Status Tray (Professional Design) */}
        <g transform="translate(295, 130)">
          <rect x="0" y="10" width="50" height="20" rx="4" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
          <path d="M5 10V5H45V10" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
          <motion.rect
            x="2" y="12" width="46" height="16" rx="2" fill="#3B82F6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              scale: [0.8, 1.1, 1] 
            }}
            transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
          />
          <text x="25" y="45" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle" className="uppercase tracking-widest">Filed Issues</text>
        </g>

        {/* Character Group - Corporate Style */}
        <motion.g
          initial={{ x: -60 }}
          animate={{ x: 265 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        >
          {/* Head & Neck */}
          <circle cx="30" cy="80" r="10" fill="#475569" />
          <rect x="28" y="88" width="4" height="4" fill="#475569" />
          
          {/* Torso (Office Shirt/Vest) */}
          <path d="M18 92H42L40 135H20L18 92Z" fill="#1E293B" />
          <rect x="29" y="92" width="2" height="43" fill="#334155" opacity="0.3" />
          
          {/* Walking Legs Animation */}
          <motion.path 
            d="M24 135L20 165" stroke="#1E293B" strokeWidth="6" strokeLinecap="round"
            animate={{ d: ["M24 135L20 165", "M24 135L30 165", "M24 135L20 165"] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
          />
          <motion.path 
            d="M36 135L40 165" stroke="#1E293B" strokeWidth="6" strokeLinecap="round"
            animate={{ d: ["M36 135L40 165", "M36 135L30 165", "M36 135L40 165"] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
          />

          {/* Arms */}
          <motion.path 
             d="M18 95L12 120" stroke="#1E293B" strokeWidth="5" strokeLinecap="round"
             animate={{ rotate: [-5, 5, -5] }}
             transition={{ repeat: Infinity, duration: 0.6 }}
          />
          
          {/* Bag (Brown Leather) */}
          <rect x="42" y="110" width="16" height="20" rx="3" fill="#78350F" />
          <rect x="45" y="113" width="10" height="2" fill="#B45309" />
          
          {/* The Document - Smooth Drop Physics */}
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [0, 0, 35],
              x: [0, 0, 5],
              rotate: [0, 0, 15]
            }}
            transition={{ delay: 2.3, duration: 1.2, ease: "easeIn" }}
          >
            <rect x="35" y="100" width="12" height="16" rx="1" fill="white" stroke="#CBD5E1" strokeWidth="0.5" />
            <rect x="38" y="104" width="6" height="1" fill="#E2E8F0" />
            <rect x="38" y="107" width="6" height="1" fill="#E2E8F0" />
            <rect x="38" y="110" width="4" height="1" fill="#E2E8F0" />
          </motion.g>
        </motion.g>
      </svg>

      {/* Progress Indicator */}
      <div className="mt-4 w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute inset-0 bg-blue-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        />
      </div>
      <motion.p 
        className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Syncing with government portal
      </motion.p>
    </div>
  );
};

export default FilingAnimation;
