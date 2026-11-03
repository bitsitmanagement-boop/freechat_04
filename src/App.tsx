import React, { useState } from 'react';
import { PeerDevice } from './types';
import { TopBar, AppTab } from './components/TopBar';
import { DeviceFrame } from './components/DeviceFrame';
import { HomeScreen } from './components/HomeScreen';
import { ChatView } from './components/ChatView';
import { ContactsView } from './components/ContactsView';
import { ProfileView } from './components/ProfileView';
import { CallPreviewModal } from './components/CallPreviewModal';
import {
  Home,
  MessageSquare,
  Users,
  User,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [viewMode, setViewMode] = useState<'iphone' | 'pixel' | 'desktop'>('iphone');
  const [selectedPeerId, setSelectedPeerId] = useState<string>('peer_tariq');
  
  // Calling notice modal state
  const [callNotice, setCallNotice] = useState<{
    isOpen: boolean;
    peerName: string;
    type: 'audio' | 'video';
  }>({
    isOpen: false,
    peerName: 'Contact',
    type: 'audio',
  });

  const handleShowCallNotice = (peerName: string, type: 'audio' | 'video' = 'audio') => {
    setCallNotice({
      isOpen: true,
      peerName,
      type,
    });
  };

  const handleOpenChatWithPeer = (peer: PeerDevice) => {
    setSelectedPeerId(peer.id);
    setActiveTab('chats');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Universal Top Bar */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        unreadCount={1}
      />

      {/* Main Content inside Device Frame or Full Screen */}
      <main className="flex-1 flex flex-col relative">
        <DeviceFrame viewMode={viewMode}>
          <div className="flex-1 flex flex-col h-full overflow-hidden relative">
            {/* View Switching */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {activeTab === 'home' && (
                <HomeScreen
                  onNavigate={setActiveTab}
                  onOpenChatWithPeer={handleOpenChatWithPeer}
                  onShowCallNotice={() => handleShowCallNotice('Tariq Al-Mansoor', 'audio')}
                />
              )}

              {activeTab === 'chats' && (
                <ChatView
                  selectedPeerId={selectedPeerId}
                  onShowCallNotice={handleShowCallNotice}
                  isDesktopLayout={viewMode === 'desktop'}
                />
              )}

              {activeTab === 'contacts' && (
                <ContactsView
                  onSelectChat={handleOpenChatWithPeer}
                  onShowCallNotice={handleShowCallNotice}
                />
              )}

              {activeTab === 'profile' && <ProfileView />}
            </div>

            {/* Mobile Bottom Tab Bar (Active when in phone frame view) */}
            {viewMode !== 'desktop' && (
              <div className="h-14 bg-white border-t border-slate-200 grid grid-cols-4 items-center px-1 shrink-0 z-20">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`flex flex-col items-center justify-center h-full transition-colors cursor-pointer ${
                    activeTab === 'home'
                      ? 'text-emerald-800 font-bold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="text-[10px] font-medium mt-1">Home</span>
                </button>

                <button
                  onClick={() => setActiveTab('chats')}
                  className={`relative flex flex-col items-center justify-center h-full transition-colors cursor-pointer ${
                    activeTab === 'chats'
                      ? 'text-emerald-800 font-bold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] font-medium mt-1">Chats</span>
                </button>

                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`flex flex-col items-center justify-center h-full transition-colors cursor-pointer ${
                    activeTab === 'contacts'
                      ? 'text-emerald-800 font-bold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span className="text-[10px] font-medium mt-1">Contacts</span>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex flex-col items-center justify-center h-full transition-colors cursor-pointer ${
                    activeTab === 'profile'
                      ? 'text-emerald-800 font-bold'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-[10px] font-medium mt-1">Profile</span>
                </button>
              </div>
            )}
          </div>
        </DeviceFrame>
      </main>

      {/* Calling Preview Modal */}
      <CallPreviewModal
        isOpen={callNotice.isOpen}
        onClose={() => setCallNotice((prev) => ({ ...prev, isOpen: false }))}
        peerName={callNotice.peerName}
        callType={callNotice.type}
      />
    </div>
  );
}
