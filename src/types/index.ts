export type NetworkMode = 'offline' | 'nearby' | 'online';

export type MessageStatus = 'queued' | 'sent' | 'delivered' | 'read' | 'failed';

export type MessageType = 'text' | 'image' | 'file' | 'audio' | 'system';

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: number;
  status: MessageStatus;
  type: MessageType;
  networkTransport: 'offline_queue' | 'p2p_direct' | 'cloud_sync';
  encrypted: boolean;
  fileData?: {
    name: string;
    size: number;
    mimeType: string;
    url?: string;
    blobUrl?: string;
    progress?: number;
    transferSpeed?: string;
    checksum?: string;
  };
}

export interface PeerDevice {
  id: string;
  name: string;
  phoneNumber?: string;
  avatar?: string;
  statusText?: string;
  publicKey: string;
  fingerprint: string;
  transportType: 'wifi_direct' | 'ble' | 'webrtc' | 'cloud';
  rssi?: number; // signal strength in dBm (e.g. -45 dBm is very close)
  isNearby: boolean;
  isOnline: boolean;
  isRegistered?: boolean;
  lastSeen: number;
  unreadCount?: number;
  deviceModel?: string;
  ipAddress?: string;
}

export type CallType = 'audio' | 'video';
export type CallStatus = 'idle' | 'calling' | 'incoming' | 'connected' | 'ended';

export interface ActiveCall {
  id: string;
  peer: PeerDevice;
  type: CallType;
  status: CallStatus;
  startTime?: number;
  durationSeconds: number;
  isMuted: boolean;
  isVideoOff: boolean;
  isSpeakerOn: boolean;
  isScreenSharing?: boolean;
  isOfflineP2P: boolean;
  audioQuality: 'Excellent' | 'Good' | 'Fair';
}

export interface SharedFileItem {
  id: string;
  name: string;
  size: number; // in bytes
  category: 'media' | 'document' | 'backup' | 'archive';
  uploadedBy: string;
  uploadDate: number;
  isEncrypted: boolean;
  isOfflineAvailable: boolean;
  downloadUrl?: string;
  checksum: string;
}

export interface StorageMetrics {
  totalCapacityBytes?: number; // Dynamic capacity based on device/free tier
  usedCapacityBytes: number;
  freeTierActive: boolean;
  activeFilesCount: number;
  monthlyCost: number; // 0 for initial version
  storageTier: 'Free Local Device Storage' | 'Optional Free Cloud Tier';
}

export interface UserProfile {
  id: string;
  displayName: string;
  phoneNumber: string;
  handle: string;
  statusBio: string;
  avatarSeed: string;
  mnemonicWords: string[];
  publicKeyFingerprint: string;
  deviceModel: string;
  registeredDate: number;
}
