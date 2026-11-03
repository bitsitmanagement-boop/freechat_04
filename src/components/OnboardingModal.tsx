import React, { useState } from 'react';
import { Radio, ShieldCheck, HardDrive, Phone, ArrowRight, Check } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Welcome to Hanzala04',
      subtitle: 'Zero-Internet Peer-to-Peer Communication',
      icon: Radio,
      badge: 'Offline-First',
      description:
        'Hanzala04 lets nearby phones chat, exchange files, and make audio/video calls directly without mobile data, cell towers, or internet Wi-Fi routers.',
      highlights: [
        'Direct Wi-Fi Direct & BLE mesh radio',
        'Works in Airplane Mode with local radios enabled',
        'No centralized server or phone number required',
      ],
    },
    {
      title: 'Free Offline Calls & Files',
      subtitle: 'Low-latency Local WebRTC & 40+ MB/s Transfers',
      icon: Phone,
      badge: 'Native P2P',
      description:
        'Make HD voice and video calls between nearby Android and iPhone devices. Transfer photos, 4K videos, and documents with instant cryptographic checksum verification.',
      highlights: [
        'Real WebRTC media pipeline with zero internet data',
        'Chunked local socket streaming (64KB packets)',
        'Automatic pause, resume, and integrity checks',
      ],
    },
    {
      title: 'End-to-End Encryption',
      subtitle: 'AES-GCM 256-bit & 12-Word Seed Phrase',
      icon: ShieldCheck,
      badge: 'Zero-Knowledge',
      description:
        'Every message, file packet, and media stream is encrypted on your device. Compare 30-digit safety numbers to mathematically guarantee zero eavesdropping.',
      highlights: [
        'Standard Web Crypto API (SubtleCrypto)',
        'Local SQLite storage with WAL encryption',
        '12-word mnemonic phrase for decentralized backup',
      ],
    },
    {
      title: 'Free Storage & Web Hosting',
      subtitle: 'Zero Paid Services or API Keys Required',
      icon: HardDrive,
      badge: '100% Free Tier',
      description:
        'All messages and files are stored on local device flash storage. Deploy the web app for free to Cloudflare Pages, Vercel, or GitHub Pages with zero paid storage subscriptions.',
      highlights: [
        'Offline features never depend on cloud servers',
        'No fixed cloud capacity ceiling or paid plans',
        'Free web hosting with 1-click CI/CD deployment',
      ],
    },
  ];

  const step = steps[currentStep];
  const Icon = step.icon;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-md border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
        {/* Step Progress Indicators */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStep
                    ? 'w-6 bg-emerald-700'
                    : i < currentStep
                    ? 'w-2 bg-emerald-400'
                    : 'w-2 bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-slate-500 font-medium">
            {currentStep + 1} / {steps.length}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 shadow-xs">
            <Icon className="w-8 h-8 text-emerald-800" />
          </div>

          <div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded uppercase tracking-wider">
              {step.badge}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">{step.title}</h2>
            <p className="text-xs font-semibold text-emerald-800 mt-0.5">{step.subtitle}</p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed max-w-sm">{step.description}</p>

          <div className="w-full bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-left space-y-2">
            {step.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5" />
                </div>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onComplete}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5"
          >
            Skip Intro
          </button>

          <button
            onClick={() => {
              if (isLast) {
                onComplete();
              } else {
                setCurrentStep((s) => s + 1);
              }
            }}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <span>{isLast ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
