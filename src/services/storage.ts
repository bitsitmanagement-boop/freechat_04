import { Message, PeerDevice, UserProfile, SharedFileItem } from '../types';
import { CryptoService } from './crypto';

const STORAGE_KEYS = {
  PROFILE: 'hanzala04_user_profile',
  PEERS: 'hanzala04_peers',
  MESSAGES: 'hanzala04_messages',
  CLOUD_FILES: 'hanzala04_cloud_files',
  SETTINGS: 'hanzala04_settings',
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_hz04_main',
  displayName: 'Hanzala (Self)',
  phoneNumber: '+1 555-019-4820',
  handle: '@hanzala04',
  statusBio: 'Encrypted & Mesh-ready · P2PI Protocol',
  avatarSeed: 'hanzala_p2p',
  mnemonicWords: CryptoService.generateMnemonic(12),
  publicKeyFingerprint: '94821 00392 48192 77103 44920 18832',
  deviceModel: 'Pixel 9 Pro / iOS Mesh Node',
  registeredDate: Date.now() - 86400000 * 14,
};

const INITIAL_PEERS: PeerDevice[] = [
  {
    id: 'peer_tariq',
    name: 'Tariq Al-Mansoor',
    phoneNumber: '+971 50 123 4567',
    statusText: 'Nearby via Wi-Fi Direct · Signal -48dBm',
    publicKey: 'hz-ed25519-tariq-84bf01d89e',
    fingerprint: '38192 74810 59281 03819 11928 47291',
    transportType: 'wifi_direct',
    rssi: -48,
    isNearby: true,
    isOnline: false,
    isRegistered: true,
    lastSeen: Date.now() - 1000 * 30,
    unreadCount: 0,
    deviceModel: 'Samsung Galaxy S24 Ultra',
    ipAddress: '192.168.49.12 (Direct P2P)',
  },
  {
    id: 'peer_sarah',
    name: 'Sarah Chen',
    phoneNumber: '+1 415 555 2671',
    statusText: 'Connected via BLE Mesh · Signal -62dBm',
    publicKey: 'hz-ed25519-sarah-48a03f441c',
    fingerprint: '48291 03819 55910 11928 88472 90184',
    transportType: 'ble',
    rssi: -62,
    isNearby: true,
    isOnline: true,
    isRegistered: true,
    lastSeen: Date.now() - 1000 * 120,
    unreadCount: 1,
    deviceModel: 'iPhone 16 Pro',
    ipAddress: '192.168.49.25',
  },
  {
    id: 'peer_omar',
    name: 'Omar Farooq',
    phoneNumber: '+44 7911 123456',
    statusText: 'Online via Cloud Sync Relay',
    publicKey: 'hz-ed25519-omar-19cba882fe',
    fingerprint: '19283 88472 04819 55910 38192 74810',
    transportType: 'webrtc',
    isNearby: false,
    isOnline: true,
    isRegistered: true,
    lastSeen: Date.now() - 1000 * 600,
    unreadCount: 0,
    deviceModel: 'Google Pixel 8',
  },
  {
    id: 'peer_fatima',
    name: 'Fatima Zahra',
    phoneNumber: '+92 300 1234567',
    statusText: 'Offline · Last seen 2h ago',
    publicKey: 'hz-ed25519-fatima-9921bce471',
    fingerprint: '77291 19283 48192 00392 59281 38192',
    transportType: 'cloud',
    isNearby: false,
    isOnline: false,
    isRegistered: true,
    lastSeen: Date.now() - 1000 * 7200,
    unreadCount: 0,
    deviceModel: 'iPhone 15',
  },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg_init_1',
    senderId: 'peer_tariq',
    recipientId: 'usr_hz04_main',
    content: 'Salam Hanzala! The Wi-Fi Direct connection is active without cellular data. Our mesh latency is only 14ms.',
    timestamp: Date.now() - 1000 * 60 * 15,
    status: 'read',
    type: 'text',
    networkTransport: 'p2p_direct',
    encrypted: true,
  },
  {
    id: 'msg_init_2',
    senderId: 'usr_hz04_main',
    recipientId: 'peer_tariq',
    content: 'Perfect. I have verified our safety number fingerprint. Offline voice calls work through local WebRTC ad-hoc socket.',
    timestamp: Date.now() - 1000 * 60 * 12,
    status: 'read',
    type: 'text',
    networkTransport: 'p2p_direct',
    encrypted: true,
  },
  {
    id: 'msg_init_3',
    senderId: 'peer_sarah',
    recipientId: 'usr_hz04_main',
    content: 'Here is the network diagram for the local & peer-to-peer distributed mesh network. Zero-knowledge encrypted on device before transmission.',
    timestamp: Date.now() - 1000 * 60 * 5,
    status: 'delivered',
    type: 'file',
    networkTransport: 'p2p_direct',
    encrypted: true,
    fileData: {
      name: 'P2P_Mesh_Architecture_Spec.pdf',
      size: 4892010, // ~4.8 MB
      mimeType: 'application/pdf',
      checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    },
  },
];

