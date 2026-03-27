import {
  Composition,
  TactInfo,
  StaveInfo,
  NoteDto,
  NoteFunctionType,
  NoteRendererState
} from './types';
import {
  NOTE_LENGTH,
  STRING_SPACING,
  VERTICAL_TACT_MARGIN,
  MARGIN_LEFT,
  STRING_NAME_WIDTH
} from './constants';
import { ColorService } from './color-service';
import { shouldShowSize, getDurationOfColumn, toRealDuration } from './utils';

interface DrawingOptions {
  showTactNumbers: boolean;
  showTactSize: boolean;
  highlightCurrentTact: boolean;
  highlightCurrentNote: boolean;
  stringCount: number;
  stringNames: string[];
}

export interface LayoutInfo {
  width: number;
  height: number;
  staveRows: StaveRow[];
}

export interface StaveRow {
  staveIndex: number;
  y: number;
  tactLayouts: TactLayout[];
}

export interface TactLayout {
  tactIndex: number;
  x: number;
  y: number;
  width: number;
}

export class DrawingService {
  private ctx: CanvasRenderingContext2D;
  private colorService: ColorService;

  constructor(ctx: CanvasRenderingContext2D, colorService: ColorService) {
    this.ctx = ctx;
    this.colorService = colorService;
  }

  setContext(ctx: CanvasRenderingContext2D): void {
    this.ctx = ctx;
  }

  drawBackground(width: number, height: number): void {
    const colors = this.colorService.getColors();
    this.ctx.fillStyle = colors.background;
    this.ctx.fillRect(0, 0, width, height);
  }

  private getColors() {
    return this.colorService.getColors();
  }

  private getStringY(baseY: number, stringIndex: number): number {
    return baseY + stringIndex * STRING_SPACING;
  }

  private getColumnWidth(): number {
    return NOTE_LENGTH;
  }

  private getNoteRadius(): number {
    return 12;
  }

  drawStaveHeader(stave: StaveInfo, x: number, y: number): void {
    const colors = this.getColors();
    this.ctx.font = 'bold 16px Arial';
    this.ctx.fillStyle = colors.tactBar;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(stave.instrument, x, y);
  }

  drawStringNames(x: number, startY: number, names: string[], stringCount: number): void {
    const colors = this.getColors();
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = colors.text;
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';

    for (let i = 0; i < stringCount && i < names.length; i++) {
      const y = this.getStringY(startY, i);
      this.ctx.fillText(names[i], x, y);
    }
  }

