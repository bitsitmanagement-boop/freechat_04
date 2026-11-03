import React, { useState, useRef, useEffect } from 'react';
import { Message, PeerDevice } from '../types';
import { StorageService } from '../services/storage';
import {
  Phone,
  Video,
  Send,
  Paperclip,
  Check,
  CheckCheck,
  Clock,
  FileText,
  Download,
  Image as ImageIcon,
  Sparkles,
  Search,
  ArrowLeft,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';

interface ChatViewProps {
  selectedPeerId?: string;
  onShowCallNotice: (peerName: string, type: 'audio' | 'video') => void;
  isDesktopLayout?: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({
  selectedPeerId,
  onShowCallNotice,
  isDesktopLayout = false,
}) => {
  const [peers, setPeers] = useState<PeerDevice[]>(StorageService.getPeers());
  const [activePeerId, setActivePeerId] = useState<string>(
    selectedPeerId || peers[0]?.id || 'peer_tariq'
  );
  const [messages, setMessages] = useState<Message[]>(StorageService.getMessages());
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mobile navigation: on mobile, if a chat is selected, show thread; if back clicked, show list.
  const [isMobileViewingChat, setIsMobileViewingChat] = useState<boolean>(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync selected peer if passed from parent
  useEffect(() => {
    if (selectedPeerId) {
      setActivePeerId(selectedPeerId);
      setIsMobileViewingChat(true);
    }
  }, [selectedPeerId]);

  const activePeer = peers.find((p) => p.id === activePeerId) || peers[0];

  const filteredMessages = messages.filter(
    (m) =>
      (m.senderId === 'usr_hz04_main' && m.recipientId === activePeer?.id) ||
      (m.senderId === activePeer?.id && m.recipientId === 'usr_hz04_main')
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages.length, isMobileViewingChat]);

  // Send text message or file attachment
  const handleSendMessage = (textToSend?: string, fileData?: Message['fileData']) => {
    const text = textToSend !== undefined ? textToSend : inputText.trim();
    if (!text && !fileData) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      senderId: 'usr_hz04_main',
      recipientId: activePeer.id,
      content: text,
      timestamp: Date.now(),
      status: 'delivered',
      type: fileData ? 'file' : 'text',
      networkTransport: 'p2p_direct',
      encrypted: true,
      fileData,
    };

    const updated = StorageService.addMessage(newMsg);
    setMessages([...updated]);
    setInputText('');

    // Simulate peer read receipt after 1.2 seconds
    setTimeout(() => {
      const withRead = StorageService.updateMessageStatus(newMsg.id, 'read');
      setMessages([...withRead]);
    }, 1200);
  };

  // Simulate an incoming peer reply to test two-way chat
  const handleSimulateIncoming = () => {
    if (!activePeer) return;
    const responses = [
      `Assalamu Alaikum! Received your message directly in local storage.`,
      `Message stored securely on device. All features running smoothly.`,
      `File and text transmission received without cloud servers.`,
      `Verified local peer connection. Zero-knowledge encryption active.`,
    ];
    const replyText = responses[Math.floor(Math.random() * responses.length)];

    const incomingMsg: Message = {
      id: `msg_in_${Date.now()}`,
      senderId: activePeer.id,
      recipientId: 'usr_hz04_main',
      content: replyText,
      timestamp: Date.now(),
      status: 'read',
      type: 'text',
      networkTransport: 'p2p_direct',
      encrypted: true,
    };

    const updated = StorageService.addMessage(incomingMsg);
    setMessages([...updated]);
  };

  // Handle local file simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileData: Message['fileData'] = {
      name: file.name,
      size: file.size,
      mimeType: file.type || 'application/octet-stream',
      checksum: 'sha256-' + Math.random().toString(16).substring(2, 14),
      transferSpeed: 'Local Direct',
    };

    handleSendMessage(`Shared file: ${file.name}`, fileData);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSelectPeer = (peerId: string) => {
    setActivePeerId(peerId);
    setIsMobileViewingChat(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const filteredPeers = peers.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.phoneNumber && p.phoneNumber.includes(searchQuery))
  );

  return (
    <div className={`flex flex-1 h-full bg-[#F8FAF9] text-slate-800 overflow-hidden ${isDesktopLayout ? 'flex-row' : 'flex-col'}`}>
      {/* Hidden File Picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Conversations List Panel */}
      {/* Shown when: on desktop, OR on mobile when NOT currently inside an individual chat view */}
      <div
        className={`${
          isDesktopLayout
            ? 'w-80 border-r border-slate-200'
            : isMobileViewingChat
            ? 'hidden'
            : 'flex-1'
        } bg-white flex flex-col h-full`}
      >
        {/* Header */}
        <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Conversations</h2>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
              {peers.length}
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="p-2.5 border-b border-slate-100">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search chats or phone numbers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Peer list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredPeers.map((peer) => {
            const isActive = peer.id === activePeerId;
            const peerMsgs = messages.filter(
              (m) =>
                (m.senderId === 'usr_hz04_main' && m.recipientId === peer.id) ||
                (m.senderId === peer.id && m.recipientId === 'usr_hz04_main')
            );
            const lastMsg = peerMsgs[peerMsgs.length - 1];

            return (
              <button
                key={peer.id}
                onClick={() => handleSelectPeer(peer.id)}
                className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                  isActive && isDesktopLayout
                    ? 'bg-emerald-50/70 border-l-4 border-l-emerald-700'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                    {peer.name.charAt(0)}
                  </div>
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"
                    title="Active"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {peer.name}
                    </span>
                    {lastMsg && (
                      <span className="text-[10px] text-slate-400 tabular-nums">
                        {new Date(lastMsg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-500 truncate">
                    {lastMsg ? lastMsg.content : peer.statusText}
                  </p>

                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400">
                    <span className="font-mono text-emerald-800 font-semibold">{peer.phoneNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>{peer.deviceModel}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Conversation Thread */}
      {/* Shown when: on desktop, OR on mobile when isMobileViewingChat is true */}
      <div
        className={`${
          isDesktopLayout
            ? 'flex-1'
            : isMobileViewingChat
            ? 'flex-1 flex'
            : 'hidden'
        } flex-col h-full bg-[#F8FAF9]`}
      >
        {/* Conversation Header */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-2xs">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Back button for mobile view */}
            {!isDesktopLayout && (
              <button
                onClick={() => setIsMobileViewingChat(false)}
                className="p-1.5 -ml-1 text-slate-600 hover:text-emerald-800 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                title="Back to conversations list"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-sm">
                {activePeer.name.charAt(0)}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {activePeer.name}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium border border-emerald-200">
                  Local
                </span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                <span className="font-mono text-emerald-800 font-semibold">
                  {activePeer.phoneNumber || '+1 555-019-4820'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activePeer.deviceModel}</span>
              </div>
            </div>
          </div>

          {/* Action Call & Simulation Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Simulate reply button */}
            <button
              onClick={handleSimulateIncoming}
              title="Simulate peer message response"
              className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded-lg border border-emerald-200 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span className="hidden sm:inline">Simulate Reply</span>
            </button>

            {/* Audio Call */}
            <button
              onClick={() => onShowCallNotice(activePeer.name, 'audio')}
              className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Audio Call"
            >
              <Phone className="w-4 h-4" />
            </button>

            {/* Video Call */}
            <button
              onClick={() => onShowCallNotice(activePeer.name, 'video')}
              className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Video Call"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <ShieldCheck className="w-10 h-10 text-emerald-600/60 mb-2" />
              <p className="text-xs font-semibold text-slate-700">Encrypted Local Session</p>
              <p className="text-[11px] text-slate-500 max-w-xs mt-1">
                Messages between you and {activePeer.name} are stored locally on your device. Send a message below to start chatting.
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isMe = msg.senderId === 'usr_hz04_main';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-full`}
                >
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] sm:max-w-[75%] shadow-xs break-words ${
                      isMe
                        ? 'bg-emerald-700 text-white rounded-br-xs'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    {/* File Attachment Card */}
                    {msg.type === 'file' && msg.fileData && (
                      <div
                        className={`mb-2 p-2 rounded-xl flex items-center gap-2.5 ${
                          isMe
                            ? 'bg-emerald-800/80 text-white'
                            : 'bg-slate-50 text-slate-800 border border-slate-200'
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isMe ? 'bg-emerald-900 text-emerald-200' : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold truncate">{msg.fileData.name}</p>
                          <p className={`text-[10px] ${isMe ? 'text-emerald-200' : 'text-slate-500'}`}>
                            {(msg.fileData.size / 1024 / 1024).toFixed(2)} MB · {msg.fileData.transferSpeed || 'Direct'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Text Content */}
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.content}</p>

                    {/* Timestamp & Status Footer */}
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isMe ? 'text-emerald-100/90' : 'text-slate-400'
                      }`}
                    >
                      <span className="tabular-nums">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>

                      {/* Status Checkmarks for user messages */}
                      {isMe && (
                        <span className="flex items-center ml-0.5">
                          {msg.status === 'sent' && (
                            <Check className="w-3.5 h-3.5 text-white/80" />
                          )}
                          {(msg.status === 'delivered' || msg.status === 'read') && (
                            <CheckCheck className="w-3.5 h-3.5 text-white font-bold" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Sample Reply Suggestions */}
        <div className="px-4 py-1.5 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px] text-slate-600 shrink-0">
          <span className="text-[10px] text-slate-400 shrink-0 font-medium">Quick replies:</span>
          <button
            onClick={() => handleSendMessage('Salam! Checking in.')}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition-colors shrink-0 cursor-pointer"
          >
            Salam! 👋
          </button>
          <button
            onClick={() => handleSendMessage('Local message storage is operational.')}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition-colors shrink-0 cursor-pointer"
          >
            Local storage active 🔒
          </button>
          <button
            onClick={() => handleSendMessage('Ready for file exchange.')}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition-colors shrink-0 cursor-pointer"
          >
            Ready for file exchange 📁
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition-colors cursor-pointer"
            title="Attach photo or document"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder={`Message ${activePeer.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-slate-50 text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white transition-all shadow-xs cursor-pointer"
            title="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
