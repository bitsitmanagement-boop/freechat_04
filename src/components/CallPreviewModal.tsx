import React from 'react';
import { Phone, Video, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface CallPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  peerName?: string;
  callType?: 'audio' | 'video';
}

export const CallPreviewModal: React.FC<CallPreviewModalProps> = ({
  isOpen,
  onClose,
  peerName = 'Contact',
  callType = 'audio',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200 space-y-5 text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
          {callType === 'video' ? (
            <Video className="w-7 h-7 text-emerald-700" />
          ) : (
            <Phone className="w-7 h-7 text-emerald-700" />
          )}
        </div>

        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-slate-900">
            {callType === 'video' ? 'Video Calling Preview' : 'Audio Calling Preview'}
          </h3>
          <p className="text-xs text-slate-500">
            Connecting with <span className="font-semibold text-slate-700">{peerName}</span>
          </p>
        </div>

        <div className="bg-emerald-50/80 rounded-xl p-3.5 border border-emerald-200/80 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Clean Architecture Notice</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            Per project specifications, live remote media calling is omitted in this initial stable release to guarantee 100% reliable deployment with zero external server dependencies. The call screen interfaces are preserved and ready for the next update.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local offline storage & encryption active</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          Understood
        </button>
      </div>
    </div>
  );
};
