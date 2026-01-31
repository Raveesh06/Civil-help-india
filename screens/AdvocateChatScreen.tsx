
import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Screen } from '../types';
import { ChevronLeft, Send, Paperclip, MoreVertical, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AdvocateChatScreen: React.FC = () => {
  const { selectedAdvocate, setScreen } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello! This is ${selectedAdvocate?.name}. How can I assist you with your legal query today?`, sender: 'advocate' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-[#F0F7FF] z-[200] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-sky-100 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => setScreen(Screen.HIRE_ADVOCATE)} className="p-2 text-sky-400 hover:bg-sky-50 rounded-full">
            <ChevronLeft />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-500">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-sky-900 text-sm">{selectedAdvocate?.name}</h3>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Online
              </p>
            </div>
          </div>
        </div>
        <button className="p-2 text-sky-200">
          <MoreVertical />
        </button>
      </header>

      {/* Security Banner */}
      <div className="bg-sky-50 px-6 py-2 flex items-center justify-center gap-2">
        <ShieldCheck size={14} className="text-sky-400" />
        <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">End-to-End Encrypted</span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-5 py-3 rounded-3xl font-medium shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-sky-500 text-white rounded-tr-none' 
                : 'bg-white text-sky-900 border border-sky-50 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-sky-100 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3 bg-sky-50 rounded-2xl px-4 py-2">
          <button className="p-2 text-sky-300 hover:text-sky-500 transition-colors">
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent border-none outline-none py-2 text-sky-900 font-bold placeholder:text-sky-200"
          />
          <button 
            onClick={handleSend}
            className={`p-3 rounded-xl transition-all ${input.trim() ? 'bg-sky-500 text-white shadow-lg' : 'bg-sky-100 text-sky-200'}`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvocateChatScreen;