  drawTactBarline(x: number, startY: number, height: number): void {
    const colors = this.getColors();
    this.ctx.strokeStyle = colors.tactBar;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x, startY);
    this.ctx.lineTo(x, startY + height);
    this.ctx.stroke();
  }

  drawEndBarline(x: number, startY: number, height: number): void {
    const colors = this.getColors();
    this.ctx.strokeStyle = colors.tactBar;
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(x, startY);
    this.ctx.lineTo(x, startY + height);
    this.ctx.stroke();
  }

  drawTactSize(x: number, y: number, sizeStr: string): void {
    const colors = this.getColors();
    const [beats, beatType] = sizeStr.split('/');

    this.ctx.font = "bold 32px 'Academy Engraved LET', Georgia, serif";
    this.ctx.fillStyle = colors.tactSize;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(beats, x, y);
    this.ctx.fillText(beatType, x, y + 28);
  }

  drawTactNumber(x: number, y: number, num: number): void {
    const colors = this.getColors();
    this.ctx.font = 'bold 14px Arial';
    this.ctx.fillStyle = colors.tactSize;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(`${num + 1}`, x, y);
  }

  drawTactHighlight(x: number, startY: number, width: number, height: number): void {
    const colors = this.getColors();
    this.ctx.fillStyle = colors.highlight;
    this.ctx.fillRect(x, startY - 5, width, height + 10);
  }

  private drawNoteNumber(x: number, y: number, value: string, isActive: boolean): void {
    const colors = this.getColors();
    const textColor = isActive ? colors.noteActive : colors.noteDefault;

    this.ctx.font = 'bold 14px Arial';
    this.ctx.fillStyle = textColor;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(value, x, y);
  }

  private drawOpenString(x: number, y: number, isActive: boolean): void {
    const colors = this.getColors();
    const radius = this.getNoteRadius();
    const strokeColor = isActive ? colors.noteActive : colors.noteDefault;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  private drawFunctionIndicator(x: number, y: number, functionType: NoteFunctionType): void {
    const symbol = this.colorService.getFunctionSymbol(functionType);
    const color = this.colorService.getNoteColor(functionType);

    this.ctx.font = 'bold 12px Arial';
    this.ctx.fillStyle = color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText(symbol, x, y);
  }

  drawStrings(startX: number, startY: number, endX: number, stringCount: number, isCurrent: boolean): void {
    const colors = this.getColors();

    for (let i = 0; i < stringCount; i++) {
      const y = this.getStringY(startY, i);
      this.ctx.strokeStyle = isCurrent ? colors.strings : '#3a3a5a';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(startX, y);
      this.ctx.lineTo(endX, y);
      this.ctx.stroke();
    }
  }

  drawColumnPause(startX: number, startY: number, duration: number, stringCount: number): void {
    const colors = this.getColors();
    const columnWidth = this.getColumnWidth();
    const realDuration = toRealDuration(duration);
    const pauseHeight = (stringCount - 1) * STRING_SPACING;

    const x = startX + columnWidth / 2;
    const y = startY;

    if (realDuration >= 16) {
      this.ctx.strokeStyle = colors.tactSize;
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([]);
    } else {
      this.ctx.strokeStyle = colors.tactSize;
      this.ctx.lineWidth = 1;
      this.ctx.setLineDash([4, 4]);
    }

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + pauseHeight);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  drawTactPause(startX: number, startY: number, width: number, height: number): void {
    const colors = this.getColors();
    const centerX = startX + width / 2;
    const centerY = startY + height / 2;

    this.ctx.fillStyle = colors.text;
    this.ctx.globalAlpha = 0.3;
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY - 20, 15, 20, 0, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.globalAlpha = 1;

    this.ctx.strokeStyle = colors.text;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.lineTo(centerX, centerY + 30);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(centerX - 8, centerY + 35);
    this.ctx.lineTo(centerX + 8, centerY + 35);
    this.ctx.stroke();
  }

  drawNotes(
    startX: number,
    startY: number,
    tact: TactInfo,
    isCurrentStave: boolean,
    state: NoteRendererState,
    options: DrawingOptions
  ): void {
    const columnWidth = this.getColumnWidth();
    const isCurrentTact = isCurrentStave && tact.serialNumber === state.currentTact;

    for (let colIndex = 0; colIndex < tact.notes.length; colIndex++) {
      const column = tact.notes[colIndex];
      const duration = getDurationOfColumn(column);
      const colX = startX + colIndex * columnWidth;

      const isCurrentColumn = isCurrentTact && colIndex === state.currentNote;
      const isPauseColumn = this.isPauseColumn(column);

      if (isPauseColumn) {
        this.drawColumnPause(colX, startY, duration, options.stringCount);
        continue;
      }

      for (let stringIndex = 0; stringIndex < options.stringCount; stringIndex++) {
        const note = this.getNoteAtString(column, stringIndex);
        const noteY = this.getStringY(startY, stringIndex);
        const noteX = colX + columnWidth / 2;

        if (!note || !note.value) continue;

        if (note.value === '0') {
          this.drawOpenString(noteX, noteY, isCurrentColumn);
        } else {
          this.drawNoteNumber(noteX, noteY, note.value, isCurrentColumn);
        }

        if (note.functionType !== NoteFunctionType.DEFAULT) {
          this.drawFunctionIndicator(noteX, noteY - 18, note.functionType);
        }
      }
    }
  }

  private isPauseColumn(column: NoteDto[]): boolean {
    return !column.some(note => note.value && note.value !== '');
  }

  private getNoteAtString(column: NoteDto[], stringIndex: number): NoteDto | null {
    if (stringIndex < column.length) {
      const note = column[stringIndex];
      if (note && note.value && note.value !== '') {
        return note;
      }
    }
    return null;
  }

  calculateLayout(
    composition: Composition,
    containerWidth: number,
    stringCount: number
  ): LayoutInfo {
    const MARGIN_LEFT = 60;
    const MARGIN_RIGHT = 40;
    const HEADER_HEIGHT = 40;
    const STAVE_GAP = 60;
    const TACT_GAP = 10;
    const STRING_NAME_WIDTH = 25;

    let totalHeight = 30;
    const staveRows: StaveRow[] = [];

    for (let staveIndex = 0; staveIndex < composition.staves.length; staveIndex++) {
      const stave = composition.staves[staveIndex];
      const rowHeight = (stringCount - 1) * STRING_SPACING + HEADER_HEIGHT;

      let currentX = MARGIN_LEFT + STRING_NAME_WIDTH;
      let currentY = totalHeight;
      const rowTacts: TactLayout[] = [];

      for (let i = 0; i < stave.tacts.length; i++) {
        const tact = stave.tacts[i];
        const tactWidth = this.calculateTactWidth(tact);

        if (rowTacts.length > 0 && currentX + tactWidth > containerWidth - MARGIN_RIGHT) {
          staveRows.push({
            staveIndex,
            y: currentY,
            tactLayouts: rowTacts
          });

          currentY += rowHeight + VERTICAL_TACT_MARGIN;
          currentX = MARGIN_LEFT + STRING_NAME_WIDTH;
          rowTacts.length = 0;
        }

        rowTacts.push({
          tactIndex: i,
          x: currentX,
          y: currentY,
          width: tactWidth
        });

        currentX += tactWidth + TACT_GAP;
      }

      if (rowTacts.length > 0) {
        staveRows.push({
          staveIndex,
          y: currentY,
          tactLayouts: rowTacts
        });
      }

      totalHeight = currentY + rowHeight + STAVE_GAP;
    }

    return {
      width: containerWidth,
      height: totalHeight + 20,
      staveRows
    };
  }

  calculateTactWidth(tact: TactInfo): number {
    const columnCount = tact.notes.length;
    const columnWidth = this.getColumnWidth();
    return columnCount * columnWidth + 40;
  }

  drawComposition(
    composition: Composition,
    state: NoteRendererState,
    options: DrawingOptions,
    containerWidth: number
  ): void {
    const layout = this.calculateLayout(composition, containerWidth, options.stringCount);
    const stringHeight = (options.stringCount - 1) * STRING_SPACING;

    const staveIndices = [...new Set(layout.staveRows.map(r => r.staveIndex))];

    for (const staveIndex of staveIndices) {
      const stave = composition.staves[staveIndex];
      const isCurrentStave = staveIndex === state.currentStave;
      const staveRows = layout.staveRows.filter(r => r.staveIndex === staveIndex);

      for (const row of staveRows) {
        this.drawStaveHeader(stave, 10, row.y + 5);
        this.drawStringNames(53, row.y, options.stringNames, options.stringCount);

        const lastTact = row.tactLayouts[row.tactLayouts.length - 1];
        const rowEndX = lastTact ? lastTact.x + lastTact.width : MARGIN_LEFT + STRING_NAME_WIDTH;
        this.drawStrings(MARGIN_LEFT + STRING_NAME_WIDTH, row.y, rowEndX, options.stringCount, isCurrentStave);
      }

      for (let tactIndex = 0; tactIndex < stave.tacts.length; tactIndex++) {
        const tact = stave.tacts[tactIndex];
        const isCurrentTact = isCurrentStave && tact.serialNumber === state.currentTact;

        for (const row of staveRows) {
          const tactLayout = row.tactLayouts.find(t => t.tactIndex === tactIndex);
          if (!tactLayout) continue;

          const startX = tactLayout.x;
          const startY = row.y;

          if (options.highlightCurrentTact && isCurrentTact) {
            this.drawTactHighlight(startX, startY, tactLayout.width, stringHeight);
          }

          this.drawTactBarline(startX, startY, stringHeight);

          if (options.showTactSize && shouldShowSize(stave.tacts, tactIndex)) {
            this.drawTactSize(startX, startY - 35, tact.sizeStr);
          }

          if (options.showTactNumbers) {
            this.drawTactNumber(startX, startY - 55, tact.serialNumber);
          }

          this.drawNotes(startX + 20, startY, tact, isCurrentStave, state, options);

          const isPauseTact = tact.notes.every(col => this.isPauseColumn(col));
          if (isPauseTact) {
            this.drawTactPause(startX + 20, startY, tactLayout.width - 40, stringHeight);
          }
        }
      }

      for (const row of staveRows) {
        const lastTact = row.tactLayouts[row.tactLayouts.length - 1];
        if (lastTact) {
          this.drawEndBarline(lastTact.x + lastTact.width, row.y, stringHeight);
        }
      }
    }
  }

  drawLegend(x: number, y: number): void {
    const colors = this.getColors();
    const items = this.colorService.getLegendItems();

    this.ctx.font = '10px Arial';
    this.ctx.fillStyle = colors.text;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';

    items.forEach((item, i) => {
      this.ctx.fillStyle = item.color;
      this.ctx.beginPath();
      this.ctx.arc(x + 5, y + i * 18 + 5, 5, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.fillStyle = colors.text;
      this.ctx.fillText(item.label, x + 15, y + i * 18);
    });
  }

  getLayout(composition: Composition, containerWidth: number, stringCount: number): LayoutInfo {
    return this.calculateLayout(composition, containerWidth, stringCount);
  }
}
