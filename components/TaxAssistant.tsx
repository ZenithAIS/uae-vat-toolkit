
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const TaxAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm your UAE VAT Assistant. I can help with registration rules, standard rates, filing dates, and general compliance. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    // Prepare history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const response = await geminiService.sendMessage(userMessage, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-[500px] sm:h-[600px] lg:h-[700px]">
      <div className="bg-uae-green px-6 py-4 flex items-center justify-between flex-shrink-0 rounded-t-2xl">
        <h2 className="text-white font-semibold flex items-center">
          <i className="fas fa-robot mr-2"></i>
          AI VAT Expert
        </h2>
        <span className="text-[10px] bg-white/20 text-white px-2 py-1 rounded uppercase tracking-wider font-bold">Powered by Gemini</span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-uae-green text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-sm flex space-x-1 items-center">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-white rounded-b-2xl">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about UAE VAT rules..."
            className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-uae-green focus:border-transparent transition-all outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className="w-12 h-12 bg-uae-green text-white rounded-xl flex items-center justify-center hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Consult a tax professional for official advice.
        </p>
      </div>
    </div>
  );
};

export default TaxAssistant;
