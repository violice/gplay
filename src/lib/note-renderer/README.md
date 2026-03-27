# Note Renderer Library

Библиотека TypeScript для отрисовки табов/партитуры гитары в DOM-элементе с использованием Canvas API.

## Структура

```
note-renderer/
├── index.ts              # Главные экспорты
├── note-renderer.ts      # Основной класс NoteRenderer
├── types.ts              # Enums и интерфейсы
├── constants.ts          # Константы
├── utils.ts              # Вспомогательные функции
├── color-service.ts      # Управление цветами
├── canvas-service.ts      # Управление canvas
└── drawing-service.ts    # Функции отрисовки
```

## Возможности

- Отрисовка гитарных табов с настраиваемым количеством струн
- Отображение нот с номерами ладов и индикаторами техники
- Подсветка текущего такта и ноты во время воспроизведения
- Настраиваемые цвета и внешний вид
- Адаптивная отрисовка на canvas

## Установка

```typescript
import { NoteRenderer, Composition, NoteFunctionType, createColumn } from './lib/note-renderer';
```

## Базовое использование

```typescript
const container = document.getElementById('score-container')!;
const renderer = new NoteRenderer(container);

const composition: Composition = {
  name: 'Моя песня',
  bpm: 120,
  staves: [{
    instrument: 'GUITAR',
    tacts: [{
      sizeStr: '4/4',
      serialNumber: 0,
      notes: [
        [{ value: '3', duration: 8, functionType: NoteFunctionType.DEFAULT }],
        [{ value: '5', duration: 8, functionType: NoteFunctionType.DEFAULT }],
        [{ value: '7', duration: 16, functionType: NoteFunctionType.BAND_UP }]
      ]
    }]
  }]
};

renderer.render(composition);

// Обновить позицию воспроизведения
renderer.updateState({ currentTact: 0, currentNote: 1 });
```

## API

### `new NoteRenderer(container, options?)`

Создает новый экземпляр рендерера.

**Параметры:**
- `container: HTMLElement` - DOM-элемент для отрисовки
- `options?: RenderOptions` - Параметры конфигурации

### `renderer.render(composition)`

Отрисовывает композицию на canvas.

### `renderer.updateState(state)`

Обновляет состояние воспроизведения (для подсветки текущей ноты).

### `renderer.updateColors(colors)`

Обновляет цветовую схему.

### `renderer.resize()`

Пересчитывает размер canvas.

### `renderer.destroy()`

Очищает экземпляр рендерера и удаляет обработчики событий.

## Вспомогательные функции

```typescript
// Создать колонку с пустыми нотами
createColumn(duration: number, value?: string): NoteDto[]

// Проверить валидность размера такта
isValidTactSize(sizeStr: string): boolean

// Рассчитать размер такта в единицах
calculateTactSizeInUnits(sizeStr: string): number

// Проверить заполненность такта
isTactFull(notes: NoteDto[][], sizeStr: string): boolean
```

## Константы

| Константа | Значение | Описание |
|-----------|----------|----------|
| NOTE_LENGTH | 32 | Базовая длина ноты |
| START_TACT_LENGTH | 100 | Начальная ширина такта |
| TACTS_WIDTH | 880 | Ширина тактов |
| VERTICAL_TACT_MARGIN | 120 | Вертикальный отступ между партиями |
| STRING_SPACING | 15 | Расстояние между струнами |
| DEFAULT_STRING_COUNT | 6 | Количество струн по умолчанию |

## Enums

### NoteFunctionType
```typescript
BAND_UP, BAND_DOWN, BAND_UP_12, BAND_DOWN_12, VIBRATO, SLIDE, HAMMER, DEFAULT
```

### NoteAction
```typescript
ADD_COLUMN, REMOVE_COLUMN, ADD_PAUSE, CHANGE_DURATION, ERASE_COLUMN
```

### NoteEmitterAction
```typescript
BAND_UP, BAND_DOWN, BAND_UP_12, BAND_DOWN_12, VIBRATO, DEFAULT,
ADD_COLUMN, REMOVE_COLUMN, ADD_PAUSE, CHANGE_DURATION, ERASE_COLUMN,
INCREASE_DURATION, DECREASE_DURATION
```

### NoteDuration
```typescript
SIXTY_FOUR = 1, THIRTY_TWO = 2, SIXTEENTH = 4, EIGHTH = 8, HALF = 16, SEMIBREVE = 32
```

## Пример с пользовательскими цветами

```typescript
const renderer = new NoteRenderer(container, {
  showTactNumbers: true,
  showTactSize: true,
  stringCount: 6,
  stringNames: ['E', 'A', 'D', 'G', 'B', 'e'],
  colors: {
    background: '#1a1a2e',
    strings: '#4a4a6a',
    tactBar: '#e94560',
    noteDefault: '#ffffff',
    noteActive: '#ffd93d'
  }
});
```
