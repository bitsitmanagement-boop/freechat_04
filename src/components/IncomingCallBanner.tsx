import React from 'react';
import { PeerDevice, CallType } from '../types';
import { Phone, PhoneOff, Video, Radio, ShieldCheck } from 'lucide-react';

interface IncomingCallBannerProps {
  caller: PeerDevice;
  callType: CallType;
  isOfflineP2P: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export const IncomingCallBanner: React.FC<IncomingCallBannerProps> = ({
  caller,
  callType,
  isOfflineP2P,
  onAccept,
  onReject,
}) => {
  return (
    <div className="absolute top-12 left-4 right-4 z-40 bg-slate-900/95 text-white p-4 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md animate-bounce duration-1000 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-lg border-2 border-emerald-400">
            {caller.name.charAt(0)}
          </div>
          <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping pointer-events-none" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white truncate">{caller.name}</span>
            <span className="text-[10px] text-emerald-300 font-medium bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
              Ringing...
            </span>
          </div>

          <div className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-0.5">
            {isOfflineP2P ? (
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <Radio className="w-3 h-3 text-emerald-400" />
                <span>Offline {callType === 'video' ? 'Video' : 'Audio'} Call</span>
              </span>
            ) : (
              <span>WebRTC {callType === 'video' ? 'Video' : 'Audio'} Call</span>
            )}
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[10px] text-slate-400">0 KB Internet</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Reject */}
        <button
          onClick={onReject}
          className="w-10 h-10 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-rose-600/30 cursor-pointer"
          title="Decline Call"
        >
          <PhoneOff className="w-4 h-4" />
        </button>

        {/* Accept */}
        <button
          onClick={onAccept}
          className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-emerald-600/30 cursor-pointer animate-pulse"
          title="Accept Call"
        >
          {callType === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
