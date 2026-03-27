export interface CanvasDimensions {
  width: number;
  height: number;
  dpr: number;
}

export class CanvasService {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private dpr: number = 1;
  private container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.container.appendChild(this.canvas);
  }

  setupCanvas(width: number, height: number): CanvasDimensions {
    this.dpr = window.devicePixelRatio || 1;
    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.scale(this.dpr, this.dpr);
    
    return {
      width,
      height,
      dpr: this.dpr
    };
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }

  getDimensions(): CanvasDimensions {
    return {
      width: this.canvas.width / this.dpr,
      height: this.canvas.height / this.dpr,
      dpr: this.dpr
    };
  }

  getContainerWidth(): number {
    return this.container.clientWidth || 900;
  }

  clear(): void {
    const dims = this.getDimensions();
    this.ctx.clearRect(0, 0, dims.width, dims.height);
  }

  destroy(): void {
    this.canvas.remove();
  }
}
