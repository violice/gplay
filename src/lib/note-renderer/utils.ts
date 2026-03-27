import {
  NoteDto,
  NoteFunctionType,
  NoteDuration
} from './types';
import { NOTE_LENGTH, MAX_TACT_SIZE, ATOMIC_TACT_DIVISION } from './constants';

export function createColumn(duration: number = 1, value = ''): NoteDto[] {
  return Array(NOTE_LENGTH)
    .fill(false)
    .map(() => ({
      value,
      duration,
      functionType: NoteFunctionType.DEFAULT
    }));
}

export function getPreviousTactSize(tacts: { sizeStr: string }[]): string {
  return tacts.length === 0 ? '4/4' : tacts[tacts.length - 1].sizeStr;
}

export function parseTactSize(sizeStr: string): { numerator: number; denominator: number } {
  const [numerator, denominator] = sizeStr.split('/').map(Number);
  return { numerator, denominator };
}

export function isValidTactSize(sizeStr: string): boolean {
  const { numerator, denominator } = parseTactSize(sizeStr);
  
  if (isNaN(numerator) || isNaN(denominator)) {
    return false;
  }
  
  if (numerator / denominator > MAX_TACT_SIZE) {
    return false;
  }
  
  if (((numerator % denominator) / denominator) % ATOMIC_TACT_DIVISION > 0) {
    return false;
  }
  
  return true;
}

export function calculateTactSizeInUnits(sizeStr: string): number {
  const { numerator, denominator } = parseTactSize(sizeStr);
  return (numerator * 32) / denominator;
}

export function shouldShowSize(tacts: { sizeStr: string }[], index: number): boolean {
  if (index === 0) return true;
  return tacts[index].sizeStr !== tacts[index - 1].sizeStr;
}

export function getDurationOfColumn(column: NoteDto[]): number {
  return column[0]?.duration || 0;
}

export function toRealDuration(duration: number): number {
  switch (duration) {
    case NoteDuration.SIXTY_FOUR: return 32;
    case NoteDuration.THIRTY_TWO: return 16;
    case NoteDuration.SIXTEENTH: return 8;
    case NoteDuration.EIGHTH: return 4;
    case NoteDuration.HALF: return 2;
    case NoteDuration.SEMIBREVE: return 1;
    default: return duration;
  }
}

export function calculateCurrentTactSize(notes: NoteDto[][]): number {
  return notes.reduce((acc, col) => acc + getDurationOfColumn(col), 0);
}

export function isTactFull(notes: NoteDto[][], sizeStr: string): boolean {
  const currentSize = calculateCurrentTactSize(notes);
  const tactSize = calculateTactSizeInUnits(sizeStr);
  return currentSize >= tactSize;
}

export function createOptimalColumnDuration(notes: NoteDto[][], sizeStr: string): number {
  const currentSize = calculateCurrentTactSize(notes);
  const tactSize = calculateTactSizeInUnits(sizeStr);
  const remaining = tactSize - currentSize;
  
  if (remaining <= 0) return 0;
  
  return Math.pow(2, Math.floor(Math.log2(remaining)));
}
