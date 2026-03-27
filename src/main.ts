import './style.css';
import { MusicPlayer } from './lib/music-player';
import { initUI, addLog, updateNoteState, setProgress, getCurrentSongIndex, updateUI, updateProgress, updatePositionDisplay } from './ui';
import { songs } from './data';

const player = new MusicPlayer();
let progress = 0;

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
    const staves = songs[getCurrentSongIndex()].composition.staves[0].tacts;
    let columnIndex = 0;
    const tactCount = staves.length;
    const currentTact = position.tact;
    const currentBeat = position.note;
    
    for (let i = 0; i < staves.length; i++) {
      if (i === position.tact) {
        columnIndex += position.note;
        break;
      }
      columnIndex += staves[i].notes.length;
    }
    
    updateNoteState(position.tact, position.note, columnIndex);
    
    const totalColumns = staves.reduce((sum, t) => sum + t.notes.length, 0);
    progress = Math.min(100, (columnIndex / Math.max(1, totalColumns - 1)) * 100);
    setProgress(progress);
    updateProgress();
    updatePositionDisplay(currentTact + 1, currentBeat + 1, tactCount);
  },
  onEnd: () => {
    addLog('Song ended!', 'info');
    progress = 100;
    setProgress(progress);
    updateProgress();
    updateUI('stopped');
  }
});

player.loadComposition(songs[0].composition);
initUI(player);
