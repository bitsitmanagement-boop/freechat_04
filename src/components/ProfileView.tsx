import React, { useState } from 'react';
import { UserProfile } from '../types';
import { StorageService } from '../services/storage';
import {
  User,
  Shield,
  Smartphone,
  HardDrive,
  Download,
  Trash2,
  Check,
  Edit2,
  Save,
  X,
  Phone,
  Sparkles,
  Info,
} from 'lucide-react';
import { ExpoSourceCodeService } from '../services/expoSourceCode';

export const ProfileView: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(StorageService.getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || '+1 555-019-4820');
  const [handle, setHandle] = useState(profile.handle);
  const [statusBio, setStatusBio] = useState(profile.statusBio);
  const [deviceModel, setDeviceModel] = useState(profile.deviceModel || 'iPhone / Android Device');
  const [saveToast, setSaveToast] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const messagesCount = StorageService.getMessages().length;
  const contactsCount = StorageService.getPeers().length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      displayName: displayName.trim() || profile.displayName,
      phoneNumber: phoneNumber.trim() || profile.phoneNumber,
      handle: handle.trim() || profile.handle,
      statusBio: statusBio.trim() || profile.statusBio,
      deviceModel: deviceModel.trim() || profile.deviceModel,
    };
    StorageService.saveProfile(updated);
    setProfile(updated);
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleExportBackup = () => {
    const backupData = {
      app: 'Hanzala04 Offline Messenger',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile,
      contacts: StorageService.getPeers(),
      messages: StorageService.getMessages(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hanzala04_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all messages and contacts to sample defaults?')) {
      StorageService.resetToDefaults();
      window.location.reload();
    }
  };

  const handleDownloadCode = async () => {
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
      {saveToast && (
        <div className="bg-emerald-600 text-white text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Profile updated successfully in local device storage!</span>
          </div>
          <button onClick={() => setSaveToast(false)} className="text-emerald-200 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Profile Card Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-800 to-emerald-600 text-white font-bold text-2xl flex items-center justify-center shadow-md border-4 border-white">
              {profile.displayName.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active">
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl font-bold text-slate-900">{profile.displayName}</h1>
                <p className="text-xs text-emerald-700 font-semibold">{profile.handle}</p>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-600 max-w-md pt-1">{profile.statusBio}</p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-mono">{profile.phoneNumber || '+1 555-019-4820'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                <span>{profile.deviceModel || 'iPhone / Android'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-6 pt-5 border-t border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Edit Local Profile Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Full Name / Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 555-019-4820"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  User Handle
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Device Model
                </label>
                <input
                  type="text"
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Status / About
                </label>
                <input
                  type="text"
                  value={statusBio}
                  onChange={(e) => setStatusBio(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save to Local Device</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Local Storage & Device Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-emerald-700" />
          <h2 className="text-sm font-bold text-slate-900">Device Storage & Architecture</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Local Storage Status</span>
            <div className="text-base font-bold text-slate-800 mt-0.5">Active & Encrypted</div>
            <p className="text-[10px] text-slate-400 mt-1">Browser LocalStorage + IndexedDB</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Saved Items</span>
            <div className="text-base font-bold text-emerald-700 mt-0.5">
              {messagesCount} Messages · {contactsCount} Contacts
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Stored safely on device</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium">Cloud Quota</span>
            <div className="text-base font-bold text-slate-800 mt-0.5">Zero Lock-In</div>
            <p className="text-[10px] text-slate-400 mt-1">No mandatory subscriptions</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 leading-relaxed">
            <strong className="font-semibold">Privacy First:</strong> Hanzala04 stores your identity, contacts, and message history locally on your device. It does not send your data to external telemetry servers.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Data Management & Source Code</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={handleExportBackup}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Export Local Backup</span>
          </button>

          <button
            onClick={handleDownloadCode}
            disabled={downloading}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 hover:border-emerald-600 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{downloading ? 'Packing Source...' : 'Download Code ZIP'}</span>
          </button>

          <button
            onClick={handleResetData}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Reset to Sample Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
