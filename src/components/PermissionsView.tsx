import React from 'react';
import {
  Camera,
  Mic,
  Bluetooth,
  Wifi,
  FolderLock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const PermissionsView: React.FC = () => {
  const permissions = [
    {
      title: 'Camera Access (NSCameraUsageDescription & android.permission.CAMERA)',
      icon: Camera,
      status: 'Granted on call',
      purpose: 'Enables high-definition WebRTC video calling. Camera data is processed locally and never recorded or sent to unencrypted relays.',
      os: 'iOS & Android',
    },
    {
      title: 'Microphone Access (NSMicrophoneUsageDescription & RECORD_AUDIO)',
      icon: Mic,
      status: 'Granted on call/voice note',
      purpose: 'Enables voice calls and offline voice notes. Stream is encrypted via DTLS-SRTP.',
      os: 'iOS & Android',
    },
    {
      title: 'Nearby Devices & Bluetooth (BLUETOOTH_SCAN, BLUETOOTH_CONNECT, BLE)',
      icon: Bluetooth,
      status: 'Active for P2P',
      purpose: 'Discovers nearby compatible devices in the absence of internet connectivity without transmitting geolocation.',
      os: 'iOS 14+ & Android 12+',
    },
    {
      title: 'Local Network & Wi-Fi Direct (NSLocalNetworkUsageDescription, NEARBY_WIFI_DEVICES)',
      icon: Wifi,
      status: 'Active for P2P',
      purpose: 'Establishes high-speed direct peer-to-peer ad-hoc Wi-Fi channels for 40+ MB/s offline file transfers and latency-free calls.',
      os: 'iOS 14+ & Android 13+',
    },
    {
      title: 'Zero Remote Keystore Policy (E2EE Vault)',
      icon: FolderLock,
      status: 'Enforced',
      purpose: 'Private keys never leave device flash memory. No master password or company backdoors exist.',
      os: 'Universal',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAF9] text-slate-800 space-y-6">
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
          <h2 className="text-lg font-bold text-slate-900">Permissions & Privacy Architecture</h2>
        </div>
        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
          Hanzala04 adheres to a strict zero-knowledge security constitution. Permissions are requested just-in-time and zero behavioral telemetry, location logs, or unencrypted payloads are ever captured.
        </p>
      </div>

      <div className="space-y-3">
        {permissions.map((perm, idx) => {
          const Icon = perm.icon;
          return (
            <div
              key={idx}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {perm.title}
                  </h3>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-100 px-2 py-0.5 rounded w-fit">
                    {perm.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{perm.purpose}</p>
                <div className="mt-2 text-[10px] text-slate-400 font-mono">
                  Platform: {perm.os}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900">Zero Secret Keys in Client Bundle</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          In strict compliance with modern mobile security standards, no master database credentials, S3 secret access keys, or third-party secret tokens are ever embedded into the mobile application source code. All cloud authentication uses transient JWT tokens signed by the server proxy or zero-knowledge client authentication.
        </p>
      </div>
    </div>
  );
};
