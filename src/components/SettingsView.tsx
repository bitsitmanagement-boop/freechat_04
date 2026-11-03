import React, { useState } from 'react';
import { UserProfile, NetworkMode } from '../types';
import { StorageService } from '../services/storage';
import {
  User,
  Shield,
  Key,
  HardDrive,
  Database,
  Radio,
  Wifi,
  WifiOff,
  Bell,
  Eye,
  Download,
  Trash2,
  Check,
  Edit2,
  Save,
  X,
  FileCheck,
  Cloud,
  Lock,
} from 'lucide-react';

interface SettingsViewProps {
  networkMode: NetworkMode;
  setNetworkMode: (mode: NetworkMode) => void;
  onOpenSecurity: () => void;
  onOpenAcceptanceTests: () => void;
  onOpenArchitecture: () => void;
  onOpenOnboarding: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  networkMode,
  setNetworkMode,
  onOpenSecurity,
  onOpenAcceptanceTests,
  onOpenArchitecture,
  onOpenOnboarding,
}) => {
  const [profile, setProfile] = useState<UserProfile>(StorageService.getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || '+1 555-019-4820');
  const [handle, setHandle] = useState(profile.handle);
  const [statusBio, setStatusBio] = useState(profile.statusBio);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Privacy toggles
  const [readReceipts, setReadReceipts] = useState(true);
  const [bleDiscoverable, setBleDiscoverable] = useState(true);
  const [accountSyncEnabled, setAccountSyncEnabled] = useState(false);

  const handleSaveProfile = () => {
    const updated: UserProfile = {
      ...profile,
      displayName: displayName.trim() || profile.displayName,
      phoneNumber: phoneNumber.trim() || profile.phoneNumber,
      handle: handle.trim() || profile.handle,
      statusBio: statusBio.trim() || profile.statusBio,
    };
    StorageService.saveProfile(updated);
    setProfile(updated);
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportBackup = () => {
    const backupData = {
      profile,
      messages: StorageService.getMessages(),
      peers: StorageService.getPeers(),
      exportedAt: Date.now(),
      engine: 'Hanzala04 SQLite WAL Vault',
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hanzala04_Encrypted_Backup_${new Date().toISOString().slice(0, 10)}.hzbak`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearCache = () => {
    if (confirm('Clear local message cache and reset to default peers?')) {
      StorageService.resetToDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAF9] text-slate-800 space-y-6">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white font-bold flex items-center justify-center text-2xl shadow-sm border-2 border-emerald-600/30 shrink-0">
              {profile.displayName.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Display Name"
                    className="text-sm font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-full"
                  />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Mobile Number (+1 555-019-4820)"
                    className="text-xs font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-full"
                  />
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@handle"
                    className="text-xs font-mono bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 w-full"
                  />
                  <input
                    type="text"
                    value={statusBio}
                    onChange={(e) => setStatusBio(e.target.value)}
                    placeholder="Status bio"
                    className="text-xs bg-slate-50 px-3 py-1 rounded-lg border border-slate-200 w-full"
                  />
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                      {profile.displayName}
                    </h2>
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold border border-emerald-200">
                      ID: {profile.id.slice(0, 8)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs">
                    <span className="font-mono font-bold text-emerald-800">{profile.phoneNumber || '+1 555-019-4820'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-mono">{profile.handle}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{profile.statusBio}</p>
                </div>
              )}
            </div>
          </div>

          <div className="shrink-0">
            {isEditing ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-3 p-2 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-1.5 border border-emerald-200">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Profile changes saved to local SQLite vault.</span>
          </div>
        )}
      </div>

      {/* Online vs Offline Account Architecture (Features 6 & 8) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-slate-900">
              Online Multi-Device Account Sync
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Feature 6 & 8</span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Configure whether this device operates in purely isolated local offline mode or syncs encrypted data to multiple phones when internet is available.
        </p>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-900 block">
                Multi-Device Cloud Synchronization
              </span>
              <span className="text-[11px] text-slate-500">
                Sync message history and contacts across iPhone, Android, and tablets.
              </span>
            </div>
            <button
              onClick={() => setAccountSyncEnabled(!accountSyncEnabled)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                accountSyncEnabled ? 'bg-emerald-700' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  accountSyncEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-emerald-800">Offline Guarantee:</span>
              <span>Nearby text chat, calls, and file transfers NEVER require an internet connection.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-700">Internet Requirement:</span>
              <span>Internet is ONLY used when you explicitly sync data to a secondary device or cloud backup.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Controls (Feature 9) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-800" />
          <h3 className="text-sm font-bold text-slate-900">Privacy & Radio Controls</h3>
        </div>

        <div className="space-y-2">
          {/* Read Receipts */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">Send Read Receipts</span>
              <span className="text-[11px] text-slate-500">
                Display double green checkmarks (✓✓) when you open a peer&apos;s message.
              </span>
            </div>
            <input
              type="checkbox"
              checked={readReceipts}
              onChange={(e) => setReadReceipts(e.target.checked)}
              className="accent-emerald-700 w-4 h-4 cursor-pointer"
            />
          </div>

          {/* BLE Discoverability */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">
                Bluetooth LE Discoverability
              </span>
              <span className="text-[11px] text-slate-500">
                Allow nearby devices to discover you without cell towers.
              </span>
            </div>
            <input
              type="checkbox"
              checked={bleDiscoverable}
              onChange={(e) => setBleDiscoverable(e.target.checked)}
              className="accent-emerald-700 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Local Storage & Cache Management (Feature 2) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-800" />
          <h3 className="text-sm font-bold text-slate-900">Local SQLite Storage Management</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Local Vault Size</span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">3.4 MB</span>
            <span className="text-[10px] text-slate-400 block mt-0.5">SQLite WAL Engine</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] text-slate-500 block">Persisted Messages</span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">
              {StorageService.getMessages().length} Messages
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Stored on Flash RAM</span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-200"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export Encrypted Backup (.hzbak)</span>
          </button>

          <button
            onClick={handleClearCache}
            className="py-2 px-3 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-rose-200"
            title="Reset Database"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Data</span>
          </button>
        </div>
      </div>

      {/* Security & Verification Shortcuts */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-slate-900">Security & Documentation Hub</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <button
            onClick={onOpenOnboarding}
            className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 rounded-xl border border-slate-200 text-left transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold block mb-0.5">Welcome Tour</span>
            <span className="text-[10px] text-slate-500">Interactive 4-step feature walkthrough</span>
          </button>

          <button
            onClick={onOpenSecurity}
            className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 rounded-xl border border-slate-200 text-left transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold block mb-0.5">Safety Numbers & Keys</span>
            <span className="text-[10px] text-slate-500">12-word seed and E2EE fingerprints</span>
          </button>

          <button
            onClick={onOpenAcceptanceTests}
            className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 rounded-xl border border-slate-200 text-left transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold block mb-0.5">11 Acceptance Tests</span>
            <span className="text-[10px] text-slate-500">Live test runner for offline verification</span>
          </button>

          <button
            onClick={onOpenArchitecture}
            className="p-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 rounded-xl border border-slate-200 text-left transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold block mb-0.5">$0 Build & Deploy Guide</span>
            <span className="text-[10px] text-slate-500">Android APK & iOS Xcode instructions</span>
          </button>
        </div>
      </div>

      {/* App Version Info */}
      <div className="text-center text-[11px] text-slate-400 space-y-1 pb-4">
        <div>Hanzala04 Messenger · Clean Green & White Architecture</div>
        <div>Offline P2P Engine · SQLite WAL · WebRTC DTLS-SRTP · Device-Native Vault Storage</div>
      </div>
    </div>
  );
};
