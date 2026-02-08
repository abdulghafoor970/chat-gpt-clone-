
import React, { useState, useRef, useEffect } from 'react';

export default function ChatInput({ onGo, isBusy }: { onGo: (v: string) => void, isBusy: boolean }) {
  const [val, setVal] = useState('');
  const boxRef = useRef<HTMLTextAreaElement>(null);

  const handleFire = () => {
    if (val.trim() && !isBusy) {
      onGo(val.trim());
      setVal('');
    }
  };

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.height = '40px';
      boxRef.current.style.height = boxRef.current.scrollHeight + 'px';
    }
  }, [val]);

  return (
    <div className="max-w-3xl mx-auto w-full relative">
      <div className="relative flex flex-col w-full py-3 pl-4 pr-12 bg-[#40414F] border border-white/10 rounded-xl shadow-2xl focus-within:border-teal-500/50 transition-all">
        <textarea
          ref={boxRef}
          rows={1}
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleFire();
            }
          }}
          placeholder="Type your message to Abdul's AI..."
          className="bg-transparent border-0 outline-none resize-none text-sm leading-6 max-h-48 custom-scroll py-1"
          disabled={isBusy}
        />
        <button
          onClick={handleFire}
          disabled={!val.trim() || isBusy}
          className={`absolute right-3 bottom-3 p-1.5 rounded-lg transition-all ${
            val.trim() && !isBusy ? 'bg-teal-600 text-white' : 'bg-transparent text-gray-600'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </div>
    </div>
  );
}
