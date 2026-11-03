import React from 'react';
import { PeerDevice } from '../types';
import { StorageService } from '../services/storage';
import {
  MessageSquare,
  Users,
  User,
  Shield,
  Smartphone,
  HardDrive,
  Download,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Phone,
  Video,
} from 'lucide-react';
import { ExpoSourceCodeService } from '../services/expoSourceCode';

interface HomeScreenProps {
  onNavigate: (tab: 'home' | 'chats' | 'contacts' | 'profile') => void;
  onOpenChatWithPeer: (peer: PeerDevice) => void;
  onShowCallNotice: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenChatWithPeer,
  onShowCallNotice,
}) => {
  const profile = StorageService.getProfile();
  const peers = StorageService.getPeers();
  const messages = StorageService.getMessages();
  const [downloading, setDownloading] = React.useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await ExpoSourceCodeService.downloadSourceCodeZip();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAF9] p-4 sm:p-6 space-y-6">
      {/* Hero Welcome Card - Emerald Theme */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 shadow-md">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/60 text-emerald-100 text-xs font-semibold backdrop-blur-xs border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span>Hanzala04 v1.0 · Stable Local Edition</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to Hanzala04
          </h1>
          <p className="text-emerald-100/90 text-sm max-w-xl leading-relaxed">
            A clean, private mobile messaging application built with an offline-first architecture. 
            All conversations and contacts are saved directly to your device storage. No phone verification, cloud servers, or API keys required.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('chats')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <span>Open Conversations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('contacts')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900/60 hover:bg-emerald-900/80 text-white font-medium text-xs border border-emerald-500/40 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>View Contacts ({peers.length})</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-100 font-medium text-xs border border-emerald-500/30 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing ZIP...' : 'Download Source ZIP'}</span>
            </button>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-bold text-slate-800">{messages.length}</div>
            <div className="text-xs text-slate-500 truncate">Saved Messages</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-bold text-slate-800">{peers.length}</div>
            <div className="text-xs text-slate-500 truncate">Local Contacts</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-bold text-slate-800">Local Only</div>
            <div className="text-xs text-slate-500 truncate">Zero Cloud Quota</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg font-bold text-slate-800">100% Free</div>
            <div className="text-xs text-slate-500 truncate">Zero Subscriptions</div>
          </div>
        </div>
      </div>

      {/* Recent Chats Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <h2 className="text-sm font-bold text-slate-900">Recent Conversations</h2>
          </div>
          <button
            onClick={() => onNavigate('chats')}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
          >
            See all chats →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {peers.slice(0, 3).map((peer) => {
            const peerMsgs = messages.filter(
              (m) =>
                (m.senderId === 'usr_hz04_main' && m.recipientId === peer.id) ||
                (m.senderId === peer.id && m.recipientId === 'usr_hz04_main')
            );
            const lastMsg = peerMsgs[peerMsgs.length - 1];

            return (
              <div
                key={peer.id}
                onClick={() => onOpenChatWithPeer(peer)}
                className="py-3 flex items-center justify-between hover:bg-slate-50 -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm shrink-0 border border-emerald-200">
                    {peer.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {peer.name}
                      </span>
                      {peer.phoneNumber && (
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                          {peer.phoneNumber}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">
                      {lastMsg ? lastMsg.content : peer.statusText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowCallNotice();
                    }}
                    title="Audio Call"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowCallNotice();
                    }}
                    title="Video Call"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5" />
                  </button>
                  <span className="p-1.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Architecture & Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Zero Server Gatekeeping</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No phone verification code, SMS gateway, or remote auth database is needed. You can use the app immediately anywhere.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Smartphone className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Android & iPhone Ready</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Fully mobile-responsive layout designed for touchscreens, mobile keyboards, tablets, and desktop browsers.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">100% Free & Open Source</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Built using standard React, TypeScript, and Tailwind CSS. Fully exportable source code with no paid lock-in.
          </p>
        </div>
      </div>

      {/* User Local Profile Glance */}
      <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
            {profile.displayName.charAt(0)}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{profile.displayName}</div>
            <div className="text-xs text-slate-500 font-mono">{profile.phoneNumber || '+1 555-019-4820'}</div>
          </div>
        </div>

        <button
          onClick={() => onNavigate('profile')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs transition-colors cursor-pointer"
        >
          <User className="w-3.5 h-3.5" />
          <span>Edit Local Profile</span>
        </button>
      </div>
    </div>
  );
};
