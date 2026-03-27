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
    updateNoteState(position.tact, position.note);
    
    const staves = songs[getCurrentSongIndex()].composition.staves[0].tacts;
    let totalNotes = 0;
    let currentNote = 0;
    const tactCount = staves.length;
    const currentTact = position.tact;
    const currentBeat = position.note;
    
    for (let i = 0; i < staves.length; i++) {
      for (let j = 0; j < staves[i].notes.length; j++) {
        if (i === position.tact && j === position.note) {
          currentNote = totalNotes;
        }
        totalNotes++;
      }
    }
    
    progress = Math.min(100, (currentNote / Math.max(1, totalNotes - 1)) * 100);
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
