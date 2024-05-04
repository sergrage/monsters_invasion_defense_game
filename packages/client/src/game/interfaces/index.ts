export interface Position {
  x: number;
  y: number;
}

export interface Frames {
  max: number;
  current?: number;
  elapsed?: number;
  hold?: number;
}

export interface Offset {
  x: number;
  y: number;
}

export interface IContext {
  position: Position;
  canvas: HTMLCanvasElement;
  c: CanvasRenderingContext2D;
}

export interface IFrame {
  imageSrc: string;
  frames: Frames;
  c: CanvasRenderingContext2D;
}

export interface IEntityParams {
  width: number;
  height: number;
  waypointIndex: number;
  radius: number;
  health: number;
  velocity: Position;
}

export interface IEntitySprite extends IContext, IFrame {
  entityParams: IEntityParams;
}

export interface ISprite extends IContext, IFrame {
  offset?: Offset;
}
