import './style.css';
import {
  MusicPlayer,
  MusicActionType,
  Composition,
  Instrument,
  NoteFunctionType,
  NoteDuration
} from './lib/music-player';

interface Song {
  name: string;
  description: string;
  bpm: number;
  composition: Composition;
}

const songs: Song[] = [
  {
    name: 'Smoke on the Water',
    description: 'Classic rock riff - Dm-Am-Gm-D',
    bpm: 120,
    composition: {
      name: 'Smoke on the Water',
      bpm: 120,
      complexity: 3,
      description: 'Classic intro riff',
      videoLink: '',
      staves: [{
        instrument: Instrument.GUITAR,
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [{ value: '3', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [{ value: '3', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '6', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
            ]
          }
        ]
      }]
    }
  },
  {
    name: 'Seven Nation Army',
    description: 'Famous riff - E-E-E-E',
    bpm: 140,
    composition: {
      name: 'Seven Nation Army',
      bpm: 140,
      complexity: 2,
      description: 'Simple iconic riff',
      videoLink: '',
      staves: [{
        instrument: Instrument.GUITAR,
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [{ value: '3', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          }
        ]
      }]
    }
  },
  {
    name: 'Back in Black',
    description: 'Heavy intro - E-A-D-G-E',
    bpm: 100,
    composition: {
      name: 'Back in Black',
      bpm: 100,
      complexity: 4,
      description: 'Power chords intro',
      videoLink: '',
      staves: [{
        instrument: Instrument.GUITAR,
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 2,
            notes: [
              [{ value: '5', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 3,
            notes: [
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 4,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          }
        ]
      }]
    }
  },
  {
    name: 'Twinkle Twinkle',
    description: 'Simple melody for beginners',
    bpm: 90,
    composition: {
      name: 'Twinkle Twinkle',
      bpm: 90,
      complexity: 1,
      description: 'Beginner friendly',
      videoLink: '',
      staves: [{
        instrument: Instrument.GUITAR,
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '9', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '9', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [{ value: '10', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '10', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '9', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          }
        ]
      }]
    }
  },
  {
    name: 'Stairway to Heaven',
    description: 'Iconic intro riff',
    bpm: 82,
    composition: {
      name: 'Stairway to Heaven',
      bpm: 82,
      complexity: 5,
      description: 'Led Zeppelin classic intro',
      videoLink: '',
      staves: [{
        instrument: Instrument.GUITAR,
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '6', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 2,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 3,
            notes: [
              [{ value: '10', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 4,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 5,
            notes: [
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '6', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 6,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 7,
            notes: [
              [{ value: '10', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          }
        ]
      }]
    }
  },
  {
    name: 'Wonderwall',
    description: 'Acoustic intro pattern',
    bpm: 87,
    composition: {
      name: 'Wonderwall',
      bpm: 87,
      complexity: 3,
      description: 'Oasis intro strumming',
      videoLink: '',
      staves: [{
        instrument: Instrument.GUITAR,
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 2,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 3,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 4,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 5,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 6,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 7,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 8,
            notes: [
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 9,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '2', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '1', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          }
        ]
      }]
    }
  },
  {
    name: 'Sweet Child O Mine',
    description: 'Main riff intro',
    bpm: 124,
    composition: {
      name: 'Sweet Child O Mine',
      bpm: 124,
      complexity: 6,
      description: 'Guns N Roses intro',
      videoLink: '',
      staves: [{
        instrument: Instrument.GUITAR,
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '10', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 2,
            notes: [
              [{ value: '10', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 3,
            notes: [
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 4,
            notes: [
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '10', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 5,
            notes: [
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 6,
            notes: [
              [{ value: '10', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 7,
            notes: [
              [{ value: '3', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 8,
            notes: [
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '10', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 9,
            notes: [
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '0', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.EIGHTH, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 10,
            notes: [
              [{ value: '10', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '8', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '7', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.SIXTEENTH * 4, functionType: NoteFunctionType.DEFAULT }],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 11,
            notes: [
              [{ value: '7', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
              [{ value: '5', duration: NoteDuration.HALF, functionType: NoteFunctionType.DEFAULT }],
            ]
          }
        ]
      }]
    }
  }
];

let currentSongIndex = 0;
let progress = 0;

const player = new MusicPlayer();

player.setEvents({
  onPlay: () => {
    updateUI('playing');
    progress = 0;
  },
  onPause: () => updateUI('paused'),
  onStop: () => {
    updateUI('stopped');
    progress = 0;
    updateProgress();
    updatePositionDisplay(0, 0, 0);
  },
  onNote: (frequencies) => {
    addLog(`Note: ${frequencies.map(f => Math.round(f) + 'Hz').join(', ')}`, 'note');
  },
  onTick: (position) => {
    const staves = songs[currentSongIndex].composition.staves[0].tacts;
    let totalNotes = 0;
    let currentNote = 0;
    let tactCount = staves.length;
    let currentTact = position.tact;
    let currentBeat = position.note;
    
    for (let i = 0; i < staves.length; i++) {
      for (let j = 0; j < staves[i].notes.length; j++) {
        if (i === position.tact && j === position.note) {
          currentNote = totalNotes;
        }
        totalNotes++;
      }
    }
    
    progress = Math.min(100, (currentNote / Math.max(1, totalNotes - 1)) * 100);
    updateProgress();
    updatePositionDisplay(currentTact + 1, currentBeat + 1, tactCount);
  },
  onEnd: () => {
    addLog('Song ended!', 'info');
    progress = 100;
    updateProgress();
    updateUI('stopped');
  }
});

function render() {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <h1>Music Player Demo</h1>
    <p class="subtitle">Guitar synthesizer using Karplus-Strong algorithm</p>
    
    <div class="demo-section">
      <h2>Select a Song</h2>
      <div class="song-list" id="songList"></div>
    </div>
    
    <div class="demo-section">
      <h2>Now Playing</h2>
      <div class="player-card">
        <div class="song-title">
          ${songs[currentSongIndex].name}
          <span class="status stopped" id="status">Stopped</span>
        </div>
        <div class="song-info" id="songInfo">
          ${songs[currentSongIndex].description} • <span id="bpmDisplay">${songs[currentSongIndex].bpm}</span> BPM
        </div>
        <div class="controls">
          <button class="primary" id="playBtn">Play</button>
          <button id="pauseBtn">Pause</button>
          <button id="stopBtn" class="danger">Stop</button>
          <button id="bpmUp">BPM +10</button>
          <button id="bpmDown">BPM -10</button>
        </div>
        <div class="progress" style="margin-top: 1rem;">
          <div class="progress-fill" id="progressFill"></div>
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.85rem; color: #888;" id="positionDisplay">
          Position: -- / --
        </div>
      </div>
    </div>
    
    <div class="demo-section">
      <h2>Event Log</h2>
      <div class="log-container" id="logContainer">
        <div class="log-entry info">Ready to play. Select a song and press Play.</div>
      </div>
      <button id="clearLog" style="margin-top: 0.5rem;">Clear Log</button>
    </div>
    
    <div class="demo-section">
      <h2>API Example</h2>
      <pre style="background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 8px; overflow-x: auto; font-size: 0.8rem; text-align: left;"><code>import { MusicPlayer, MusicActionType, Composition } from './lib';

const player = new MusicPlayer();
player.loadComposition(mySong);
player.setEvents({
  onPlay: () => console.log('Playing!'),
  onNote: (freqs) => console.log(freqs)
});
player.handleAction(MusicActionType.PLAY);</code></pre>
    </div>
  `;
  
  renderSongList();
  attachListeners();
}

function renderSongList() {
  const list = document.getElementById('songList')!;
  list.innerHTML = songs.map((song, index) => `
    <div class="song-item ${index === currentSongIndex ? 'active' : ''}" data-index="${index}">
      <h3>${song.name}</h3>
      <p>${song.description}</p>
      <span class="bpm">${song.bpm} BPM</span>
    </div>
  `).join('');
  
  list.querySelectorAll('.song-item').forEach(item => {
    item.addEventListener('click', () => {
      currentSongIndex = parseInt(item.getAttribute('data-index')!);
      player.handleAction(MusicActionType.STOP);
      player.loadComposition(songs[currentSongIndex].composition);
      render();
    });
  });
}

function attachListeners() {
  document.getElementById('playBtn')?.addEventListener('click', () => {
    addLog('Starting playback...', 'info');
    player.loadComposition(songs[currentSongIndex].composition);
    player.handleAction(MusicActionType.PLAY);
  });
  
  document.getElementById('pauseBtn')?.addEventListener('click', () => {
    player.handleAction(MusicActionType.SUSPEND);
  });
  
  document.getElementById('stopBtn')?.addEventListener('click', () => {
    addLog('Stopped.', 'info');
    player.handleAction(MusicActionType.STOP);
  });
  
  document.getElementById('bpmUp')?.addEventListener('click', () => {
    songs[currentSongIndex].composition.bpm += 10;
    songs[currentSongIndex].bpm = songs[currentSongIndex].composition.bpm;
    updateBpmDisplay();
    addLog(`BPM increased to ${songs[currentSongIndex].composition.bpm}`, 'info');
  });
  
  document.getElementById('bpmDown')?.addEventListener('click', () => {
    songs[currentSongIndex].composition.bpm = Math.max(60, songs[currentSongIndex].composition.bpm - 10);
    songs[currentSongIndex].bpm = songs[currentSongIndex].composition.bpm;
    updateBpmDisplay();
    addLog(`BPM decreased to ${songs[currentSongIndex].composition.bpm}`, 'info');
  });
  
  document.getElementById('clearLog')?.addEventListener('click', () => {
    document.getElementById('logContainer')!.innerHTML = '';
  });
}

function updateUI(state: 'playing' | 'paused' | 'stopped') {
  const status = document.getElementById('status');
  if (status) {
    status.textContent = state.charAt(0).toUpperCase() + state.slice(1);
    status.className = `status ${state}`;
  }
}

function updateProgress() {
  const fill = document.getElementById('progressFill');
  if (fill) {
    fill.style.width = `${Math.round(progress)}%`;
  }
}

function updatePositionDisplay(tact: number, beat: number, totalTacts: number) {
  const display = document.getElementById('positionDisplay');
  if (display) {
    if (tact === 0 && totalTacts === 0) {
      display.textContent = 'Position: -- / --';
    } else {
      display.textContent = `Tact ${tact}/${totalTacts} • Beat ${beat}`;
    }
  }
}

function updateBpmDisplay() {
  const bpmDisplay = document.getElementById('bpmDisplay');
  if (bpmDisplay) {
    bpmDisplay.textContent = songs[currentSongIndex].bpm.toString();
  }
  renderSongList();
}

function addLog(message: string, type: 'note' | 'info' = 'info') {
  const container = document.getElementById('logContainer');
  if (container) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    container.appendChild(entry);
    container.scrollTop = container.scrollHeight;
  }
}

render();
player.loadComposition(songs[currentSongIndex].composition);
