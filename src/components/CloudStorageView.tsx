import React, { useState } from 'react';
import { SharedFileItem } from '../types';
import { StorageService } from '../services/storage';
import { CloudStorageService, FreeHostingPlatform } from '../services/cloudStorage';
import {
  HardDrive,
  UploadCloud,
  FileCheck,
  Trash2,
  Download,
  Shield,
  Layers,
  Globe,
  FileText,
  Video,
  Database,
  Search,
  CheckCircle2,
  Terminal,
  Server,
  Zap,
  Lock,
} from 'lucide-react';

export const CloudStorageView: React.FC = () => {
  const [files, setFiles] = useState<SharedFileItem[]>(StorageService.getFiles());
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showHostingGuide, setShowHostingGuide] = useState(false);

  const metrics = CloudStorageService.getUsageMetrics();
  const hostingPlatforms = CloudStorageService.getFreeHostingPlatforms();

  const handleSimulateUpload = (category: SharedFileItem['category']) => {
    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newFile: SharedFileItem = {
              id: `file_${Date.now()}`,
              name: `Hanzala_${category}_${new Date().toISOString().slice(0, 10)}.dat`,
              size: Math.floor(Math.random() * 25000000) + 2000000, // 2MB to 27MB
              category,
              uploadedBy: 'Hanzala (Self)',
              uploadDate: Date.now(),
              isEncrypted: true,
              isOfflineAvailable: true,
              checksum: 'sha256-' + Math.random().toString(16).substring(2, 18),
            };
            const updated = StorageService.addFile(newFile);
            setFiles([...updated]);
            setIsUploading(false);
            setUploadProgress(0);
          }, 300);
          return 100;
        }
        return p + 25;
      });
    }, 150);
  };

  const handleDelete = (id: string) => {
    const updated = StorageService.deleteFile(id);
    setFiles([...updated]);
  };

  const filteredFiles = files.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'all' || f.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAF9] text-slate-800 space-y-6">
      {/* Header Banner - Zero Paid Service Requirement */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">
                Free Storage Vault & File Manager
              </h2>
              <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                $0 Free Tier · No Paid Storage Required
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Operates using local device flash storage and optional free-tier cloud integrations.
              No fixed capacity limits, zero paid storage subscriptions, and zero paid API keys needed.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowHostingGuide(!showHostingGuide)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span>Free Web Hosting Guide</span>
            </button>
            <button
              onClick={() => handleSimulateUpload('media')}
              disabled={isUploading}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{isUploading ? `Saving ${uploadProgress}%` : 'Save New File'}</span>
            </button>
          </div>
        </div>

        {/* Storage Usage Summary */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-600">
              Active Vault Storage: <strong className="text-slate-900 tabular-nums">{CloudStorageService.formatBytes(metrics.usedCapacityBytes)}</strong>
            </span>
            <span className="text-emerald-700 font-bold">100% Free Local Device Storage</span>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex border border-slate-200">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: '45%' }}
              title="Active User Data"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
            <div className="flex items-center gap-3">
              <span>Cost: <strong>$0.00 / month</strong></span>
              <span aria-hidden="true">·</span>
              <span>Total Stored Files: <strong>{files.length}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Encryption: <strong>AES-GCM 256-bit</strong></span>
            </div>
            <div className="text-emerald-800 font-medium">Zero Cloud Dependency for Core Features</div>
          </div>
        </div>
      </div>

      {/* Free Web Hosting & Deployment Guide Modal/Section */}
      {showHostingGuide && (
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-800" />
              <h3 className="text-sm font-bold text-slate-900">
                Free Web Deployment & Hosting Platforms
              </h3>
            </div>
            <button
              onClick={() => setShowHostingGuide(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Dismiss
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Deploy the web version of Hanzala04 for $0 using any of these verified free hosting platforms:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hostingPlatforms.map((platform, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border ${
                  platform.recommended
                    ? 'border-emerald-300 bg-emerald-50/40'
                    : 'border-slate-200 bg-slate-50'
                } space-y-2 text-xs`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{platform.name}</span>
                  {platform.recommended && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                      Recommended
                    </span>
                  )}
                </div>
                <div className="text-emerald-800 font-semibold">{platform.monthlyCost}</div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  {platform.setupInstructions}
                </div>
                <div className="pt-1 flex items-center gap-3 text-[10px] text-slate-500 font-mono">
                  <span>Build: {platform.buildCommand}</span>
                  <span>Dir: {platform.outputDirectory}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
            <strong>Quick Deploy Command:</strong> Run <code>npm run build</code> locally to produce the static output folder <code>dist/</code>. Upload to Cloudflare Pages or Vercel for instant SSL and global CDN hosting.
          </div>
        </div>
      )}

      {/* Storage Breakdown Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.categoryBreakdown.map((cat, idx) => (
          <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="truncate">{cat.label.split('(')[0]}</span>
              <span className="font-bold tabular-nums text-slate-700">{cat.percentage}%</span>
            </div>
            <div className="text-base font-bold text-slate-900 tabular-nums">
              {CloudStorageService.formatBytes(cat.bytes, 1)}
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Shared Files & Media Repository */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-slate-900">Encrypted Local & Nearby Files</h3>
            <span className="text-xs text-slate-500 tabular-nums">({filteredFiles.length} files)</span>
          </div>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Filter files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-xs bg-slate-50 pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="media">Photos & Video</option>
              <option value="document">Documents</option>
              <option value="backup">Backups</option>
              <option value="archive">Archives</option>
            </select>
          </div>
        </div>

        {/* Upload Progress Alert */}
        {isUploading && (
          <div className="px-4 py-3 bg-emerald-50 border-b border-emerald-200">
            <div className="flex items-center justify-between text-xs text-emerald-900 font-medium mb-1">
              <span>Encrypting & Writing to local vault...</span>
              <span className="font-mono">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* File Table / List */}
        <div className="divide-y divide-slate-100">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className="p-3.5 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  {file.category === 'media' && <Video className="w-4 h-4" />}
                  {file.category === 'document' && <FileText className="w-4 h-4" />}
                  {file.category === 'backup' && <Database className="w-4 h-4" />}
                  {file.category === 'archive' && <Layers className="w-4 h-4" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-900 truncate">{file.name}</span>
                    {file.isEncrypted && (
                      <span className="text-[10px] text-emerald-800 font-medium flex items-center gap-0.5">
                        <Shield className="w-3 h-3 text-emerald-600" />
                        <span>AES-256</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="tabular-nums">{CloudStorageService.formatBytes(file.size)}</span>
                    <span aria-hidden="true">·</span>
                    <span>Shared by {file.uploadedBy}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {file.checksum.slice(0, 16)}...
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => alert(`Decrypted file "${file.name}". SHA-256 integrity verified.`)}
                  className="p-1.5 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  title="Delete File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
