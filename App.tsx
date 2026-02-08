
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';
import { Message, MessageRole, ChatHistory } from './types';
import { fetchAIResponse } from './services/aiService';

const App: React.FC = () => {
  // Using 'sessions' instead of 'chats' to feel more unique
  const [sessions, setSessions] = useState<ChatHistory[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeSession = sessions.find(s => s.id === activeId);

  // Auto-start a new session if Abdul's list is empty
  useEffect(() => {
    if (sessions.length === 0) {
      createNewSession();
    }
  }, []);

  const createNewSession = () => {
    const id = "session-" + Date.now();
    const freshConvo: ChatHistory = {
      id,
      title: 'Untitled Chat',
      messages: [],
      updatedAt: new Date()
    };
    setSessions(prev => [freshConvo, ...prev]);
    setActiveId(id);
    setErrorMessage(null);
  };

  const handleSendMessage = async (userInput: string) => {
    if (!activeId || !userInput.trim()) return;

    const userMsg: Message = {
      id: "msg-user-" + Math.random(),
      role: MessageRole.USER,
      content: userInput,
      timestamp: new Date()
    };

    // Update locally first for snappy UI
    const updated = sessions.map(s => {
      if (s.id === activeId) {
        const title = s.messages.length === 0 ? userInput.slice(0, 25) : s.title;
        return {
          ...s,
          messages: [...s.messages, userMsg],
          title,
          updatedAt: new Date()
        };
      }
      return s;
    });

    setSessions(updated);
    setIsThinking(true);
    setErrorMessage(null);

    try {
      const currentStream = updated.find(s => s.id === activeId)?.messages || [];
      const aiText = await fetchAIResponse(currentStream);

      const aiMsg: Message = {
        id: "msg-ai-" + Math.random(),
        role: MessageRole.ASSISTANT,
        content: aiText,
        timestamp: new Date()
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeId) {
          return { ...s, messages: [...s.messages, aiMsg], updatedAt: new Date() };
        }
        return s;
      }));
    } catch (e: any) {
      setErrorMessage("System Error: " + (e.message || "Failed to connect to backend."));
    } finally {
      setIsThinking(false);
    }
  };

  const clearMessages = () => {
    setSessions(prev => prev.map(s => 
      s.id === activeId ? { ...s, messages: [], updatedAt: new Date() } : s
    ));
  };

  const removeSession = (id: string) => {
    const filtered = sessions.filter(s => s.id !== id);
    setSessions(filtered);
    if (activeId === id) setActiveId(filtered[0]?.id || null);
  };

  return (
    <div className="flex h-screen w-full bg-[#343541] font-sans selection:bg-teal-500/30">
      <Sidebar 
        sessions={sessions} 
        activeId={activeId} 
        onSelect={setActiveId} 
        onNew={createNewSession}
        onDelete={removeSession}
      />
      
      <div className="flex-1 relative flex flex-col h-full overflow-hidden">
        <ChatContainer 
          messages={activeSession?.messages || []}
          isLoading={isThinking}
          error={errorMessage}
          onSubmit={handleSendMessage}
          onClear={clearMessages}
          headerText={activeSession?.title || 'Chat Abdul Ghafoor'}
        />
      </div>
    </div>
  );
};

export default App;
