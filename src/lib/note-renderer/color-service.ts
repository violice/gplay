import { ColorScheme, NoteFunctionType } from './types';

export const DEFAULT_COLORS: ColorScheme = {
  background: '#1a1a2e',
  strings: '#4a4a6a',
  tactBar: '#e94560',
  noteDefault: '#ffffff',
  noteActive: '#ffd93d',
  tactSize: '#888888',
  highlight: 'rgba(233, 69, 96, 0.15)',
  text: '#ffffff',
  pause: '#666666',
  pauseLine: '#444444'
};

export const DURATION_COLORS: Record<number, string> = {
  1: '#ff4444',
  2: '#ff8844',
  4: '#ffcc44',
  8: '#44cc44',
  16: '#4488ff',
  32: '#aa44ff'
};

const FUNCTION_TYPE_COLORS: Record<NoteFunctionType, string> = {
  [NoteFunctionType.BAND_UP]: '#00ff88',
  [NoteFunctionType.BAND_DOWN]: '#ff6b6b',
  [NoteFunctionType.BAND_UP_12]: '#00ff88',
  [NoteFunctionType.BAND_DOWN_12]: '#ff6b6b',
  [NoteFunctionType.VIBRATO]: '#ffd93d',
  [NoteFunctionType.SLIDE]: '#6bcfff',
  [NoteFunctionType.HAMMER]: '#c56cf0',
  [NoteFunctionType.DEFAULT]: '#ffffff'
};

const FUNCTION_TYPE_SYMBOLS: Record<NoteFunctionType, string> = {
  [NoteFunctionType.BAND_UP]: '↑',
  [NoteFunctionType.BAND_DOWN]: '↓',
  [NoteFunctionType.BAND_UP_12]: '↑½',
  [NoteFunctionType.BAND_DOWN_12]: '↓½',
  [NoteFunctionType.VIBRATO]: '~~',
  [NoteFunctionType.SLIDE]: '→',
  [NoteFunctionType.HAMMER]: 'H',
  [NoteFunctionType.DEFAULT]: ''
};

const LEGEND_ITEMS = [
  { color: '#00ff88', label: '↑ Band' },
  { color: '#ff6b6b', label: '↓ Band' },
  { color: '#ffd93d', label: '~~ Vibrato' },
  { color: '#6bcfff', label: '→ Slide' }
];

export class ColorService {
  private colors: ColorScheme;

  constructor(customColors?: Partial<ColorScheme>) {
    this.colors = {
      background: customColors?.background ?? DEFAULT_COLORS.background,
      strings: customColors?.strings ?? DEFAULT_COLORS.strings,
      tactBar: customColors?.tactBar ?? DEFAULT_COLORS.tactBar,
      noteDefault: customColors?.noteDefault ?? DEFAULT_COLORS.noteDefault,
      noteActive: customColors?.noteActive ?? DEFAULT_COLORS.noteActive,
      tactSize: customColors?.tactSize ?? DEFAULT_COLORS.tactSize,
      highlight: customColors?.highlight ?? DEFAULT_COLORS.highlight,
      text: customColors?.text ?? DEFAULT_COLORS.text,
      pause: customColors?.pause ?? DEFAULT_COLORS.pause,
      pauseLine: customColors?.pauseLine ?? DEFAULT_COLORS.pauseLine
    };
  }

  getColors(): ColorScheme {
    return { ...this.colors };
  }

  updateColors(partial: Partial<ColorScheme>): void {
    this.colors = { ...this.colors, ...partial };
  }

  getNoteColor(functionType: NoteFunctionType): string {
    return FUNCTION_TYPE_COLORS[functionType] || this.colors.noteDefault;
  }

  getFunctionSymbol(functionType: NoteFunctionType): string {
    return FUNCTION_TYPE_SYMBOLS[functionType] || '';
  }

  getDurationColor(duration: number): string {
    return DURATION_COLORS[duration] || this.colors.pause;
  }

  getLegendItems() {
    return [...LEGEND_ITEMS];
  }
}
