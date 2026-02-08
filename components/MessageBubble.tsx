
import React from 'react';
import { Message, MessageRole } from '../types';

interface MessageBubbleProps {
  msg: Message;
}

/**
 * MessageBubble component.
 * Uses React.FC to ensure standard props like 'key' are correctly handled during list rendering.
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ msg }) => {
  const isBot = msg.role === MessageRole.ASSISTANT;

  return (
    <div className={`group py-8 w-full border-b border-white/5 ${isBot ? 'bg-[#444654]' : 'bg-[#343541]'}`}>
      <div className="max-w-3xl mx-auto flex gap-4 px-4 lg:px-0">
        <div className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center font-bold text-[10px] text-white shadow-md ${isBot ? 'bg-teal-600' : 'bg-indigo-600'}`}>
          {isBot ? 'AG' : 'ME'}
        </div>
        <div className="flex-1">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-slate-100 selection:bg-teal-500/40">
            {msg.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
