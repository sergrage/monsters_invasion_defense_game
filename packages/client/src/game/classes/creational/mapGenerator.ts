class MapGenerator {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  imageUrl: string;
  image: HTMLImageElement;

  constructor(
    width: number,
    height: number,
    canvasId: string,
    imageUrl: string,
  ) {
    this.width = width;
    this.height = height;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.imageUrl = imageUrl;
    this.image = new Image();
    this.initialize();
  }

  initialize(): void {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.image.src = this.imageUrl;
  }
}

export default MapGenerator;
