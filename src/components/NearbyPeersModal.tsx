import React, { useState, useEffect } from 'react';
import { PeerDevice, NetworkMode } from '../types';
import { StorageService } from '../services/storage';
import {
  Radio,
  Wifi,
  Bluetooth,
  RefreshCw,
  CheckCircle2,
  Signal,
  Smartphone,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface NearbyPeersModalProps {
  isOpen: boolean;
  onClose: () => void;
  networkMode: NetworkMode;
  setNetworkMode: (mode: NetworkMode) => void;
  onSelectPeer: (peer: PeerDevice) => void;
}

export const NearbyPeersModal: React.FC<NearbyPeersModalProps> = ({
  isOpen,
  onClose,
  networkMode,
  setNetworkMode,
  onSelectPeer,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [peers, setPeers] = useState<PeerDevice[]>(StorageService.getPeers());
  const [isAdvertising, setIsAdvertising] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      const timer = setTimeout(() => {
        setIsScanning(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnectDirect = (peer: PeerDevice) => {
    // Switch to nearby P2P mode if offline
    if (networkMode === 'offline') {
      setNetworkMode('nearby');
    }
    onSelectPeer(peer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Radio className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Offline P2P Nearby Radar
              </h3>
              <p className="text-[11px] text-slate-500">
                Wi-Fi Direct & Bluetooth LE discovery without cell towers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-sm font-semibold p-1"
          >
            ✕
          </button>
        </div>

        {/* Radar Scanner Graphic */}
        <div className="bg-slate-950 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Animated Radar Rings */}
          <div className="relative w-44 h-44 rounded-full border border-emerald-900/60 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-emerald-800/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-emerald-700/40 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-emerald-600/30 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Sweeping Radar Line */}
            {isScanning && (
              <div
                className="absolute inset-0 rounded-full border-t-2 border-emerald-400/80 animate-spin"
                style={{ animationDuration: '2.5s' }}
              />
            )}

            {/* Detected Peer Blips */}
            <div
              className="absolute top-8 right-10 flex flex-col items-center"
              title="Tariq (-48 dBm)"
            >
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/80" />
              <span className="text-[8px] text-emerald-200 font-mono mt-0.5">Tariq (1.8m)</span>
            </div>

            <div
              className="absolute bottom-10 left-8 flex flex-col items-center"
              title="Sarah (-62 dBm)"
            >
              <span className="w-2.5 h-2.5 bg-emerald-300 rounded-full shadow-lg shadow-emerald-300/80" />
              <span className="text-[8px] text-emerald-200 font-mono mt-0.5">Sarah (3.5m)</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" />
              <span>Wi-Fi Direct (802.11be)</span>
            </span>
            <span className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5">
              <Bluetooth className="w-3.5 h-3.5 text-emerald-400" />
              <span>BLE 5.4 Mesh</span>
            </span>
          </div>
        </div>

        {/* Discovery Controls Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-600 font-medium">Broadcast My Device Beacon:</span>
            <button
              onClick={() => setIsAdvertising(!isAdvertising)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                isAdvertising ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {isAdvertising ? 'Active (Discoverable)' : 'Hidden'}
            </button>
          </div>

          <button
            onClick={() => {
              setIsScanning(true);
              setTimeout(() => setIsScanning(false), 2000);
            }}
            disabled={isScanning}
            className="text-emerald-800 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning...' : 'Rescan'}</span>
          </button>
        </div>

        {/* Nearby Devices List */}
        <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
          {peers.map((peer) => {
            return (
              <div
                key={peer.id}
                className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white hover:bg-emerald-50/30 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-sm shrink-0">
                    {peer.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {peer.name}
                      </span>
                      {peer.isNearby && (
                        <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-semibold">
                          Nearby
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{peer.deviceModel}</p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                      <span>RSSI: {peer.rssi || -75} dBm</span>
                      <span aria-hidden="true">·</span>
                      <span>Transport: {peer.transportType === 'wifi_direct' ? 'Wi-Fi Direct' : 'BLE Mesh'}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleConnectDirect(peer)}
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                >
                  Connect P2P
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Authenticated with local Elliptic Curve key exchange</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-700 hover:bg-slate-100 font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
