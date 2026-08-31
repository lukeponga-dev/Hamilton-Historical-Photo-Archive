import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Photo } from '../types';
import { Send, Compass, BookOpen, Clock, AlertTriangle, Sparkles, RefreshCw, MessageSquare } from 'lucide-react';

interface ArchivistChatProps {
  referencedPhoto?: Photo | null;
  onClearReference?: () => void;
}

export default function ArchivistChat({ referencedPhoto, onClearReference }: ArchivistChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: "Welcome, seeker of histories. I am Arthur Henderson, Lead Archivist here at the Hamilton Public Library Special Collections. My life has been dedicated to cataloging and preserving the visual ledger of our remarkable city—from its early electric streetcars to the thunder of its steel foundries and waterfalls.\n\nHow can I help you explore Hamilton's rich history today? If there is a particular photograph you are studying, feel free to ask me to analyze its secrets or tell its tale.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat log
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle send message
  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMsg(null);
    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      referencedPhotoId: referencedPhoto?.id
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages, // Send full dialogue history for continuous context
          photoTitle: referencedPhoto?.title,
          photoDesc: referencedPhoto?.description
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to communicate with Arthur. Make sure your Express backend is running and Gemini API is connected.');
      }

      const data = await response.json();
      
      const archivistMsg: ChatMessage = {
        id: `archivist-${Date.now()}`,
        role: 'model',
        content: data.reply || 'I am sorry, my records seem momentarily misplaced.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, archivistMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while talking to Arthur.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(userInput);
  };

  // Preset inquiries to help user explore
  const PRESET_INQUIRIES = [
    {
      label: "Why is Hamilton 'The Ambitious City'?",
      text: "Can you explain why Hamilton, Ontario acquired the nickname 'The Ambitious City'? What is the historical origin of this moniker?"
    },
    {
      label: "The Great 1946 Steel Strike",
      text: "Tell me about the famous 1946 Steel Strike in Hamilton. Why was it a watershed moment for Canadian labour rights?"
    },
    {
      label: "Dundurn Castle Secret Tunnels",
      text: "Are there secret underground tunnels or escape routes beneath Dundurn Castle? Tell me about the architecture of Allan MacNab's estate."
    },
    {
      label: "Hamilton Incline Railways history",
      text: "How did the Mount Hamilton Incline Railways work? Why were they built, and what eventually happened to them?"
    }
  ];

  // Quick helper to format Arthur's scholarly responses nicely
  const formatArchivistMessage = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      // Split into lines for list items
      const lines = paragraph.split('\n');
      if (lines.length > 1 && (lines[0].trim().startsWith('-') || lines[0].trim().startsWith('•') || /^\d+\./.test(lines[0].trim()))) {
        return (
          <ul key={index} className="list-disc pl-5 mb-4 space-y-1.5 text-[#e5e5e5]">
            {lines.map((line, lineIdx) => {
              const cleanedLine = line.replace(/^[-•\d+\.]\s*/, '');
              return <li key={lineIdx} dangerouslySetInnerHTML={{ __html: parseBoldItalic(cleanedLine) }} />;
            })}
          </ul>
        );
      }

      return (
        <p 
          key={index} 
          className="mb-4 text-[#e5e5e5] leading-relaxed text-sm"
          dangerouslySetInnerHTML={{ __html: parseBoldItalic(paragraph) }}
        />
      );
    });
  };

  // Small parser helper for **bold** and *italic*
  const parseBoldItalic = (rawText: string): string => {
    let html = rawText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#c5b358]">$1</strong>');
    // Italic: *text*
    html = html.replace(/\*(.*?)\*/g, '<em class="italic opacity-90">$1</em>');
    
    return html;
  };

  return (
    <div className="bg-[#0c0c0c] border border-white/10 rounded-xs shadow-sm overflow-hidden flex flex-col h-[650px]">
      {/* Header Info */}
      <div className="bg-[#0c0c0c] text-[#e5e5e5] px-5 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-[#c5b358]/40 bg-[#111] flex items-center justify-center text-[#c5b358] overflow-hidden font-serif font-bold text-lg select-none">
            AH
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-serif font-light text-white">Arthur Henderson</h3>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">
              Lead Historical Archivist
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-white/60">
          <Clock className="w-3.5 h-3.5 text-[#c5b358]" />
          <span>HPL Special Collections Library</span>
        </div>
      </div>

      {/* referenced photo context bar */}
      {referencedPhoto && (
        <div className="bg-[#c5b358]/10 border-b border-[#c5b358]/20 py-2 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src={referencedPhoto.imageUrl} 
              alt={referencedPhoto.title}
              className="w-10 h-7 object-cover rounded-xs border border-white/10 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-mono tracking-wider text-[#c5b358] font-bold block">
                Active Context
              </span>
              <p className="text-xs font-serif font-normal text-white truncate">
                Analyzing photo: "{referencedPhoto.title}" ({referencedPhoto.year})
              </p>
            </div>
          </div>
          <button 
            onClick={onClearReference}
            className="text-[10px] font-mono text-white/70 hover:text-white bg-white/5 border border-white/10 rounded-xs px-2 py-0.5 cursor-pointer"
          >
            Clear Context
          </button>
        </div>
      )}

      {/* Chat Messages Logs */}
      <div className="flex-1 overflow-y-auto p-5 bg-[#080808] space-y-4">
        {messages.map((msg) => {
          const isArchivist = msg.role === 'model';
          return (
            <div 
              key={msg.id} 
              className={`flex gap-3 max-w-[85%] ${
                isArchivist ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              {isArchivist && (
                <div className="w-8 h-8 rounded-full bg-[#111] border border-[#c5b358]/30 text-[#c5b358] flex items-center justify-center shrink-0 font-serif font-bold text-xs shadow-sm">
                  AH
                </div>
              )}
              
              <div className="flex flex-col">
                <div className={`p-4 rounded-xs shadow-xs border ${
                  isArchivist 
                    ? 'bg-[#111] border-white/5 text-[#e5e5e5]' 
                    : 'bg-[#c5b358] border-none text-[#080808] font-medium rounded-br-none'
                }`}>
                  {isArchivist ? (
                    formatArchivistMessage(msg.content)
                  ) : (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
                <span className={`text-[9px] font-mono text-white/35 mt-1 ${
                  isArchivist ? 'text-left' : 'text-right'
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Loading / Consult records state */}
        {isLoading && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-start">
            <div className="w-8 h-8 rounded-full bg-[#111] border border-[#c5b358]/30 text-[#c5b358] flex items-center justify-center shrink-0 animate-spin-slow font-serif font-bold text-xs shadow-sm">
              AH
            </div>
            <div className="flex flex-col">
              <div className="p-4 rounded-xs bg-[#111] border border-white/10 shadow-xs flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#c5b358] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#c5b358] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-[#c5b358] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="text-xs text-[#a1a1a1] font-mono italic">
                  Arthur is consulting his physical archive ledgers...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="bg-red-950/20 border border-red-900/60 rounded p-4 flex items-start gap-2.5 max-w-2xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-light text-red-400 font-serif">Archival Inconvenience</h4>
              <p className="text-xs text-red-300 mt-1 leading-relaxed">{errorMsg}</p>
              <div className="mt-2.5 flex gap-2">
                <button 
                  onClick={() => sendMessage(messages[messages.length - 1].content)}
                  className="flex items-center gap-1.5 px-3 py-1 bg-red-900/20 hover:bg-red-900/40 border border-red-800/40 text-red-300 rounded text-[11px] font-mono font-bold"
                >
                  <RefreshCw className="w-3 h-3" /> Retry Consultation
                </button>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Questions Section */}
      <div className="bg-[#0c0c0c] border-t border-white/10 p-3 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5b358] font-bold mr-1 flex items-center gap-1">
          <BookOpen className="w-3 h-3" /> Suggested:
        </span>
        {PRESET_INQUIRIES.map((inq, index) => (
          <button
            key={index}
            disabled={isLoading}
            onClick={() => sendMessage(inq.text)}
            className="text-[11px] font-mono text-white/70 bg-[#111] hover:bg-white/5 border border-white/10 rounded-full px-3 py-1 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            {inq.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleFormSubmit} className="border-t border-white/10 p-4 bg-[#0c0c0c] flex gap-3 items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={referencedPhoto ? `Ask Arthur about "${referencedPhoto.title}"...` : "Ask Arthur general questions about old Hamilton history..."}
          className="flex-1 bg-[#111] border border-white/10 focus:border-[#c5b358] focus:ring-1 focus:ring-[#c5b358] rounded px-4 py-3 text-sm text-white placeholder-white/30 font-sans outline-none shadow-inner"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!userInput.trim() || isLoading}
          className="bg-[#c5b358] text-[#080808] hover:bg-[#c5b358]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all p-3 rounded shadow-md shrink-0 flex items-center justify-center border border-[#c5b358] cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
