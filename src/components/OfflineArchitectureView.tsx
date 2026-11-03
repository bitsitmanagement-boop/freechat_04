import React, { useState } from 'react';
import {
  Cpu,
  Radio,
  Wifi,
  Bluetooth,
  Smartphone,
  Layers,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  PackageCheck,
  Terminal,
} from 'lucide-react';

export const OfflineArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'connectivity' | 'publishing' | 'storage_costs'>('connectivity');

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAF9] text-slate-800 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-emerald-800" />
          <h2 className="text-lg font-bold text-slate-900">
            Offline-First Architecture & Native Bridge Guide
          </h2>
        </div>
        <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
          Technical specifications for genuine offline device-to-device communication without cellular or internet connectivity, honest platform limitations between Android and iOS, and free deployment procedures.
        </p>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('connectivity')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'connectivity'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Native Connectivity (Android vs iOS)
          </button>
          <button
            onClick={() => setActiveTab('publishing')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'publishing'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Free Build & Distribution Guide ($0 Cost)
          </button>
          <button
            onClick={() => setActiveTab('storage_costs')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'storage_costs'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Free Storage & Web Hosting Guide
          </button>
        </div>
      </div>

      {/* Tab 1: Native Connectivity */}
      {activeTab === 'connectivity' && (
        <div className="space-y-4">
          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Android Architecture */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Android Native Stack
                </span>
                <span className="text-[11px] text-slate-400 font-mono">API 21+ (Android 5 to 15)</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">Wi-Fi Direct & Local-Only Hotspot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Android natively exposes <code>android.net.wifi.p2p.WifiP2pManager</code> for high-bandwidth Wi-Fi Direct peer-to-peer networking (up to 250 Mbps) and <code>WifiManager.startLocalOnlyHotspot()</code> for ad-hoc Wi-Fi routing.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-semibold text-slate-800">Implemented Transports:</div>
                <div className="text-slate-600">· <strong>Discovery:</strong> BluetoothLeScanner + Wi-Fi Direct Service Discovery (mDNS)</div>
                <div className="text-slate-600">· <strong>Data Channel:</strong> Direct TCP server socket on Port 8492</div>
                <div className="text-slate-600">· <strong>Calls:</strong> WebRTC using Local Host ICE Candidates (no STUN/TURN needed)</div>
              </div>
            </div>

            {/* iOS Architecture */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Apple iOS Native Stack
                </span>
                <span className="text-[11px] text-slate-400 font-mono">iOS 14.0 to 18+</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">MultipeerConnectivity & Network.framework</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apple restricts low-level Wi-Fi Direct APIs to private frameworks. Instead, iOS utilizes Apple’s high-performance <code>MultipeerConnectivity</code> framework (combines peer-to-peer Wi-Fi and Bluetooth automatically) and <code>Network.framework</code> NWListener.
              </p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-semibold text-slate-800">Implemented Transports:</div>
                <div className="text-slate-600">· <strong>Discovery:</strong> MCNearbyServiceAdvertiser & Browser (Service: <code>hz04-mesh</code>)</div>
                <div className="text-slate-600">· <strong>Data Channel:</strong> MCSession sendResource & byte streams</div>
                <div className="text-slate-600">· <strong>Calls:</strong> CoreAudio P2P streaming + WebRTC local socket</div>
              </div>
            </div>
          </div>

          {/* Cross-Platform Android <-> iOS Bridge */}
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-slate-900">
                Cross-OS Peer-to-Peer Protocol (Android &lt;--&gt; iPhone Without Internet)
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because Android Wi-Fi Direct and Apple Multipeer Connectivity cannot negotiate directly at the link layer, Hanzala04 implements the <strong>Universal Local Hotspot Mesh Gateway</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Step 1: Ad-Hoc Radio Launch</span>
                <span className="text-slate-600 leading-relaxed">
                  Device A initiates a Local-Only Wi-Fi Hotspot (WPA3-SAE, zero cellular internet). Displays QR code with SSID and temporary key.
                </span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Step 2: Subnet Link</span>
                <span className="text-slate-600 leading-relaxed">
                  Device B scans QR code or pairs via BLE 5.4 L2CAP channel, associating directly to the local subnet (192.168.49.x).
                </span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs">
                <span className="font-bold text-emerald-900 block mb-1">Step 3: Direct WebRTC & Files</span>
                <span className="text-slate-600 leading-relaxed">
                  Both devices exchange SDP session descriptions over the local TCP socket. Voice/video calls and 40+ MB/s file transfers stream with zero internet.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Free Build & Publishing Guide */}
      {activeTab === 'publishing' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Zero-Cost Development, Build & Distribution Guide
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              How to build and distribute Hanzala04 on Android and iPhone with $0 budget, avoiding unnecessary paid accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Android $0 Distribution */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">Android: $0 Total Cost</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-semibold">Free Forever</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Google Play charges a one-time $25 fee, but Android permits direct APK sideloading without any fees or restrictions:
              </p>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li><strong>Local Build:</strong> Run <code>npx expo run:android</code> via free Android Studio and Gradle.</li>
                <li><strong>Cloud Build:</strong> Run <code>eas build -p android --profile preview</code> on Expo’s free build tier.</li>
                <li><strong>Distribution:</strong> Host the signed APK on free GitHub Releases, F-Droid open repository, or transfer via Hanzala04 P2P mesh!</li>
              </ul>
            </div>

            {/* iOS $0 Testing & Limitations */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">iOS: $0 Testing vs $99 App Store</span>
                <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded font-semibold">Free Personal Apple ID</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Apple requires a $99/year Apple Developer Program membership for TestFlight and App Store distribution, but <strong>local physical device testing is 100% free</strong>:
              </p>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li><strong>Free Personal Team:</strong> Sign into Xcode with any standard free Apple ID (no $99 fee needed).</li>
                <li><strong>Run on Physical iPhone:</strong> Connect device via USB and run <code>npx expo run:ios</code>. Free provisioning certificates last 7 days and can be auto-refreshed.</li>
                <li><strong>Ad-Hoc Sideloading:</strong> Compatible with AltStore, SideStore, and Sideloadly for personal distribution without App Store approval.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Free Storage & Free Web Hosting Guide */}
      {activeTab === 'storage_costs' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Zero Paid Storage & Free Web Hosting Policy
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Hanzala04 requires <strong>zero paid storage services, zero fixed cloud storage capacities, and zero paid APIs</strong> for its initial version. All core text chat, nearby file transfers, and audio/video calls run entirely on local device memory without ongoing monthly fees.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-3">
            <div className="font-semibold text-slate-800">Free Deployment Options:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">1. Cloudflare Pages ($0 Forever)</span>
                Unlimited bandwidth, free custom domains, global edge network, and automatic git-push deployments.
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">2. Vercel Hobby ($0)</span>
                Instant preview deployments, automatic Vite framework detection, and free SSL certificates.
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">3. GitHub Pages ($0)</span>
                Host static files directly from your repository gh-pages branch with zero server configuration.
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">4. Netlify Starter ($0)</span>
                Drag-and-drop the <code>dist/</code> directory or connect GitHub for automated CI/CD builds.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
