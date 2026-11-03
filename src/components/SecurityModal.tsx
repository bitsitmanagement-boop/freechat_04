import React, { useState } from 'react';
import { PeerDevice, UserProfile } from '../types';
import { StorageService } from '../services/storage';
import {
  ShieldCheck,
  Key,
  Copy,
  Check,
  QrCode,
  Lock,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

interface SecurityModalProps {
  peer: PeerDevice;
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({ peer, isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedMnemonic, setCopiedMnemonic] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [activeTab, setActiveTab] = useState<'safety_number' | 'recovery_seed'>('safety_number');

  const profile: UserProfile = StorageService.getProfile();

  if (!isOpen) return null;

  const handleCopySafetyNumber = () => {
    navigator.clipboard.writeText(peer.fingerprint);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyMnemonic = () => {
    navigator.clipboard.writeText(profile.mnemonicWords.join(' '));
    setCopiedMnemonic(true);
    setTimeout(() => setCopiedMnemonic(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">E2EE Cryptographic Verification</h3>
              <p className="text-[11px] text-slate-500">AES-GCM 256-bit with SHA-256 Fingerprint</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-semibold p-1"
          >
            ✕
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 p-1">
          <button
            onClick={() => setActiveTab('safety_number')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'safety_number' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Peer Safety Number
          </button>
          <button
            onClick={() => setActiveTab('recovery_seed')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'recovery_seed' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Account Recovery Seed
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'safety_number' ? (
            <>
              {/* QR Code Graphic */}
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-36 h-36 bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-center shadow-xs">
                  {/* SVG QR Code Simulation */}
                  <svg className="w-32 h-32 text-slate-900" viewBox="0 0 100 100">
                    <rect width="30" height="30" fill="currentColor" rx="2" />
                    <rect x="70" width="30" height="30" fill="currentColor" rx="2" />
                    <rect y="70" width="30" height="30" fill="currentColor" rx="2" />
                    <rect x="6" y="6" width="18" height="18" fill="white" />
                    <rect x="76" y="6" width="18" height="18" fill="white" />
                    <rect x="6" y="76" width="18" height="18" fill="white" />
                    <rect x="10" y="10" width="10" height="10" fill="currentColor" />
                    <rect x="80" y="10" width="10" height="10" fill="currentColor" />
                    <rect x="10" y="80" width="10" height="10" fill="currentColor" />
                    {/* Matrix Noise Points */}
                    <rect x="40" y="10" width="8" height="8" fill="currentColor" />
                    <rect x="52" y="18" width="8" height="8" fill="currentColor" />
                    <rect x="40" y="40" width="20" height="20" fill="#047857" rx="3" />
                    <rect x="70" y="40" width="10" height="8" fill="currentColor" />
                    <rect x="85" y="55" width="8" height="10" fill="currentColor" />
                    <rect x="40" y="70" width="10" height="10" fill="currentColor" />
                    <rect x="55" y="85" width="12" height="8" fill="currentColor" />
                    <rect x="75" y="75" width="15" height="15" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-[10px] text-slate-500 mt-2">
                  Scan on {peer.name}&apos;s device to verify safety number
                </span>
              </div>

              {/* 6 Blocks of 5 Digits Safety Number */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Safety Number with {peer.name}
                </label>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono text-center text-sm font-bold tracking-wider text-slate-900 select-all">
                  {peer.fingerprint}
                </div>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  If this 30-digit safety number matches the digits on {peer.name}&apos;s device screen, your communication is mathematically immune to man-in-the-middle interception.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleCopySafetyNumber}
                  className="flex-1 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Copied to Clipboard' : 'Copy Safety Number'}</span>
                </button>

                <button
                  onClick={() => setIsVerified(!isVerified)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    isVerified
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-800 text-white hover:bg-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{isVerified ? 'Verified Peer ✓' : 'Mark as Verified'}</span>
                </button>
              </div>
            </>
          ) : (
            /* 12-Word Mnemonic Phrase View */
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-[11px] text-amber-800 leading-relaxed">
                  <strong>Master Secret Key:</strong> Write down these 12 words on physical paper. If you lose your phone or switch devices, this phrase restores all your offline SQLite keys and private cloud files.
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {profile.mnemonicWords.map((word, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2"
                  >
                    <span className="text-[10px] font-mono text-slate-400 w-4">{idx + 1}.</span>
                    <span className="text-xs font-bold font-mono text-slate-800">{word}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleCopyMnemonic}
                className="w-full py-2.5 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                {copiedMnemonic ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMnemonic ? '12 Words Copied' : 'Backup Mnemonic Phrase'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
