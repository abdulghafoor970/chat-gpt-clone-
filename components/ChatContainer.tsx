
import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { Message } from '../types';

interface ChatProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSubmit: (text: string) => void;
  onClear: () => void;
  headerText: string;
}

const ChatContainer: React.FC<ChatProps> = ({ messages, isLoading, error, onSubmit, onClear, headerText }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full w-full bg-[#343541]">
      <header className="flex md:hidden items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-sm font-semibold truncate max-w-[200px]">{headerText}</h2>
        <button onClick={onClear} className="text-xs text-gray-400">Reset</button>
      </header>

      <div className="flex-1 overflow-y-auto pt-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4 animate-in fade-in duration-700">
            <h1 className="text-4xl font-bold mb-8 text-white/10 tracking-tighter uppercase italic">
              Abdul Ghafoor
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
               <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                 <p className="text-xs text-teal-400 mb-2 font-bold uppercase tracking-widest">Example</p>
                 <p className="text-sm italic">"Help me explain React Hooks..."</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                 <p className="text-xs text-purple-400 mb-2 font-bold uppercase tracking-widest">Capabilities</p>
                 <p className="text-sm italic">"Memory of current session..."</p>
               </div>
               <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
                 <p className="text-xs text-amber-400 mb-2 font-bold uppercase tracking-widest">Safety</p>
                 <p className="text-sm italic">"Trained to avoid risky topics..."</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map(m => <MessageBubble key={m.id} msg={m} />)}
            
            {isLoading && (
              <div className="py-8 bg-[#444654] animate-pulse">
                <div className="max-w-3xl mx-auto px-4 flex gap-4">
                  <div className="w-8 h-8 rounded bg-teal-600 flex-shrink-0 flex items-center justify-center">
                    <span className="dot-pulse w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <div className="space-y-2 pt-2 flex-1">
                    <div className="h-2 w-3/4 bg-gray-500/20 rounded"></div>
                    <div className="h-2 w-1/2 bg-gray-500/20 rounded"></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="max-w-3xl mx-auto p-4 w-full">
                <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg text-sm text-red-200">
                  {error}
                </div>
              </div>
            )}
            <div ref={bottomRef} className="h-32" />
          </div>
        )}
      </div>

      <div className="w-full bg-gradient-to-t from-[#343541] via-[#343541] to-transparent p-4 pb-8">
        <ChatInput onGo={onSubmit} isBusy={isLoading} />
        <p className="text-center text-[10px] text-gray-500 mt-4">
          Chat Abdul Ghafoor v1.0. Developed for the Hackathon Demo.
        </p>
      </div>
    </div>
  );
};

export default ChatContainer;
