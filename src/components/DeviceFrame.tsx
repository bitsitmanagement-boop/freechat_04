import React from 'react';
import { Battery, ShieldCheck, Wifi } from 'lucide-react';
import { NetworkMode } from '../types';

interface DeviceFrameProps {
  children: React.ReactNode;
  viewMode: 'iphone' | 'pixel' | 'desktop';
  networkMode?: NetworkMode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  viewMode,
  networkMode = 'offline',
}) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (viewMode === 'desktop') {
    return (
      <div className="w-full max-w-7xl mx-auto h-[calc(100vh-4rem)] p-4 sm:p-6 flex flex-col">
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  const isIPhone = viewMode === 'iphone';

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] py-6 flex items-center justify-center bg-slate-100 px-4">
      <div
        className={`relative w-full max-w-[400px] h-[780px] bg-slate-900 rounded-[50px] p-3 shadow-2xl border-4 ${
          isIPhone ? 'border-slate-800' : 'border-slate-700'
        } flex flex-col overflow-hidden`}
      >
        {/* Device Screen Area */}
        <div className="relative flex-1 bg-white rounded-[38px] overflow-hidden flex flex-col">
          {/* Mobile Status Bar */}
          <div className="h-11 px-6 pt-1 flex items-center justify-between text-xs font-semibold text-slate-800 z-30 select-none bg-white/95 backdrop-blur-xs border-b border-slate-100">
            <span className="tabular-nums tracking-tight">{currentTime}</span>

            {/* Dynamic Island / Notch */}
            {isIPhone ? (
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center px-2 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
              </div>
            ) : (
              <div className="w-3.5 h-3.5 bg-black rounded-full mx-auto"></div>
            )}

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="flex items-center gap-0.5 text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>LOCAL</span>
              </span>
              <Battery className="w-4 h-4 text-slate-800" />
            </div>
          </div>

          {/* Actual View Content */}
          <div className="flex-1 overflow-y-auto flex flex-col relative">{children}</div>

          {/* Home Indicator Bar for iPhone */}
          {isIPhone && (
            <div className="h-4 bg-white flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
