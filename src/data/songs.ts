import { Composition, NoteFunctionType, NoteDuration } from '../lib/music-player';

export interface Song {
  name: string;
  description: string;
  bpm: number;
  composition: Composition;
}

const createColumn = (value: string, duration: number, func: NoteFunctionType = NoteFunctionType.DEFAULT) => ({
  value,
  duration,
  functionType: func
});

const emptyColumn = (duration: number) => createColumn('', duration);

export const songs: Song[] = [
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
        instrument: 'GUITAR',
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [createColumn('3', NoteDuration.EIGHTH)],
              [createColumn('5', NoteDuration.EIGHTH)],
              [createColumn('3', NoteDuration.EIGHTH)],
              [createColumn('1', NoteDuration.EIGHTH)],
              [createColumn('3', NoteDuration.EIGHTH)],
              [createColumn('5', NoteDuration.EIGHTH)],
              [createColumn('3', NoteDuration.EIGHTH)],
              [createColumn('1', NoteDuration.EIGHTH)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [createColumn('3', NoteDuration.EIGHTH)],
              [createColumn('5', NoteDuration.EIGHTH)],
              [createColumn('6', NoteDuration.EIGHTH)],
              [createColumn('5', NoteDuration.EIGHTH)],
              [createColumn('3', NoteDuration.EIGHTH)],
              [createColumn('1', NoteDuration.EIGHTH)],
              [createColumn('3', NoteDuration.EIGHTH)],
              [createColumn('1', NoteDuration.EIGHTH)],
            ]
          }
        ]
      }]
    }
  },
  {
    name: 'Test Multi-Stave',
    description: 'Test song with multiple staves',
    bpm: 100,
    composition: {
      name: 'Multi-Stave Test',
      bpm: 100,
      complexity: 2,
      description: 'Testing multiple staves',
      videoLink: '',
      staves: [
        {
          instrument: 'GUITAR',
          tacts: [
            {
              sizeStr: '4/4',
              serialNumber: 0,
              notes: [
                [createColumn('0', NoteDuration.HALF)],
                [createColumn('2', NoteDuration.HALF)],
                [createColumn('3', NoteDuration.HALF)],
                [createColumn('2', NoteDuration.HALF)],
              ]
            },
            {
              sizeStr: '4/4',
              serialNumber: 1,
              notes: [
                [createColumn('0', NoteDuration.HALF)],
                [createColumn('1', NoteDuration.HALF)],
                [createColumn('3', NoteDuration.HALF)],
                [createColumn('2', NoteDuration.HALF)],
              ]
            }
          ]
        },
        {
          instrument: 'BASS',
          tacts: [
            {
              sizeStr: '4/4',
              serialNumber: 0,
              notes: [
                [createColumn('0', NoteDuration.HALF)],
                [emptyColumn(NoteDuration.HALF)],
                [createColumn('3', NoteDuration.HALF)],
                [emptyColumn(NoteDuration.HALF)],
              ]
            },
            {
              sizeStr: '4/4',
              serialNumber: 1,
              notes: [
                [createColumn('0', NoteDuration.HALF)],
                [emptyColumn(NoteDuration.HALF)],
                [createColumn('2', NoteDuration.HALF)],
                [emptyColumn(NoteDuration.HALF)],
              ]
            }
          ]
        }
      ]
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
        instrument: 'GUITAR',
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [createColumn('0', NoteDuration.SIXTEENTH * 4)],
              [createColumn('7', NoteDuration.SIXTEENTH * 4)],
              [createColumn('5', NoteDuration.SIXTEENTH * 4)],
              [createColumn('7', NoteDuration.SIXTEENTH * 4)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [createColumn('3', NoteDuration.SIXTEENTH * 4)],
              [createColumn('2', NoteDuration.SIXTEENTH * 4)],
              [createColumn('0', NoteDuration.HALF)],
              [createColumn('0', NoteDuration.SIXTEENTH * 4)],
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
        instrument: 'GUITAR',
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [createColumn('0', NoteDuration.HALF)],
              [createColumn('0', NoteDuration.HALF)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [createColumn('0', NoteDuration.HALF)],
              [createColumn('3', NoteDuration.HALF)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 2,
            notes: [
              [createColumn('5', NoteDuration.HALF)],
              [createColumn('5', NoteDuration.HALF)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 3,
            notes: [
              [createColumn('7', NoteDuration.HALF)],
              [createColumn('7', NoteDuration.HALF)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 4,
            notes: [
              [createColumn('0', NoteDuration.HALF)],
              [createColumn('0', NoteDuration.HALF)],
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
        instrument: 'GUITAR',
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [createColumn('0', NoteDuration.HALF)],
              [createColumn('0', NoteDuration.HALF)],
              [createColumn('7', NoteDuration.HALF)],
              [createColumn('7', NoteDuration.HALF)],
              [createColumn('9', NoteDuration.HALF)],
              [createColumn('9', NoteDuration.HALF)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [createColumn('10', NoteDuration.HALF)],
              [createColumn('10', NoteDuration.HALF)],
              [createColumn('9', NoteDuration.HALF)],
              [createColumn('7', NoteDuration.HALF)],
              [createColumn('7', NoteDuration.HALF)],
              [createColumn('5', NoteDuration.HALF)],
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
        instrument: 'GUITAR',
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [createColumn('0', NoteDuration.SIXTEENTH * 4)],
              [createColumn('7', NoteDuration.EIGHTH)],
              [createColumn('8', NoteDuration.EIGHTH)],
              [createColumn('10', NoteDuration.SIXTEENTH * 4)],
              [createColumn('8', NoteDuration.SIXTEENTH * 4)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [createColumn('7', NoteDuration.HALF)],
              [createColumn('0', NoteDuration.SIXTEENTH * 4)],
              [createColumn('7', NoteDuration.EIGHTH)],
              [createColumn('8', NoteDuration.EIGHTH)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 2,
            notes: [
              [createColumn('10', NoteDuration.SIXTEENTH * 4)],
              [createColumn('8', NoteDuration.SIXTEENTH * 4)],
              [createColumn('7', NoteDuration.SIXTEENTH * 4)],
              [createColumn('5', NoteDuration.SIXTEENTH * 4)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 3,
            notes: [
              [createColumn('7', NoteDuration.HALF)],
              [createColumn('5', NoteDuration.HALF)],
            ]
          }
        ]
      }]
    }
  },
  {
    name: 'Bend Test',
    description: 'Testing bend effects',
    bpm: 100,
    composition: {
      name: 'Bend Test',
      bpm: 100,
      complexity: 3,
      description: 'Testing bend effects',
      videoLink: '',
      staves: [{
        instrument: 'GUITAR',
        tacts: [
          {
            sizeStr: '4/4',
            serialNumber: 0,
            notes: [
              [createColumn('5', NoteDuration.EIGHTH, NoteFunctionType.BAND_UP)],
              [createColumn('7', NoteDuration.EIGHTH)],
              [createColumn('5', NoteDuration.EIGHTH, NoteFunctionType.VIBRATO)],
              [createColumn('3', NoteDuration.EIGHTH)],
              [createColumn('5', NoteDuration.EIGHTH, NoteFunctionType.BAND_DOWN)],
              [createColumn('3', NoteDuration.EIGHTH)],
            ]
          },
          {
            sizeStr: '4/4',
            serialNumber: 1,
            notes: [
              [createColumn('7', NoteDuration.EIGHTH, NoteFunctionType.SLIDE)],
              [createColumn('5', NoteDuration.EIGHTH)],
              [createColumn('3', NoteDuration.EIGHTH, NoteFunctionType.HAMMER)],
              [createColumn('0', NoteDuration.EIGHTH)],
            ]
          }
        ]
      }]
    }
  }
];