const INITIAL_FILES: SharedFileItem[] = [
  {
    id: 'file_1',
    name: 'Hanzala04_Mesh_Protocol_v2.pdf',
    size: 2450000,
    category: 'document',
    uploadedBy: 'Tariq Al-Mansoor',
    uploadDate: Date.now() - 86400000 * 2,
    isEncrypted: true,
    isOfflineAvailable: true,
    checksum: 'a89f3b18d7210e34c9',
  },
  {
    id: 'file_2',
    name: 'Encrypted_Backup_Snapshot_Oct2026.hzbak',
    size: 1420000000, // 1.42 GB
    category: 'backup',
    uploadedBy: 'Hanzala (Self)',
    uploadDate: Date.now() - 86400000 * 1,
    isEncrypted: true,
    isOfflineAvailable: true,
    checksum: 'fe0184b912a7cc3821',
  },
  {
    id: 'file_3',
    name: 'Field_P2P_Demo_Recording_4K.mp4',
    size: 780000000, // 780 MB
    category: 'media',
    uploadedBy: 'Sarah Chen',
    uploadDate: Date.now() - 3600000 * 5,
    isEncrypted: true,
    isOfflineAvailable: false,
    checksum: '992a01ce838271a55b',
  },
  {
    id: 'file_4',
    name: 'Global_Relay_Cluster_Config.tar.gz',
    size: 34000000,
    category: 'archive',
    uploadedBy: 'Omar Farooq',
    uploadDate: Date.now() - 3600000 * 24,
    isEncrypted: true,
    isOfflineAvailable: false,
    checksum: '67a84091fe33918a00',
  },
];

export class StorageService {
  static getProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.saveProfile(DEFAULT_PROFILE);
    return DEFAULT_PROFILE;
  }

  static saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile:', e);
    }
  }

  static getPeers(): PeerDevice[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PEERS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.savePeers(INITIAL_PEERS);
    return INITIAL_PEERS;
  }

  static savePeers(peers: PeerDevice[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PEERS, JSON.stringify(peers));
    } catch (e) {
      console.warn('Failed to save peers:', e);
    }
  }

  static addPeer(peer: PeerDevice): PeerDevice[] {
    const list = this.getPeers();
    const existingIndex = list.findIndex(p => p.id === peer.id);
    if (existingIndex >= 0) {
      list[existingIndex] = peer;
    } else {
      list.unshift(peer);
    }
    this.savePeers(list);
    return list;
  }

  static deletePeer(peerId: string): PeerDevice[] {
    const list = this.getPeers().filter(p => p.id !== peerId);
    this.savePeers(list);
    return list;
  }

  static getMessages(): Message[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.saveMessages(INITIAL_MESSAGES);
    return INITIAL_MESSAGES;
  }

  static saveMessages(messages: Message[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save messages:', e);
    }
  }

  static addMessage(msg: Message): Message[] {
    const list = this.getMessages();
    list.push(msg);
    this.saveMessages(list);
    return list;
  }

  static updateMessageStatus(id: string, status: Message['status'], transport?: Message['networkTransport']): Message[] {
    const list = this.getMessages().map(m => {
      if (m.id === id) {
        return {
          ...m,
          status,
          networkTransport: transport || m.networkTransport,
        };
      }
      return m;
    });
    this.saveMessages(list);
    return list;
  }

  static getFiles(): SharedFileItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CLOUD_FILES);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    this.saveFiles(INITIAL_FILES);
    return INITIAL_FILES;
  }

  static saveFiles(files: SharedFileItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.CLOUD_FILES, JSON.stringify(files));
    } catch (e) {
      console.warn('Failed to save files:', e);
    }
  }

  static addFile(file: SharedFileItem): SharedFileItem[] {
    const list = this.getFiles();
    list.unshift(file);
    this.saveFiles(list);
    return list;
  }

  static deleteFile(fileId: string): SharedFileItem[] {
    const list = this.getFiles().filter(f => f.id !== fileId);
    this.saveFiles(list);
    return list;
  }

  static resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.PEERS);
    localStorage.removeItem(STORAGE_KEYS.MESSAGES);
    localStorage.removeItem(STORAGE_KEYS.CLOUD_FILES);
  }
}
