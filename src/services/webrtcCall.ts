/**
 * Hanzala04 Real WebRTC Calling Service
 * Handles getUserMedia, audio waveform analysis, video tracks, and peer connection state.
 */

export class WebRTCCallService {
  private static localStream: MediaStream | null = null;
  private static remoteStream: MediaStream | null = null;
  private static audioContext: AudioContext | null = null;
  private static analyserNode: AnalyserNode | null = null;
  private static currentFacingMode: 'user' | 'environment' = 'user';

  static async startMedia(video = true, audio = true): Promise<{ localStream: MediaStream; isSimulated: boolean }> {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: video ? { facingMode: this.currentFacingMode, width: { ideal: 640 }, height: { ideal: 480 } } : false,
          audio: audio ? { echoCancellation: true, noiseSuppression: true } : false,
        });
        this.localStream = stream;
        this.initAudioAnalyser(stream);
        return { localStream: stream, isSimulated: false };
      }
    } catch (err) {
      console.warn('Real camera/mic denied or unavailable. Initializing secure synthetic stream for preview:', err);
    }

    // High quality synthetic canvas stream + oscillator for smooth local testing
    const syntheticStream = this.createSyntheticStream(video);
    this.localStream = syntheticStream;
    this.initAudioAnalyser(syntheticStream);
    return { localStream: syntheticStream, isSimulated: true };
  }

  private static initAudioAnalyser(stream: MediaStream) {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.audioContext = new AudioCtx();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.analyserNode = this.audioContext.createAnalyser();
      this.analyserNode.fftSize = 64;
      source.connect(this.analyserNode);
    } catch (e) {
      console.warn('AudioAnalyser initialization skipped:', e);
    }
  }

  static getAudioLevel(): number {
    if (!this.analyserNode) return 0;
    const dataArray = new Uint8Array(this.analyserNode.frequencyBinCount);
    this.analyserNode.getByteFrequencyData(dataArray);
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    return Math.min(100, Math.round((sum / dataArray.length / 255) * 100));
  }

  static toggleMic(muted: boolean) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = !muted;
      });
    }
  }

  static toggleVideo(videoOff: boolean) {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = !videoOff;
      });
    }
  }

  static async flipCamera(video: boolean): Promise<MediaStream | null> {
    this.currentFacingMode = this.currentFacingMode === 'user' ? 'environment' : 'user';
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
    }
    const res = await this.startMedia(video, true);
    return res.localStream;
  }

  static stopMedia() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(t => t.stop());
      this.localStream = null;
    }
    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(t => t.stop());
      this.remoteStream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch {
        // ignore
      }
      this.audioContext = null;
      this.analyserNode = null;
    }
  }

  /**
   * Generates a clean synthetic video stream if physical camera is blocked or permission denied
   */
  private static createSyntheticStream(withVideo: boolean): MediaStream {
    const canvas = document.createElement('canvas');
    canvas.width = 480;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');

    let angle = 0;
    const draw = () => {
      if (!ctx) return;
      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 480, 640);
      grad.addColorStop(0, '#064e3b');
      grad.addColorStop(1, '#022c22');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 480, 640);

      // Subtle cryptographic particle nodes
      ctx.fillStyle = '#10b981';
      for (let i = 0; i < 12; i++) {
        const x = 240 + Math.cos(angle + i) * (80 + i * 8);
        const y = 320 + Math.sin(angle + i) * (80 + i * 8);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // App Monogram
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Hanzala04', 240, 310);
      ctx.font = '16px monospace';
      ctx.fillStyle = '#6ee7b7';
      ctx.fillText('P2P WebRTC Direct Stream', 240, 345);

      angle += 0.03;
      requestAnimationFrame(draw);
    };

    if (withVideo) {
      draw();
    }

    const stream = canvas.captureStream(30);

    // Add synthetic audio track
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        const actx = new AudioCtx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        gain.gain.value = 0.001; // barely audible, prevents browser muting
        osc.connect(gain);
        const dest = actx.createMediaStreamDestination();
        gain.connect(dest);
        osc.start();
        dest.stream.getAudioTracks().forEach(t => stream.addTrack(t));
      }
    } catch {
      // silent
    }

    return stream;
  }
}
