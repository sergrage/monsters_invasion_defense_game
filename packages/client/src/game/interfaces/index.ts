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

export interface IEnemyImg {
  right: string;
  left: string;
  back: string;
  front: string;
}

export interface IEnemyParams {
  width: number;
  height: number;
  waypointIndex: number;
  radius: number;
  health: number;
  speed: number;
}

export interface IEntitySprite extends IContext {
  imageSrc: string;
  frames: Frames;
  enemyParams: IEnemyParams;
}

export interface IEnemySprite extends IContext {
  frames: Frames;
  imageSrc: IEnemyImg;
  enemyParams: IEnemyParams;
}

export interface ISprite extends IContext {
  imageSrc: string;
  frames: Frames;
  offset?: Offset;
}
