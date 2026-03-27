export enum NoteFunctionType {
  BAND_UP = 'BAND_UP',
  BAND_DOWN = 'BAND_DOWN',
  BAND_UP_12 = 'BAND_UP_12',
  BAND_DOWN_12 = 'BAND_DOWN_12',
  VIBRATO = 'VIBRATO',
  SLIDE = 'SLIDE',
  HAMMER = 'HAMMER',
  DEFAULT = 'DEFAULT'
}

export enum NoteAction {
  ADD_COLUMN = 'ADD_COLUMN',
  REMOVE_COLUMN = 'REMOVE_COLUMN',
  ADD_PAUSE = 'ADD_PAUSE',
  CHANGE_DURATION = 'CHANGE_DURATION',
  ERASE_COLUMN = 'ERASE_COLUMN'
}

export enum NoteEmitterAction {
  BAND_UP = 'BAND_UP',
  BAND_DOWN = 'BAND_DOWN',
  BAND_UP_12 = 'BAND_UP_12',
  BAND_DOWN_12 = 'BAND_DOWN_12',
  VIBRATO = 'VIBRATO',
  DEFAULT = 'DEFAULT',
  ADD_COLUMN = 'ADD_COLUMN',
  REMOVE_COLUMN = 'REMOVE_COLUMN',
  ADD_PAUSE = 'ADD_PAUSE',
  CHANGE_DURATION = 'CHANGE_DURATION',
  ERASE_COLUMN = 'ERASE_COLUMN',
  INCREASE_DURATION = 'INCREASE_DURATION',
  DECREASE_DURATION = 'DECREASE_DURATION'
}

export enum NoteDuration {
  SIXTY_FOUR = 1,
  THIRTY_TWO = 2,
  SIXTEENTH = 4,
  EIGHTH = 8,
  HALF = 16,
  SEMIBREVE = 32
}

export interface NoteDto {
  value: string;
  duration: number;
  functionType: NoteFunctionType;
}

export interface TactInfo {
  sizeStr: string;
  notes: NoteDto[][];
  serialNumber: number;
  topLeftCorner?: number;
  width?: number;
  height?: number;
}

export interface StaveInfo {
  instrument: string;
  tacts: TactInfo[];
}

export interface Composition {
  staves: StaveInfo[];
  name: string;
  bpm: number;
}

export interface ColorScheme {
  background: string;
  strings: string;
  tactBar: string;
  noteDefault: string;
  noteActive: string;
  tactSize: string;
  highlight: string;
  text: string;
  pause: string;
  pauseLine: string;
}

export interface RenderOptions {
  showTactNumbers?: boolean;
  showTactSize?: boolean;
  highlightCurrentTact?: boolean;
  highlightCurrentNote?: boolean;
  stringCount?: number;
  stringNames?: string[];
  colors?: Partial<ColorScheme>;
}

export interface NoteRendererState {
  currentStave: number;
  currentTact: number;
  currentNote: number;
}
