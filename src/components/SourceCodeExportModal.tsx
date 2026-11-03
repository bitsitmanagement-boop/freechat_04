import React, { useState } from 'react';
import { ExpoSourceCodeService, SourceFile } from '../services/expoSourceCode';
import {
  FolderCode,
  Download,
  Copy,
  Check,
  FileCode,
  FileText,
  Terminal,
  Smartphone,
  Layers,
} from 'lucide-react';

export const SourceCodeExportModal: React.FC = () => {
  const files: SourceFile[] = ExpoSourceCodeService.getSourceFiles();
  const [selectedFile, setSelectedFile] = useState<SourceFile>(files[3] || files[0]); // default src/App.tsx
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await ExpoSourceCodeService.downloadSourceCodeZip();
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAF9] text-slate-800 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              React Native & Expo Source Code Package
            </h2>
            <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Cross-Platform
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Full production-ready source code for Android and iPhone using Expo SDK 52, React Native 0.76, SQLite, and WebRTC.
            Export directly as a structured archive named <strong className="text-slate-800">Hanzala04-SourceCode.zip</strong>.
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>{isDownloading ? 'Generating ZIP...' : 'Download Hanzala04-SourceCode.zip'}</span>
        </button>
      </div>

      {/* Code Browser & Editor */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col lg:flex-row min-h-[540px]">
        {/* Sidebar File Tree */}
        <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50 flex flex-col">
          <div className="p-3 border-b border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
            <FolderCode className="w-4 h-4 text-emerald-800" />
            <span>Project Explorer (Expo 52)</span>
          </div>

          <div className="p-2 space-y-1 flex-1 overflow-y-auto">
            {files.map((file) => {
              const isSelected = file.path === selectedFile.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                    isSelected
                      ? 'bg-emerald-800 text-white font-medium shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                  }`}
                >
                  {file.path.endsWith('.json') ? (
                    <Layers className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-600'}`} />
                  ) : file.path.endsWith('.md') ? (
                    <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-500'}`} />
                  ) : (
                    <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-700'}`} />
                  )}
                  <span className="truncate">{file.path}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Content View */}
        <div className="flex-1 flex flex-col bg-slate-950 text-slate-200">
          <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-mono text-emerald-400">
              <span className="font-bold">{selectedFile.path}</span>
              <span className="text-slate-500 font-sans text-[11px]">· {selectedFile.description}</span>
            </div>

            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy File'}</span>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-x-auto font-mono text-xs leading-relaxed text-slate-300 selection:bg-emerald-800 selection:text-white max-h-[500px] overflow-y-auto">
            <pre>
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Terminal Quick Commands */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-800" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            Local Build & Verification Instructions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-700 block mb-1">1. Extract & Install</span>
            <code className="text-xs font-mono text-emerald-800 block bg-white p-2 rounded border border-slate-200">
              unzip Hanzala04-SourceCode.zip<br />
              cd Hanzala04-SourceCode<br />
              npm install
            </code>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-700 block mb-1">2. Run on Android Device</span>
            <code className="text-xs font-mono text-emerald-800 block bg-white p-2 rounded border border-slate-200">
              npx expo run:android
            </code>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Tests Wi-Fi Direct & BLE discovery on physical hardware.
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-700 block mb-1">3. Run on iPhone Device</span>
            <code className="text-xs font-mono text-emerald-800 block bg-white p-2 rounded border border-slate-200">
              npx expo run:ios
            </code>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Uses Apple Multipeer Connectivity & WebRTC audio tracks.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
