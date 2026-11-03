import React, { useState } from 'react';
import { PeerDevice } from '../types';
import { StorageService } from '../services/storage';
import {
  Users,
  UserPlus,
  Phone,
  Video,
  MessageSquare,
  Search,
  Trash2,
  X,
  Smartphone,
  Check,
} from 'lucide-react';

interface ContactsViewProps {
  onSelectChat: (peer: PeerDevice) => void;
  onShowCallNotice: (peerName: string, type: 'audio' | 'video') => void;
}

export const ContactsView: React.FC<ContactsViewProps> = ({
  onSelectChat,
  onShowCallNotice,
}) => {
  const [peers, setPeers] = useState<PeerDevice[]>(StorageService.getPeers());
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDevice, setNewDevice] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredContacts = peers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.phoneNumber && p.phoneNumber.includes(search))
  );

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newPeer: PeerDevice = {
      id: `peer_${Date.now()}`,
      name: newName.trim(),
      phoneNumber: newPhone.trim(),
      statusText: 'Available locally',
      publicKey: `hz-ed25519-${Date.now().toString(36)}`,
      fingerprint: `${Math.floor(10000 + Math.random() * 90000)} ${Math.floor(10000 + Math.random() * 90000)} ${Math.floor(10000 + Math.random() * 90000)}`,
      transportType: 'wifi_direct',
      isNearby: true,
      isOnline: true,
      isRegistered: true,
      lastSeen: Date.now(),
      unreadCount: 0,
      deviceModel: newDevice.trim() || 'Android / iPhone',
    };

    const updated = StorageService.addPeer(newPeer);
    setPeers([...updated]);
    setNewName('');
    setNewPhone('');
    setNewDevice('');
    setShowAddModal(false);

    setToastMessage(`Contact "${newPeer.name}" added successfully.`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDeleteContact = (id: string, name: string) => {
    if (confirm(`Remove ${name} from your contacts?`)) {
      const updated = StorageService.deletePeer(id);
      setPeers([...updated]);
      setToastMessage(`Contact "${name}" removed.`);
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#F8FAF9] p-4 sm:p-6 space-y-6">
      {/* Toast alert */}
      {toastMessage && (
        <div className="bg-emerald-700 text-white text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-200 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <span>Contacts Book</span>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {peers.length} contacts
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Contacts are stored privately on your device. Tap any contact to open a chat.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search by contact name or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 shadow-2xs transition-colors"
        />
      </div>

      {/* Contacts List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filteredContacts.length === 0 ? (
          <div className="p-8 text-center text-slate-400 space-y-2">
            <Users className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-medium text-slate-600">No contacts found</p>
            <p className="text-[11px] text-slate-400">Try modifying your search or add a new contact above.</p>
          </div>
        ) : (
          filteredContacts.map((peer) => (
            <div
              key={peer.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
            >
              <div
                onClick={() => onSelectChat(peer)}
                className="flex items-center gap-3.5 min-w-0 cursor-pointer flex-1"
              >
                <div className="w-11 h-11 rounded-full bg-emerald-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs border border-emerald-900/10">
                  {peer.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 truncate hover:text-emerald-800 transition-colors">
                      {peer.name}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium border border-emerald-200">
                      Saved
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    {peer.phoneNumber || '+1 555-019-4820'}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Smartphone className="w-3 h-3 text-slate-400" />
                      <span>{peer.deviceModel || 'Android / iPhone'}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{peer.statusText}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => onSelectChat(peer)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>

                <button
                  onClick={() => onShowCallNotice(peer.name, 'audio')}
                  className="p-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
                  title="Audio Call"
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onShowCallNotice(peer.name, 'video')}
                  className="p-2 rounded-lg text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
                  title="Video Call"
                >
                  <Video className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleDeleteContact(peer.id, peer.name)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete Contact"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-700" />
                <span>Add New Contact</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ayesha Siddiqui"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. +1 555-014-9921"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-600 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Device Model (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. iPhone 16 / Pixel 9"
                  value={newDevice}
                  onChange={(e) => setNewDevice(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
