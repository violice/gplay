import { NoteFunctionType, NoteDuration } from '../lib/note-renderer';
import { Composition } from '../lib/music-player';

interface JsonNote {
  value: string;
  functionType: string | null;
  stringNumber: number;
}

interface JsonTactColumn {
  notes: JsonNote[];
  duration: number;
  numberInTact: number;
}

interface JsonTact {
  size: string;
  tactColumns: JsonTactColumn[];
  serialNumber: number;
}

interface JsonStave {
  tacts: JsonTact[];
  number: null;
  instrument: string;
}

const DURATION_MAP: Record<number, NoteDuration> = {
  1: NoteDuration.SIXTY_FOUR,
  2: NoteDuration.THIRTY_TWO,
  4: NoteDuration.SIXTEENTH,
  8: NoteDuration.EIGHTH,
  16: NoteDuration.HALF,
  32: NoteDuration.SEMIBREVE,
};

function mapFunctionType(type: string | null): NoteFunctionType {
  if (!type || type === 'DEFAULT') return NoteFunctionType.DEFAULT;
  return type as NoteFunctionType;
}

function mapDuration(duration: number): NoteDuration {
  return DURATION_MAP[duration] || NoteDuration.SIXTEENTH;
}

export function jsonToComposition(json: JsonStave[], name: string, bpm: number): Composition {
  return {
    name,
    bpm,
    complexity: 3,
    description: `Imported from JSON`,
    videoLink: '',
    staves: json.map((stave) => ({
      instrument: stave.instrument,
      tacts: stave.tacts.map((tact) => ({
        sizeStr: tact.size,
        serialNumber: tact.serialNumber,
        notes: transposeTact(tact),
      })),
    })),
  };
}

function transposeTact(tact: JsonTact) {
  const columns = tact.tactColumns;
  const stringCount = 6;
  const columnCount = columns.length;

  const result: Array<Array<{ value: string; duration: number; functionType: NoteFunctionType }>> = [];

  for (let stringIdx = 0; stringIdx < stringCount; stringIdx++) {
    const stringColumn: Array<{ value: string; duration: number; functionType: NoteFunctionType }> = [];
    for (let colIdx = 0; colIdx < columnCount; colIdx++) {
      const note = columns[colIdx].notes[stringIdx];
      stringColumn.push({
        value: note?.value || '',
        duration: mapDuration(columns[colIdx].duration),
        functionType: note ? mapFunctionType(note.functionType) : NoteFunctionType.DEFAULT,
      });
    }
    result.push(stringColumn);
  }

  return result;
}
