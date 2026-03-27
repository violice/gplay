import { SoundService } from './sound-service';

export class PlaySoundService {
  private soundService: SoundService;

  constructor() {
    this.soundService = new SoundService();
  }

  playSound(rates: number[]): void {
    const audioCtx = new AudioContext();
    const sampleRate = audioCtx.sampleRate;
    const duration = 1;
    const bufferSize = Math.floor(sampleRate * duration);

    const audioBuffer = audioCtx.createBuffer(2, bufferSize, sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    const channelData1 = audioBuffer.getChannelData(1);

    const sampleArrays = rates.map(rate => this.soundService.karplusStrong(rate));

    const samples: number[] = [];
    for (let i = 0; i < bufferSize; i++) {
      let sample = 0;
      for (let j = 0; j < sampleArrays.length; j++) {
        sample += sampleArrays[j][i] || 0;
      }
      samples.push(sample / sampleArrays.length);
    }

    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = samples[i];
      channelData1[i] = samples[i] * 0.9;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start(0);

    setTimeout(() => {
      audioCtx.close();
    }, duration * 1000 + 100);
  }

  clear(): void {}
}
