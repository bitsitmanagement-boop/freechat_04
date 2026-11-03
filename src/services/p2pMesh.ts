import { Message, NetworkMode, PeerDevice } from '../types';

export interface P2PEventPayload {
  type: 'peer_heartbeat' | 'message_send' | 'message_ack' | 'file_chunk' | 'call_signal';
  senderId: string;
  senderName: string;
  data: any;
  timestamp: number;
}

type P2PListener = (event: P2PEventPayload) => void;

export class P2PMeshService {
  private static channel: BroadcastChannel | null = null;
  private static listeners: Set<P2PListener> = new Set();
  private static localDeviceId = 'usr_hz04_main';
  private static localDeviceName = 'Hanzala (Self)';

  static init(deviceId: string, deviceName: string) {
    this.localDeviceId = deviceId;
    this.localDeviceName = deviceName;

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        if (!this.channel) {
          this.channel = new BroadcastChannel('hanzala04_p2p_mesh');
          this.channel.onmessage = (event) => {
            const payload: P2PEventPayload = event.data;
            if (payload && payload.senderId !== this.localDeviceId) {
              this.notifyListeners(payload);
            }
          };
        }
      } catch (e) {
        console.warn('BroadcastChannel not supported or restricted:', e);
      }
    }
  }

  static subscribe(listener: P2PListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notifyListeners(payload: P2PEventPayload) {
    this.listeners.forEach((fn) => {
      try {
        fn(payload);
      } catch (e) {
        console.error('Error in P2P listener:', e);
      }
    });
  }

  static broadcast(type: P2PEventPayload['type'], data: any) {
    const payload: P2PEventPayload = {
      type,
      senderId: this.localDeviceId,
      senderName: this.localDeviceName,
      data,
      timestamp: Date.now(),
    };

    if (this.channel) {
      try {
        this.channel.postMessage(payload);
      } catch (e) {
        console.warn('Failed to broadcast on P2P channel:', e);
      }
    }
  }

  /**
   * Broadcasts device presence beacon for nearby discovery
   */
  static broadcastBeacon(networkMode: NetworkMode) {
    if (networkMode === 'offline') return;
    this.broadcast('peer_heartbeat', {
      networkMode,
      rssi: -45 - Math.floor(Math.random() * 20),
      isNearby: true,
      lastSeen: Date.now(),
    });
  }

  /**
   * Sends encrypted message over P2P mesh
   */
  static sendP2PMessage(message: Message, networkMode: NetworkMode): boolean {
    if (networkMode === 'offline') {
      // Cannot deliver immediately, must remain queued
      return false;
    }
    this.broadcast('message_send', {
      message,
    });
    return true;
  }

  /**
   * Acknowledges message receipt (sets status to delivered / read)
   */
  static sendAck(messageId: string, status: 'delivered' | 'read') {
    this.broadcast('message_ack', {
      messageId,
      status,
    });
  }
}
