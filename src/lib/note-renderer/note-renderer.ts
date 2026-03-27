import {
  Composition,
  RenderOptions,
  NoteRendererState,
  ColorScheme
} from './types';
import {
  DEFAULT_STRING_COUNT,
  DEFAULT_STRING_NAMES
} from './constants';
import { CanvasService } from './canvas-service';
import { ColorService, DEFAULT_COLORS } from './color-service';
import { DrawingService } from './drawing-service';

interface InternalOptions {
  showTactNumbers: boolean;
  showTactSize: boolean;
  highlightCurrentTact: boolean;
  highlightCurrentNote: boolean;
  stringCount: number;
  stringNames: string[];
  colors: ColorScheme;
}

export class NoteRenderer {
  private composition: Composition | null = null;
  private state: NoteRendererState = { currentStave: 0, currentTact: 0, currentNote: 0 };
  private options: InternalOptions;
  private canvasService: CanvasService;
  private colorService: ColorService;
  private drawingService: DrawingService;
  private handleResize: () => void;

  constructor(container: HTMLElement, options: RenderOptions = {}) {
    this.options = {
      showTactNumbers: options.showTactNumbers ?? true,
      showTactSize: options.showTactSize ?? true,
      highlightCurrentTact: options.highlightCurrentTact ?? true,
      highlightCurrentNote: options.highlightCurrentNote ?? true,
      stringCount: options.stringCount ?? DEFAULT_STRING_COUNT,
      stringNames: options.stringNames ?? DEFAULT_STRING_NAMES,
      colors: {
        background: options.colors?.background ?? DEFAULT_COLORS.background,
        strings: options.colors?.strings ?? DEFAULT_COLORS.strings,
        tactBar: options.colors?.tactBar ?? DEFAULT_COLORS.tactBar,
        noteDefault: options.colors?.noteDefault ?? DEFAULT_COLORS.noteDefault,
        noteActive: options.colors?.noteActive ?? DEFAULT_COLORS.noteActive,
        tactSize: options.colors?.tactSize ?? DEFAULT_COLORS.tactSize,
        highlight: options.colors?.highlight ?? DEFAULT_COLORS.highlight,
        text: options.colors?.text ?? DEFAULT_COLORS.text,
        pause: options.colors?.pause ?? DEFAULT_COLORS.pause,
        pauseLine: options.colors?.pauseLine ?? DEFAULT_COLORS.pauseLine
      }
    };

    this.canvasService = new CanvasService(container);
    this.colorService = new ColorService(this.options.colors);
    this.drawingService = new DrawingService(this.canvasService.getContext(), this.colorService);

    this.handleResize = this.onResize.bind(this);
    window.addEventListener('resize', this.handleResize);
  }

  private onResize(): void {
    if (this.composition) {
      this.draw();
    }
  }

  private calculateHeight(): number {
    if (!this.composition) {
      return 120;
    }

    const containerWidth = this.canvasService.getContainerWidth();
    const layout = this.drawingService.getLayout(
      this.composition,
      containerWidth,
      this.options.stringCount
    );

    return Math.max(120, layout.height);
  }

  private draw(): void {
    const dims = this.canvasService.getDimensions();
    const ctx = this.canvasService.getContext();

    this.canvasService.clear();
    this.drawingService.setContext(ctx);
    this.drawingService.drawBackground(dims.width, dims.height);

    if (!this.composition) return;

    this.drawingService.drawComposition(
      this.composition,
      this.state,
      {
        showTactNumbers: this.options.showTactNumbers,
        showTactSize: this.options.showTactSize,
        highlightCurrentTact: this.options.highlightCurrentTact,
        highlightCurrentNote: this.options.highlightCurrentNote,
        stringCount: this.options.stringCount,
        stringNames: this.options.stringNames
      },
      dims.width
    );

    this.drawingService.drawLegend(dims.width - 150, 10);
  }

  private setupCanvas(): void {
    const width = this.canvasService.getContainerWidth();
    const height = this.calculateHeight();
    this.canvasService.setupCanvas(width, height);
  }

  render(composition: Composition): void {
    this.composition = composition;
    this.setupCanvas();
    this.draw();
  }

  updateState(state: Partial<NoteRendererState>): void {
    this.state = { ...this.state, ...state };
    this.draw();
  }

  updateColors(colors: Partial<ColorScheme>): void {
    this.colorService.updateColors(colors);
    this.options.colors = { ...this.options.colors, ...colors };
    if (this.composition) {
      this.draw();
    }
  }

  getColors(): ColorScheme {
    return this.colorService.getColors();
  }

  resize(): void {
    this.setupCanvas();
    if (this.composition) {
      this.draw();
    }
  }

  destroy(): void {
    window.removeEventListener('resize', this.handleResize);
    this.canvasService.destroy();
  }
}

export { DEFAULT_COLORS };
