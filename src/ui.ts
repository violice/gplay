import { MusicPlayer, MusicActionType } from './lib/music-player';
import { TabRenderer } from './lib/tab-renderer/tab-renderer';
import type { PlayheadProgress } from './lib/tab-renderer/tab-renderer';
import { Song, songs } from './data';

let currentSongIndex = 0;
let progress = 0;
let scoreContainer: HTMLDivElement | null = null;
let tabRenderer: TabRenderer | null = null;
let player: MusicPlayer;

export function initUI(musicPlayer: MusicPlayer): void {
  player = musicPlayer;
  
  player.setEvents({
    onProgress: (progress: PlayheadProgress) => {
      tabRenderer?.updatePlayheadProgress(progress);
    },
    onStop: () => {
      tabRenderer?.resetPlayhead();
    }
  });
  
  render();
  attachScoreRenderer();
}

function attachScoreRenderer(): void {
  const scoreWrapper = document.getElementById('score-wrapper');
  if (!scoreWrapper) return;

  scoreWrapper.innerHTML = '';
  
  scoreContainer = document.createElement('div');
  scoreContainer.id = 'score-container';
  scoreContainer.style.width = '100%';
  scoreContainer.style.minHeight = '200px';
  scoreContainer.style.maxHeight = '400px';
  scoreContainer.style.borderRadius = '8px';
  scoreContainer.style.overflow = 'auto';

  if (tabRenderer) {
    tabRenderer.destroy();
  }

  tabRenderer = new TabRenderer(scoreContainer, {
    showTactNumbers: true
  });

  scoreWrapper.appendChild(scoreContainer);
  tabRenderer.render(songs[currentSongIndex].composition);
  tabRenderer.updateState({ currentTact: 0, currentNote: 0 });
}

export function updateNoteState(tact: number, note: number, columnIndex?: number): void {
  tabRenderer?.updateState({ currentTact: tact, currentNote: note, columnIndex: columnIndex ?? 0 });
}

export function addLog(message: string, type: 'note' | 'info' = 'info'): void {
  const container = document.getElementById('logContainer');
  if (container) {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    container.appendChild(entry);
    container.scrollTop = container.scrollHeight;
  }
}

function updateUI(state: 'playing' | 'paused' | 'stopped'): void {
  const status = document.getElementById('status');
  if (status) {
    status.textContent = state.charAt(0).toUpperCase() + state.slice(1);
    status.className = `status ${state}`;
  }
}

function updateProgress(): void {
  const fill = document.getElementById('progressFill');
  if (fill) {
    fill.style.width = `${Math.round(progress)}%`;
  }
}

function updatePositionDisplay(tact: number, beat: number, totalTacts: number): void {
  const display = document.getElementById('positionDisplay');
  if (display) {
    if (tact === 0 && totalTacts === 0) {
      display.textContent = 'Position: -- / --';
    } else {
      display.textContent = `Tact ${tact}/${totalTacts} • Beat ${beat}`;
    }
  }
}

export function render(): void {
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
      <h2>Score Visualization</h2>
      <div class="player-card" id="score-wrapper"></div>
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
  attachEventListeners();
}

function attachEventListeners(): void {
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

function renderSongList(): void {
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
      attachScoreRenderer();
    });
  });
}

function updateBpmDisplay(): void {
  const bpmDisplay = document.getElementById('bpmDisplay');
  if (bpmDisplay) {
    bpmDisplay.textContent = songs[currentSongIndex].bpm.toString();
  }
  renderSongList();
}

export function setProgress(value: number): void {
  progress = value;
}

export function setCurrentSong(index: number): void {
  currentSongIndex = index;
}

export { updateUI, updateProgress, updatePositionDisplay };

export function getCurrentSongIndex(): number {
  return currentSongIndex;
}

export function getSongs(): Song[] {
  return songs;
}

export { progress, currentSongIndex };
