import React from 'react';
import { Download, Smartphone, Monitor, MessageSquare, Users, User, Home, Sparkles } from 'lucide-react';
import { ExpoSourceCodeService } from '../services/expoSourceCode';

export type AppTab = 'home' | 'chats' | 'contacts' | 'profile';

interface TopBarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  viewMode: 'iphone' | 'pixel' | 'desktop';
  setViewMode: (mode: 'iphone' | 'pixel' | 'desktop') => void;
  unreadCount?: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  unreadCount = 1,
}) => {
  const [downloading, setDownloading] = React.useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await ExpoSourceCodeService.downloadSourceCodeZip();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-800 group-hover:bg-emerald-900 text-white flex items-center justify-center font-bold text-lg shadow-xs transition-colors">
              H
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                Hanzala04
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Offline First
              </span>
            </div>
          </button>
        </div>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('home')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4 text-emerald-700" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('chats')}
            className={`relative inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'chats'
                ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            <span>Chats</span>
            {unreadCount > 0 && (
              <span className="w-4 h-4 bg-emerald-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'contacts'
                ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-emerald-700" />
            <span>Profile</span>
          </button>
        </nav>

        {/* Device Viewport Toggle & Download Button */}
        <div className="flex items-center gap-2">
          {/* Device viewport frame controls */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-slate-600 text-xs">
            <button
              onClick={() => setViewMode('iphone')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'iphone'
                  ? 'bg-white text-emerald-800 font-bold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
              title="iPhone Preview"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-white text-emerald-800 font-bold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
              title="Full Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download Source Code ZIP */}
          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            title="Download full project source code as a ZIP archive"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {downloading ? 'Packing...' : 'Source ZIP'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
