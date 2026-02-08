
import React from 'react';
import { ChatHistory } from '../types';

interface SidebarProps {
  sessions: ChatHistory[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sessions, activeId, onSelect, onNew, onDelete }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-[#202123] p-2 border-r border-white/5">
      <button 
        onClick={onNew}
        className="flex items-center gap-3 w-full px-3 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-all text-sm font-medium text-white mb-4"
      >
        <span className="text-xl">+</span> New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-1 custom-scroll">
        {sessions.map(s => (
          <div 
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
              activeId === s.id ? 'bg-[#343541] text-white' : 'text-gray-400 hover:bg-[#2A2B32] hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
               <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
               <span className="text-sm truncate w-36 font-light">{s.title}</span>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(s.id); }}
              className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity p-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 px-2 pb-2">
        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold shadow-lg">
            AG
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-200">Abdul Ghafoor</p>
            <p className="text-[10px] text-gray-500 group-hover:text-gray-400">Project Contributor</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
