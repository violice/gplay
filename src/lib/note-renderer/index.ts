export { NoteRenderer, DEFAULT_COLORS } from './note-renderer';
export { ColorService } from './color-service';
export { CanvasService } from './canvas-service';
export { DrawingService } from './drawing-service';

export type { CanvasDimensions } from './canvas-service';
export type { LayoutInfo, StaveRow } from './drawing-service';

export {
  NoteFunctionType,
  NoteAction,
  NoteEmitterAction,
  NoteDuration
} from './types';

export type {
  NoteDto,
  TactInfo,
  StaveInfo,
  Composition,
  ColorScheme,
  RenderOptions,
  NoteRendererState
} from './types';

export {
  NOTE_LENGTH,
  START_TACT_LENGTH,
  TACTS_WIDTH,
  VERTICAL_TACT_MARGIN,
  STRING_SPACING,
  COLUMN_WIDTH,
  DEFAULT_STRING_COUNT,
  DEFAULT_STRING_NAMES,
  START_LEFT_OFFSET,
  START_TOP_OFFSET,
  MAX_TACT_SIZE,
  ATOMIC_TACT_DIVISION
} from './constants';

export {
  createColumn,
  getPreviousTactSize,
  parseTactSize,
  isValidTactSize,
  calculateTactSizeInUnits,
  shouldShowSize,
  getDurationOfColumn,
  toRealDuration,
  calculateCurrentTactSize,
  isTactFull,
  createOptimalColumnDuration
} from './utils';
