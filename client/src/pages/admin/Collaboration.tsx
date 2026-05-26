import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Users2, Search, Send, Image as ImageIcon, PhoneCall, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Collaboration() {
  const [activeChat, setActiveChat] = useState<number>(1);
  const [message, setMessage] = useState('');

  const contacts = [
    { id: 1, name: 'Juan Dela Cruz', role: 'Farmer', lastMessage: 'Thank you for the advice on pest control.', time: new Date(Date.now() - 1000 * 60 * 30), unread: 0 },
    { id: 2, name: 'Pedro Santos', role: 'Farmer', lastMessage: 'When should I apply the fertilizer?', time: new Date(Date.now() - 1000 * 60 * 60 * 2), unread: 2 },
    { id: 3, name: 'Officer Maria', role: 'Extension Officer', lastMessage: 'Zone verification approved.', time: new Date(Date.now() - 1000 * 60 * 60 * 24), unread: 0 },
  ];

  const messages = [
    { id: 1, sender: 'Juan Dela Cruz', text: 'Good morning! I noticed some yellowing on my tomato leaves.', time: new Date(Date.now() - 1000 * 60 * 60 * 2), isMe: false },
    { id: 2, sender: 'Me', text: 'Hi Juan! Could you send a photo of the leaves? It might be a nutrient deficiency.', time: new Date(Date.now() - 1000 * 60 * 50), isMe: true },
    { id: 3, sender: 'Juan Dela Cruz', text: 'Sure, let me take a picture.', time: new Date(Date.now() - 1000 * 60 * 45), isMe: false },
    { id: 4, sender: 'Juan Dela Cruz', text: 'Thank you for the advice on pest control.', time: new Date(Date.now() - 1000 * 60 * 30), isMe: false },
  ];

  const activeContact = contacts.find(c => c.id === activeChat);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex flex-col font-inter">
        
        <div className="mb-6 shrink-0">
          <h1 className="text-2xl font-bold text-gray-800">Collaboration Workspace</h1>
          <p className="text-sm text-gray-500 mt-1">Direct communication between farmers and agricultural experts</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex-1 flex overflow-hidden min-h-0">
          
          {/* LEFT: Contact List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50/50">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none text-sm shadow-sm"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map(contact => (
                <div 
                  key={contact.id} 
                  onClick={() => setActiveChat(contact.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3 ${activeChat === contact.id ? 'bg-brand-50 hover:bg-brand-50 border-l-4 border-l-brand-500' : 'border-l-4 border-l-transparent'}`}
                >
                  <div className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shrink-0
                    ${contact.role === 'Farmer' ? 'bg-earth-100 text-earth-700' : 'bg-sky-100 text-sky-700'}`}>
                    {contact.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{contact.name}</h3>
                      <span className="text-[10px] text-gray-400 shrink-0">{formatDistanceToNow(contact.time, { addSuffix: true })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500 truncate pr-2">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <div className="w-4 h-4 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                          {contact.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Chat Area */}
          <div className="flex-1 flex flex-col bg-white relative">
            {activeContact ? (
              <>
                {/* Chat Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-white z-10 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shrink-0
                      ${activeContact.role === 'Farmer' ? 'bg-earth-100 text-earth-700' : 'bg-sky-100 text-sky-700'}`}>
                      {activeContact.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-800">{activeContact.name}</h2>
                      <span className="text-xs text-brand-600 font-medium">{activeContact.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                      <PhoneCall className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm
                        ${msg.isMe ? 'bg-brand-500 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'}`}
                      >
                        {msg.text}
                        <div className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-brand-100' : 'text-gray-400'}`}>
                          {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                  <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-xl p-2 shadow-sm focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all">
                    <button className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 text-sm text-gray-800 py-2 px-2"
                      rows={1}
                    ></textarea>
                    <button className="p-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors shadow-sm shrink-0">
                      <Send className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                <Users2 className="w-16 h-16 mb-4 opacity-50" />
                <p>Select a contact to start messaging</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
